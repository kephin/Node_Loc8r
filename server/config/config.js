const env = process.env.NODE_ENV || 'development';
if (env === 'development') process.env.SERVER = 'http://localhost:3000';
