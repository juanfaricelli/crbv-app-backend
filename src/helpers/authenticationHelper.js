const { Session } = require('../models/session');
const mongoose = require('mongoose');

const authenticationRequired = async (req, res, next) => {
  try {
    // Step 1: Extract the Authorization header
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res
        .status(403)
        .json({ code: 403, message: 'Authentication required' });
    }

    // Step 2: Parse the sessionId from the header
    const sessionId = authHeader.split(' ')[1]; // Assuming the format is "Bearer <sessionId>"

    if (!sessionId) {
      return res
        .status(403)
        .json({ code: 403, message: 'Authentication required' });
    }


    let sessionData;

    // Step 3: Check if the sessionId is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(sessionId)) {
      // Step 4: Query the database to get the session data using ObjectId
      const objectId = mongoose.Types.ObjectId(sessionId);
      sessionData = await Session.findOne({ _id: objectId })
        .then((data) => data)
        .catch((error) => {
          console.error('Error fetching session:', error);
          return null;
        });
    } else {
      // Handle the sessionId as a different type (e.g., a custom sessionId)
      sessionData = await Session.findOne({ _id: sessionId })
        .then((data) => data)
        .catch((error) => {
          console.error('Error fetching session:', error);
          return null;
        });
    }

    if (!sessionData) {
      return res.status(403).json({ code: 403, message: 'Invalid session' });
    } else {
      next();
    }
  } catch (error) {
    console.error('Error validating session:', error);
    res.status(500).json({ code: 500, message: 'Internal Server Error' });
  }
};

module.exports = {
  authenticationRequired,
};
