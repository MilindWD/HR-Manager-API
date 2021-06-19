const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`mongodb+srv://hwhcs:Wellness@68@cluster0.y1ego.mongodb.net/hr-manager?retryWrites=true&w=majority`, {
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