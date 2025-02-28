const Express = require("express");
const cors = require("cors")
const app = Express();
const Mongoose = require("mongoose");
const router = require("./routes/routes")
require("dotenv").config();
app.use(Express.json());
app.use(cors());

const URI = process.env.URI;
const PORT = process.env.PORT;

Mongoose.connect(URI)
.then(()=>{
    console.log("Database Connected Successfully")
})
.catch((err)=>{
    console.log("Failed to Connect:",err)
})

app.use("/users", router);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})