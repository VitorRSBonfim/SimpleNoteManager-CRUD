import { StyleSheet, StatusBar, TextInput, FlatList, Button } from "react-native"
import { View, Text } from "react-native"
import { Link } from "expo-router"
import { SQLiteProvider } from "expo-sqlite"
import { database } from "../database/databaseInit"

export default function App() {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
      ];
    console.log(DATA[0])

    return (
        
        <SQLiteProvider databaseName="tasks" onInit={database}>
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
                        <View style={styles.containerTask}>
                            <View style={styles.containerTaskCard} >
                                <Text style={styles.containerTaskTittle}>{item.id}<Text>asaa</Text></Text>
                                <Text style={styles.containerTaskTittle}>{item.title}</Text>
                            </View>
                        </View>
                    }>

                    </FlatList>
                </View>
            </View>  
        </SQLiteProvider>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#7A4ED9",
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
    containerTask: {
        alignItems: "center",
        width: "100%",
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 20,
        
    },
    containerTaskCard: {
        width: "90%",
        backgroundColor: "#7A4ED9",
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 20
    },
    containerTaskTittle: {
        color: "white",
        marginLeft: 2,
    }
});

/* iMPORTANT  */

// <Link href="/tasks" >TASKS</Link>
