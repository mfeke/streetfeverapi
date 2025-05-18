// const bodyParser = require("body-parser")
const express = require("express")
const app = express()
// const cors = require("cors")
// const userRouter = require("./routes/user.route")
// const categoryRouter = require("./routes/category.route")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));



app.get("/", (req, res) => {
  res.json({ info: "Server Online" })
})
const PORT = 2022
// Cross Orign Resource sharing


app.use(cors());

const db = require("./models");
db.mongoose.set('strictQuery', true);

//  db.mongoose
//    .connect(db.url, {
//      useNewUrlParser: true,
//      useUnifiedTopology: true
//    })
//    .then(() => {
//      console.log("Connected to the database!");
//    })
//    .catch(err => {
//      console.log("Cannot connect to the database!", err);
//      process.exit();
//    });

//    app.use('/api/auth', userRouter)
//       app.use('/api/app', categoryRouter)


app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`)
}) 