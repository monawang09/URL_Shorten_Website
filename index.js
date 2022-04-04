const express = require('express')
const app = express()
const port = 4000


const cors = require('cors')
const axios = require('axios').default
const { response } = require('express')


app.use(cors({
  origin: "*"
}))

app.use(express.json())



app.post("/shortenLink", async (req, res) => {
  const body = req.body
  const name = body.name

    
  const response = await axios.get(`https://api.shrtco.de/v2/shorten?url=${name}`)
    //const data = response.data
    .then(response => {
      //console.log(data)
      res.send({
        shortenedLink: response.data.result.short_link
      })
      console.log("Valid Input")
    })
    .catch(error => {
      const errorOutput = {
        message: ""
      }
      const errorCode = error.response.data.error_code
      switch(errorCode){
        case 1:
          errorOutput.message = "No URL specified (url parameter is empty)"
          break;
        case 2:
          errorOutput.message = "Invalid URL submitted"
          break;
        case 3:
          errorOutput.message = "Rate limit reached. Wait a second and try again" 
          break;
        case 4: 
          errorOutput.message = "IP-Address has been blocked because of violating terms of service"
          break;
        case 5:
          errorOutput.message = "shrtcode code (slug) already taken/in use"
          break;
        case 6:
          errorOutput.message = "Unknown Error"
          break;
        case 7: 
          errorOutput.message = "No code specified (code parameter is empty)"
          break;
        case 8:
          errorOutput.message = "Invalid code submitted (code not found/there is no such short-link)"
          break;
        case 9:
          errorOutput.message = "Missing required parameters"
          break;
        case 10:
          errorOutput.message = "Trying to shorten a disallowed link"
          break;
      }
      res.send(errorOutput.message)
      console.log('Invalid Input')
    })

  })
  
  app.listen(port, () => {
    console.log(`listening on port ${port}!`)
  })


  