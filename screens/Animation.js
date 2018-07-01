import React, { Component } from "react"
import { View, StyleSheet } from "react-native"

export default class Animation extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <View style={styles.viewContainer} />
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: "white"
  }
})
