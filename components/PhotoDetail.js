import React from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  ActivityIndicator
} from "react-native"

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window")

export default class PhotoDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageLoaded: false
    }
  }

  render() {
    return (
      <SafeAreaView>
        <ActivityIndicator
          animating={!this.state.imageLoaded}
          size="large"
          style={{ position: "absolute", marginTop: 200, alignSelf: "center" }}
        />
        <Image
          source={{
            uri: `https://unsplash.it/${deviceWidth}?image=${this.props.navigation.getParam(
              "index"
            )}`
          }}
          style={{ width: deviceWidth, height: deviceWidth }}
          onLoad={() => this.setState({ imageLoaded: true })}
        />
      </SafeAreaView>
    )
  }
}
