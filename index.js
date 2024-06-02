const express = require('express')
const app = express() //instancia de express
const PORT = 8000; //puerto
app.listen(PORT, () => console.log("Express listening PORT:"+ PORT))

