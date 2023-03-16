const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

mongoose.set('strictQuery', false);
dotenv.config({ path: 'config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
async function dbConnect() {
  await mongoose
    .connect(DB)
    .then(() => console.log('DB connection successful!'));
}
dbConnect();

const port = process.env.PORT || 2201;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
