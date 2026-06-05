import mysql from 'mysql2/promise';

export async function POST(request) {
    let connection = null;
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

        const { siswaId, penerimaan } = await request.json();

        if (!siswaId || !penerimaan) {
            return Response.json(
                { 
                    success: false, 
                    message: 'siswaId dan penerimaan harus diisi' 
                },
                { status: 400 }
            );
        }

        if (![2, 3].includes(penerimaan)) {
            return Response.json(
                { 
                    success: false, 
                    message: 'Penerimaan hanya bisa 2 (Diterima) atau 3 (Ditolak)' 
                },
                { status: 400 }
            );
        }

        connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD || '',
            database: process.env.DATABASE_NAME
        });

        const query = `
            UPDATE siswa 
            SET penerimaan = ? 
            WHERE id = ?
        `;

        const [result] = await connection.execute(query, [penerimaan, siswaId]);

        if (result.affectedRows === 0) {
            return Response.json(
                { 
                    success: false, 
                    message: 'Siswa tidak ditemukan' 
                },
                { status: 404 }
            );
        }

        return Response.json(
            { 
                success: true,
                message: 'Status penerimaan berhasil diperbarui'
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Update error:', error);
        return Response.json(
            { 
                success: false, 
                message: 'Error updating status: ' + (error instanceof Error ? error.message : 'Unknown error') 
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
