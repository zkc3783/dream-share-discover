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

server.listen(port,"0.0.0.0", function(){
    console.log(`Server is running on port ${port}`);
    console.log('Server running at http://0.0.0.0:3000/');
});

let customer = {
  1: {
      "UserId":1,
      "UserName":"YongqiZhu",
      "UserPassword":"123456",
      "Birthday":"2003-03-05",
      "Interests":"tabletennis", 
      "Email":"YongqiZhu@gmail.com"
  },
  2: {
      "UserId":2,
      "UserName":"Miao",
      "UserPassword":"miao11",
      "Birthday":"2003-04-21",
      "Interests":"Japanese", 
      "Email":"Miaochen@qq.com"
  },
  3: {
      "UserId":3,
      "UserName":"xyy",
      "UserPassword":"chenh",
      "Birthday":"2004-01-08",
      "Interests":"philosophy", 
      "Email":"huanchen@qq.com"
  },    
  4: {
      "UserId":4,
      "UserName":"Jason",
      "UserPassword":"Jason",
      "Birthday":"2003-01-10",
      "Interests":"F1", 
      "Email":"Jason@qq.com"
  }
}

let store = {
  0: {
      "UserId": 0,
      "UserName":"admin",
      "UserPassword": "admin"
  },
  10: {
    "UserId": 10,
    "UserName":"LEIJUN",
    "UserPassword": "123456",
    "StoreName":"XIAOMI",
    "StoreLocation": "30.4981807,114.5086413",
    "StoreFloor": 1,
    "AvgRate": 9.0,
    "Feedback": [{
      "Comment":"Great service and fast delivery!",
      "Rating": 9
    },{
        "Comment":"Product quality has improved significantly.",
        "Rating": 9
    }]
  },
  11: {
    "UserId": 11,
    "UserName":"user11",
    "UserPassword": "password11",
    "StoreName":"yifu building",
    "StoreLocation": "43.8311978,125.2881350",
    "StoreFloor": 1,
    "AvgRate": 9.0,
    "Feedback": [{
    "Comment":"Great exam!",
    "Rating": 4
    }]
  },

  12: {
      "UserId": 12,
      "UserName":"user12",
      "UserPassword": "password12",
      "StoreName":"RiXin building",
      "StoreLocation": "43.8278974,125.2829697",
      "StoreFloor": 1,
      "AvgRate": 9.0,
      "Feedback": [{
      "Comment":"Great service and fast delivery!",
      "Rating": 9
      },{
          "Comment":"Product quality has improved significantly.",
          "Rating": 9
      }]
  },

  13: {
      "UserId": 13,
      "UserName":"user13",
      "UserPassword": "code_1x123s",
      "StoreName":"hamburger",
      "StoreLocation": "43.8340754,125.2743190",
      "StoreFloor": 1,
      "AvgRate": 8.0,
      "Feedback": [{
      "Comment":"QQ is rtey cool.",
      "Rating": 8
      }]
  },

  14: {
      "UserId": 14,
      "UserName":"user14",
      "UserPassword": "codpowfgddshfe_1x43",
      "StoreName":"tea",
      "StoreLocation": "43.8324302,125.2704159",
      "StoreFloor": 1,
      "AvgRate": 8.0,
      "Feedback": [{
      "Comment":"QQ sdfsad so cool.",
      "Rating": 8
      }]
  },

  15: {
      "UserId": 15,
      "UserName":"user15",
      "UserPassword": "passwfgjord15",
      "StoreName":"coffee",
      "StoreLocation": "43.8279169,125.2830191",
      "StoreFloor": 1,
      "AvgRate": 9.0,
      "Feedback": []
  },
  16: {
      "UserId": 16,
      "UserName":"user16",
      "UserPassword": "pashsword16",
      "StoreName":"SuperMarket",
      "StoreLocation": "43.8266454,125.2967183°",
      "StoreFloor": 1,
      "AvgRate": "/",
      "Feedback": [{
      "Comment":"Great!",
      "Rating": 4
      }]
  },

  17: {
      "UserId": 17,
      "UserName":"user17",
      "UserPassword": "passwofghrd17",
      "StoreName":"Wine & Cigarette",
      "StoreLocation": "43.8278323,125.2980837",
      "StoreFloor": 1,
      "AvgRate": "8",
      "Feedback": []
  },

  18: {
      "UserId": 18,
      "UserName":"user18",
      "UserPassword": "codgfhe_18",
      "StoreName":"Fried Chicken",
      "StoreLocation": "43.8308304,125.2991796",
      "StoreFloor": 1,
      "AvgRate": 4.01,
      "Feedback": [{
      "Comment":"QQ is rtey cool.",
      "Rating": 8
      }]
  },

  19: {
      "UserId": 19,
      "UserName":"user19",
      "UserPassword": "SuperMarket",
      "StoreName":"tea",
      "StoreLocation": "43.8334869,125.2944500",
      "StoreFloor": 1,
      "AvgRate": 8.8,
      "Feedback": [{
      "Comment":"QQ so cool.",
      "Rating": 8
      }]
  },
  110: {
    "UserId": 110,
    "UserName":"MAHUATENG",
    "UserPassword": "654321",
    "StoreName":"TENGXUN",
    "StoreLocation": "22.5458116,113.9411541",
    "StoreFloor": 2,
    "AvgRate": 8.0,
    "Feedback": [{
      "Comment":"QQ is so cool.",
      "Rating": 8
    }]
  }
}

let item = {
  "LEIJUN": {
    30: {
      "ItemId": 30,
      "ItemName": "XIAOMI SU7",
      "ItemPrice": 199999,
      "ItemDescription": "YAOYAO LINGXIAN",
      "ItemImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAiCAYAAADcbsCGAAAFkUlEQVRYhYVYS2skVRQ+XXWrH+lH+pFKejRxEEWUOJERfI2zGgRRURmYWY5L/QFuBH+Fa3+AKxeCKAiCCzGgiKAwREbFGHCTmZhJZpKYfnnPnf4qX52umEsXVXXr3HPP4zuP26VHV3sTP4RHqVQSnRuPx+Gul3MuvOs30Jz1Dh5RFGW8R6NReLfrMKfPOnRthAe+DwaD8KzEcRwHwfRdn5U5BFaGygxKYOg8aCAAhvKAsKwQ6LGvDjccDrONsACb4l0Z6rvSshXAGMzBFHRQiC3KhuBn/o55B3NiooiRWssKUPSsa1UYvZifHfjGdBjwUjCYLtbNT7MCY4FxYgWDxdVq7EZ8g5AWf4AE4AKYBFpgwOIJWmAxtMRGeGasMC5ZAQjFVrSBg3eGU2Q1g2ugBWNQ71CAmcIaHAAc7RjAn9JzxDLWeN7lzDgFMUcQ5tiFNjItrtiKeAcf0LPVWTmGh7M44EV2jt1hUwmAzO6E5WDxIldy2sGzprJgXZtfLMDZsmyVZq0iN648K4vzjZnNlb7TqMr1y2tSLbsZeNgEXxTRU6NFM64CsW7IQkFrvZY6Lbl66YJcffmCB+4JnkD3ysUn/Lc16bYaOWspHXInZwSGBzzpOEWgtMC8bEmLn+W0La1GXV5/YVX+ur0n+weHUq9W5Oh4KMceL2+8+LSk7Zb0uy35+/buDPgZMhhQEPOOpWdQsiAsOOaX047EHmftZkPev3blQTpS92olGY2l7NQjkax4up9ubeUEQq1GJeFMwEI7KxDcijldgKzPWj2c9qQUJV4g1TiRcVZyYkmcJlDdVJXoZtHHKQTKMuY5osN3W2awGMICG1zCKh7kS722fpT1XzZlY3NbIpdIKXZeKCd7hwP5an1D9o+Gsry0MIMxi3GbsPEtEw6WQTnDIryzltWkLGmnIx7e8sW3N+WHm1vexUkQMPbftu8eyidf/ih37h5Jf6HrI7s6E6EciFCe819wq80zRWWHa6tezXpN2q2muHJFPnj3LXFesX+HInd278t8syaPnX9IPvrwhjTqVdnevRfod+/dz9XuXJky7s3meYKtxibmyFVGPS/YXH3OY85J0wdEba4Wnste2Mjjz7mytH2kxv7e8t/7CgHjMpusbVMRggZgzfw8jR6kDmYI4Rb8xpVKNWfhStVJWqt5Iv1NBfBXtRbLOR88Ir/leFi+wCU6FKVxVhBuAJhZtZzIc6tPyq+bW9Jtz3vrVEQk34tlAKdnJxrZ6UzrZF1oM0YQzkYOPug892bvXX9TEh+JP9/6Q9JeJ0Tl5BTh8oJ64fqLmcIsINdxPkskSfLAeiBioXKgnIL10sU1+eyb7+SfvX1Z7PVC2lCcnXl5unOLaQ5j6B8ZSuxi4N4VZWbbNoVFXo/nn1mVnb0979a239TntcnZllPbpb1uzpX/V8qYJldbLfB57uNPP5d33n5NXr38kqz0l4JVpnufPqb7NpvzOSsBMujCbX8I48xgzjaCWPD1+vey8fuf8vgjKx5Dqa8QPWn4FFL2+IhdrC4I+PIVS0YTX18HQzkaHMvBwZFs7+xkluHKY9s17J+dBM8/1ZlwEuY6aIltvuN3a21b6It45Iw8OTl/ZFa0+LIndHYtA7ooo9szgwW8pS+6I1iCobhXK9KI8cg5CoysINx+M/Ax2J0Y3NxydxxxC10klGXMwtiEzZtxLsOdlWc3W+PQCW32/w4LVAYrnwH4rIHBzUPhQWZ8cjDiM4X9O0SHY4mt6W054bYH6yxzthgHCwfRaDgKzagNArZySCUsBDPjUzu6YXvgLoLAafUTDYFtyXCsBD0rGFmrFYGdW3QIzYdjHkV1Oty9pUr+mIYrWG+auhAIEAz8ndWY+3vWnnFkq0pRrrPgz/DsMafCqbD8RyJDBfP/AWRTa4wu53OnAAAAAElFTkSuQmCC"
    },
    31: {
      "ItemId": 31,
      "ItemName": "XIAOMI SU8",
      "ItemPrice": 299999,
      "ItemDescription": "YAOYAO LINGXIAN",
      "ItemImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAiCAYAAADcbsCGAAAFkUlEQVRYhYVYS2skVRQ+XXWrH+lH+pFKejRxEEWUOJERfI2zGgRRURmYWY5L/QFuBH+Fa3+AKxeCKAiCCzGgiKAwREbFGHCTmZhJZpKYfnnPnf4qX52umEsXVXXr3HPP4zuP26VHV3sTP4RHqVQSnRuPx+Gul3MuvOs30Jz1Dh5RFGW8R6NReLfrMKfPOnRthAe+DwaD8KzEcRwHwfRdn5U5BFaGygxKYOg8aCAAhvKAsKwQ6LGvDjccDrONsACb4l0Z6rvSshXAGMzBFHRQiC3KhuBn/o55B3NiooiRWssKUPSsa1UYvZifHfjGdBjwUjCYLtbNT7MCY4FxYgWDxdVq7EZ8g5AWf4AE4AKYBFpgwOIJWmAxtMRGeGasMC5ZAQjFVrSBg3eGU2Q1g2ugBWNQ71CAmcIaHAAc7RjAn9JzxDLWeN7lzDgFMUcQ5tiFNjItrtiKeAcf0LPVWTmGh7M44EV2jt1hUwmAzO6E5WDxIldy2sGzprJgXZtfLMDZsmyVZq0iN648K4vzjZnNlb7TqMr1y2tSLbsZeNgEXxTRU6NFM64CsW7IQkFrvZY6Lbl66YJcffmCB+4JnkD3ysUn/Lc16bYaOWspHXInZwSGBzzpOEWgtMC8bEmLn+W0La1GXV5/YVX+ur0n+weHUq9W5Oh4KMceL2+8+LSk7Zb0uy35+/buDPgZMhhQEPOOpWdQsiAsOOaX047EHmftZkPev3blQTpS92olGY2l7NQjkax4up9ubeUEQq1GJeFMwEI7KxDcijldgKzPWj2c9qQUJV4g1TiRcVZyYkmcJlDdVJXoZtHHKQTKMuY5osN3W2awGMICG1zCKh7kS722fpT1XzZlY3NbIpdIKXZeKCd7hwP5an1D9o+Gsry0MIMxi3GbsPEtEw6WQTnDIryzltWkLGmnIx7e8sW3N+WHm1vexUkQMPbftu8eyidf/ih37h5Jf6HrI7s6E6EciFCe819wq80zRWWHa6tezXpN2q2muHJFPnj3LXFesX+HInd278t8syaPnX9IPvrwhjTqVdnevRfod+/dz9XuXJky7s3meYKtxibmyFVGPS/YXH3OY85J0wdEba4Wnste2Mjjz7mytH2kxv7e8t/7CgHjMpusbVMRggZgzfw8jR6kDmYI4Rb8xpVKNWfhStVJWqt5Iv1NBfBXtRbLOR88Ir/leFi+wCU6FKVxVhBuAJhZtZzIc6tPyq+bW9Jtz3vrVEQk34tlAKdnJxrZ6UzrZF1oM0YQzkYOPug892bvXX9TEh+JP9/6Q9JeJ0Tl5BTh8oJ64fqLmcIsINdxPkskSfLAeiBioXKgnIL10sU1+eyb7+SfvX1Z7PVC2lCcnXl5unOLaQ5j6B8ZSuxi4N4VZWbbNoVFXo/nn1mVnb0979a239TntcnZllPbpb1uzpX/V8qYJldbLfB57uNPP5d33n5NXr38kqz0l4JVpnufPqb7NpvzOSsBMujCbX8I48xgzjaCWPD1+vey8fuf8vgjKx5Dqa8QPWn4FFL2+IhdrC4I+PIVS0YTX18HQzkaHMvBwZFs7+xkluHKY9s17J+dBM8/1ZlwEuY6aIltvuN3a21b6It45Iw8OTl/ZFa0+LIndHYtA7ooo9szgwW8pS+6I1iCobhXK9KI8cg5CoysINx+M/Ax2J0Y3NxydxxxC10klGXMwtiEzZtxLsOdlWc3W+PQCW32/w4LVAYrnwH4rIHBzUPhQWZ8cjDiM4X9O0SHY4mt6W054bYH6yxzthgHCwfRaDgKzagNArZySCUsBDPjUzu6YXvgLoLAafUTDYFtyXCsBD0rGFmrFYGdW3QIzYdjHkV1Oty9pUr+mIYrWG+auhAIEAz8ndWY+3vWnnFkq0pRrrPgz/DsMafCqbD8RyJDBfP/AWRTa4wu53OnAAAAAElFTkSuQmCC"
    }
  }
}

let analysis = {
  "SelectedComments": [{
    "Comment":"Poor service and slow delivery!",
    "Rating": 2
    },{
        "Comment":"Product quality has decreased significantly.",
        "Rating": 2
    }
  ],
  "OverallAdvices": ["Focus on customer service to enhance satisfaction.", "Consider expanding the product line."]
}

let IDcount = 1000


function checkRegister(userName) {
  for (let key in store) {
    if (store[key].UserName === userName) {
      return true;
    }
  }
  return false;
}

server.post('/Interface18', (req, res) => { // Register
  console.log('Interface18')
  const { UserName, UserPassword } = req.body;
  console.log('Receiving request:', req.body)
  IDcount = IDcount + 1
  if(checkRegister(UserName)) {
    const response ={
      MatchToken: false
    };
  console.log('Sending response:', response);
  res.json(response);
  } else {
    store[IDcount] = {
      "UserId": IDcount,
      "UserName": UserName,
      "UserPassword": UserPassword,
      "AvgRate": "/",
      "Feedback": []
    }
    const response ={
        MatchToken: true
    };
    console.log('Sending response:', response);
    res.json(response);
  }
});


function checkLogin(userName, userPassword) {
  for (let key in store) {
    console.log(store[key].UserName)
    console.log(store[key].UserPassword)
    if (store[key].UserName === userName && store[key].UserPassword === userPassword) {
      return true;
    }
  }
  return false;
}

server.post('/Interface19', (req, res) => { // Login
  console.log('Interface19')
  const { UserName, UserPassword } = req.body;
  console.log('Receiving request:', req.body)
  if (checkLogin(UserName, UserPassword)) {
    const response ={
      MatchToken: true
    };
    console.log('Sending response:', response);
    res.json(response);
  } else {
    const response ={
      MatchToken: false
    };
    console.log('Sending response:', response);
    res.json(response);
  }
});

server.post('/Interface20', (req, res) => { //Check userData
  console.log('Interface20')
  const { } = req.body;
  console.log('Receiving request:', req.body)
  const response ={
    "UserData": Object.values(customer)
  }
  console.log('Sending response:', response);
  res.json(response);
});

server.post('/Interface21', (req, res) => { // Update userData
  console.log('Interface21')
  const { UserId, UserName, UserPassword, Birthday, Interests, Email } = req.body;
  console.log('Receiving request:', req.body)
  customer[UserId] = req.body
  const response =
    {
    }
  console.log('Sending response:', response);
  res.json(response);
});

server.post('/Interface22', (req, res) => { // Delete userData
  console.log('Interface22')
  const { UserId } = req.body;
  console.log('Receiving request:', req.body)
  delete customer[UserId];
  const response =
    {}
  console.log('Sending response:', response);
  res.json(response);
});

server.post('/Interface23', (req, res) => { // Check storeData
  console.log('Interface23')
  const { } = req.body;
  console.log('Receiving request:', req.body)
  const response =
    {
      "StoreData": Object.values(store).filter(item => item.UserName !== "admin")
    }
  console.log('Sending response:', response);
  res.json(response);
});

server.post('/Interface24', (req, res) => { // Update storeData
  console.log('Interface24')
  const { UserId, UserName, UserPassword, StoreName, StoreLocation, StoreFloor} = req.body;
  console.log('Receiving request:', req.body)
  if(!store[UserId])
    store[UserId] = {"UserId": UserId, "AvgRate": "/",
    "Feedback": []
  };
  store[UserId]["UserName"] = UserName;
  store[UserId]["UserPassword"] = UserPassword;
  store[UserId]["StoreName"] = StoreName;
  store[UserId]["StoreLocation"] = StoreLocation;
  store[UserId]["StoreFloor"] = StoreFloor;
  const response =
    {}
  console.log('Sending response:', response);
  res.json(response);
});


server.post('/Interface25', (req, res) => { // Delete storeData
  console.log('Interface25')
  const { UserId } = req.body;
  console.log('Receiving request:', req.body)
  delete store[UserId];
  const response =
    {}
  console.log('Sending response:', response);
  res.json(response);
});

server.post('/Interface26', (req, res) => { // Check Analysis
  console.log('Interface26')
  const { } = req.body;
  console.log('Receiving request:', req.body)
  const response =analysis
  console.log('Sending response:', response);
  res.json(response);
});

function getStoreByUserName(userName) {
  for (let key in store) {
    if (store[key].UserName === userName) {
      return {
        StoreName: store[key].StoreName,
        StoreLocation: store[key].StoreLocation,
        StoreFloor: store[key].StoreFloor,
        AvgRate: store[key].AvgRate,
        Feedback: store[key].Feedback
      };
    }
  }
  return null; // 如果找不到指定的 UserName，返回 null
}

server.post('/Interface27', (req, res) => { // Check Store Info
  console.log('Interface27')
  const { UserName } = req.body;
  console.log('Receiving request:', req.body)
  const response =
    getStoreByUserName(UserName)
  console.log('Sending response:', response);
  res.json(response);
});

function updateStoreByUserName(userName, storeName, storeLocation, storeFloor) {
  for (let key in store) {
    if (store[key].UserName === userName) {
      store[key].StoreName = storeName
      store[key].StoreLocation = storeLocation
      store[key].StoreFloor = storeFloor
    }
  }
}

server.post('/Interface28', (req, res) => { // Update Store Info
  console.log('Interface28')
  const { UserName, StoreName, StoreLocation, StoreFloor } = req.body;
  updateStoreByUserName(UserName, StoreName, StoreLocation, StoreFloor)
  console.log('Receiving request:', req.body)
  const response ={}
  console.log('Sending response:', response);
  res.json(response);
});

server.post('/Interface29', (req, res) => { // Check ItemData
  console.log('Interface29')
  const { UserName } = req.body;
  console.log('Receiving request:', req.body)
  let response;
  if (item[UserName]) {
    response = {
      "ItemData": Object.values(item[UserName])
    };
  } else {
    response = {
      "ItemData": []
    };
  }
  console.log('Sending response:', response);
  res.json(response);
});

server.post('/Interface30', (req, res) => { // Update ItemData
  console.log('Interface30')
  const { UserName, ItemId, ItemName, ItemPrice, ItemDescription, ItemImage } = req.body;
  console.log('Receiving request:', req.body)
  if(!item[UserName]) {
    item[UserName] = {}
  }
  item[UserName][ItemId] = {
    "ItemId": ItemId,
    "ItemName": ItemName,
    "ItemPrice": ItemPrice,
    "ItemDescription": ItemDescription,
    "ItemImage": ItemImage
  }
  const response =
    {}
  console.log('Sending response:', response);
  res.json(response);
});

function deleteItem( itemId ) {
  for (let key in item) {
    if(item[key][itemId]) {
      delete item[key][itemId]
    }
  }
}

server.post('/Interface31', (req, res) => { // Delete ItemData
  console.log('Interface31')
  const { ItemId } = req.body;
  console.log('Receiving request:', req.body)
  deleteItem(ItemId)
  const response =
    {}
  console.log('Sending response:', response);
  res.json(response);
});