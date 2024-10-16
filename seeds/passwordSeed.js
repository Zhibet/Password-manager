const mongoose = require('mongoose');

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/password-manager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

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
