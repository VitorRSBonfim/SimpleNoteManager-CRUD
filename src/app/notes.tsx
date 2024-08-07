import { StyleSheet } from "react-native"
import { View, Text } from "react-native"
import { TextInput } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Note() {

    async function getId() {
        try {
            const id = await AsyncStorage.getItem('@SetId:id')

        if (id != null) {
            console.log(id)
        }
        } catch (error) {
            console.log(error)
        }
    }   
    
    return (
        <View style={styles.container}>
            <View style={styles.containterView2}>
                <View style={styles.containerHeader}>
                    <Text style={styles.textContent}>VoltarIcon</Text>
                </View>
            </View>
            <View style={styles.containerEditContent}>
                <TextInput style={styles.inputTextTittle} multiline={true} maxLength={20} placeholder="TempTittleNote - desscriptioo"></TextInput>
                <TextInput style={styles.inputDescription} multiline={true} maxLength={20} placeholder="TempDescriptionNote"></TextInput>
                <TextInput style={styles.inputText} multiline={true} maxLength={240} placeholder="TempTextNote"></TextInput>

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
        paddingTop: 20,
        paddingBottom: 20,
        
        backgroundColor: "#7A4ED9",
        
    },
    containerHeader: {
       paddingLeft: 10
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
    inputDescription: {
        color: "black",
        
    },
    inputText: {
        fontSize: 20
    }
});

