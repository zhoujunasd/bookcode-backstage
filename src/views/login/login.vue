<template>
    <div class="container">
        <h1 class="title">book-code后台管理系统</h1>
        <div class="login-box">
            <h2 class="login-box-title">登陆</h2>
            <el-form class="from" ref="form" :rules="rules" :model="formData" label-width="80px">
                <el-form-item label="用户名：" prop="username"> 
                    <el-input v-model="formData.username" prop="username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密 码：" prop="password">
                    <el-input v-model="formData.password"  type="password" placeholder="请输入密码" @keyup.enter.native="handleLogin"></el-input>
                </el-form-item>
                <el-button class="btn" :loading="isLoading" type="primary" @click="handleLogin('form')">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      formData: {
        username: "",
        password: ""
      },
      isLoading: false,
      rules:{
          username:[
              { pattern:/^[a-zA-Z0-9]{2,10}$/ ,message:'请输入正确格式',trigger:'blur'},
              ],
          password:[
              { pattern:/^[a-zA-Z0-9]{4,10}$/, message:'请输入正确格式',trigger:'blur'}
              ]
      }
    };
  },
  methods: {
    handleLogin(form) {
      this.isLoading = true;
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$axios.post("/login", this.formData).then(res => {
              //   console.log(res)
              if (res.code == 200) {
                this.$store.commit('CHANGE_USERINFO',res.data)
                this.$store.commit('STORE_PASSWORD',this.formData.password)
                this.$message.success({
                  message: "登陆成功",
                  duration: 1500
                });
                setTimeout(() => {
                  this.$router.push("/layout/index");
                }, 1000);
              } else {
                this.$message.error(res.msg);
              }
              this.isLoading = false;
            })
            .catch(err => {
              this.isLoading = false;
            });
        } else {
          this.$message.error({
            message: "信息填写错误",
            duration: 1500,
            showClose: false
          });
          this.isLoading = false;
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang='scss'>
.container {
  overflow: hidden;
  min-height: 100vh;
  background-color: #545c64;

  .title {
    margin-top: 100px;
    text-align: center;
    color: #fff;
    font-size: 600;
  }
  .login-box {
    width: 400px;
    height: 300px;
    border: 1px solid #f1f1f1;
    border-radius: 9px;
    margin: 30px auto;
    background-color: #f1f1f1;
  }
  .login-box-title {
    margin-top: 20px;
    color: #999;
    font-size: 500;
    text-align: center;
  }
  .from {
    margin: 25px 10px 20px 0;
  }
  .btn {
    margin: 25px 50px;
    width: 300px;
    box-sizing: border-box;
  }
}
</style>
