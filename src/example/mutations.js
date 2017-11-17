import { gql, graphql } from "react-apollo"
import { todosQuery } from "./queries"

// toggle todo's completed state

export const toggleMutation = gql`
  mutation($id: String!) {
    toggle(id: $id) {
      id
      completed
    }
  }
`

export const withToggle = graphql(toggleMutation, {
  props: ({ mutate, ownProps }) => ({
    toggle: () => mutate({ variables: { id: ownProps.id } }),
  }),
})

// add a todo

export const addMutation = gql`
  mutation($title: String!) {
    add(title: $title) {
      id
      title
      completed
    }
  }
`

export const withAdd = graphql(addMutation, {
  props: ({ mutate }) => ({
    add: title =>
      mutate({
        variables: { title },
        update: (store, result) => {
          const data = store.readQuery({ query: todosQuery })
          data.todos.push(result.data.add)
          store.writeQuery({ query: todosQuery, data })
        },
      }),
  }),
})

// remove a todo

export const destroyMutation = gql`
  mutation($id: String!) {
    destroy(id: $id) {
      id
    }
  }
`

export const withDestroy = graphql(destroyMutation, {
  props: ({ mutate, ownProps }) => ({
    destroy: () =>
      mutate({
        variables: { id: ownProps.id },
        update: (store, result) => {
          const data = store.readQuery({ query: todosQuery })
          const index = data.todos.findIndex(
            d => d.id === result.data.destroy.id
          )
          data.todos.splice(index, 1)
          store.writeQuery({ query: todosQuery, data })
        },
      }),
  }),
})
