import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, TextInput, View } from "react-native";
import ExpenseItem from "./ExpenseItem";

export interface Post {
  userId : number
  id : number
  title : string
  body : string
}


export default function Index() {

  const [count,setCount] = useState(0)


  const incrementCount = () => {
    setCount(count + 1)
  }

  const decrementCount = () => {
    setCount(count - 1)
  }

  const [posts,setPostList] = useState<Post[]>([])


  useEffect(() => {
    
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then((posts : Post[]) => {
          setPostList(posts)
          console.log("Set posts: ",posts.length)
      }).catch(e => console.log("Error recieving posts: ",e))


  },[])


  return (
    <SafeAreaView  >
      <SafeAreaView style={{
        borderWidth: 2,
        margin: 10,
        borderRadius: 15,
        height: '70%'
      }} >
        <Text style={{
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center'
        }} >
          Expenses
        </Text>
        <View style={{
          height: 2,
          backgroundColor: 'gray', marginVertical: 4
        }} >

        </View>
        <FlatList style={{
          height: '100%', 
        }} data={posts} 
        renderItem={item => <ExpenseItem post={item.item}  />}
        keyExtractor={item => item.id.toString()}
        >
      </FlatList>
    </SafeAreaView>
    <View
      style={{
        maxHeight: 100
      }}
    >
      <View style={{
        height: 40,
        backgroundColor: 'blue',
        width: '100%',
        top: 0,
      }} >
        <Text style={{
          color: 'white'
        }} >
          Box
        </Text>
      </View>
      <Text>This is the start page.</Text>
      <Link href='/settings' >Settings</Link>
    </View>
    </SafeAreaView>
  );
}
