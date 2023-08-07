const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo(
  "127.0.0.1:40000",
  grpc.credentials.createInsecure()
);

client.createTodo(
  {
    id: -1,
    text: "I am a text.",
  },
  (err, res) => {
    console.log("Receive from server " + JSON.stringify(res));
  }
);
