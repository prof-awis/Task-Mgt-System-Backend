exports.handleError = (err, res) => {
    console.error(err.stack);
  
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
  
    res.status(statusCode).json({ message });
  };