import AsyncStorage from "@react-native-async-storage/async-storage";
import {  useSQLiteContext } from "expo-sqlite";

export type notesType = {
    noteName: string, 
    noteText: string, 
    noteDescription: string
}

export 
type dataNotesType = {
    "id": number
    "noteDescription": string
    "noteName": string
    "noteText": string
}

export function CRUD() {

    const database =  useSQLiteContext();
    async function insertnote(data: notesType) {


        const statement = await database.prepareAsync(`INSERT INTO note (noteName, noteText, noteDescription) values ($noteName, $noteText, $noteDescription)`)
        try {
            
            let result = await statement.executeAsync({$noteName: data.noteName, $noteText: data.noteText, $noteDescription: data.noteDescription})
            console.log(result)
            const insertedRowId = result.lastInsertRowId.toLocaleString()
            return { insertedRowId }
            
        } catch (error) {
            console.log(error)
        } 
    }

    async function searchNote() {
        try {
            const query = "SELECT * FROM note "
            const result = await database.getAllAsync<dataNotesType>(query)
            console.log("Resultado da busca" +  result)
            return result 
        } catch (error) {
            console.log(error)
        } 
    }

    async function deleteNote(idNote: number) {
        const statement = await database.prepareAsync(`DELETE FROM note WHERE id = $ID_Task `)

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



    async function getSelectedNote() {

        const id = await AsyncStorage.getItem('@SetId:id')


        try {
            const query = "SELECT * FROM note WHERE id = $id "
            const result = await database.getAllAsync<dataNotesType>(query, `${id}`)
            console.log("Resultado da busca" +  result[0].id)
            return result
        } catch (error) {
            console.log(error)
        }
    }

    async function updateNote(noteName: string, noteDescription: string, noteText: string) {

        const id = await AsyncStorage.getItem('@SetId:id')

        const statement = await database.prepareAsync(`UPDATE note SET noteName = $noteName, noteDescription = $noteDescription, noteText = $noteText WHERE id = $id`)
        try {
            const response = await statement.executeAsync({$id: id, $noteName: noteName, $noteDescription: noteDescription, $noteText: noteText })
        } catch (error) {
            console.log(error)
        }
    }

    async function searchByName(noteName: string) {

        try {
            const query = "SELECT * FROM note WHERE noteName LIKE ?"
      
            const response = await database.getAllAsync(
              query,
              `%${noteName}%`
            )
      
            return response
          } catch (error) {
            throw error
          }

    }

    return { insertnote, searchNote, deleteNote, getSelectedNote, updateNote, searchByName}

}
