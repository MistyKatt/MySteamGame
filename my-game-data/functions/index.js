var functions = require('firebase-functions');
var admin =require('firebase-admin');
var express = require('express')
var axios = require('axios')
var app = express();
var cors = require('cors');
var crawler = require('crawler');

admin.initializeApp(functions.config().firebase);

app.use(cors())

app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  
    if (req.method === 'OPTIONS') {
      res.send(200); /让options请求快速返回/
    }
    else {
      next();
    }
  });

  app.get('/searchid/:appname',(req,res)=>{
    var appname =new String(req.params["appname"].replace(' ','+'));
    //appname = appname.toLowerCase();
    var c = new crawler({
      maxConnections : 1,
      rateLimit:1000,
      callback : function (error, response, done) {
          if(error)
          {
              console.log(error);
              res.send("error")
          }
          else
          {
            try
            {
              let success = false;
              var $ = response.$;
              let trs = $("tbody tr")
              const keys = Object.keys(trs);
              keys.every(k=>{
                const tr = trs[k]
                if(tr.type === 'tag'&&tr.name === 'tr')
                {
                  let id = tr.children[1].children[0].children[0].data;
                  let type = tr.children[3].children[0].data;
                  //let name = new String(tr.children[5].children[0].data.replace(' ',''));
                  //name = name.toLowerCase();
                  if(type === "Game")
                  {
                    success = true;
                    res.send(id)
                    return false;
                  }
                  return true;
                }
              })
              if(!success){
                res.send("!match")
              }
              return
            }
            catch(err)
            {
              res.send("error")
            }
            
          }
          done();
          return
      }
  });
  c.queue("https://steamdb.info/search/?a=app&q="+appname)
  
})

  app.get('/players/:appid',(req, res) =>{
    
    var id = req.params["appid"]
    axios.get("https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?format=json&appid="+id).then(response=>{
        res.send(response.data)
        return;
    }).catch(err=>{
        res.sendStatus(404)
        return;
    })
 
});

app.get('/featured',(req, res) =>{
  axios.get("http://store.steampowered.com/api/featured/").then(response=>{
      res.send(response.data)
      return;
  }).catch(err=>{
      res.sendStatus(404)
      return;
  })

});

app.get('/iframe',(req, res) =>{
  const src =  req.query.src
  axios.get(src).then(response=>{
      res.send(response.data)
      return;
  }).catch(err=>{
      res.send(404,"<p>sorry, the target site doesn't response</p>")
      return;
  })

});

app.get('/:appid', (req, res)=> {
    
    var id = req.params["appid"]
    axios.get("http://store.steampowered.com/api/appdetails/?appids="+id).then(response=>{
        res.send(response.data)
        return;
    }).catch(err=>{
        res.sendStatus(404)
        return;
    })
 
});



exports.webApi = functions.https.onRequest(app);