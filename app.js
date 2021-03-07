const express = require('express')
const app = express()
const https = require('https')

app.get('/',function(req,res){
  res.json({title: 'hello world'})
})

app.get('/user',function(req,res){
  const pnum = req.query.pnum;
  res.json({firstName: 'John', lastNme: 'Doe', age:33, 'userID ':pnum})
  // res.json('user ' + req.params.id)
})

app.get('/query',function(req,res){
  const ndcCode = req.query.ndc;
  // const nameId = req.query.nameid;
  // console.log('nameiD = ' + nameId);
  
  const api_url = 'https://api.fda.gov/drug/ndc.json?search=packaging.package_ndc:' + ndcCode;
  https.get(api_url,resp => {
    data = '';
    resp.on('data',chunk => {
      data += chunk;
    });

    resp.on('end',() =>{
      const returnedData = JSON.parse(data);
      if(returnedData.hasOwnProperty('error')){
        console.log('there was an error')
        res.json({'error' : 'ndcCode ' + ndcCode + ' not found!'});
      }
      else{
        presponse = returnedData.results;
        res.json(presponse)
        console.log(presponse);
      }
    });

  })
  .on('error',err => {
    console.log('Error: ' + err.message);
    res.json(err.message);
  });
})

app.listen(3000,function(){
  console.log('Example app listening on port 3000!')
})
