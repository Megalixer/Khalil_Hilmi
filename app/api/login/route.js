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

        const { nama, nik, nisn } = data;

        // Validate input
        if (!nama || !nik || !nisn) {
            return Response.json(
                { 
                    success: false, 
                    message: 'Data harus diisi lengkap!' 
                },
                { status: 400 }
            );
        }

        let query;
        let tableName = 'siswa';
        let userType = 'student';

        // Check if login as Admin
        if (nama === 'Admin') {
            query = `
                SELECT id, nama, nik, nisn FROM admin 
                WHERE nama = ? AND nik = ? AND nisn = ?
                LIMIT 1
            `;
            tableName = 'admin';
            userType = 'admin';
        } else {
            query = `
                SELECT id, nama, nik, nisn FROM siswa 
                WHERE nama = ? AND nik = ? AND nisn = ?
                LIMIT 1
            `;
        }

        const [rows] = await connection.execute(query, [nama, nik, nisn]);

        await connection.end();

        if (rows.length === 0) {
            return Response.json(
                { 
                    success: false, 
                    message: 'Data tidak ditemukan. Silakan periksa kembali data Anda!' 
                },
                { status: 401 }
            );
        }

        const user = rows[0];

        return Response.json(
            { 
                success: true, 
                message: 'Login berhasil!',
                user: {
                    id: user.id,
                    nama: user.nama,
                    type: userType
                }
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Login error:', error);
        return Response.json(
            { 
                success: false, 
                message: 'Login gagal: ' + (error instanceof Error ? error.message : 'Unknown error') 
            },
            { status: 500 }
        );
    }
}
