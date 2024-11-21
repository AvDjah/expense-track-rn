import { ThemedText } from "@/app-example/components/ThemedText";
import { View, Text, StyleSheet } from "react-native";




export default function Settings(){
    return <View style={styles.container}  >
        <Text>
            Hello from settings!
        </Text>
    </View>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    }
})