const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();




 
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node_crud'
});
 
connection.connect(function(error){
    if(!!error) console.log('notconnected',(error));
    else console.log('Database Connected!');
}); 
app.get('/',(req,res)=>{
    res.send('hii')
});
// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});