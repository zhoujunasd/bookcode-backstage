<template>
    <div>
        <h2>修改个人信息</h2>
        <div class="formData">
            <el-form :model="formData" ref="ruleformData" :rules="rules" label-width="100px" class="demo-ruleForm" label-position="left">
                <el-form-item label="用户名：" >
                    <el-input v-model="formData.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="昵称：" prop="nickname">
                    <el-input v-model="formData.nickname"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：" prop="email">
                    <el-input v-model="formData.email"></el-input>
                </el-form-item>
                <el-form-item label="管理员头像：" >
                <el-upload
                    class="avatar-uploader"
                    action="https://upload-z1.qiniup.com"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :limit=1
                    :data="token">
                    <img v-if="formData.avatar" :src="formData.avatar" class="avatar el-upload">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                </el-form-item>
                <el-form-item label="个性签名：" >
                    <el-input type="textarea" v-model="formData.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" @click="submitForm('ruleformData')">提交修改</el-button>
                    <el-button type="primary" @click="back_to">返回</el-button>
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
    return {
        token:{},
      formData: {
          username:"",
          nickname:"",
          email:"",
          desc:"",
          avatar:""
      },
      rules: {
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { required: true, min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        email:[
            {required: true,message:"请输入邮箱地址", trigger: "blur"},
            {required: true,pattern:/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/g, 
                message: "请输入正确邮箱地址",trigger: "blur"}
        ],
      }
    };
  },
  methods: {
      back_to(){
          this.$router.push('/layout/users')
      },
      initData(){
          this.formData = {...this.$store.state.userinfo}
      },
    getToken(){
        axios.get('http://upload.yaojunrong.com/getToken').then(res => {
            this.token.token = res.data.data
        })
    },
    submitForm(ruleformData) {
        this.$refs[ruleformData].validate((valid) => {
          if (valid) {
             this.$axios.put('/user/userInfo',this.formData).then(res => {
                if(res.code == 200 ){
                    this.$store.commit('CHANGE_USERINFO',res.data)
                    this.$message.success({
                        showClose:false,
                        message:'个人信息修改成功',
                        duration:1500
                    })
                //   this.initData()
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
    handleAvatarSuccess(res, file) {
        // this.formData.avatar = URL.createObjectURL(file.raw);
        this.formData.avatar = res.url
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
      this.getToken(),
      this.initData()
  }
};
</script>

<style scoped lang="scss">
.formData{
    width: 500px;
    margin-top: 15px
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