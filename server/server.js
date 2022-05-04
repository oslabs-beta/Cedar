const path = require('path')
const express = require('express');

// ~~~~~~~~~~~~~~~~~~~~~SERVER SET UP~~~~~~~~~~~~~~~~~~~~~ //
const app = express();
const PORT = 3000;

// ~~~~~~~~~~~~~~~~~~~~~REQUIRE ROUTERS~~~~~~~~~~~~~~~~~~~~~ //
const userRouter = require(path.join(__dirname, './routes/userRouter.js'));
const awsRouter = require(path.join(__dirname, './routes/aws.js'));

// ~~~~~~~~~~~~~~~~~~~~~PARSE REQUESTS~~~~~~~~~~~~~~~~~~~~~ //
app.use(express.json());

// ~~~~~~~~~~~~~~~~~~~~~STATIC FILES~~~~~~~~~~~~~~~~~~~~~ //

// ~~~~~~~~~~~~~~~~~~~~~ROUTES FOR ROUTERS~~~~~~~~~~~~~~~~~~~~~ //
app.use('/api/user', userRouter);
app.use('/api/aws', awsRouter)

// ~~~~~~~~~~~~~~~~~~~~~OTHER ROUTES~~~~~~~~~~~~~~~~~~~~~ //
// Production app entry:
//    serve index.js as static file
//    serve index.html app entry
if(process.env.NODE_ENV === 'production'){
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  })
}

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
  console.log(`Server listening on port ${PORT}`);
});
