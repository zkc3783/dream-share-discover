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

server.post('/Interface19', (req, res) => {
  const { UserName, UserPassWord } = req.body;
  console.log(req.body)
  if (users[UserName] && users[UserName] == UserPassWord) {
    res.json({
      MatchToken: true
    });
  } else {
    res.json({
      MatchToken: false
    });
  }
});

server.post('/Interface29', (req, res) => {
  const { UserName } = req.body;
  console.log(req.body)
  res.json(
    {
      ItemData:
        [
          {
              "ItemId": 30,
              "ItemName": "XIAOMI SU7",
              "ItemPrice": 199999,
              "ItemDescription": "YAOYAO LINGXIAN",
              "ItemImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAiCAYAAADcbsCGAAAFkUlEQVRYhYVYS2skVRQ+XXWrH+lH+pFKejRxEEWUOJERfI2zGgRRURmYWY5L/QFuBH+Fa3+AKxeCKAiCCzGgiKAwREbFGHCTmZhJZpKYfnnPnf4qX52umEsXVXXr3HPP4zuP26VHV3sTP4RHqVQSnRuPx+Gul3MuvOs30Jz1Dh5RFGW8R6NReLfrMKfPOnRthAe+DwaD8KzEcRwHwfRdn5U5BFaGygxKYOg8aCAAhvKAsKwQ6LGvDjccDrONsACb4l0Z6rvSshXAGMzBFHRQiC3KhuBn/o55B3NiooiRWssKUPSsa1UYvZifHfjGdBjwUjCYLtbNT7MCY4FxYgWDxdVq7EZ8g5AWf4AE4AKYBFpgwOIJWmAxtMRGeGasMC5ZAQjFVrSBg3eGU2Q1g2ugBWNQ71CAmcIaHAAc7RjAn9JzxDLWeN7lzDgFMUcQ5tiFNjItrtiKeAcf0LPVWTmGh7M44EV2jt1hUwmAzO6E5WDxIldy2sGzprJgXZtfLMDZsmyVZq0iN648K4vzjZnNlb7TqMr1y2tSLbsZeNgEXxTRU6NFM64CsW7IQkFrvZY6Lbl66YJcffmCB+4JnkD3ysUn/Lc16bYaOWspHXInZwSGBzzpOEWgtMC8bEmLn+W0La1GXV5/YVX+ur0n+weHUq9W5Oh4KMceL2+8+LSk7Zb0uy35+/buDPgZMhhQEPOOpWdQsiAsOOaX047EHmftZkPev3blQTpS92olGY2l7NQjkax4up9ubeUEQq1GJeFMwEI7KxDcijldgKzPWj2c9qQUJV4g1TiRcVZyYkmcJlDdVJXoZtHHKQTKMuY5osN3W2awGMICG1zCKh7kS722fpT1XzZlY3NbIpdIKXZeKCd7hwP5an1D9o+Gsry0MIMxi3GbsPEtEw6WQTnDIryzltWkLGmnIx7e8sW3N+WHm1vexUkQMPbftu8eyidf/ih37h5Jf6HrI7s6E6EciFCe819wq80zRWWHa6tezXpN2q2muHJFPnj3LXFesX+HInd278t8syaPnX9IPvrwhjTqVdnevRfod+/dz9XuXJky7s3meYKtxibmyFVGPS/YXH3OY85J0wdEba4Wnste2Mjjz7mytH2kxv7e8t/7CgHjMpusbVMRggZgzfw8jR6kDmYI4Rb8xpVKNWfhStVJWqt5Iv1NBfBXtRbLOR88Ir/leFi+wCU6FKVxVhBuAJhZtZzIc6tPyq+bW9Jtz3vrVEQk34tlAKdnJxrZ6UzrZF1oM0YQzkYOPug892bvXX9TEh+JP9/6Q9JeJ0Tl5BTh8oJ64fqLmcIsINdxPkskSfLAeiBioXKgnIL10sU1+eyb7+SfvX1Z7PVC2lCcnXl5unOLaQ5j6B8ZSuxi4N4VZWbbNoVFXo/nn1mVnb0979a239TntcnZllPbpb1uzpX/V8qYJldbLfB57uNPP5d33n5NXr38kqz0l4JVpnufPqb7NpvzOSsBMujCbX8I48xgzjaCWPD1+vey8fuf8vgjKx5Dqa8QPWn4FFL2+IhdrC4I+PIVS0YTX18HQzkaHMvBwZFs7+xkluHKY9s17J+dBM8/1ZlwEuY6aIltvuN3a21b6It45Iw8OTl/ZFa0+LIndHYtA7ooo9szgwW8pS+6I1iCobhXK9KI8cg5CoysINx+M/Ax2J0Y3NxydxxxC10klGXMwtiEzZtxLsOdlWc3W+PQCW32/w4LVAYrnwH4rIHBzUPhQWZ8cjDiM4X9O0SHY4mt6W054bYH6yxzthgHCwfRaDgKzagNArZySCUsBDPjUzu6YXvgLoLAafUTDYFtyXCsBD0rGFmrFYGdW3QIzYdjHkV1Oty9pUr+mIYrWG+auhAIEAz8ndWY+3vWnnFkq0pRrrPgz/DsMafCqbD8RyJDBfP/AWRTa4wu53OnAAAAAElFTkSuQmCC"
          },
          {
              "ItemId": 31,
              "ItemName": "XIAOMI SU8",
              "ItemPrice": 299999,
              "ItemDescription": "YAOYAO LINGXIAN",
              "ItemImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAiCAYAAADcbsCGAAAFkUlEQVRYhYVYS2skVRQ+XXWrH+lH+pFKejRxEEWUOJERfI2zGgRRURmYWY5L/QFuBH+Fa3+AKxeCKAiCCzGgiKAwREbFGHCTmZhJZpKYfnnPnf4qX52umEsXVXXr3HPP4zuP26VHV3sTP4RHqVQSnRuPx+Gul3MuvOs30Jz1Dh5RFGW8R6NReLfrMKfPOnRthAe+DwaD8KzEcRwHwfRdn5U5BFaGygxKYOg8aCAAhvKAsKwQ6LGvDjccDrONsACb4l0Z6rvSshXAGMzBFHRQiC3KhuBn/o55B3NiooiRWssKUPSsa1UYvZifHfjGdBjwUjCYLtbNT7MCY4FxYgWDxdVq7EZ8g5AWf4AE4AKYBFpgwOIJWmAxtMRGeGasMC5ZAQjFVrSBg3eGU2Q1g2ugBWNQ71CAmcIaHAAc7RjAn9JzxDLWeN7lzDgFMUcQ5tiFNjItrtiKeAcf0LPVWTmGh7M44EV2jt1hUwmAzO6E5WDxIldy2sGzprJgXZtfLMDZsmyVZq0iN648K4vzjZnNlb7TqMr1y2tSLbsZeNgEXxTRU6NFM64CsW7IQkFrvZY6Lbl66YJcffmCB+4JnkD3ysUn/Lc16bYaOWspHXInZwSGBzzpOEWgtMC8bEmLn+W0La1GXV5/YVX+ur0n+weHUq9W5Oh4KMceL2+8+LSk7Zb0uy35+/buDPgZMhhQEPOOpWdQsiAsOOaX047EHmftZkPev3blQTpS92olGY2l7NQjkax4up9ubeUEQq1GJeFMwEI7KxDcijldgKzPWj2c9qQUJV4g1TiRcVZyYkmcJlDdVJXoZtHHKQTKMuY5osN3W2awGMICG1zCKh7kS722fpT1XzZlY3NbIpdIKXZeKCd7hwP5an1D9o+Gsry0MIMxi3GbsPEtEw6WQTnDIryzltWkLGmnIx7e8sW3N+WHm1vexUkQMPbftu8eyidf/ih37h5Jf6HrI7s6E6EciFCe819wq80zRWWHa6tezXpN2q2muHJFPnj3LXFesX+HInd278t8syaPnX9IPvrwhjTqVdnevRfod+/dz9XuXJky7s3meYKtxibmyFVGPS/YXH3OY85J0wdEba4Wnste2Mjjz7mytH2kxv7e8t/7CgHjMpusbVMRggZgzfw8jR6kDmYI4Rb8xpVKNWfhStVJWqt5Iv1NBfBXtRbLOR88Ir/leFi+wCU6FKVxVhBuAJhZtZzIc6tPyq+bW9Jtz3vrVEQk34tlAKdnJxrZ6UzrZF1oM0YQzkYOPug892bvXX9TEh+JP9/6Q9JeJ0Tl5BTh8oJ64fqLmcIsINdxPkskSfLAeiBioXKgnIL10sU1+eyb7+SfvX1Z7PVC2lCcnXl5unOLaQ5j6B8ZSuxi4N4VZWbbNoVFXo/nn1mVnb0979a239TntcnZllPbpb1uzpX/V8qYJldbLfB57uNPP5d33n5NXr38kqz0l4JVpnufPqb7NpvzOSsBMujCbX8I48xgzjaCWPD1+vey8fuf8vgjKx5Dqa8QPWn4FFL2+IhdrC4I+PIVS0YTX18HQzkaHMvBwZFs7+xkluHKY9s17J+dBM8/1ZlwEuY6aIltvuN3a21b6It45Iw8OTl/ZFa0+LIndHYtA7ooo9szgwW8pS+6I1iCobhXK9KI8cg5CoysINx+M/Ax2J0Y3NxydxxxC10klGXMwtiEzZtxLsOdlWc3W+PQCW32/w4LVAYrnwH4rIHBzUPhQWZ8cjDiM4X9O0SHY4mt6W054bYH6yxzthgHCwfRaDgKzagNArZySCUsBDPjUzu6YXvgLoLAafUTDYFtyXCsBD0rGFmrFYGdW3QIzYdjHkV1Oty9pUr+mIYrWG+auhAIEAz8ndWY+3vWnnFkq0pRrrPgz/DsMafCqbD8RyJDBfP/AWRTa4wu53OnAAAAAElFTkSuQmCC"
          }
      ]
    }
  )
  return 
});

server.post('/Interfac30', (req, res) => {
  const { ItemId } = req.body;
  console.log(req.body)
  console.log(ItemId)
  res.json(
    {}
  );
});


server.post('/Interface22', (req, res) => {
  const { UserId } = req.body;
  console.log(req.body)
  console.log(UserId)
  res.json(
    {}
  );
});

server.post('/Interface25', (req, res) => {
  const { UserId } = req.body;
  console.log(req.body)
  console.log(UserId)
  res.json(
    {}
  )
});

server.post('/Interface26', (req, res) => {
  const { } = req.body;
  console.log(req.body)
  // 在这里，你需要根据 UserName 查找相应的数据
  // 假设你已经有一个名为 findUser 的函数，它接收一个用户名作为参数，并返回对应的数据
  //const userData = findUser(UserName);
  res.json({
    "SelectedComments": [{
      "Comment":"Poor service and slow delivery!",
      "Rating": 2
      },{
          "Comment":"Product quality has decreased significantly.",
          "Rating": 2
      }
  ],
  "OverallAdvices": ["Focus on customer service to enhance satisfaction.", "Consider expanding the product line."]
  });
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
            "Rating": 9
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