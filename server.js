require("dotenv").config()
const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const PORT = process.env.PORT
const cors = require("cors")
const userRouter = require("./routes/user.route")
const productRouter = require("./routes/product.route")
const verifyRouter = require("./routes/verify.route")
const categoryRouter = require("./routes/category.route")



app.use(cors());
app.use(cors({
  origin: '*', // Or specify your Angular dev URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));



app.get("/", (req, res) => {
  res.json({ info: "Server Online" })
})
// Cross Orign Resource sharing




const db = require("./models");
db.mongoose.set('strictQuery', true);

db.mongoose
  .connect(db.url, {
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use('/api/auth', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/product', productRouter)
app.use('/api/verify', verifyRouter)
app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`)
})

module.exports = app;