const express = require("express");
const app = express();
const path = require("path")

app.set("port",process.env.PORT || 3000);
app.use(express.static(path.join(__dirname,"/web/app")));

app.get("/", (req,res)=>{
res.sendFile(path.join(__dirname,"/web/index.html"));
});

app.listen(app.get("port"),()=>{
    console.log("puerto: ",app.get("port") );
});