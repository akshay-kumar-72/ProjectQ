const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');

require('./auth/google');

const app = express();
app.use(express.json());

app.use(
  cookieSession({ name: 'session', keys: ['key1'], maxAge: 24 * 60 * 60 * 1000 })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/auth', require('./routes/auth'));

app.get('/', (req, res) => res.send('Custom Auth Service Running'));

app.listen(3000, () => console.log('Server on http://localhost:3000'));
