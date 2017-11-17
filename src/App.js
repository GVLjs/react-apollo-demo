import React, { Component } from "react"
import {
  ApolloProvider,
  ApolloClient,
  createNetworkInterface,
} from "react-apollo"
import TodoApp from "./example/TodoApp"

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: "http://localhost:8080/graphql/",
  }),
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <TodoApp />
      </ApolloProvider>
    )
  }
}

export default App
