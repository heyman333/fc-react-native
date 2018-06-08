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
  FlatList
} from "react-native"
import { CheckBox } from "react-native-elements"

const COMPLETE = "COMPLETE"
const ACTIVE = "ACTIVE"

type Props = {}
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      todoList: [
        { title: "앱만들기", status: ACTIVE },
        { title: "앱만들기2", status: ACTIVE },
        { title: "앱만들기3", status: ACTIVE },
        { title: "앱만들기4", status: ACTIVE }
      ]
    }
  }

  _renderItem = ({ item, index }) => (
    <View style={[styles.listView, { backgroundColor: index % 2 == 0 ? "grey" : "white" }]}>
      <CheckBox
        checkedTitle={"완료"}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={false}
        containerStyle={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
          borderWidth: 0
        }}
      />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  )

  render() {
    const { todoList } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <TextInput style={styles.textInput} placeholder={"add a new Task"} />
            <TouchableOpacity style={styles.addButton}>
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
            <Text style={styles.textButton}>All</Text>
            <Text style={styles.textButton}>Complete</Text>
            <Text style={styles.textButton}>Active</Text>
          </View>
        </View>
        <View style={styles.contents}>
          <FlatList
            data={todoList}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => item.title}
          />
        </View>
      </View>
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
    backgroundColor: "skyblue"
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
