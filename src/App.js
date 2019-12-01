import React, { Component } from "react"
import "./App.css"

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listName: undefined,
      searchInput: "",
      timeInput: "",
      todoList: [],
      userInput: "",
    }
  }

  changeTitle = () => {
    let newName = window.prompt("Enter new list name.")
    this.setState({ listName: newName })
  }

  componentDidMount() {
    console.log("component mounted...")
    let listTitle = window.prompt("Enter list title.")
    console.log("new title")
    this.setState({ listName: listTitle })
  }


  deleteFirstItem = () => {
    this.setState({
      todoList: this.state.todoList.slice(1)
    })
  }

  deleteItem = () => {
    let itemIndex = window.prompt("Which item to delete ?")
    // make copy then replace
    let todoCopy = this.state.todoList.slice()
    todoCopy.splice(itemIndex - 1, 1)
    this.setState({todoList: todoCopy})
  }

  deleteList = () => {
    this.setState({
      todoList: []
    })
  }

  deleteSearch = () => {
    this.setState({
      searchInput: "",
      todoList: this.state.todoList.filter(items => !items.item.includes(this.state.searchInput))
    })
  }

  handleItemChange = event => {
    this.setState({ userInput: event.target.value })
  }

  handleTimeChange = event => {
    this.setState({ timeInput: event.target.value })
  }

  handleReverseList = () => {
    this.setState({
      todoList: this.state.todoList.slice().reverse()
    })
  }

  handleSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  handleSubmit = event => {
    console.log("form submitted")
    event.preventDefault()
    this.setState({
      handleSearchInput:"",
      timeInput: "",
      todoList: this.state.todoList.concat({
        item: this.state.userInput,
        time: this.state.timeInput
      }),
      searchInput: "",
      userInput: "",
    })
  }

  random = () => { return Math.random() * (1 - 100) + 1}

  render() {
    return (
      <div>
        <h1 id="list-title">{this.state.listName}</h1>
        <h3>List Items</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleItemChange}
            value={this.state.userInput}
          />
          <h3>Time</h3> 
          <input
            type="time"
            onChange={this.handleTimeChange}
            value={this.state.timeInput}
          />
          <h3>Search</h3>
          <input
            type="text"
            onChange={this.handleSearchInput}
            value={this.state.searchInput}
          />

          <div className="list-btns">
            {/* type button to avoid submit on other onClicks*/}
            <button type="button" onClick={this.deleteList}>Delete</button>
            <button type="button" onClick={this.deleteItem}>Delete Item</button>
            <button type="button" onClick={this.deleteFirstItem}>Delete 1st Item</button>
            <button type="button" onClick={this.deleteSearch}>Delete Search</button>
            <button type="button" onClick={this.handleReverseList}>Reverse List</button>
            <button type="button" onClick={this.changeTitle}>Title</button>
            <input type="submit" value="Submit"></input>
          </div>
        </form>
        <ol id="list-items">
          {this.state.todoList
          .filter(items => items.item.includes(this.state.searchInput))
          .map(items => (
            <li key={this.random()}>
              {items.item} {items.time}
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { todoList: [<Todo />] }
  }
  render() {
    return <>{this.state.todoList}</>
  }
}
export default App
