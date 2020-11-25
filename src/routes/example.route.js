const ExampleController = require("../controllers/Example.controller");

const http = require("express").Router();

http.get("/ExampleSmall/list", ExampleController.list);
http.get("/ExampleSmall/list/:_id", ExampleController.get);
http.post("/ExampleSmall/list", ExampleController.create);
http.put("/ExampleSmall/:_id", ExampleController.update);
http.delete("/ExampleSmall/:_id", ExampleController.remove);

const ExampleRouter = http;
module.exports = ExampleRouter;
