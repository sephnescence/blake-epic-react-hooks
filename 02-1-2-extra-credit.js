// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {useEffect} from 'react'

function Greeting({initialName = ''}) {
  // Extra Credit 1 - Apparently this will look at localStorage every time the component refreshes
  // const [name, setName] = React.useState(
  //   window.localStorage.getItem('name') ?? initialName,
  // )
  // But if you pass in a function instead it will only run it "when needed". Not sure when that "when needed" is, however
  const [name, setName] = React.useState(
    () => window.localStorage.getItem('name') ?? initialName,
  )

  useEffect(() => {
    window.localStorage.setItem('name', name)
  }, [name]) // Extra Credit 2 - Note that dependencies will call Object.is, which means you can't put objects in here as it will always refresh

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Blake" />
}

export default App
