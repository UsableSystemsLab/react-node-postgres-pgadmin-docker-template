const express = require('express')
const app = express()
const port = process.env.API_SERVER_PORT || 4000

console.log('For health check Send an HTTP GET request at /health');
// Keep the health check endpoint as it is used for monitoring
// and keeping the container alive
app.get('/health', (req, res) => {
    res.sendStatus(200)
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})