const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();




 
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'node_crud'
});
 
connection.connect(function(error){
    if(!!error) console.log('notconnected',(error));
    else console.log('Database Connected!');
}); 

//set views file
app.set('views',path.join(__dirname,'views'));
			
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//set views file
app.set('views',path.join(__dirname,'views'));
			
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/',(req,res)=>{
    //res.send('hii')
    let sql ='SELECT * FROM tasktable';
    let query= connection.query(sql,(err,rows)=>{
        
       if(err)throw err; 
       res.render('user_index',{
        tittle:'curd',
        task:rows
    });
    
    });
});
app.post('/save',(req,res)=>{
    let data={taskname: req.body.t};
    let sql1="INSERT INTO tasktable SET ?;"
    let query1=connection.query(sql1,data,(err,results)=>{
         if(err) throw err;
         res.redirect('/');
     });
});
app.get('/edit/:userId',(req, res) => {
    const userId = req.params.userId;
    let sql2 = `Select * from tasktable where id = ${userId}`;
    let query2 = connection.query(sql2,(err, result) => {
        if(err) throw err;
        res.render('user_edit', {
            title : 'edit',
            task : result[0]
        });
    });
});
app.post('/update',(req,res)=>{
    
    const userId = req.body.id;
    let sql2 = "update tasktable  SET taskname='"+req.body.t+"'   where id ="+userId;
    
    let query2=connection.query(sql2,(err,results)=>{
         if(err) throw err;
         res.redirect('/');
     });
});
app.get('/delete/:userId',(req, res) => {
    const userId = req.params.userId;
    let sql3 = `DELETE from tasktable where id = ${userId}`;
    let query3= connection.query(sql3,(err, result) => {
        if(err) throw err;
        res.redirect('/');
    });
});
// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});