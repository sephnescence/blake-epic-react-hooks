// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {useState} from 'react'

// We must provide a default here otherwise we'll get this warning
// A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components
function Greeting({initialName = ''}) {
  const [name, setName] = useState(initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input id="name" onChange={handleChange} value={name} />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Blake" />
}

export default App
