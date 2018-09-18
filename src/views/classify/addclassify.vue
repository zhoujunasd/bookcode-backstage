<template>
    <div>
        <div class="header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>分类管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content">
            <el-form :model="Data" label-width="90px" label-position="left">
                 <el-form-item label="分类名：">
                    <el-input v-model="Data.title"></el-input>
                </el-form-item>
                <el-form-item label="图片：">
                    <el-upload
                        class="avatar-uploader"
                        action="https://upload-z1.qiniup.com"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :limit=1
                        :data="token">
                    <img v-if="this.Data.icon" :src="this.Data.icon" class="avatar el-upload">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addClassify">添加分类</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                token:this.$store.state.token,
                Data:{
                    title:"",
                    icon:"",
                }
            }
        },
        methods:{
            handleAvatarSuccess(res, file) {
                this.Data.icon = res.url
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
            },
            addClassify(){
                this.$axios.post('category',this.Data).then(res => {
                    // console.log(res)
                    if(res.code == 200){
                        this.$message.success({
                            message:res.msg,
                            duration:1500,
                            center:true
                        })
                        this.$router.push('/layout/management')
                    }else{
                         this.$message.error({
                            message:res.msg,
                            duration:1500,
                            center:true
                        })
                    }
                })
            },
        },
}; 
</script>

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
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
<style scoped>
.content{
    margin-top:30px;
    width:500px;
}
</style>