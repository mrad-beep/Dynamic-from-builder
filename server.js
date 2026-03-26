const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/submit-form",(req,res)=>{


const formData = JSON.stringify(req.body);


const sql = "INSERT INTO responses (form_data) VALUES (?)";

db.query(sql, [formData], (err, result) => {
if(err){
    console.log(err);
return res.status(500).send("Database Error");
}


res.send("Form Saved Successfully");

});

});

app.get("/responses",(req,res)=>{

const sql = "SELECT * FROM responses";

db.query(sql,(err,result)=>{

if(err){
return res.send(err);
}

res.json(result);

});

});

app.get("/download",(req,res)=>{

const sql = "SELECT * FROM responses";

db.query(sql,(err,rows)=>{

let csv = "Course,Skill\n";

rows.forEach(row=>{
csv += `${row.course},${row.skill}\n`;
});

res.header("Content-Type","text/csv");
res.attachment("responses.csv");
res.send(csv);

});

});


app.get("/analysis",(req,res)=>{

const sql = "SELECT course, COUNT(*) as total FROM responses GROUP BY course";

db.query(sql,(err,result)=>{

res.json(result);

});

});

app.listen(3000, ()=>{
console.log("Server running on port 3000");
});
