import React from 'react'

const ListContext = React.createContext({
  myList: [],
  addList: () => {},
})

export default ListContext
