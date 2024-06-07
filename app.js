const express = require('express')
const app = express()
const port = 3001
// Get the client
const mysql = require('mysql2/promise');
const session = require('express-session')
const cors = require('cors')

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

 // Create the connection to database
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'login',
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/login',async (req, res) => {
  const datos = req.query;
  // A simple SELECT query  
  try {
    const [results, fields] = await connection.query(
      "SELECT * FROM `usuarios` WHERE `Usuario` = ? AND `Contraseña` = ? "  ,
      [datos.usuario,datos.clave]
     
    );

    if (results.length > 0){
      res.status(200).send("Inicico de sesion correcto")
    } else{
      res.status(401).send("Inicico de sesion incorrecto")
    }

    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
  }

  
})

app.get('/validar', (req,res)=> {
 
}) 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})