
import './App.css'
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
    const response = await axios.post("/shortenLink", body)
    const data = response.data
    console.log(data)
    setURLString(`The link you input (${OGLink}) has been shortened to (${data.shortenedLink}), Enjoy!`)
  }

  return (
    <>
    <main>
    <title>URL Shortener</title>
    <h1 className='h1'>URL Shortener!</h1>
    <div>
    <h2 className="small_title">To shorten, simply enter any URL that you would wish to be shortened, and the
        shortened URL will be displayed and become available to copy !</h2>
      <form className="App input" onSubmit={handleAgeRequest}>
        <input type="url" onChange={(e) => setOGLink(e.target.value)} placeholder="Enter the URL you would like to be shortened here" />
        <input type="submit" className="idk" value ="Shorten!" />
      </form>
      </div>
      <h3>{URLString}</h3>
      </main>
    </>
  );
}

export default App;