const express = require('express'); // Krijon Serverin
const mongoose = require("mongoose"); // Connect me MongoDB 
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Lidhja e mongoose me MongoDB
mongoose.connect("mongodb://127.0.0.1/updatethis")
    .then(() => console.log("Gjithcka ka shku ne rregull"))
    .catch((err) => console.log(err));

// Krijimi i Schemes dhe Modelit
const userSchema = new mongoose.Schema({
    name: String,
});

// Modeli
const User = mongoose.model("User", userSchema);

// CRUD API

// 127.0.0.1/add-name - POST

app.post("/add-name", async (req,res) => {
    try {
        const {name} = req.body;

        if(!name) {
            return res.status(400).json({ message: "E ke harru emrin Legjend" });
         }
         const newUser = new User({ name });
         await newUser.save();

            res.json({ message: "Emri u ruajt me sukses" });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});


// API Me rujt Mbiemrin
    
// PUT osht Update
// Per oren tjeter te vazhdohet Update API me poshte.

// 127.0.0.1:3000/update-name/69e65900275a86c133ea28e5
app.put("/update-name/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if(!name) {
            return res.status(400).json({ message: "Ti ke shkru dicka tjeter prej asaj qe na kemi kerku"});
        }

        // findByIdAndUpdate
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name }, // Qekjo qetu eshte emri aktual qe e ka aj
            { new: true } // Qekjo e bon update masanej qat te dhane qe ja dergojme na
        );

        res.json( { message: "Emri u bo update me sukses", user: updatedUser});
    } 
    catch(err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

//Delete api
app.delete("/delete-name/:id", async (req,res) => {
    try {
        const { id } = req.params;

        //findByIdAndDelete
        const deletedUser = await User.findByIdAndDelete(id);

        if(!deletedUser) {
            return res.status(404).json({ message: "Ja ke huq Id"});
        }


        res.json( { message: "Useri u fshi me sukses", user: deletedUser});
    } 
    catch(err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});






// And a mundem me lon per oren tjeter se jom kan qe sa dit smut ne spital e sot jom ardh veq hina me kqyr qa po ndodh ama sjom ne gjendje me punu 