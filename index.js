const express = require('express');

const urlRoute = require('./routes/url');

const app = express();

const PORT = 8001;

app.use(express.json());

app.use("/url", urlRoute);

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));



