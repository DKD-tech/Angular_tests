// nous allons etablir connection de notre code
const express = require("express"), // utilisation du module express
  //const { default: mongoose } = require('mongoose')
  path = require("path"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  mongoDb = require("./backend/db");

mongoose.Promise = global.Promise;
// Connection à une base de données gerée par le serveur mongodb / structure d'un serur node js interrogeant MongoDB
mongoose
  .connect(mongoDb.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("connection à la base de données avec succès");
    },
    (error) => {
      console.log("une erreur de connection à la base:" + error);
    }
  );
// mettons en place le port et le server ...
const bookRoute = require("./node-backend/controllers/book.routes");
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cors());
//creation d'un path statique
app.use(express.static(path.join(__dirname, 'dist/Bookstore')));
//API root
app.use('/api', bookRoute);
// creation du port
const port = process.env.port || 8000;
app.listen(port, () => {
    console.log("L'ecoute se fait sur le port:" +port);
});
// En cas de soucis
app.use((req,res,next)=>{
    next(createError(404));
});
// Base Route
app.get('/', (req,res)=>{
    res.send('invalid Endpoint');
});
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, 'dist/Bookstore/index.html'));
});
app.use(function(err, req, next){
    console.log(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})