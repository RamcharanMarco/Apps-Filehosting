const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const fs = require('fs')

app.set('views', path.join(__dirname, 'portfolios'))
app.set('view engine', 'ejs')

let links = [
  {title: 'facebook', link:'https://google.com'},
  {title: 'youtube', link:'https://google.com'},
  {title: 'instagram', link:'https://google.com'}
]

router.get('/:id/portfolio',function(req,res){
  const {id} = req.params
  if(id === '1'){
    res.render('layout1', {id:id,age:23, location:'south africa',name:'marco', surname:'ramcharan',users:['fgsd', 'QRAE', 'wrQR'],links})
    //__dirname : It will resolve to your project folder.
  }else{
    res.render('404', {id:id})
  }

});
 
 
//add the router
app.use('/', router);
app.listen(process.env.port || 3000);
 