import { StyleSheet } from "react-native"
import { View, Text } from "react-native"

import { useState } from "react";

import { pre } from "./index"


export default function Task() {

    const [id, setId] = useState<number>();
    console.log(pressTrue)

    return (
        <View style={styles.container}>
            <Text></Text>
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

