module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL: process.env.BASE_URL || 'http://localhost:3000',
    MONGODB_URI: process.env.MONGODB_URI || 'mongoDB_Connection_String_In_Atlas',
    JWT_SECRET : process.env.JWT_SECRET || 'secret11'
  };