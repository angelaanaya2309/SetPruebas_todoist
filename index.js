const moveFile = require('move-file');
const cypress = require('cypress');
const express = require('express');
const resemble = require('resemblejs');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
let db;
//MongoClient.connect('mongodb+srv://mongouser:w9mlvPJzQOMkmdlj@cluster0-uzowf.mongodb.net/visual_reg_taller', { useNewUrlParser: true }, (err, database) => {
  MongoClient.connect('mongodb+srv://angela:juanda2309@cluster0-4zsxc.mongodb.net/test', { useNewUrlParser: true }, (err, database) => {
if (err) return console.log(err);
  db = database.db('test');
 
});

 app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/view/index.html'));
});

app.get('/runtest', (req, res) => {
  cypress.run({
    spec: './cypress/integration/e2e_todo.spec.js'
  })
  .then((results) => {
    regression(res);
  })
  .catch((err) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({status: 'error'}));
  });
});

app.get('/tests', (req, res) => {
  let cursor = db.collection('test').find().toArray((err, results) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(results));
  });
});

function regression(res) {
  let ini_screen='/cypress/screenshots/e2e_todo.spec.js/Test todoist -- ';

    var img1 = ini_screen+'Próximos 7 días.png'
    //'/cypress/screenshots/e2e_todo.spec.js/Test todoist -- Bandeja de entrada (1).png';
    var img2 = ini_screen+'Próximos 7 días (1).png'
    //'/cypress/screenshots/e2e_todo.spec.js/Test todoist -- Bandeja de entrada.png';
    img1 = path.join(__dirname + img1);
    img2 = path.join(__dirname + img2);
  
    resemble(img1).compareTo(img2).ignoreLess()
    .onComplete((data) => {
      fs.writeFile("./output.png", data.getBuffer(), () => {
        let currTime = new Date().getTime();
        let nImg1 = currTime + ".png";
        let nImg2 = currTime + " (1).png";
        let rImg = currTime + "_result.png";
        let fpth = "./static/results/";
        let fpth2 = "/results/";
        fs.createReadStream(img1).pipe(fs.createWriteStream(fpth + nImg1));
        fs.createReadStream(img2).pipe(fs.createWriteStream(fpth + nImg2));
        fs.createReadStream("./output.png").pipe(fs.createWriteStream(fpth + rImg));
        let results = {
          date: currTime,
          image1: fpth2 + nImg1,
          image2: fpth2 + nImg2,
          resultImage: fpth2 + rImg,
          info: 'Missmatch percentage: ' + data.misMatchPercentage
        }
        saveResults(res, results);
      });
    });
  

}

function saveResults(res, results) {
  db.collection('test').save(results, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');
  })
}
