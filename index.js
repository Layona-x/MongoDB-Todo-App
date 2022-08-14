const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const cookieParser = require("cookie-parser");
const app = express()
let port = 3000;
app.use(cookieParser());

const morgan = require('morgan')
app.set("view engine","ejs")
 app.use(morgan("dev"))
const dbURL = process.env.db;
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(port, () => {
      console.log("mongoDB Bağlantı kuruldu");
    });
  })
  .catch((err) => console.log(err));
app.use(bodyParser.json()).use(
  bodyParser.urlencoded({
    extended: true,
  })
);


let Todos = require('./models/todos.js')

app.get('/',(req,res)=>{
  Todos.find(function(err,results){
     res.render('anasayfa',{todos:results})
  })
})

app.post('/login',(req,res)=>{
  var todo = new Todos({
     title: req.body.title,
     status:"Tamamlanmamış",
     description:req.body.description
  });
  todo.save().then((result) => {
    res.redirect('/')
    });
  })

app.post('/delete/:id',(req,res)=>{
  let id = req.params.id
  Todos.findByIdAndRemove(id).then((Result)=>{
   res.redirect('/')
  });
});

app.get('/edit/:id',(req,res)=>{
  let id = req.params.id
   Todos.findById(id).then((result)=>{
   res.render("edit",{todos:result})
   })
}) 

app.post('/editl/:id',(req,res)=>{
  let id = req.params.id
  Todos.findByIdAndUpdate(id,{
     title: req.body.etitle,
     description: req.body.edescription,
   }).then((xresults)=>{
   res.redirect('/')
})
})
app.post('/finish/:id',(req,res)=>{
  let id = req.params.id
    Todos.findByIdAndUpdate(id,{
      status:"Tamamlandı"
    }).then((result)=>{
     res.redirect('/')
})
})
app.post('/unfinish/:id',(req,res)=>{
  let id = req.params.id
    Todos.findByIdAndUpdate(id,{
      status:"Tamamlanmamış"
    }).then((result)=>{
     res.redirect('/')
})
})