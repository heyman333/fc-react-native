import React from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import { createStackNavigator } from "react-navigation"
import Todo from "./screens/Todo"
import Contract from "./screens/Contract"
import Gallery from "./screens/Gallery"
import uuid from "uuid"

const LESSONS = [
  { id: uuid(), title: "Todo" },
  { id: uuid(), title: "Contract" },
  { id: uuid(), title: "Gallery" }
]

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  }
  _renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate(item.title)}
      style={styles.tablerow}
    >
      <Text>{item.title}</Text>
    </TouchableOpacity>
  )

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          data={LESSONS}
          keyExtractor={(item, index) => item.id}
          renderItem={this._renderItem}
          ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "black" }} />}
        />
      </View>
    )
  }
}

export default createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Todo: {
    screen: Todo
  },
  Contract: {
    screen: Contract
  },
  Gallery: {
    screen: Gallery
  }
})

const styles = StyleSheet.create({
  tablerow: {
    padding: 30
  }
})
