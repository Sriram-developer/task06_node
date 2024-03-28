const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const errorHandlingMiddleware = require('./middleware/errorHandlingMiddleware');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(errorHandlingMiddleware);

// Routes
app.use('/api', authRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
