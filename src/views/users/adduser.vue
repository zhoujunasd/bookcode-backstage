<template>
    <div>
        <h2>添加管理员</h2>
        <div class="formData">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名：" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="昵称：" prop="nickname">
                    <el-input v-model="ruleForm.nickname"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input type='password' v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" prop="chackpassword">
                    <el-input type='password' v-model="ruleForm.chackpassword"></el-input>
                </el-form-item>
                <el-form-item label="个性签名：" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
                    <el-button type="warning" @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  name: "adduser",
  data() {
      var validatePass =(rule, value, callback) => {
          if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.password !== '') {
            // this.$refs.ruleForm.validateField('password');
          }
          callback();
        }
      };
      var validatePass1 =(rule, value, callback)=>{
          if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var emailPass=(rule, value, callback)=>{
          
      };
    return {
      ruleForm: {
          username:"",
          nickname:"",
          email:"",
          password:"",
          chackpassword:"",
          desc:""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {  min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { required: true, min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        email:[
            {required: true,validator:emailPass, trigger: "blur"}
        ],
        password:[
            {required: true, validator:validatePass, trigger: "blur"}
        ],
        chackpassword:[
            {required: true, validator:validatePass1, trigger: "blur"}
        ],
        desc: [{ required: true, message: "请填写个性签名", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(ruleForm) {
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     alert('submit!');
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
    },
    resetForm(ruleForm) {
    //   this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped lang='scss'>
.formData{
    width: 500px
}
</style>