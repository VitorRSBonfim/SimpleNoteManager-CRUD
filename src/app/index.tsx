import { StyleSheet, StatusBar, TextInput, FlatList, Button, Modal, KeyboardAvoidingView, Pressable, Touchable} from "react-native"
import { View, Text } from "react-native"
import { useEffect, useState } from "react"
import { Link } from "expo-router"
import { CRUD, notesType, dataNotesType } from "../database/databaseCRUD"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AntDesign, FontAwesome } from "@expo/vector-icons"
import { Feather } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { SimpleLineIcons } from "@expo/vector-icons"

export default function Index() {

    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [noteName, setnoteName] = useState("")
    const [noteText, setnoteText] = useState("")
    const [dataNotes, setDataNotes] = useState<dataNotesType[] | undefined>([])
    const [searchVal, setSearchVal] = useState("")
    
    const db = CRUD()


    async function insertDb() {
        const result = await db.insertnote({noteName, noteText})
        console.log(result?.insertedRowId)
        setnoteName("")
        setnoteText("")
      
        searchNotes()
        setModalVisible(false)
    }

    async function searchNotes() {
        try {
            const response = await db.searchNote()
            setDataNotes(response)
            if ( response != null ) {
                 console.log(response[0].noteName, response[0].noteText)
            }
           
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

    async function searchState() {
        try {
            if (searchVal != null) {
                const response = await db.searchByName(searchVal)
                setDataNotes(response)
                console.log(response)
                
            } else {
                searchNotes()
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {searchState()}, [searchVal])

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
                        <View style={{justifyContent: "space-between", alignItems: "flex-start",flexDirection: "row", backgroundColor: "#7A4ED9", paddingTop: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 10}} >
                            <Text onPress={insertDb}>
                                <FontAwesome name="check" size={26} color={"white"}></FontAwesome>
                            </Text>
                            <Text onPress={() => {setModalVisible(false)}}>
                                <FontAwesome name="close" size={26} color={"white"}></FontAwesome>
                            </Text>
                        </View>
                        <View style={styles.containernoteInput}>
            
                            <TextInput multiline={true} style={{fontSize: 40}} placeholder="Note Name "onChangeText={setnoteName} value={noteName} maxLength={30} >
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
                        NOTE
                    </Text>
                    <StatusBar barStyle={"dark-content"} backgroundColor={"#7A4ED9"}/>
                </View>
                <View style={styles.containerView2}>
                    <View style={styles.containerSearch}>
                        <Text onPress={() => setModalVisible(true)}><AntDesign  name="plus" size={26}></AntDesign></Text>

                        <TextInput onChangeText={setSearchVal} value={searchVal} style={styles.inputSearch} placeholder="Search"></TextInput>
                        
                    </View>
                    <FlatList
                    data={dataNotes}
                    keyExtractor={item => String(item.id)}
                    renderItem={({item}) =>
                        <View style={styles.containernote}>
                            <View style={styles.containernoteCard} >
                                <Text style={styles.containernoteTittle}>{item.noteName}<Text></Text></Text>
                                <Text style={styles.containernoteText}>{item.noteText}<Text></Text></Text>
                                <View style={styles.containerBtnActions}>
            
                                    <Text style={styles.btnActions} ><Link  onPress={() => {sendId(item.id)}} href={{pathname: '/notes', params: {id: 'item.id'}}} ><FontAwesome name="pencil-square-o" size={20} color={"white"} ></FontAwesome></Link></Text>
                                    <Text onPress={() => {deleteNote(item.id)}}><SimpleLineIcons name="trash" size={20} color={"white"}></SimpleLineIcons></Text>
                                </View>
                            </View>
                        </View>
                    }>
                        
                    </FlatList>
                    
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
        marginLeft: 10,
        marginRight: 10,
        fontSize: 22
    },
    containernoteText: {
        marginLeft: 10,
        marginRight: 10,
        color: "white",
        fontSize: 14
    },
    containerBtnActions: {
        width: "100%",
        flexDirection: "row",
        paddingLeft: 10,
        paddingRight: 20,
        paddingTop: 10,
        justifyContent: "space-between",
        alignItems: "center"
    },
    btnActions: {
        color: "#2B2733",
        justifyContent:"center",
        
    },
    containerBtn: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        

    
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
        marginTop: 10,
        marginRight: 30
    },
    containerSearch: {
        marginRight: 20,
        marginLeft: 20,
        marginTop: 10,
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    inputSearch: {
        borderWidth: .2,
        borderColor: "#7A4ED9",
        borderRadius: 10 ,
        paddingLeft: 10,
        width: "78%",
        marginLeft: 10,
        marginRight:10
    }
});

/* iMPORTANT  */

// <Link href="/notes" >noteS</Link>

// <Button onPress={() => sendId(4)} title="SendData"></Button>
// <Button onPress={getId} title="GetData"></Button>
