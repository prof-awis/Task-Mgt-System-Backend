
module.exports = {
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/my-tasks',
    JWT_SECRET: process.env.JWT_SECRET || 'mysecretjwtkey'
  };