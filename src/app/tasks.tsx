import { StyleSheet } from "react-native"
import { View, Text } from "react-native"

export default function Task() {
    return (
        <View style={styles.container}>
            <Text>tAREFAS AQUI</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#7A4ED9"
    }
});

