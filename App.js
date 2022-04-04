

import axios from 'axios'
import { useState } from 'react'

function App() {
  const [OGLink, setOGLink] = useState("")
  const [URLString, setURLString] = useState("")



  const handleAgeRequest = async (e) => {
    e.preventDefault()
    const body = {
      name: OGLink
    }
    const response = await axios.post("http://localhost:4000/shortenLink", body)
    const data = response.data
    console.log(data)
    setURLString(`The link you input (${OGLink}) has been shortened to (${data.shortenedLink}), Enjoy!`)
  }

  return (
    <>
      <form onSubmit={handleAgeRequest}>
        <input type="url" onChange={(e) => setOGLink(e.target.value)} placeholder="Enter your name to determine your age" />
        <input type="submit" />
      </form>
      <h3>{URLString}</h3>
    </>
  );
}

export default App;