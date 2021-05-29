require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const EmployeeRoutes = require('./routes/Employee');
const UserRoutes = require('./routes/User')
const JobRoutes = require('./routes/Job');
const cors = require('cors');

connectDB();
const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}))

app.use('/api/employees', EmployeeRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/jobs', JobRoutes);

const port = process.env.PORT||5000;

app.listen(port, console.log("Server on port "+port));