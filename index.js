const express = require('express');
const app = express();
const cors = require('cors');
const dal = require('./dal');
const path = require('path')
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const admin = require('./admin');
const port = 3001;

// Used to serve static files from public directory

app.use(express.static('public/build'));
app.use(cors());

// Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// create user account
app.post('/account/create/:name/:email/:password', function(req, res){
  dal.create(req.params.name, req.params.email, req.params.password)
    .then(user => {
      res.send(user);
    });
});

// All accounts
app.get('/account/all', (req, res) => {
  try {
    const idToken = req.headers.authorization;
    admin.auth().verifyIdToken(idToken)
      .then(function() {
        dal.all()
          .then(docs => {
            res.send(docs);
          });
      }).catch(function(error){
        console.log('error: ', error)
        res.send('Authentication Fail!')
      })
  } catch (e) {
    res.send('Token error: ' + e.message )
  }
});

// Get one account

app.get('/account/:email', (req, res) => {
  try {
    const idToken = req.headers.authorization;
    admin.auth().verifyIdToken(idToken)
      .then(function() {
        let email = req.params.email
        dal.searchUser(email)
          .then(docs => {
            res.send(docs);
          });
      }).catch(function(error){
        console.log('error: ', error)
        res.send('Authentication Fail!')
      })

  } catch (e) {
    res.send('Token error: ' + e.message )
  }
})

// Update Balance

app.put('/account/update/:email/:balance/:type', (req, res) => {
  try {
    const idToken = req.headers.authorization;
    admin.auth().verifyIdToken(idToken)
      .then(function() {
        let { email, balance, type } = req.params
        dal.updateBalance(email, balance, type)
          .then(docs => {
            res.send(docs);
          });
      }).catch(function(error){
        console.log('error: ', error)
        res.send('Authentication Fail!')
      })
  } catch (e) {
    res.send('Token error: ' + e.message )
  }
})

// Get Transactions of user

app.get('/transactions/:email', (req, res) => {
  try {
    const idToken = req.headers.authorization;
    admin.auth().verifyIdToken(idToken)
      .then(function() {
        let email = req.params.email
        dal.getTransactions(email)
          .then(docs => {
            res.send(docs);
          });
      }).catch(function(error){
        console.log('error: ', error)
        res.send('Authentication Fail!')
      })
  } catch (e) {
    res.send('Token error: ' + e.message )
  }
})

app.delete('/account/delete/:email', (req, res) => {
  try {
      const idToken = req.headers.authorization;
  admin.auth().verifyIdToken(idToken)
    .then(function() {
      let email = req.params.email
      dal.deleteUser(email)
        .then(docs => {
          res.send(docs);
        });
    }).catch(function(error){
      console.log('error: ', error)
      res.send('Authentication Fail!')
    })

  } catch (e) {
    res.send('Token error: ' + e.message )
  }
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/build/index.html'));
})

app.listen(port, () => {
  console.log('Running on port' + port);
})
