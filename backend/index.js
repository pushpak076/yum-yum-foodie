const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = 8080;

//mongodb connection

console.log(process.env.MONGODB_URL);
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

//schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmpassword: String,
  image: String,
});

//
const userModel = mongoose.model("user", userSchema);

//api
app.get("/", (req, res) => {
  res.send("Server is Running");
});

//api sign-up
app.post("/signup", (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  userModel
    .findOne({ email: email })
    .then((result) => {
      console.log("Result is :: ", result);
      if (result) {
        res.send({ message: "E-mail id is already registered", alert: false });
      } else {
        const data = new userModel(req.body);
        const save = data.save();
        res.send({ message: "Successfully registered", alert: true });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//api login
app.post("/login", (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  userModel
    .findOne({ email: email })
    .then((result) => {
      if (result) {
        const dataSend = {
          _id: result._id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          image: result.image,
        };
        console.log(dataSend);
        res.send({
          message: "Sussesfully logged in",
          alert: true,
          data: dataSend,
        });
      } else {
        res.send({ message: "Email-id not registered", alert: false });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// product section
const schemaProduct = new mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  discription: String,
});
const productModel = mongoose.model("product", schemaProduct)

//save product in database
//api
app.post("/uploadProduct", async (req, res) => {
  console.log(req.body);
  const data = new productModel(req.body)
  const dataSave = await data.save()
  res.send({message : "Upload Successfully!."})
})

app.get("/product", async (req, res) => {
  const data = await productModel.find({})
  console.log(data)
  res.send(JSON.stringify(data));
});

app.listen(PORT, () => {
  console.log("Server is Running at port : " + PORT);
});
