<template>
    <div>
        <h2 class="top">添加图书</h2>
        <el-form class="form-500" label-width="90px" label-position="left" :model="formData">
            <el-form-item label="网址：">
                <el-input v-model="formData.url"></el-input>
            </el-form-item>
            <el-form-item label="作者：">
                <el-input v-model="formData.author"></el-input>
            </el-form-item>
            <el-form-item label="书籍封面：">
                <el-switch
                v-model="isUpload"
                active-text="手动上传"
                inactive-text="封面网址"></el-switch>
                <el-upload
                    v-if="isUpload"
                        class="avatar-uploader"
                        action="https://upload-z1.qiniup.com"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :limit=1
                        :data="token">
                    <img v-if="this.formData.img" :src="this.formData.img" class="avatar el-upload">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                <el-input v-else v-model="formData.img"></el-input>
            </el-form-item>
            <el-form-item label="书籍分类：">
                <el-select v-model="formData.typeId">
                    <el-option
                        v-for="(item, index) in categoryData" 
                        :key="index"
                        :label="item.title"
                        :value="item._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleclick">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                token:this.$store.state.token,
                formData:{
                    url:"",
                    author:"",
                    img:"",
                    typeId:"",
                },
                isUpload:false,
                categoryData:[]
            }
        },
        methods:{
            handleclick(){
                this.$axios.post('/book',this.formData).then(res => {
                    if(res.code == 200){
                        this.$message.success(res.msg)
                        this.$router.push({name:'book'})
                    }else{
                        this.$message.error(res.msg)
                    }
                })
            },
            async getcategoryData(){
                const res = await this.$axios.get('/category')
                this.categoryData = res.data
            },
             handleAvatarSuccess(res, file) {
                this.formData.img = res.url
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
        },
        created(){
            this.getcategoryData()
        }
    }
</script>

<style >
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
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
.top{
    margin-bottom: 20px;
}
</style>
