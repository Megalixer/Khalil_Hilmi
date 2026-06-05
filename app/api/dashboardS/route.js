import mysql from 'mysql2/promise';

export async function POST(request) {
    try {
        if (!process.env.DATABASE_HOST || !process.env.DATABASE_USER || !process.env.DATABASE_NAME) {
            return Response.json(
                { 
                    success: false, 
                    message: 'Server configuration error' 
                },
                { status: 500 }
            );
        }

        const { nama, nik, nisn } = await request.json();

        const connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD || '',
            database: process.env.DATABASE_NAME
        });

        const query = `
            SELECT * FROM siswa 
            WHERE nama = ? AND nik = ? AND nisn = ?
            LIMIT 1
        `;

        const [rows] = await connection.execute(query, [nama, nik, nisn]);

        await connection.end();

        if (rows.length === 0) {
            return Response.json(
                { 
                    success: false, 
                    message: 'Data tidak ditemukan' 
                },
                { status: 404 }
            );
        }

        const user = rows[0];

        return Response.json(
            { 
                success: true,
                data: {
                    id: user.id,
                    nama: user.nama,
                    nik: user.nik,
                    tempatLahir: user.tempat_lahir,
                    tanggalLahir: user.tanggal_lahir,
                    jenisKelamin: user.jenis_kelamin,
                    asalSekolah: user.asal_sekolah,
                    tahunlulus: user.tahun_lulus,
                    nisn: user.nisn,
                    jurusan: user.jurusan,
                    dokumen: user.dokumen,
                    penerimaan: user.penerimaan
                }
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Dashboard error:', error);
        return Response.json(
            { 
                success: false, 
                message: 'Error fetching user data: ' + (error instanceof Error ? error.message : 'Unknown error') 
            },
            { status: 500 }
        );
    }
}
