const express = require('express');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('combined'));
app.use(express.static('app/www'));

app.listen(port, () => {
  console.info(`Server running on port ${port}`);
});
