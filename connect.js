// const mongoose = require('mongoose');
// mongoose.set('strictQuery', true);
// const connectDB = async () => {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/url-shortener');
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error('Failed to connect to MongoDB:', err);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/url-shortener', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(' Failed to connect to MongoDB:', err);
        process.exit(1); // Exit process if connection fails
    }
};

module.exports = connectDB; // ✅ Make sure this is a function, not an object!


