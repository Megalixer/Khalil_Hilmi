import mysql from 'mysql2/promise';

export async function POST(request) {
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

        const data = await request.json();

        // Create connection
        const connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD || '',
            database: process.env.DATABASE_NAME
        });

        const {
            nama,
            nik,
            tempatLahir,
            tanggalLahir,
            jenisKelamin,
            asalSekolah,
            tahunlulus,
            nisn,
            jurusan,
            penerimaan
        } = data;

        const query = `
            INSERT INTO siswa
            (nama, nik, tempat_lahir, tanggal_lahir, jenis_kelamin, asal_sekolah, tahun_lulus, nisn, jurusan, penerimaan)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await connection.execute(query, [
            nama,
            nik,
            tempatLahir,
            tanggalLahir,
            jenisKelamin,
            asalSekolah,
            tahunlulus,
            nisn,
            jurusan,
            penerimaan
        ]);

        await connection.end();

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
        return Response.json(
            { 
                success: false, 
                message: 'Pendaftaran gagal: ' + (error instanceof Error ? error.message : 'Unknown error') 
            },
            { status: 500 }
        );
    }
}
