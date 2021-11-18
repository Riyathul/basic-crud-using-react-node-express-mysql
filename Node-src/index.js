const db = require('./src/mysql-connector')
const express = require('express')
const mysql = require('mysql');
const app = express()
const port = 4000

// Start and listen in port
app.listen(port, () => {
  console.log(`Application running at http://localhost:${port}`)
})

// For CORS policy
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
// Middleware to handle JSON request data
app.use(express.json());
// Middleware to handle URL encoded form data
app.use(
  express.urlencoded({ extended: true })
)
//get all products
app.get('/getProducts', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  db.fetchRecords('SELECT * FROM PRODUCT').then(data => {
    res.send(data);
  }).catch(err => {
    res.send({ status: 'error', message: err.message });
  })
})
// get products by id
app.get('/getProductById/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  db.fetchRecords('SELECT * FROM PRODUCT WHERE id = ' + mysql.escape(req.params.id)).then(data => {
    res.send(data);
  }).catch(err => {
    res.send({ status: 'error', message: err.message });
  })
})

//add new product
app.post('/addProduct', (req, res) => {
  var requestBody = req.body;
  res.setHeader('Content-Type', 'application/json');
  db.fetchRecords('SELECT MAX(id) as lastId FROM PRODUCT').then(data => {
    requestBody['id'] = data[0].lastId + 1;
    requestBody['created_on'] = new Date();
    db.addRecords('INSERT INTO PRODUCT SET ?', requestBody).then(data => {
      res.send({ status: 'success' });
    }).catch(err => {
      res.send({ status: 'error', message: err.message });
    })
  }).catch(err => {
    res.send({ status: 'error', message: err.message });
  })
})


//update product by id
app.put('/updateProduct', (req, res) => {
  /* One of the way to get request json without using middlewares
    var jsonString = '';
    var requestBody = {};
    req.on('data', function (data) {
      jsonString += data;
    });

    req.on('end', function () {
      requestBody = JSON.parse(jsonString);
    });
  */
  var requestBody = req.body;
  res.setHeader('Content-Type', 'application/json');
  let obj = { name: requestBody['name'], price: requestBody['price'], created_on: new Date(requestBody['created_on']) }
  db.updateRecords('UPDATE PRODUCT SET ? WHERE ?', obj, { id: requestBody['id'] }).then(data => {
    res.send({ status: 'success' });
  }).catch(err => {
    res.send({ status: 'error', message: err.message });
  })
})

// delete product by id
app.delete('/deleteProduct/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  db.deleteRecord('DELETE FROM PRODUCT WHERE ?', { id: req.params.id }).then(data => {
    res.send({ status: 'success' });
  }).catch(err => {
    res.send({ status: 'error', message: err.message });
  })
})