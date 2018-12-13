const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 4000;
var app = express();


hbs.registerPartials(__dirname +'//Views/partials');
app.set('view engine','hbs');



app.use(express.static(__dirname + '/public'));


app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = (`${now}:${req.method} ${req.url}`);
    console.log(log);
    fs.appendFile('server.log',log +'\n',(err)=>{
        if(err)
            {
                console.log('unable to append to server.log')
            }
    });
    next();
});





//app.use((req,res,next)=>{
//    res.render('maintenance.hbs');
//});

hbs.registerHelper('getcurrentYear',() =>{
                   return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text) =>{
                   return text.toUpperCase()
});


app.get('/' , (req , res) => {
    
    res.render('home.hbs',{
        pageTitle : 'Home Page',
        welmessage : 'welcome rushita',
         
    });
  //  res.send('<h1>hello Rushita</h1>');
//    res.send({
//        name : 'Rushita',
//        like : [
//            'Singing',
//            'biking'
//        ]
//    });
});

app.get('/about',(req,res) =>{
    res.render('about.hbs',{
        pageTitle : 'About Page',
       
    });
}); 

app.get('/bad',(req,res) =>{
   res.send({
       errorMessage: 'unable to handle request'
   }) ;
});

app.listen(port,() =>{
    console.log(`Server is up on ${port}`);
});