import { useState } from 'react'
import './App.css'
import Tracker from './Tracker'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Tracker/>
  )
}

export default App
