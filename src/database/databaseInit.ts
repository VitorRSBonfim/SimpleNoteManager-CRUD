
import { type SQLiteDatabase } from "expo-sqlite"

export async function database(database: SQLiteDatabase) {
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS tasks (
            ID_Task INTEGER primary key autoincrement,
            taskName TEXT not null,
            taskText TEXT not null,
            taskDescription TEXT not null,
            taskStatus TEXT not null 
        )
        `)
}

