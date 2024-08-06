import {  useSQLiteContext } from "expo-sqlite";

export type notesType = {
    noteName: string, 
    noteText: string, 
    noteDescription: string
}

export 
type dataNotesType = {
    "ID_Task": number
    "taskDescription": string
    "taskName": string
    "taskText": string
}

export function CRUD() {

    const database =  useSQLiteContext();
    async function insertnote(data: notesType) {


        const statement = await database.prepareAsync(`INSERT INTO notes (taskName, taskText, taskDescription) values ($noteName, $noteText, $noteDescription)`)
        try {
            
            let result = await statement.executeAsync({$noteName: data.noteName, $noteText: data.noteText, $noteDescription: data.noteDescription})
            console.log(result)
            const insertedRowId = result.lastInsertRowId.toLocaleString()
            return { insertedRowId }
            
        } catch (error) {
            console.log(error + "dasd")
        } 
    }

    async function searchNote() {
        try {
            const query = "SELECT * FROM notes "
            const result = await database.getAllAsync<dataNotesType>(query)
            return result 
            console.log("Resultado da busca" + result)
        } catch (error) {
            console.log(error)
        } 
    }

    async function deleteNote(idNote: number) {
        const statement = await database.prepareAsync(`DELETE FROM notes WHERE ID_Task = $ID_Task `)

        try {
            const result = await statement.executeAsync({$ID_Task: idNote})
            console.log(result)
            return result
        } catch (error) {
            console.log(error)
        } finally {
            await statement.finalizeAsync()
        }
    }

    return { insertnote, searchNote, deleteNote}

}
