<template>
    <div class="container">
        <h1 class="title">book-code后台管理系统</h1>
        <div class="login-box">
            <h2 class="login-box-title">登陆</h2>
            <el-form class="from" ref="form" :model="formData" label-width="80px">
                <el-form-item label="用户名：">
                    <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密 码：">
                    <el-input v-model="formData.password" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-button class="btn" :loading="isLoading" type="primary" @click="handleLogin">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  name: "login",
  data(){
      return {
        formData:{
            username:"",
             password:""
        },
        isLoading:false
      }
  },
  methods:{
      handleLogin(){
          this.isLoading = true
          this.$axios.post('/login',this.formData).then(res => {
              console.log(res)
              if(res.code == 200 ){
                  this.$message.success('登录成功')
              }else{
                  this.$message.error(res.msg)
              }
              this.isLoading = false
          }).catch(err => {
               this.isLoading = false
          })
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
  .login-box-title{
      margin-top: 20px;
      color: #999;
      font-size: 500;
      text-align: center;
  }
  .from{
      margin:25px 10px 20px 0;
  }
  .btn{
      margin: 25px 50px;
      width: 300px;
      box-sizing: border-box
  }
}
</style>
