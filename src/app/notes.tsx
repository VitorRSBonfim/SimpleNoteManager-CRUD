import { StyleSheet } from "react-native"
import { View, Text } from "react-native"
import { TextInput } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CRUD } from "../database/databaseCRUD";
import FontAwesomeIcon from 'react-native-vector-icons/AntDesign'

export default function Note() {

    const db = CRUD()
    const [idTemp, setIdTemp] = useState<number>()
    const [tittleNote, setTittleNote] = useState<string>("")
    const [textNote, setTextNote] = useState<string>("")

    console.log()

    async function getById() {
        
        
        try {
            const result = await db.getSelectedNote() 
            console.log(result)
            if (result != null) {
                setTittleNote(result[0].noteName)
                setTextNote(result[0].noteText)
            }
        } catch (error) {
            console.log(error)
        }
           
        
    }

    async function updateNote() {
        try {
            const result = await db.updateNote(tittleNote, textNote)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        // write your code here, it's like componentWillMount
        getById();
    }, [])


    
    return (
        <View style={styles.container}>
            <View style={styles.containterView2}>
                <View style={styles.containerHeader}>
                    <Text style={styles.textContent}> <Link href={{pathname: ".."}} ><FontAwesomeIcon name="check" size={26}></FontAwesomeIcon></Link></Text>
                    <Text onPress={updateNote} style={styles.textContent} ><FontAwesomeIcon name="close" size={26}></FontAwesomeIcon></Text>
                </View>
            </View>
            <View style={styles.containerEditContent}>
                <TextInput style={styles.inputTextTittle} multiline={true} maxLength={20} onChangeText={setTittleNote} value={tittleNote}></TextInput>
                <TextInput style={styles.inputText} multiline={true} maxLength={240} onChangeText={setTextNote} value={textNote}></TextInput>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    containterView2: {
        width: "100%",
        paddingTop: 10,
        backgroundColor: "#7A4ED9"
        
    },
    containerHeader: {
       paddingLeft: 10,
       paddingTop: 10,
       paddingBottom: 10,
       paddingRight: 10,
       justifyContent: "space-between", 
       alignItems: "flex-start",
       flexDirection: "row"
    },
    headerTextContent: {

    },
    textContent: {
        paddingTop: 20,
        color: "white",
        fontSize: 20,
        marginLeft: 10
    },
    containerEditContent: {
        backgroundColor: "white",
        marginLeft: 30,
        marginTop: 10,
        marginRight: 30
    },
    inputTextTittle: {
        color: "#7A4ED9", fontSize: 40
    },
    inputText: {
        fontSize: 20,
        marginTop: 5,
        marginLeft: 5,
    }
});

