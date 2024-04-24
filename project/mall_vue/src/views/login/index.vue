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
  import login_center_bg from '@/assets/images/login_center_bg.png'

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
          Password: item.password
        };
      },
      checkValid() {
          //数据库
          const blob = new Blob([JSON.stringify(this.mapOutputData(this.loginForm))],
                                {type: 'application/json'});
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'output.json';
          a.click();
          URL.revokeObjectURL(a.href);
          let valid = require('@/public/login_validator.json')["Validator"];
          if(valid) {
            this.$message({
              message: 'Login successfully',
              type: 'success',
              duration: 1000
            });
          } else {
            this.$message({
              message: 'Wrong username or password',
              type: 'error',
              duration: 1000
            });
          }
          return valid;
      },
      handleLogin(admin = false) {
        debugger
        this.$refs.loginForm.validate(valid => {
          if (valid && this.checkValid()) {
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
              
              //this.updateGlobalVariable_for_mall();
              let test = this.$globalVariable;
              this.$router.push({path: '/shopper'})
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
          if (valid && this.checkValid()) {
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
              //this.updateGlobalVariable_for_admin();
              let test = this.$globalVariable;
              this.$router.push({path: '/manager'})
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
