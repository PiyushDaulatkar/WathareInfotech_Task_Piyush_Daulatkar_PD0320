const express = require('express')
const app = express()

app.get("/api", (req, resp) => {
    resp.json({"users": ["one","two","three"]})
})

app.listen(5000, () => {console.log("Server started on port 5000")})