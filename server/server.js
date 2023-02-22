const express = require('express');
const app = express();
const path = require('path');
const port = 3334;
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.post('/addContact', (req, res) => {
  const body = req.body
  console.log(body)
  const {name, email, address} = req.body
  fs.appendFile('myfile1.txt', `{"name": "${name}", "email": "${email}", "address": "${address}"}\n`, function (err) {
  if (err) throw err;
  console.log('Saved!');
 
});
 res.status(200)
})
app.get('/getContacts', (req, res) => {
  const text = fs.readFileSync("myfile1.txt", "utf-8");
  
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(JSON.stringify(text));
    console.log(text)
    return res.end();
})

app.use(express.static(path.join(__dirname,'../dist')))

app.listen(port, () => {
  console.log(`listening on port ${port}... `);
});

