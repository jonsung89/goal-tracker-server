'use strict';

require('dotenv').config();

exports.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:jws100389@ds153304.mlab.com:53304/heroku_mc4ggsj1';
exports.TEST_MONGODB_URI = process.env.TEST_MONGODB_URI || 'mongodb://localhost/goal-tracker';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';