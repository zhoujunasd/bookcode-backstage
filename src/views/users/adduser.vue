<template>
    <div>
        <h2>添加管理员</h2>
        <div class="formData">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left">
                <el-form-item label="用户名：" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="昵称：" prop="nickname">
                    <el-input v-model="ruleForm.nickname"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="管理员头像：" >
                    <!-- :headers="{ methods:'post','Content-Type':'multipart/form-data'}" -->
                <el-upload
                    class="avatar-uploader"
                    action="https://upload-z1.qiniup.com"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :limit=1
                    :data="token">
                    <img v-if="img" :src="img" class="avatar el-upload">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
import axios from 'axios'
export default {
  name: "adduser",
  data() {
      var validatePass =(rule, value, callback) => {
          let reg = /^[a-zA-Z0-9]{4,10}$/;
          if(value === " "){
              callback(new Error('请输入密码'));
          }else if (reg.test(value) == false){
             callback (new Error('密码不能含有非法字符，长度在4-10之间'))
          }else{
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
          let reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
        //   let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/g;
          if(value === ""){
              callback(new Error('请输入邮箱'))
          }else if(reg.test(value) == false){
              callback(new Error('请输入正确邮箱地址'))
          }else{
              callback()
          }
      };
    return {
        token:{},
        img:'',
      ruleForm: {
          username:"",
          nickname:"",
          email:"",
          password:"",
          chackpassword:"",
          desc:"",
          avatar:""
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
            // {required: true,validator:emailPass, trigger: "blur"},
            {required: true,message:"请输入邮箱地址", trigger: "blur"},
            {required: true,pattern:/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/g, 
                message: "请输入正确邮箱地址",trigger: "blur"}
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
      getToken(){
          axios.get('http://upload.yaojunrong.com/getToken').then(res => {
            //   console.log(res)
              this.token.token = res.data.data
          })
      },
    submitForm(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            //   console.log(this.ruleForm)
             this.$axios.post('/user',this.ruleForm).then(res => {
                // console.log(res)
                if(res.code == 200 ){
                  this.$message.success({
                      showClose:false,
                      message:'管理员添加成功',
                      duration:1500
                  })
                 setTimeout(() => {
                      this.$router.push('/layout/users')
                 }, 1000);
              }else{
                  this.$message.error(res.msg)
              }
            })
          } else {
            this.$message.error({
                message:"数据填写错误",
                duration:1500,
                showClose:false,
            })
            return false;
          }
        });
    },
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
    },
    handleAvatarSuccess(res, file) {
        // console.log(res)
        this.img = URL.createObjectURL(file.raw);
        // console.log(this.ruleForm.avatar)
        this.ruleForm.avatar = res.url
    },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt1M;
    }
  },
  created(){
      this.getToken()
  }
};
</script>

<style scoped lang="scss">
.formData{
    width: 500px
}
</style>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 122px;
    height: 122px;
    line-height: 122px;
    text-align: center;
  }
  .avatar {
    width: 122px;
    height: 122px;
    display: block;
  }
</style>