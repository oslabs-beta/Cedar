const path = require('path')
const express = require('express');

// ~~~~~~~~~~~~~~~~~~~~~SERVER SET UP~~~~~~~~~~~~~~~~~~~~~ //
const app = express();
const PORT = 3000;

// ~~~~~~~~~~~~~~~~~~~~~REQUIRE ROUTERS~~~~~~~~~~~~~~~~~~~~~ //

// ~~~~~~~~~~~~~~~~~~~~~PARSE REQUESTS~~~~~~~~~~~~~~~~~~~~~ //
app.use(express.json());

// ~~~~~~~~~~~~~~~~~~~~~STATIC FILES~~~~~~~~~~~~~~~~~~~~~ //
app.use(express.static(path.join(__dirname, '../')))

// ~~~~~~~~~~~~~~~~~~~~~ROUTES FOR ROUTERS~~~~~~~~~~~~~~~~~~~~~ //

// ~~~~~~~~~~~~~~~~~~~~~OTHER ROUTES~~~~~~~~~~~~~~~~~~~~~ //

// ~~~~~~~~~~~~~~~~~~~~~404 & ERROR HANDLING~~~~~~~~~~~~~~~~~~~~~ //
app.use('*', (req, res) => {
  //res.sendStatus(404)
  console.log('404: Client attempted to access an unknown route');
  res.status(404).send('That page does not exist!');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).send(errorObj.message.err);
});

// ~~~~~~~~~~~~~~~~~~~~~TURN ON SERVER~~~~~~~~~~~~~~~~~~~~~ //
app.listen(PORT, () => {
  `Server listening on port ${PORT}`
})