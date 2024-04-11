# mall-admin-web

### 项目演示

### 技术选型

| 技术              | 说明                  | 官网                                                         |
| ----------------- | --------------------- | ------------------------------------------------------------ |
| Vue               | 前端框架              | [https://vuejs.org/](https://vuejs.org/)                     |
| Vue-router        | 路由框架              | [https://router.vuejs.org/](https://router.vuejs.org/)       |
| Vuex              | 全局状态管理框架      | [https://vuex.vuejs.org/](https://vuex.vuejs.org/)           |
| Element           | 前端UI框架            | [https://element.eleme.io/](https://element.eleme.io/)       |
| Axios             | 前端HTTP框架          | [https://github.com/axios/axios](https://github.com/axios/axios) |
| v-charts          | 基于Echarts的图表框架 | [https://v-charts.js.org/](https://v-charts.js.org/)         |
| Js-cookie         | cookie管理工具        | [https://github.com/js-cookie/js-cookie](https://github.com/js-cookie/js-cookie) |
| nprogress         | 进度条控件            | [https://github.com/rstacruz/nprogress](https://github.com/rstacruz/nprogress) |
| vue-element-admin | 项目脚手架参考        | [https://github.com/PanJiaChen/vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) |

### 项目布局

``` lua
src -- 源码目录
├── api -- axios网络请求定义
├── assets -- 静态图片资源文件
├── components -- 通用组件封装
├── icons -- svg矢量图片文件
├── router -- vue-router路由配置
├── store -- vuex的状态管理
├── styles -- 全局css样式
├── utils -- 工具类
└── views -- 前端页面
    ├── home -- 首页
    ├── login -- 登录页
    ├── pms -- 商品模块页面

```

## 搭建步骤
- 克隆源代码到本地，使用IDEA打开，并完成编译;
- 在IDEA命令行中运行命令：`npm install`,下载相关依赖;
- 在IDEA命令行中运行命令：`npm run dev`,运行项目;
- 访问地址：[http://localhost:8090](http://localhost:8090) 即可打开后台管理系统页面;

