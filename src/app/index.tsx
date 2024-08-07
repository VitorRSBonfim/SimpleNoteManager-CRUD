import { StyleSheet, StatusBar, TextInput, FlatList, Button, Modal, KeyboardAvoidingView, Pressable, Touchable} from "react-native"
import { View, Text } from "react-native"
import { useEffect, useState } from "react"
import { Link } from "expo-router"
import { CRUD, notesType, dataNotesType } from "../database/databaseCRUD"
import AsyncStorage from "@react-native-async-storage/async-storage"
export default function Index() {

    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [noteName, setnoteName] = useState("")
    const [noteDescription, setnoteDescription] = useState("")
    const [noteText, setnoteText] = useState("")
    const [dataNotes, setDataNotes] = useState<dataNotesType[] | undefined>([])
    
    
    const db = CRUD()


    async function insertDb() {
        const result = await db.insertnote({noteName, noteText, noteDescription})
        console.log(result?.insertedRowId)
        setnoteName("")
        setnoteText("")
        setnoteDescription("")
        searchNotes()
        setModalVisible(false)
    }

    async function searchNotes() {
        try {
            const response = await db.searchNote()
            setDataNotes(response)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        // write your code here, it's like componentWillMount
        searchNotes();
    }, [])
   
    async function sendId(id: number) {
        const idStr = String(id)
        try {
            await AsyncStorage.setItem(
                '@SetId:id',
                idStr
            )
        } catch (error) {
            console.log(error)
        }
    }

    

    async function deleteNote(id: number) {
        const response = await db.deleteNote(id)
        searchNotes()
    }
    
    const DATA = [{id: '1',title: 'First Item',  }];

    return (
 
       
            
            <View style={styles.container}  >
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.containerModalContent}>
                    <View style={styles.containerModal} >
                        <View style={{justifyContent: "flex-start", alignItems: "flex-start", marginRight: 10, marginTop: 5, flexDirection: "row",}} >
                            <Button onPress={insertDb} title="Salvar">
                            </Button>
                            <Button onPress={() => setModalVisible(false)}  title="Cancelar">
                            </Button>
                        </View>
                        <View style={styles.containernoteInput}>
            
                            <TextInput multiline={true} style={{fontSize: 40}} placeholder="Note Name "onChangeText={setnoteName} value={noteName} maxLength={20} >
                            </TextInput>
                            <TextInput placeholder="note Description" onChangeText={setnoteDescription} value={noteDescription} maxLength={50} >
                            </TextInput>
                            <TextInput  multiline={true} placeholder="note" onChangeText={setnoteText} value={noteText} maxLength={250} >
                            </TextInput>
                        </View>
                    </View>
                </View>
            </Modal>
            
            <View style={styles.container}>
                <View style={styles.containerView1}>
                    <Text style={styles.containerView1Txt}>
                        TO-DO
                    </Text>
                    <StatusBar barStyle={"dark-content"} backgroundColor={"#7A4ED9"}/>
                </View>
                <View style={styles.containerView2}>
                    <FlatList
                    data={dataNotes}
                    keyExtractor={item => String(item.id)}
                    renderItem={({item}) =>
                        <View style={styles.containernote}>
                            <View style={styles.containernoteCard} >
                                <Text style={styles.containernoteTittle}>{item.noteName}<Text></Text></Text>
                                <Text style={styles.containernoteTittle}>{item.noteDescription}</Text>
                                <View style={styles.containerBtnActions}>
            
                                    <Text style={styles.btnActions} ><Link  onPress={() => {sendId(item.id)}} href={{pathname: '/notes', params: {id: 'item.id'}}} >Editar</Link></Text>
                                    <Text onPress={() => {deleteNote(item.id)}} style={styles.btnActions}>DELETE</Text>
                                </View>
                            </View>
                        </View>
                    }>
                    </FlatList>
                </View>
                <View style={styles.containerBtn}><Button title="NEWnote" onPress={() => setModalVisible(true)}></Button>
                
                </View>

            </View>
        </View>
       
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#7A4ED9"
    }, 
    containerView1: {
        paddingTop: 20,
        paddingBottom: 20,
        width: "100%",
    },
    containerView1Txt: {
        color: "white",
        textAlign: "center",
        paddingTop: 10
    },
    containerView2: {
        flex: 1,
        paddingTop: 5,
        
        width: "100%",
        backgroundColor: "white",
        height: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        
    },
    containernote: {
        alignItems: "center",
        width: "100%",
        paddingTop: 10,
        paddingBottom: 5,
        marginTop: 5,
        
    },
    containernoteCard: {
        width: "90%",
        backgroundColor: "#7A4ED9",
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 20
    },
    containernoteTittle: {
        color: "white",
        marginLeft: 2,
    },
    containerBtnActions: {
        width: "90%",
        flexDirection: "row",
        marginLeft: 5,
        marginTop: 5,
    },
    btnActions: {
        color: "#2B2733",
        fontSize: 14,
        marginRight: 10
    },
    containerBtn: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        paddingBottom: 10
    
    },
    containerModalContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
     
    },
    containerModal: {
        
        backgroundColor: "white",
        width: "100%",
        height: "100%"
    },
    containernoteInput: {
        marginLeft: 30,
        marginTop: 30,
        marginRight: 30
    }
});

/* iMPORTANT  */

// <Link href="/notes" >noteS</Link>

// <Button onPress={() => sendId(4)} title="SendData"></Button>
// <Button onPress={getId} title="GetData"></Button>
