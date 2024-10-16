require('dotenv').config(); 

const mongoose = require('mongoose');
mongoose.connect(process.env.atlastUrl).then(()=>{
    console.log('the database is connected to mongoose')
})

// Define the Password schema
const PasswordSchema = new mongoose.Schema({
    website: { type: String, required: true },
    password: { type: String, required: true },
});

// Create the model
const passwordModel = mongoose.model("passModel", PasswordSchema);

// Create a new password document
const newPassword = new passwordModel({
    website: "google",
    password: 'google.com-dads'
});

// Save the new password document
newPassword.save()
    .then(() => {
        console.log('Password saved successfully!');
        mongoose.connection.close(); // Close the connection after saving
    })
    .catch((error) => {
        console.error('Error saving password:', error);
        mongoose.connection.close(); // Close the connection on error
    });
 