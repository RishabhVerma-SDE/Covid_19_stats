require("dotenv").config();
const authenticate = require("../middleware/authenticate");
const User = require("../model/Users");
const jwt = require("jsonwebtoken");

const user = (app, path) => {
  let routePath = `/${path}`;

  app.post(routePath + "/register", async (req, res) => {
    try {
      const user = new User(req.body);

      await user.save();

      const token = jwt.sign(
        {
          _id: user._id.toString(),
          username: user?.username,
        },
        process.env.JWTSECRET
      );

      res.status(201).send({
        user,
        token,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.post(routePath + "/register-with-auth", async (req, res) => {
    try {
      const { username } = req.body;

      const user = await User.findOne({ username });

      if (!user) {
        const userN = new User(req.body);

        await userN.save();

        const token = jwt.sign(
          {
            _id: userN._id.toString(),
            username: userN?.username,
          },
          process.env.JWTSECRET
        );

        res.status(201).send({
          user: userN,
          token,
        });
      } else {
        const token = jwt.sign(
          {
            _id: user._id.toString(),
            username: user?.username,
          },
          process.env.JWTSECRET
        );

        res.send({
          user,
          token,
        });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.post(routePath + "/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });

      if (!user) {
        throw new Error("Invalid login credentials");
      }

      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        throw new Error("Invalid login credentials");
      }

      const token = jwt.sign(
        {
          _id: user._id.toString(),
          username: user?.username,
        },
        process.env.JWTSECRET
      );

      res.send({
        user,
        token,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.post(routePath + "/logout", authenticate, async (req, res) => {
    try {
      res.send({
        token: null,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });
};

module.exports = user;
