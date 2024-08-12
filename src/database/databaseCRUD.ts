import AsyncStorage from "@react-native-async-storage/async-storage";
import {  useSQLiteContext } from "expo-sqlite";

export type notesType = {
    noteName: string, 
    noteText: string, 
}

export 
type dataNotesType = {
    "id": number
    "noteName": string
    "noteText": string
}

export function CRUD() {

    const database =  useSQLiteContext();
    async function insertnote(data: notesType) {


        const statement = await database.prepareAsync(`INSERT INTO nota (noteName, noteText) values ($noteName, $noteText)`)
        try {
            
            let result = await statement.executeAsync({$noteName: data.noteName, $noteText: data.noteText, })
            console.log(result)
            const insertedRowId = result.lastInsertRowId.toLocaleString()
            return { insertedRowId }
            
        } catch (error) {
            console.log(error)
        } 
    }

    async function searchNote() {
        try {
            const query = "SELECT * FROM nota "
            const result = await database.getAllAsync<dataNotesType>(query)
            console.log("Resultado da busca" +  result)
            return result 
        } catch (error) {
            console.log(error)
        } 
    }

    async function deleteNote(idNote: number) {
        const statement = await database.prepareAsync(`DELETE FROM nota WHERE id = $ID_Task `)

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
            const query = "SELECT * FROM nota WHERE id = $id "
            const result = await database.getAllAsync<dataNotesType>(query, `${id}`)
            console.log("Resultado da busca" +  result[0].id)
            return result
        } catch (error) {
            console.log(error)
        }
    }

    async function updateNote(noteName: string, noteText: string) {

        const id = await AsyncStorage.getItem('@SetId:id')

        const statement = await database.prepareAsync(`UPDATE nota SET noteName = $noteName, noteText = $noteText WHERE id = $id`)
        try {
            const response = await statement.executeAsync({$id: id, $noteName: noteName, $noteText: noteText })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    async function searchByName(noteName: string) {

        try {
            const query = "SELECT * FROM nota WHERE noteName LIKE ?"
      
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
