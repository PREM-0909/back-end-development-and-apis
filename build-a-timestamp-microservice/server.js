import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

const getDateFunc = (paramDate, res) => {
  let date;

  if(/^\d+$/.test(paramDate)){
    const num = parseInt(paramDate, 10);
    date = new Date(paramDate.length == 10 ? num*1000 : num);
  }else{
    date = new Date(paramDate)
  }

  if(isNaN(date.getTime())){
    return res.json({ error: "Invalid Date" });   
  }

  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  })
}

app.get("/api/" , (req, res) => {
  const currentDate = new Date();
  res.json({
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString()
  })
})

app.get("/api/:date" , (req, res) => {
  getDateFunc(req.params.date, res)
})

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
