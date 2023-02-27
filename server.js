//Importation express et configure dotenv 
const mongoose=require('mongoose');
const express=require('express');
const { config } = require('dotenv');
require('dotenv').config({path: './config/.env'});
const PORT = process.env.PORT||3000;
const User = require('./models/User');
const app = express();
app.use(express.json());

// //Connexion à la base de donnée
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB Atlas réussie !'))
  .catch(() => console.log('Connexion à MongoDB Atlas échouée !'));


  //Création de 4 routes


  //Retourner tous les utilisateurs avec la methode Get
  app.get('/users', async(req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message
  })
    }})


// ajout d'une nouvelle utilisateur à la base de donnée avec la methode Post
app.post('/users', async (req, res) => {
  const { name, email, password, telephone} = req.body;
  
  try {
  const user = new User({ name, email, password, telephone});
  const newUser = await user.save();
  res.status(201).json(newUser);
  } catch (err) {
  res.status(400).json({ message: err.message });
  }
  });


//modifier un utilisateur avec la methode Put
app.put('/users/:id', async (req, res) => {
  const { name, email, password, telephone} = req.body;
  const { id } = req.params;
  
  try {
  const user = await User.findByIdAndUpdate(id, { name, email, password, telephone}, { new: true });
  res.json(user);
  } catch (err) {
  res.status(400).json({ message: err.message });
  }
  });


//Supprimer un utilisateur avec la methode DELETE
app.delete('/users/:id', async (req, res) => {
const { id } = req.params;

try {
const user = await User.findByIdAndDelete(id);
res.json(user);
} catch (err) {
res.status(400).json({ message: err.message });
}
});


app.delete('/users/delete/:id', async (req, res) => {
  try {
      await User.findByIdAndDelete(req.params.id)
      res.send("user successfully deleted")
  } catch (error) {
      alert("Delete request error")
  }
})

app.listen(PORT, () => {
  console.log('Server started');
});
