require('pmx').init({ http: true });

const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.info(`Server running on port ${port}`);
});
