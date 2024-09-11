import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CelebrityAccordion from './components/CelebrityAccordion'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CelebrityAccordion/>
    </>
  )
}

export default App
