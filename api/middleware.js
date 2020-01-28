const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const db = require("../database/db")
const sessionConfig = {
  name: "cookies",
  secret: process.env.SESSION_SECRET || "Sorry, not here",
  cookie: {
      maxAge: 1000 * 60 * 10, 
      secure: false, 
      httpOnly: true,
  },
  resave: false,
  saveUninitialized: true, 
  store: new KnexSessionStore({
      createtable: true,
      clearInterval: 60000,
      knex: db,
      tablename: "user_sessions",
      sidfieldname: "id"
  }),
};

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(session(sessionConfig));
};