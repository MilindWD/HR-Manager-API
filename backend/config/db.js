const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`mongodb+srv://taskapp:qwerty@123@cluster0.ghhdp.mongodb.net/hr-manager?retryWrites=true`, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`)
    }
}

module.exports = connectDB;