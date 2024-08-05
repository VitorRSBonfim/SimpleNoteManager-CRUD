import {  useSQLiteContext } from "expo-sqlite";



export function CRUD() {

    const database =  useSQLiteContext();

    async function insertnote() {

        const statement = await database.prepareAsync(`INSERT INTO notes (noteName, noteText, noteDescription) values ($noteName, $noteText, $noteDescription)`)
        try {
            
            let result = await statement.executeAsync({$noteName: "noteName", $noteText: "noteText", noteDescription: "noteDescription"})
            console.log(result)
            
        } catch (error) {
            console.log(error + "dasd")
        }
    }

    return { insertnote }

}
