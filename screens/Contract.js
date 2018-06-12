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
  SectionList,
  ActivityIndicator,
  Dimensions
} from "react-native"
import { CheckBox } from "react-native-elements"
import ContactsList from "../contacts"
import ResponsiveImage from "react-native-responsive-image"

const { width, height } = Dimensions.get("window")

export default class Contacts extends Component {
  static navigationOptions = {
    title: "Contacts"
  }
  constructor(props) {
    super(props)
    this.state = {
      sections: []
    }
  }

  componentDidMount() {
    this._fetchData(1)
  }

  _fetchData = async page => {
    const uri = "https://randomuser.me/api/"
    const response = await fetch(`${uri}?page=${page}&results=${25}`)
    const jsondata = await response.json()
    console.log("datas", jsondata.results)
    this._generateSections(jsondata.results)
  }

  _generateSections = results => {
    const sections = results
      .reduce((prev, item) => {
        const index = prev.findIndex(({ title }) => title === item.name.first.charAt(0))
        if (index >= 0) {
          prev[index].data.push(item)
        } else {
          prev.push({
            title: item.name.first.charAt(0),
            data: [item]
          })
        }
        return prev
      }, [])
      .sort((a, b) => {
        const nameA = a.title
        const nameB = b.title
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        // 이름이 같을 경우
        return 0
      })

    this.setState({ sections })
  }

  renderItem = ({ item, index, section }) => {
    return (
      <View style={styles.item}>
        <ResponsiveImage
          source={{ uri: item.picture.thumbnail }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
          borderRadius={25}
        />
        <View style={{ paddingLeft: 10 }}>
          <Text>Name: {`${item.name.first} ${item.name.last}`}</Text>
          <Text>E-mail: {item.email}</Text>
        </View>
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
    return (
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={sections}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeperator}
          renderSectionHeader={this.renderSectionHeader}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <ActivityIndicator size="small" animating={true} style={{ height }} />
          )}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  seperator: {
    backgroundColor: "black",
    height: 2
  },
  sectionContainer: {
    paddingVertical: 10,
    paddingLeft: 10,
    backgroundColor: "#63b295"
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  sectionHeaderText: {
    fontFamily: "AppleSDGothicNeo-Regular",
    fontSize: 20,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "white",
    paddingLeft: 10
  }
})
