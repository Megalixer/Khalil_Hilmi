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

        const connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD || '',
            database: process.env.DATABASE_NAME
        });

        const query = `
            SELECT * FROM siswa 
            ORDER BY id DESC
        `;

        const [rows] = await connection.execute(query);

        await connection.end();

        const data = rows.map(row => ({
            id: row.id,
            nama: row.nama,
            nik: row.nik,
            nisn: row.nisn,
            jurusan: row.jurusan,
            penerimaan: row.penerimaan,
            tempatLahir: row.tempat_lahir,
            tanggalLahir: row.tanggal_lahir,
            jenisKelamin: row.jenis_kelamin,
            asalSekolah: row.asal_sekolah,
            tahunlulus: row.tahun_lulus,
            dokumen: row.dokumen
        }));

        return Response.json(
            { 
                success: true,
                data: data
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
