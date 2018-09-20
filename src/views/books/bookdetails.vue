<template>
    <div>
        <h2>书籍详情</h2>
         <div class="top">
            <el-form :inline="true" :model="type" class="demo-form-inline">
                <el-form-item label="图书所在分类：">
                    <el-input v-model="type.title" size='mini' disabled></el-input>
                </el-form-item>
                <el-form-item label="书籍数：">
                    <el-input v-model="length" size='mini' disabled></el-input>
                </el-form-item>
                <el-form-item label="分类图标：">
                    <img class="data_icon" :src="type.icon" >
                </el-form-item>
            </el-form>
        </div>
        <div class="content">
            <el-form :model="book" label-width="100px" label-position="left">
                <el-form-item label="书名：">
                    <el-input v-model="book.title" size='medium' :disabled="disable"></el-input>
                </el-form-item>
                <el-form-item label="作者：">
                    <el-input v-model="book.author" size='medium' :disabled="disable"></el-input>
                </el-form-item>
                <el-form-item label="图片：">
                    <el-upload
                        class="avatar-uploader"
                        action="https://upload-z1.qiniup.com"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :limit=1
                        :data="token"
                        :disabled="disable">
                    <img v-if="this.book.img" :src="this.book.img" class="avatar el-upload">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="创建时间：">
                    <el-input v-model="book.createTime" size='medium' disabled></el-input>
                </el-form-item>
                <el-form-item label="详情：">
                    <el-input type="textarea" class="text_area" v-model="book.desc" :disabled="disable"></el-input>
                </el-form-item>
                <el-form-item label="权重值：">
                    <el-input-number size="small" v-model="book.index" :max='999' :min='1' :disabled="disable"></el-input-number>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="edit_on">{{disable ? '编辑图书':'取消修改' }}</el-button>
                    <el-button v-if="!disable" type="warning" size="small" @click="submit">提交修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                bookId:this.$route.params.bookid,
                typeId:"",
                book:{},
                type:{},
                length:"",//数据冗余
                token:this.$store.state.token,
                disable:true
            }
        },
        methods:{
            // book_id:"",index:"",desc:"",author:"",img:"",type:"",title:"",
            submit(){
                this.book.book_id = this.book._id
                this.$axios.put('book',this.book).then(res => {
                    // console.log(res)
                    if(res.code == 200){
                        this.$message.success({
                            message:res.msg,
                            center:true,
                        })
                        this.$router.push('/layout/book')
                    }else{
                         this.$message.error({
                            message:res.msg,
                            center:true,
                        })
                    }
                })
            },
            edit_on(){
                this.disable = !this.disable
                if(this.disable){
                    this.getData()
                }
            },
            getType(){
                this.$axios.get(`/category/${this.typeId}`).then(res => {
                    // console.log(res)
                    if(res.code == 200){
                        this.type = res.data
                        this.length = this.type.books.length
                    }else{
                        this.$message.success({
                            message:res.msg,
                            center:true
                        })
                    }
                })
            },
            getData(){
                this.$axios.get(`book/${this.bookId}`).then(res => {
                    // console.log(res)
                    if(res.code == 200){
                        this.book = res.data
                        // console.log(this.book)
                        this.typeId = res.data.type
                        this.getType()
                    }else{
                        this.$message.success({
                            message:res.msg,
                            center:true
                        })
                    }
                })
            },
            handleAvatarSuccess(res, file) {
                this.book.icon = res.url
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
            // getBookID(){
            //     // 使用params传参数，可以隐藏数据，但是强制刷新，会丢失数据
            //     // this.bookId  = this.$route.params.bookid
            //     console.log(this.bookId)
            // },
        },
        created(){
            // this.getBookID()
            this.getData()
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
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
  .el-form-item {
    margin-bottom: 8px;
}
</style>
<style scoped lang = "scss">
.top{
    .data_icon{
        width: 60px;
        height: 60px;;
    }
    .el-input{
        width: 180px;
    }
    .demo-form-inlin{
        height: 70px;
    }
}
.content{
    width: 500px;
}

</style>