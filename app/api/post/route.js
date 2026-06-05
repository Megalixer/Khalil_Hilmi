import mysql from 'mysql2/promise';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request) {
    let connection = null;
    try {
        // Check environment variables
        if (!process.env.DATABASE_HOST || !process.env.DATABASE_USER || !process.env.DATABASE_NAME) {
            console.error('Missing database environment variables');
            return Response.json(
                { 
                    success: false, 
                    message: 'Server configuration error: Missing database credentials' 
                },
                { status: 500 }
            );
        }

        const formData = await request.formData();

        // Extract form fields
        const nama = formData.get('nama');
        const nik = formData.get('nik');
        const tempatLahir = formData.get('tempatLahir');
        const tanggalLahir = formData.get('tanggalLahir');
        const jenisKelamin = formData.get('jenisKelamin');
        const asalSekolah = formData.get('asalSekolah');
        const tahunlulus = formData.get('tahunlulus');
        const nisn = formData.get('nisn');
        const jurusan = formData.get('jurusan');
        const dokumenFile = formData.get('dokumen');
        
        if (!nama || !nik || !tempatLahir || !tanggalLahir || !jenisKelamin || !asalSekolah || !tahunlulus || !nisn || !jurusan || !dokumenFile) {
            return Response.json(
                { 
                    success: false, 
                    message: 'Semua field harus diisi!' 
                },
                { status: 400 }
            );
        }

        // Validate file
        if (!dokumenFile.type.includes('pdf')) {
            return Response.json(
                { 
                    success: false, 
                    message: 'File harus berformat PDF!' 
                },
                { status: 400 }
            );
        }

        // Save file
        const uploadsDir = join(process.cwd(), 'public/uploads');
        await mkdir(uploadsDir, { recursive: true });

        const filename = `${String(nik).trim()}-${Date.now()}.pdf`;
        const filepath = join(uploadsDir, filename);

        const bytes = await dokumenFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filepath, buffer);

        // Create connection
        connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD || '',
            database: process.env.DATABASE_NAME
        });

        const query = `
            INSERT INTO siswa 
            (nama, nik, tempat_lahir, tanggal_lahir, jenis_kelamin, asal_sekolah, tahun_lulus, nisn, jurusan, dokumen, penerimaan)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const params = [
            String(nama || '').trim(),
            String(nik || '').trim(),
            String(tempatLahir || '').trim(),
            String(tanggalLahir || '').trim(),
            String(jenisKelamin || '').trim(),
            String(asalSekolah || '').trim(),
            String(tahunlulus || '').trim(),
            String(nisn || '').trim(),
            String(jurusan || '').trim(),
            `/uploads/${filename}`,
            1  // Default penerimaan value
        ];

        const [result] = await connection.execute(query, params);

        return Response.json(
            { 
                success: true, 
                message: 'Pendaftaran berhasil!',
                id: result.insertId 
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration error:', error);
        
        let errorMessage = 'Pendaftaran gagal';
        if (error instanceof Error) {
            errorMessage += ': ' + error.message;
        }
        
        return Response.json(
            { 
                success: false, 
                message: errorMessage
            },
            { status: 500 }
        );
    } finally {
        if (connection) {
            try {
                await connection.end();
            } catch (err) {
                console.error('Error closing connection:', err);
            }
        }
    }
}
