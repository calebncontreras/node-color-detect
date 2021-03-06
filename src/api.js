import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt-nodejs';
import knex from 'knex';
import * as image from './controllers/image';
import * as signin from './controllers/signin';
import * as register from './controllers/register';
const app = express();

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
});

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('get/ working');
  // db.select('*')
  //   .from('users')
  //   .then((users) => {
  //     res.send(users);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.send('something went wrong');
  //   });
});

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post('/image', (req, res) => {
  image.handleApiCall(req, res, db);
});

app.put('/imageSuccess', (req, res) => {
  image.handleImageSuccess(req, res, db);
});

app.get('/profile/:userId', (req, res) => {
  database.users.forEach((user) => {
    if (user.id === req.params.userId) {
      return res.json(user);
    }
  });
  // res.json('no user')
});

app.listen(process.env.PORT || 3000, () =>
  console.log('node-color-detect app running on port 3000!')
);
