var express = require('express');
var axios = require('axios')
var app = express();
var cors = require('cors')

app.use(cors())
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  
    if (req.method == 'OPTIONS') {
      res.send(200); /让options请求快速返回/
    }
    else {
      next();
    }
  });

app.get('/players/:appid',(req, res) =>{
    
    var id = req.params["appid"]
    axios.get("https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?format=json&appid="+id).then(response=>{
        res.send(response.data)
    }).catch(err=>{
        res.sendStatus(404)
    })
 
});

app.get('/featured',(req, res) =>{
  axios.get("http://store.steampowered.com/api/featured/").then(response=>{
    console.log(response.data)
      res.send(response.data)
  }).catch(err=>{
      res.sendStatus(404)
  })

});

app.get('/:appid', (req, res)=> {
    
    var id = req.params["appid"]
    axios.get("http://store.steampowered.com/api/appdetails/?appids="+id).then(response=>{
        res.send(response.data)
    }).catch(err=>{
        res.sendStatus(404)
    })
 
});



app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});