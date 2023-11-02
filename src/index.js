const express = require('express');
const { default: mongoose } = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 9000;
const uri = `mongodb+srv://${process.env.APP_MONGODB_USER}:${process.env.APP_MONGODB_PASS}@${process.env.APP_MONGODB_CLUSTER}/?retryWrites=true&w=majority`;

const countryRoutes = require('./routes/countries');
const diagnosticsRoutes = require('./routes/diagnostics');
const healthInsurancesRoutes = require('./routes/health-insurances');
const idTypesRoutes = require('./routes/id-types');
const locationRoutes = require('./routes/locations');
const patientConditionsRoutes = require('./routes/patient-conditions');
const specialtyRoutes = require('./routes/specialties');
const userPatientRoutes = require('./routes/user-patient');
const userRoutes = require('./routes/user');
const medicalRecordRoutes = require('./routes/medical-records');

// middleware
app.use(express.json());
app.use('/api', [
  countryRoutes,
  diagnosticsRoutes,
  healthInsurancesRoutes,
  idTypesRoutes,
  locationRoutes,
  patientConditionsRoutes,
  specialtyRoutes,
  userPatientRoutes,
  userRoutes,
  medicalRecordRoutes,
]);

// routes
app.get('/ping', (req, res) => res.send('pong'));
app.get('/', (req, res) => res.send('Welcome to my API'));

// mongodb conection
mongoose
  .connect(uri, {
    dbName: process.env.APP_MONGODB_DB_CRBV,
  })
  .then(() =>
    console.log(
      `Connected to MongoDB Atlas - DB ${process.env.APP_MONGODB_DB_CRBV}`
    )
  )
  .catch((error) => console.error(error));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
