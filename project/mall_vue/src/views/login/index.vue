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
          <el-button style="width: 25%" type="primary" :loading="loading" @click.native.prevent="handleLogin(false), updateGlobalVariable_for_mall()">
            login
          </el-button>
          <el-button style="width: 40%" type="primary" :loading="adminloading" @click.native.prevent="handleAdminLogin(),updateGlobalVariable_for_admin()">
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
  import login_center_bg from '@/assets/images/login_center_bg.png';
  import axios from 'axios';

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
      updateGlobalVariable_for_mall() {
        this.$globalVariable = 1;
      },
      updateGlobalVariable_for_admin() {
        this.$globalVariable = 0;
      },
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      mapOutputData(item) {
        return {
          UserName: item.username,
          UserPassword: item.password
        };
      },
      async checkValid() {  // No longer used
          //数据库
          
          // const blob = new Blob([JSON.stringify(this.mapOutputData(this.loginForm))],
          //                       {type: 'application/json'});
          // window.open(URL.createObjectURL(blob));
          // let valid = require('@/public/1/login_validator.json')["Validator"];

          // 发送 POST 请求到登录验证 API
      },
      handleLogin(admin = false) {
        debugger
        // 数据库
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            fetch('http://127.0.0.1:3000/Interface18', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: this.loginForm.username,
                password: this.loginForm.password
              })
            }).then(response => {
              return response.json();  // 解析 JSON 数据
            }).then(data => {
              if (data.success && this.loginForm.username != "admin") {
                this.$message({
                  message: 'Login successfully',
                  type: 'success',
                  duration: 1000
                });
                const loadingKey = admin ? 'adminloading' : 'loading';
                this[loadingKey] = true;
                this.$store.dispatch('Login', this.loginForm).then(() => {
                  this.loading = false;
                  setCookie("username",this.loginForm.username,15);
                  setCookie("password",this.loginForm.password,15);
                  
                  //this.updateGlobalVariable_for_mall();
                  let test = this.$globalVariable;
                  this.$router.push({path: '/shopper'})
                });
              } else {
                this.$message({
                  message: 'Wrong username or password',
                  type: 'error',
                  duration: 1000
                });
              }
            }).catch(error => {
              console.error('Error during login validation:', error);
              this.$message.error('Server error');
            });
          } else {
            console.log('error submit!!');
          }
        });
      },
      handleAdminLogin() {
        debugger
        // 数据库
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            fetch('http://127.0.0.1:3000/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: this.loginForm.username,
                password: this.loginForm.password
              })
            }).then(response => {
              return response.json();  // 解析 JSON 数据
            }).then(data => {
              if (data.success && this.loginForm.username == "admin") {
                this.$message({
                  message: 'Login successfully',
                  type: 'success',
                  duration: 1000
                });
                this.adminloading = true;
                this.$store.dispatch('Login', this.loginForm).then(() => {
                  this.adminloading = false;
                  setCookie("username", this.loginForm.username, 15);
                  setCookie("password", this.loginForm.password, 15);
                  this.$router.push({ path: '/manager' });
                }).catch(() => {
                  this.adminloading = false;
                });
              } else {
                this.$message({
                  message: 'Wrong username or password',
                  type: 'error',
                  duration: 1000
                });
              }
            }).catch(error => {
              console.error('Error during login validation:', error);
              this.$message.error('Server error');
            });
          } else {
            console.log('error submit!!');
          }
        });
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
