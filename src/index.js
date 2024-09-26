// Load environment variables from .env file
const env = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `.env.${env}` });

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { default: mongoose } = require('mongoose');
const https = require('https');
const fs = require('fs');

const app = express();
const PORT = process.env.APP_PORT || 9000;
const uri = `mongodb+srv://${process.env.APP_MONGODB_USER}:${process.env.APP_MONGODB_PASS}@${process.env.APP_MONGODB_CLUSTER}/?retryWrites=true&w=majority`;
const authRoutes = require('./routes/auth');
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
const { requestLog } = require('./helpers/requestLog');

app.use(requestLog);
app.use(express.urlencoded({ extended: false }));
// session middleware
app.use(
  session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'your_secret_key', // TODO: imrpove this
    cookie: {
      maxAge: 28800000, // maxAge -> 8 hrs
      secure: true, // Set to true if using HTTPS
    },
    store: MongoStore.create({
      mongoUrl: uri,
      dbName: process.env.APP_MONGODB_DB_CRBV,
    }),
  })
);
// session middleware - Session-persisted message middleware
app.use(function (req, res, next) {
  const err = req.session.error;
  const msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', [
  authRoutes,
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
app.get('/ping', (req, res) => {
  console.log('pong');
  res.send('pong');
});
app.get('/', (req, res) => res.send('Welcome to my API'));

// mongodb conection
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.APP_MONGODB_DB_CRBV,
  })
  .then(() =>
    console.log(
      `Connected to MongoDB Atlas - DB ${process.env.APP_MONGODB_DB_CRBV}`
    )
  )
  .catch((error) => console.error(error));

// TODO: verify this
// Read SSL/TLS certificates
const sslOptions = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH),
};
const httpsActive = process.env.NODE_HTTPS === 'true';
const ANY_HOST = '0.0.0.0';

if (httpsActive && sslOptions) {
  https.createServer(sslOptions, app).listen(PORT, ANY_HOST, () => {
    console.log(`HTTPS Server is running on port ${PORT}`);
  });
} else {
  app.listen(PORT, ANY_HOST, () => console.log(`Server running on ${PORT}`));
}
