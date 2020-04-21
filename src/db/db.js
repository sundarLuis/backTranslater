const URI = "mongodb://localhost/self_accounting2";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};

const run = async () => {
  const monggose = require("mongoose");

  const conectMongoDB = await monggose.connect(URI, options);
  console.log(
    conectMongoDB.connection
      ? "connection successfull a MongoDB "
      : "connection error"
  );
};
run().catch(error => console.error(error));
