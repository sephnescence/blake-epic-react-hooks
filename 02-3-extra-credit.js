// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {useEffect, useState} from 'react'

// Extra Credit 3 - we can create our own custom hook, which is intended to be a function
// which calls other hooks, apparently. As such, React has an eslint rule that ensures our
// custom hooks begin with "use", otherwise you'd get this lint error - react-hooks/rules-of-hooks
const useLocalStorageState = (key, defaultValue = '') => {
  const [localState, setLocalState] = useState(
    () => window.localStorage.getItem(key) ?? defaultValue,
  )

  useEffect(() => {
    window.localStorage.setItem(key, localState)
  }, [key, localState])

  return [localState, setLocalState]
}

function Greeting({defaultValue = ''}) {
  const [name, setName] = useLocalStorageState('name', defaultValue)

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
  return <Greeting defaultValue="Blake" />
}

export default App
