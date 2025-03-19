import express from "express";
const app = express();
const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;
// add a new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// get all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// get a tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((tea) => tea.id === Number(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  res.status(200).send(tea);
});

// update a tea
app.put("/teas/:id", (req, res) => {
  const index = teaData.findIndex((tea) => tea.id === Number(req.params.id));
  console.log("server listened");
  if (index === -1) {
    return res.status(404).send("Tea not Found");
  }
  console.log(req.body);
  teaData[index] = { ...teaData[index], ...req.body };
  res.status(200).send(teaData[index]);
  return;
});

// delete tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((tea) => tea.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).send("Tea not found");
  }
  teaData.splice(index, 1);
  return res.status(200).send("deleted");
});

app.listen(port, () => {
  console.log("Server is running at port: " + port);
});
