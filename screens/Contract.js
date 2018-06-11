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
  SafeAreaView,
  SectionList
} from "react-native"
import { CheckBox } from "react-native-elements"
import ContactsList from "../contacts"

export default class Contacts extends Component {
  static navigationOptions = {
    title: "Contacts"
  }
  constructor(props) {
    super(props)
    this.state = {
      sections: this.generateSections()
    }
  }

  generateSections = () => {
    return ContactsList.reduce((prev, item) => {
      const index = prev.findIndex(({ title }) => title === item.author.charAt(0))
      if (index >= 0) {
        prev[index].data.push(item)
      } else {
        prev.push({
          title: item.author.charAt(0),
          data: [item]
        })
      }

      return prev
    }, []).sort((a, b) => {
      const nameA = a.category
      const nameB = b.category
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }

      // 이름이 같을 경우
      return 0
    })
  }

  renderItem = ({ item, index, section }) => {
    return (
      <View style={styles.item}>
        <Text>Author: {item.author}</Text>
        <Text>Filename: {item.filename}</Text>
      </View>
    )
  }

  renderSeperator = () => {
    return <View style={styles.seperator} />
  }

  renderSectionHeader = ({ section }) => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
      </View>
    )
  }

  render() {
    const { sections } = this.state
    console.log(sections)
    return (
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={sections}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeperator}
          renderSectionHeader={this.renderSectionHeader}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
