import React from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import { createStackNavigator, StackNavigator } from "react-navigation"
import Todo from "./screens/Todo"
import Contract from "./screens/Contract"
import Gallery from "./screens/Gallery"
import CounterWithRedux from "./screens/CounterWithRedux"
import TodoWithRedux from "./screens/TodoWithRedux"
import Animation from "./screens/Animation"
import PhotoDetail from "./components/PhotoDetail"
import uuid from "uuid"
import { Provider } from "react-redux"
import configureStore from "./store/configureStore"
import { PersistGate } from "redux-persist/integration/react"

const LESSONS = [
  { id: uuid(), title: "Todo" },
  { id: uuid(), title: "Contract" },
  { id: uuid(), title: "Gallery" },
  { id: uuid(), title: "CounterWithRedux" },
  { id: uuid(), title: "TodoWithRedux" },
  { id: uuid(), title: "Animation" }
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
      <Text style={styles.lessonText}>{item.title}</Text>
    </TouchableOpacity>
  )

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <FlatList
          style={{ flex: 1 }}
          data={LESSONS}
          keyExtractor={(item, index) => item.id}
          renderItem={this._renderItem}
          ItemSeparatorComponent={() => (
            <View
              style={{ height: 1, backgroundColor: "rgba(49,49,49,0.5)", marginHorizontal: 10 }}
            />
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tablerow: {
    padding: 30
  },
  lessonText: {
    fontSize: 18,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "black"
  }
})

const MainStack = StackNavigator({
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
  },
  CounterWithRedux: {
    screen: CounterWithRedux
  },
  TodoWithRedux: {
    screen: TodoWithRedux
  },
  Animation: {
    screen: Animation
  }
})

const AppNavi = createStackNavigator(
  {
    Main: {
      screen: MainStack
    },
    PhotoDetail: {
      screen: PhotoDetail
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
)

const { store, persistor } = configureStore()

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavi />
        </PersistGate>
      </Provider>
    )
  }
}
