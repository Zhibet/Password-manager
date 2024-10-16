require('dotenv').config(); // Load environment variables

const mongoose = require('mongoose');
mongoose.connect(process.env.atlastUrl)  
    .then(() => {
        console.log('The database is live');
        addUser(); 
    })
    .catch(err => console.error('Database connection error:', err));

const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({});

User.plugin(passportLocalMongoose);

const UserModel = mongoose.model('User', User);

async function addUser() {
    try {
        await UserModel.deleteMany({});
        console.log('All users deleted.');

        const user = new UserModel({ username: 'zhibet23' });

        await user.setPassword('Conakry23@');
        
        await user.save();
        console.log('User created successfully:', user);
    } catch (error) {
        console.error('Error creating user:', error);
    } finally {
        mongoose.connection.close();
    }
}