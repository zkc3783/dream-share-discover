<template>
  <div>
    <el-card class="login-form-layout">
      <el-form autoComplete="on"
               :model="loginForm"
               :rules="loginRules"
               ref="loginForm"
               label-position="left">
        <div style="text-align: center">
          <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
        </div>
        <h2 class="login-title color-main">Login</h2>
        <el-form-item prop="username">
          <el-input name="username"
                    type="text"
                    v-model="loginForm.username"
                    autoComplete="on"
                    placeholder="Enter name">
          <span slot="prefix">
            <svg-icon icon-class="user" class="color-main"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password"
                    :type="pwdType"
                    v-model="loginForm.password"
                    autoComplete="on"
                    placeholder="Enter password">
          <span slot="prefix">
            <svg-icon icon-class="password" class="color-main"></svg-icon>
          </span>
            <span slot="suffix" @click="showPwd">
            <svg-icon icon-class="eye" class="color-main"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px;text-align: center">
          <el-button style="width: 25%" type="primary" :loading="loading" @click.native.prevent="handleLogin(false)">
            login
          </el-button>
          <el-button style="width: 40%" type="primary" :loading="adminloading" @click.native.prevent="handleAdminLogin">
            admin login
          </el-button>
          <el-button style="width: 25%" type="primary" @click.native.prevent="handleTry">
            register
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <img :src="login_center_bg" class="login-center-layout">
  </div>
</template>

<script>
  import {isvalidUsername} from '@/utils/validate';
  import {setSupport,getSupport,setCookie,getCookie} from '@/utils/support';
  import login_center_bg from '@/assets/images/login_center_bg.png'

  const mall_menu = {
      "menus":[
      {
          "id": 1,
          "parentId": 0,
          "createTime": "2020-02-02T06:50:36.000+00:00",
          "title": "商品",
          "level": 0,
          "sort": 0,
          "name": "pms",
          "icon": "product",
          "hidden": 0
      },
      {
          "id": 2,
          "parentId": 1,
          "createTime": "2020-02-02T06:51:50.000+00:00",
          "title": "商品列表",
          "level": 1,
          "sort": 0,
          "name": "product",
          "icon": "product-list",
          "hidden": 0
      },
      {
          "id": 3,
          "parentId": 1,
          "createTime": "2020-02-02T06:52:44.000+00:00",
          "title": "添加商品",
          "level": 1,
          "sort": 0,
          "name": "addProduct",
          "icon": "product-add",
          "hidden": 0
      },
      {
          "id": 4,
          "parentId": 1,
          "createTime": "2020-02-02T06:53:51.000+00:00",
          "title": "商品分类",
          "level": 1,
          "sort": 0,
          "name": "productCate",
          "icon": "product-cate",
          "hidden": 0
      },
      {
          "id": 5,
          "parentId": 1,
          "createTime": "2020-02-02T06:54:51.000+00:00",
          "title": "商品类型",
          "level": 1,
          "sort": 0,
          "name": "productAttr",
          "icon": "product-attr",
          "hidden": 0
      }
  ],
      "username": "admin"
  }

  const admin_menu = {
      "menus" : [
      {
          "id": 1,
          "parentId": 0,
          "createTime": "2020-02-02T06:50:36.000+00:00",
          "title": "商品",
          "level": 0,
          "sort": 0,
          "name": "pms",
          "icon": "product",
          "hidden": 0
      },
      {
          "id": 2,
          "parentId": 1,
          "createTime": "2020-02-02T06:51:50.000+00:00",
          "title": "商品列表",
          "level": 1,
          "sort": 0,
          "name": "product",
          "icon": "product-list",
          "hidden": 0
      },
      {
          "id": 3,
          "parentId": 1,
          "createTime": "2020-02-02T06:52:44.000+00:00",
          "title": "添加商品",
          "level": 1,
          "sort": 0,
          "name": "addProduct",
          "icon": "product-add",
          "hidden": 0
      },
      {
          "id": 4,
          "parentId": 1,
          "createTime": "2020-02-02T06:53:51.000+00:00",
          "title": "商品分类",
          "level": 1,
          "sort": 0,
          "name": "productCate",
          "icon": "product-cate",
          "hidden": 0
      },
      {
          "id": 5,
          "parentId": 1,
          "createTime": "2020-02-02T06:54:51.000+00:00",
          "title": "商品类型",
          "level": 1,
          "sort": 0,
          "name": "productAttr",
          "icon": "product-attr",
          "hidden": 0
      },
      {
          "id": 21,
          "parentId": 0,
          "createTime": "2020-02-07T08:29:13.000+00:00",
          "title": "权限",
          "level": 0,
          "sort": 0,
          "name": "ums",
          "icon": "ums",
          "hidden": 0
      },
      {
          "id": 22,
          "parentId": 21,
          "createTime": "2020-02-07T08:29:51.000+00:00",
          "title": "用户列表",
          "level": 1,
          "sort": 0,
          "name": "admin",
          "icon": "ums-admin",
          "hidden": 0
      },
      {
          "id": 23,
          "parentId": 21,
          "createTime": "2020-02-07T08:30:13.000+00:00",
          "title": "角色列表",
          "level": 1,
          "sort": 0,
          "name": "role",
          "icon": "ums-role",
          "hidden": 0
      }
  ],
      "username": "admin"
  }

  export default {
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('Enter the correct user name format!'))
        } else {
          callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 3) {
          callback(new Error('The password cannot be less than 3 digits!'))
        } else {
          callback()
        }
      };
      return {
        loginForm: {
          username: '',
          password: '',
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}]
        },
        loading: false,
        adminloading: false,
        pwdType: 'password',
        login_center_bg,
        dialogVisible:false,
        supportDialogVisible:false,
        mall_data: Object.assign({}, mall_menu),
        admin_data: Object.assign({}, admin_menu),
      }
    },
    created() {
      this.loginForm.username = getCookie("username");
      this.loginForm.password = getCookie("password");
      if(this.loginForm.username === undefined||this.loginForm.username==null||this.loginForm.username===''){
        this.loginForm.username = 'admin';
      }
      if(this.loginForm.password === undefined||this.loginForm.password==null){
        this.loginForm.password = '';
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin(admin = false) {
        debugger
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            // let isSupport = getSupport();
            // if(isSupport===undefined||isSupport==null){
            //   this.dialogVisible =true;
            //   return;
            // }
            const loadingKey = admin ? 'adminloading' : 'loading';
            this[loadingKey] = true;
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false;
              setCookie("username",this.loginForm.username,15);
              setCookie("password",this.loginForm.password,15);

              this.$router.push({path: '/'})
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!');
            return false
          }
        })
      },
      handleAdminLogin() {
        debugger
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            // let isSupport = getSupport();
            // if(isSupport===undefined||isSupport==null){
            //   this.dialogVisible =true;
            //   return;
            // }
            this.adminloading = true;
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.adminloading = false;
              setCookie("username",this.loginForm.username,15);
              setCookie("password",this.loginForm.password,15);

              //fs.writeFileSync(filePath, JSON.stringify(admin_data)),(err) => {
              //  if (err) {
              //    throw err;
              //  }
              //  console.log('JSON 对象已成功写入文件！');}

              this.$router.push({path: '/'})
            }).catch(() => {
              this.adminloading = false;
            });
          } else {
            console.log('error submit!!');
            return false
          }
        })
      },
      handleTry(){
        debugger
        this.$router.push({path:'/register'})
      },
    }
  }
</script>

<style scoped>
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: 140px auto;
    border-top: 10px solid #409EFF;
  }

  .login-title {
    text-align: center;
  }

  .login-center-layout {
    background: #409EFF;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 200px;
  }
</style>
