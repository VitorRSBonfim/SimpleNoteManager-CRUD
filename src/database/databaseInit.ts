
import { type SQLiteDatabase } from "expo-sqlite"

export async function initDb(database: SQLiteDatabase) {
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            taskName TEXT NOT NULL,
            taskText TEXT NOT NULL,
            taskDescription TEXT NOT NULL
        );
    `)
}





