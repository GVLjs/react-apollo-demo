import { gql, graphql } from "react-apollo"

// fetch todos

export const todosQuery = gql`
  query {
    todos {
      id
      title
      completed
    }
  }
`

export const withTodos = graphql(todosQuery, {
  props: ({ data }) => ({
    loading: data.loading,
    error: data.error,
    todos: data.todos,
  }),
})

export const TodosQuery = withTodos(props => {
  const { loading, error, todos, render } = props
  return render({ loading, error, todos })
})
