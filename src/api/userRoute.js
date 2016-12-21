import express from 'express';

const routes = function () {
  const User = require('../models/userModel');
  const userRouter = express.Router();
  userRouter.route('/users')
    .post((req, res) => {
      const user = new User(req.body);
      user.save();
      res.status(201).send(user);
    })
    .get((req, res) => {
      User.find((err, users) => {
        if (err)
          res.status(500).send(err);
        else
          res.json(users);
      });
    });

    return userRouter;
};

export default routes;
