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

server.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  if (users[username] && users[username] == password) {
    res.json({
      success: true
    });
  } else {
    res.json({
      success: false
    });
  }
});

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
})