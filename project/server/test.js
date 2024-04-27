const express = require('express')
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express()
const port = 3000; // 客户端端口
/* express的服务器 */
//1. 导入express
//var express = require('express')
//2. 创建express服务器
var server = express()
server.use(express.json())
server.use(bodyParser.json())

server.use(cors());

server.listen(port, function(){
    console.log(`Server is running on port ${port}`);
    console.log('Server running at http://127.0.0.1:3000/');
});

const json = {
  "code": 200,
  "data": {
      "tokenHead": "Bearer ",
      "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE3MTM4OTE5ODQ5MDUsImV4cCI6MTcxNDQ5Njc4NH0.juEKtV97mwokEPOCEll9oSeCHbRqQq7Z7uMftxcpfGe-0oP-5uNfVWh0vhlsUsCA6gBCJBno0lHVyjLa0DSvBQ"
  }
};

const users = {
  'admin': 'admin',
  'test': 'test'
};

const storeinfo = {
  "StoreName": "XIAOMI",
  "StoreLocation": "100,200",
  "AvgRate": 9.00000,
  "Feedback": [{
      "Comment":"Great service and fast delivery!",
      "Rating": 9
      },{
          "Comment":"Product quality has improved significantly.",
          "Rating": 900
      }
  ]
}

server.delete('/Interface22', (req, res) => {
  const { ItemId } = req.body;
  console.log(req.body)
  // 在这里，你需要实现删除操作
  // 假设你已经有一个名为 deleteItem 的函数，它接收一个 ID 作为参数，并删除对应的项
  //deleteItem(ItemId);
  console.log(ItemId)
  // 由于你不需要返回任何数据，你可以直接结束响应
  res.end();
});

server.delete('/Interface25', (req, res) => {
  const { ItemId } = req.body;
  console.log(req.body)
  // 在这里，你需要实现删除操作
  // 假设你已经有一个名为 deleteItem 的函数，它接收一个 ID 作为参数，并删除对应的项
  //deleteItem(ItemId);
  console.log(ItemId)
  // 由于你不需要返回任何数据，你可以直接结束响应
  res.end();
});

server.post('/Interface27', (req, res) => {
  const { UserName } = req.body;
  console.log(req.body)
  // 在这里，你需要根据 UserName 查找相应的数据
  // 假设你已经有一个名为 findUser 的函数，它接收一个用户名作为参数，并返回对应的数据
  //const userData = findUser(UserName);
  res.json({
    StoreName: "XIAOMI",
    StoreLocation: "100,200",
    AvgRate: 9.00000,
    Feedback: [{
        "Comment":"Great service and fast delivery!",
        "Rating": 9
        },{
            "Comment":"Product quality has improved significantly.",
            "Rating": 900
        }
    ]
  });
});

server.post('/Interface28', (req, res) => {
  const { UserName, StoreName, StoreLocation } = req.body;
  console.log(req.body)
  // 在这里，你需要实现删除操作
  // 假设你已经有一个名为 deleteItem 的函数，它接收一个 ID 作为参数，并删除对应的项
  //  updateUser(UserName, { StoreName, StoreLocation });
  // 由于你不需要返回任何数据，你可以直接结束响应
  res.end();
});
/* 
server.post('*', function (request, response, next) {
  // console.log(request)
  console.log(request.body)
  next()
}, function (request, response) {
  response.send(json)
})

server.get('*', function (request, response, next) {
  // console.log(request)
  console.log(request.body)
  next()
}, function (request, response) {
  response.send(json)
}) */



server.post('/Interface18', (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  if (users[username] && users[username] == password) {
    res.json({
      MatchToken: true
    });
  } else {
    res.json({
      MatchToken: false
    });
  }
});

