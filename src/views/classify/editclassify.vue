<template>
    <div>
        <h2>修改分类</h2>
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
                <el-form-item label="权重值：">
                    <el-input-number size="medium" v-model="Data.index" :max='999' :min='1'></el-input-number>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="onSubmit">提交修改</el-button>
                    <el-button type="primary" @click="go_back">取消修改</el-button>
                </el-form-item>
            </el-form> 
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                typeId:'',
                token:{},
                Data:{
                    books:[],
                    title:"",
                    icon:"",
                    index:""
                }
            }
        },
        methods:{ 
            go_back(){
                this.$router.push('/layout/management')
            },
            initData(){
                this.token =this.$store.state.token
            },
            onSubmit(){
                this.$axios.put(`/category/${this.typeId}`,this.Data).then(res => {
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
            // getId(){
            //     // console.log(this.$route.params.id)
            //     this.typeId = this.$route.params.id
            // },
            getData(){
                this.typeId = this.$route.params.id
                this.$axios.get(`/category/${this.typeId}`).then(res => {
                    // console.log(res)
                    if(res.code == 200){
                        this.Data = res.data
                    }
                })
            },
            handleAvatarSuccess(res, file) {
                // console.log(res)
                // this.img = URL.createObjectURL(file.raw);
                // console.log(this.ruleForm.avatar)
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
            }
        },
        created(){
            // this.getId()
            this.getData()
            this.initData()
        }
    }
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
    width: 500px;
}
</style>