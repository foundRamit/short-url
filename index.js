// // const express = require('express');

// // const { connectDB } = require('./connect');

// // const urlRoute = require('./routes/url');

// // const connectDB = require('./connect');

// // const app = express();

// // const PORT = 8001;

// // connectDB('mongodb://localhost:27017/short-url');

// // then(() => console.log('MongoDB connected'))

// // app.use(express.json());

// // app.use("/url", urlRoute);

// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require('express');

// const connectDB = require('./connect');

// const urlRoute = require('./routes/url');

// const app = express();

// const PORT = 8001;

// const startServer = async () => {
//     try {
//         await connectDB(); 
//         console.log(' MongoDB connected');

//         app.use(express.json());
//         app.use("/url", urlRoute);

//         app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
//     } catch (error) {
//         console.error(" Error connecting to MongoDB:", error);
//         process.exit(1);
//     }
// };

// startServer();

// const express = require('express');
// const urlRoutes = require('./routes/url');

// const app = express();
// const PORT = 8001;

// app.use(express.json());
// app.use('/url', urlRoutes);

// app.listen(PORT, () => console.log(` Server running on port ${PORT}`));

const express = require('express');

const urlRoute = require('./routes/url');

const app = express();

const PORT = 8001;

app.use(express.json());

app.use("/url", urlRoute);

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));



