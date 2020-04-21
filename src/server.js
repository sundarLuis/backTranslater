const express = require("express");
const cors = require("cors");
const app = express();

//BD
require("./db/db.js");

//middleware
app.use(cors());
app.use(express.json());

//router 
app.get("/", function(req, res) {
  res.send("<h1>Api Self Accounting</h1>");  
});

app.use("/api/user", require("./mvc/routes/user"));
app.use("/api/typeMoney", require("./mvc/routes/typeMoney"));
app.use("/api/typeExpenses", require("./mvc/routes/typeExpenses"));
app.use("/api/expenses", require("./mvc/routes/expenses"));
app.use("/api/myTranslator/list", require("./mvc/routes/myTranslator/list"));
app.use("/api/myTranslator/translation", require("./mvc/routes/myTranslator/translation"));

app.use((req, res, next) => {
  res.status(400).json({ error: " 404 not found" });
});

//server
async function main() {
    app.set("port", process.env.PORT || 3000);
    await app.listen(app.get("port"));
    console.log("server on port", app.get("port"));
}
main();
