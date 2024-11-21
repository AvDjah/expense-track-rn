import { View , Text, StyleSheet, Button, Pressable, ScrollView, LayoutChangeEvent, DimensionValue} from "react-native";
import { Post } from ".";
import { useEffect, useState } from "react";





export default function ExpenseItem({ post } : { post : Post }){


    const [isExpandable,setIsExpandable] = useState(false)

    const [expanded,setExpanded] = useState(false)

    let isCompressed = false
 
    const layoutCheck = (e : LayoutChangeEvent) => {
        console.log('Height of element: ',e.nativeEvent.layout.height)
        const height = e.nativeEvent.layout.height
        if(height > 50){
            console.log("Setting layout to expandable")
            setIsExpandable(true)
            isCompressed = true
        }
    }

    const toggleExpanded = () => {
        setExpanded(!expanded)
    }

    return <View style={{
        marginBottom: 10,
        marginTop: 10,
        padding: 15,
        marginHorizontal: 10,
        boxShadow: '2px',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 7,
        overflow: 'hidden',
      }} >
        <View style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            // height: expanded ? '100%' : 30,
        }} >
            <Text style={{
                width: '50%',
                flexWrap: 'wrap',
            }}
            onLayout={layoutCheck}
            // numberOfLines={expanded ? undefined : 2}
            >
                {post.title}
            </Text>
           <CustomButton />
        </View>
        { isExpandable ? 
        <Pressable style={
            {
                backgroundColor: '#6206d4',
                width: 60,
                padding: 5,
                borderRadius: 4, marginTop: 10
            }
        }
         >
            <Text style={{
                color: 'white',
                textAlign: 'center'
            }} >
                { expanded ? "Collapse" : "Expand" }
            </Text>
        </Pressable>
            
        : <View></View>}
      </View>
}

const CustomButton = () => {

    return <Pressable style={{
        backgroundColor: 'black',
        width: 75,
        padding: 7,
        borderRadius: 10,
        height: 40,
        display: 'flex',
        justifyContent: 'center'
    }} >
        
            <Text style={{
                color: 'white',
                textAlign: 'center',
                textAlignVertical: 'center'
            }} >
                Click me
            </Text>
    </Pressable>

}