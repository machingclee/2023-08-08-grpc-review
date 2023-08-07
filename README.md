# 2023-08-08-grpc-review

## Why?

I study how to stream data from server recently. SSE is good, I love it, but when it comes to performance, it takes up 1 tcp connection constantly out of the limited 6 connections using HTTP/1.1.

For streaming of large data, we take advantage of the fact that HTTP/2 has no limitation on number of TCP connections due to its ability to multiplex multiple requests into a single pipeline (connection).

## How to Stream?

I have not coded the following yet, but the main ideas/syntaxs/apis are there.

```
rpc readTodoStream(void) returns (stream TodoItems)
```

on client side:

```js
const call = client.readTodosStream();
call.on("data", (item) => {
  console.log(item);
});
call.on("end", (e) => console.log("server done"));
```

on server side:

```js
function readTodosStream(call, callback) {
  todos.forEach((t) => call.write(t));
  call.end();
}
```
