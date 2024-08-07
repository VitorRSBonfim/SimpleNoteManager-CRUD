
import { type SQLiteDatabase } from "expo-sqlite"
import { deleteDatabaseAsync } from "expo-sqlite"

export async function initDb(database: SQLiteDatabase) {
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS note (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            noteName TEXT NOT NULL,
            noteText TEXT NOT NULL,
            noteDescription TEXT NOT NULL
        );
    `)
}





