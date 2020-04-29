const express = require('express');

const app = express();


app.listen(333, ()=> console.log("Server is running on 3333"));

app.get('/', (req,res) => {
    return res.send('HELLO WORLD');
})