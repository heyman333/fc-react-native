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
  Image,
  Dimensions,
  Button
} from "react-native"
import { CheckBox } from "react-native-elements"

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window")

export default class Gallery extends Component {
  static navigationOptions = ({ navigation }) => {
    const editStatus = navigation.getParam("editStatus")
    return {
      headerTitle: "Gallery",
      headerRight: (
        <Button
          onPress={navigation.getParam("rightBtnFunc", () => {})}
          title={editStatus == true ? "Delete" : "Edit"}
        />
      )
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      photos: [],
      refreshing: false,
      edit: false
    }
    this.count = 0
  }

  componentDidMount() {
    this._genArray(this.count)
    this.props.navigation.setParams({
      rightBtnFunc: this._toggleEditMode,
      editStatus: this.state.edit
    })
  }

  _toggleEditMode = () => {
    this.setState({ edit: !this.state.edit }, () =>
      this.props.navigation.setParams({
        editStatus: this.state.edit,
        rightBtnFunc: this._deletePhotos
      })
    )
  }

  _deletePhotos = () => {
    const { photos } = this.state
    const newPhotos = photos.filter(photo => photo.rmChecked == false)

    console.log("deleted", newPhotos)
    this.setState({ photos: newPhotos, edit: !this.state.edit }, () =>
      this.props.navigation.setParams({
        rightBtnFunc: this._toggleEditMode,
        editStatus: this.state.edit
      })
    )
  }

  _genArray = index => {
    //최대 200까지만
    if (index > 3) {
      return
    }
    const start = index * 50
    const end = (index + 1) * 50
    const { photos } = this.state

    const array = []
    for (let i = start; i < end; i++) {
      array.push({ id: i, rmChecked: false })
    }
    console.log("genArr", array)

    const newArr = photos.concat(array)
    this.setState({ photos: newArr })
  }

  _renderItems = ({ item, index }) => {
    const { edit } = this.state
    return (
      <View style={{ padding: 1 }}>
        {edit && (
          <CheckBox
            checked={item.rmChecked}
            containerStyle={{
              position: "absolute",
              zIndex: 100,
              backgroundColor: "transparent",
              borderWidth: 0
            }}
            onPress={() => this._checkRm(index)}
          />
        )}
        <TouchableOpacity onPress={() => this._onPressPhoto(index)}>
          <Image
            source={{ uri: `https://unsplash.it/200/200?image=${item.id}` }}
            style={{ width: deviceWidth / 3 - 2, height: deviceWidth / 3, zIndex: 0 }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  _onPressPhoto = index => {
    this.props.navigation.navigate("PhotoDetail", { index })
  }

  _checkRm = index => {
    const { photos } = this.state
    if (photos[index].rmChecked) {
      photos[index].rmChecked = false
    } else {
      photos[index].rmChecked = true
    }
    console.log("checkPhotos", photos)
    this.setState({ photos })
  }

  _refreshAlbum = () => {
    const { photos } = this.state
    this.setState({ refreshing: true })
    const shuffleArray = photos
      .map(photo => Object.assign({}, photo, { weight: Math.ceil(Math.random() * 10) }))
      .sort((a, b) => {
        if (a.weight < b.weight) {
          return -1
        }
        if (a.weight > b.weight) {
          return 1
        }

        return 0
      })

    this.setState({ photos: shuffleArray, refreshing: false })
  }

  render() {
    const { photos, refreshing } = this.state

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={{ flex: 1 }}
          data={photos}
          refreshing={refreshing}
          onRefresh={() => this._refreshAlbum()}
          renderItem={this._renderItems}
          numColumns={3}
          keyExtractor={(item, index) => item.id}
          onEndReached={() => this._genArray(++this.count)}
          onEndReachedThreshold={0}
        />
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
