/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react"
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  SafeAreaView
} from "react-native"
import { CheckBox } from "react-native-elements"
import { all } from "rsvp"

const COMPLETE = "COMPLETE"
const ACTIVE = "ACTIVE"
const ALL = "ALL"
type Props = {}
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.allList = []
    this.index = 0
    this.state = {
      todoList: [],
      mode: ALL,
      text: ""
    }
  }

  componentDidMount() {
    AsyncStorage.getItem("allList").then(allList => {
      if (allList) {
        this.allList = JSON.parse(allList)
      } else {
        this.allList = []
      }
      this.setState({ todoList: this.allList })
    })
  }

  _showAll = () => {
    this.setState({ todoList: this.allList, mode: ALL })
  }

  _showComplete = () => {
    const completeLists = this.allList.filter(list => list.status === COMPLETE)
    this.setState({ todoList: completeLists, mode: COMPLETE })
  }

  _showActive = () => {
    const activeLists = this.allList.filter(list => list.status === ACTIVE)
    this.setState({ todoList: activeLists, mode: ACTIVE })
  }

  _showByMode = () => {
    const { todoList, mode } = this.state
    if (mode == ALL) {
      this._showAll()
    } else if (mode == ACTIVE) {
      this._showActive()
    } else {
      this._showComplete()
    }
  }

  _saveList = () => {
    const { text, mode } = this.state
    const list = Object.assign({}, { title: text, status: ACTIVE })
    this.allList.push(list)
    this.allList = this.allList.map((list, index) => Object.assign({}, list, { index }))
    this.setState({ text: "" })
    this._showByMode()
    AsyncStorage.setItem("allList", JSON.stringify(this.allList))
  }

  _checkList = item => {
    const { todoList, mode } = this.state
    const index = item.index
    if (this.allList[index].status === ACTIVE) {
      this.allList[index].status = COMPLETE
      this._showByMode()
    } else {
      this.allList[index].status = ACTIVE
      this._showByMode()
    }
    AsyncStorage.setItem("allList", JSON.stringify(this.allList))
  }

  _delete = item => {
    const { todoList, mode } = this.state
    const index = item.index
    this.allList.splice(index, 1)
    this.allList = this.allList.map((list, index) => Object.assign({}, list, { index }))
    this._showByMode()
    AsyncStorage.setItem("allList", JSON.stringify(this.allList))
  }

  _renderItem = ({ item, index }) => {
    const { mode } = this.state
    return (
      <View style={[styles.listView, { backgroundColor: index % 2 != 0 ? "grey" : "white" }]}>
        <CheckBox
          onPress={() => this._checkList(item)}
          checkedTitle={"완료"}
          title={"미완료"}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={item.status === COMPLETE}
          containerStyle={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            borderWidth: 0
          }}
        />
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity
          onPress={() => this._delete(item)}
          style={{
            width: 40,
            height: 30,
            borderRadius: 3,
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
            right: 20,
            position: "absolute",
            padding: 5
          }}
        >
          <Text>삭제</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { todoList, text, mode } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.textInputContainer}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <TextInput
              style={styles.textInput}
              placeholder={"add a new Task"}
              onChangeText={text => this.setState({ text })}
              onSubmitEditing={this._saveList}
              value={text}
            />
            <TouchableOpacity style={styles.addButton} onPress={this._saveList}>
              <Text style={styles.addText}>ADD</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 0.5,
              justifyContent: "flex-end",
              alignItems: "center",
              paddingRight: 10
            }}
          >
            <Text
              style={[styles.textButton, { fontWeight: mode === ALL ? "600" : "300" }]}
              onPress={this._showAll}
            >
              All
            </Text>
            <Text
              style={[styles.textButton, { fontWeight: mode === COMPLETE ? "600" : "300" }]}
              onPress={this._showComplete}
            >
              Complete
            </Text>
            <Text
              style={[styles.textButton, { fontWeight: mode === ACTIVE ? "600" : "300" }]}
              onPress={this._showActive}
            >
              Active
            </Text>
          </View>
        </View>
        <View style={styles.contents}>
          <FlatList
            data={todoList}
            renderItem={this._renderItem}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text>NO DATA!</Text>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  textInputContainer: {
    flex: 1
  },
  contents: {
    flex: 4
  },
  textInput: {
    flex: 3,
    backgroundColor: "rgba(49,49,49,0.5)"
  },
  addButton: {
    flex: 1,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center"
  },
  textButton: {
    color: "black",
    fontSize: 13,
    marginHorizontal: 3
  },
  addText: {
    color: "black",
    fontSize: 16
  },
  listView: {
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    color: "black",
    fontSize: 15
  }
})
