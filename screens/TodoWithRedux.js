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
  Button,
  TouchableWithoutFeedback,
  Alert
} from "react-native"
import { CheckBox } from "react-native-elements"
import { connect } from "react-redux"
import { toggleTodo, addTodo, setVisibilityFilter, removeTodo } from "../actions"
import { VisibilityFilters } from "../actions/actionTypes"

class TodoWithRedux extends Component {
  static navigationOptions = {
    title: "TodoWithRedux"
  }

  constructor(props) {
    super(props)
    this.state = {
      todoText: ""
    }
  }

  componentDidMount() {}

  _addTodo = () => {
    const { todoText } = this.state
    this.props.addTodo(todoText)
    this.textInput.clear()
  }

  _toggleTodo = index => {
    this.props.toggleTodo(index)
  }

  _onlongPress = id => {
    Alert.alert("삭제", "해당 목록을 삭제 할까요?", [
      { text: "네", onPress: () => this.props.removeTodo(id) },
      { text: "아니오" }
    ])
  }

  _renderItems = ({ item, index }) => (
    <TouchableWithoutFeedback onLongPress={() => this._onlongPress(item.id)}>
      <View style={styles.row}>
        <Text>{item.text}</Text>
        <CheckBox
          center
          title="완료"
          iconRight
          checkedIcon="check"
          uncheckedIcon="check"
          checkedColor="red"
          checked={item.completed}
          onPress={() => this._toggleTodo(item.id)}
        />
      </View>
    </TouchableWithoutFeedback>
  )

  _setVisibility = filter => {
    this.props.setVisibiityFilter(filter)
  }

  render() {
    console.log("props", this.props)
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.textInputView}>
          <View
            style={{ flexDirection: "row", flex: 1, alignItems: "center", paddingHorizontal: 30 }}
          >
            <TextInput
              ref={ref => (this.textInput = ref)}
              style={styles.textInput}
              onChangeText={text => this.setState({ todoText: text })}
              value={this.state.todoText}
            />
            <Button style={styles.button} title="입력" onPress={this._addTodo} />
          </View>
        </View>
        <View style={styles.titleSection}>
          <Text
            style={[
              styles.text,
              {
                fontWeight:
                  this.props.visibilityFilter === VisibilityFilters.SHOW_ALL ? "600" : "300"
              }
            ]}
            onPress={() => this._setVisibility(VisibilityFilters.SHOW_ALL)}
          >
            ALL
          </Text>
          <Text
            style={[
              styles.text,
              {
                fontWeight:
                  this.props.visibilityFilter === VisibilityFilters.SHOW_ACTIVE ? "600" : "300"
              }
            ]}
            onPress={() => this._setVisibility(VisibilityFilters.SHOW_ACTIVE)}
          >
            TODO
          </Text>
          <Text
            style={[
              styles.text,
              {
                fontWeight:
                  this.props.visibilityFilter === VisibilityFilters.SHOW_COMPLETED ? "600" : "300"
              }
            ]}
            onPress={() => this._setVisibility(VisibilityFilters.SHOW_COMPLETED)}
          >
            COMPLETE
          </Text>
        </View>
        <View style={styles.body}>
          <FlatList
            data={this.props.todos}
            renderItem={this._renderItems}
            contentContainerStyle={styles.tableContainer}
            keyExtractor={(_, index) => index.toString()}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1.4, backgroundColor: "rgba(49,49,49,0.3)" }} />
            )}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textInputView: {
    flex: 1,
    borderBottomColor: "rgb(49,49,49)",
    borderBottomWidth: 1
  },
  textInput: {
    flex: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: "grey"
  },
  button: {
    flex: 1
  },
  body: {
    flex: 5
  },
  row: {
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  tableContainer: {
    paddingHorizontal: 20
  },
  titleSection: {
    flex: 0.4,
    backgroundColor: "rgba(49,49,49,0.2)",
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    marginHorizontal: 5
  }
})

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    default:
      throw new Error("Unknown filter: " + filter)
  }
}

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todo, state.visibilityFilter),
  visibilityFilter: state.visibilityFilter
})

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id)),
  addTodo: text => dispatch(addTodo(text)),
  removeTodo: id => dispatch(removeTodo(id)),
  setVisibiityFilter: filter => dispatch(setVisibilityFilter(filter))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoWithRedux)
