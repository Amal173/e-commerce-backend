const mongoose = require('mongoose');
const admin = require('./models/adminSchema')
const bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://amalkrstackup:amalkrstackup@projectcluster0.g0x7i3h.mongodb.net/E-Commerce?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})
    .then(() => {
        console.log("Mongo connected");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
const password = "password";


const seedDB = async () => {
    await admin.deleteMany({});
    const hashedPassword = await bcrypt.hash(password, 10); // Await here
    await admin.insertMany([
        {
            username: "Amal",
            password: hashedPassword,
            email: "amalkr2001@gmail.com",
            phonenumber: "9961005288"
        }
    ]);
}
seedDB().then(() => {
    mongoose.connection.close();
})
