require("dotenv").config();

const app = require("./server");

const port = process.env.PORT || 5000;

//* Start server :)
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
