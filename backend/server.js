
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
const formRoutes = require('./routes/formRoutes');
const userRoutes = require('./routes/userRoutes');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


app.use('/api/form', formRoutes);
app.use('/api/user', userRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
