const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE_LOCAL;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful!!!');
  });

//starting the server
const app = require('./app');

const port = 3000 || process.env.port;
app.listen(port, () => {
  console.log(`Natours is running on ${port}`);
});
