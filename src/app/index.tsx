import { StyleSheet, StatusBar, TextInput, FlatList, Button, Modal, KeyboardAvoidingView, Pressable} from "react-native"
import { View, Text } from "react-native"
import { useState } from "react"
import { Link } from "expo-router"

import { SQLiteDatabase } from "expo-sqlite"
import { SQLiteProvider } from "expo-sqlite"
import { initDb } from "../database/databaseInit"
import { CRUD } from "../database/databaseCRUD"
import { useSQLiteContext } from "expo-sqlite"


export default function Index() {

    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [noteName, setnoteName] = useState("ff")
    const [noteDescription, setnoteDescription] = useState("fff")
    const [noteText, setnoteText] = useState("ff")
    const db = CRUD()

    async function insertDb() {
        const result = await db.insertnote()
        console.log(result + "bbb")
    }
    
    const DATA = [{id: '1',title: 'First Item',  }];

    return (
 
       
            
            <View style={styles.container}>
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
            
                            <TextInput multiline={true} style={{fontSize: 40}} placeholder="Note Name"onChangeText={setnoteName} value={noteName} maxLength={20} >
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
                    data={DATA}
                    keyExtractor={item => item.id}
                    renderItem={({item}) =>
                        <View style={styles.containernote}>
                            <View style={styles.containernoteCard} >
                                <Text style={styles.containernoteTittle}>{item.id}<Text>asaa</Text></Text>
                                <Text style={styles.containernoteTittle}>{item.title}</Text>
                                <View style={styles.containerBtnActions}>
            
                                    <Text style={styles.btnActions} ><Link href={{pathname: '/notes', params: {id: 'item.id'}}} >Editar</Link></Text>
                                    <Text style={styles.btnActions}><Link href="/notes" >Apagar</Link></Text>
                                </View>
                            </View>
                        </View>
                    }>
                    </FlatList>
                </View>
                <View style={styles.containerBtn}><Button title="NEWnote" onPress={() => setModalVisible(true)}></Button>
                
                </View>
                <Button title="TST" onPress={insertDb}  ></Button>
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
        textAlign: "center"
    },
    containerView2: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 20,
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
        backgroundColor: "white",
        paddingBottom: 30,
        paddingTop: 5
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
