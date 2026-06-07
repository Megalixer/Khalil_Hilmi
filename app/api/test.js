import { createConnection } from "@/app/lib/db";

export async function GET() {
    try {
        const db = await createConnection();

        const [rows] = await db.query("SELECT * FROM admin");

        return Response.json(rows);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}