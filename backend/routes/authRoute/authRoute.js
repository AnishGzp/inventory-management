import express from "express";

const authRoute = express.Router();

authRoute.post("/newUser", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

export default authRoute;
