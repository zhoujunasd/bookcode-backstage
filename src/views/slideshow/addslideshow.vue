<template>
    <div class="form-500">
        <h2 v-if="this.$route.name == 'addslideshow'">添加轮播图</h2>

        <div class="top" v-else>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/layout/slideshow' }">轮播图列表</el-breadcrumb-item>
            <el-breadcrumb-item>轮播图详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>


        <el-form size='small' :model="formData" label-width="100px" label-position="left">
            <el-form-item label="轮播图标题："  >
                <el-input v-model="formData.title" :disabled='dis_able'></el-input>
            </el-form-item>
            <el-form-item label="图书分类：" >
                <el-select v-model="formData.category" @change="categoryChange" :disabled='dis_able'>
                    <el-option v-for="(item, index) in cateGoryData" 
                        :key="index"
                        :label="item.title"
                        :value="item._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="轮播图书籍："  v-if="getBookItem[0]"> 
                <div class="book-item clearfix">
                    <div class="img-wrap">  
                        <img :src="getBookItem[0].img" >
                    </div>
                    <div class="book-desc">
                        <div class="title">书名：{{getBookItem[0].title}}</div>
                        <div class="author">作者：{{getBookItem[0].author}}</div>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="轮播图图片：">
                <el-upload
                        class="avatar-uploader"
                        action="https://upload-z1.qiniup.com"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :limit=1
                        :data="token"
                        :disabled='dis_able'>
                    <img v-if="this.formData.img" :src="this.formData.img" class="avatarimg el-upload">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
            </el-form-item>
            <el-form-item label="轮播图权重：">
                <el-input-number v-model="formData.index" :min="1" :max="999" :disabled='dis_able' ></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button @click="handle_Sub" type="primary" v-if="this.$route.name == 'addslideshow'">添加轮播图</el-button>
                <div v-else>
                    <el-button type="primary" size="small" @click="editBook" >{{dis_able ? '编辑信息':'取消修改'}}</el-button>
                    <el-button type="warning" size="small" @click="saveBook" >保存更改</el-button>
                </div>
            </el-form-item>
        </el-form>

        <el-dialog title="书籍列表" :visible.sync="isShowDialog">
            <el-table :data="bookData">
                <el-table-column property="title" label="书名" width="160"  align='center' show-overflow-tooltip></el-table-column>
                <el-table-column property="author" label="作者" width="160" align='center' show-overflow-tooltip></el-table-column>
                <el-table-column label="书籍封面" width="120" align='center'>
                    <template slot-scope="scope">
                        <img :src="scope.row.img" class="avatar" >
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120" align='center'>
                    <template slot-scope="scope" align='center'>
                        <el-button type="primary" size="small" @click="addBook(scope.row._id)">添加</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                background
                style='float:right;'
                layout="prev, pager, next"
                :page-size="3"
                :total="bookCount"
                @current-change="currentchange">
            </el-pagination>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                token:this.$store.state.token,
                formData:{
                    title:"",//轮播图标题
                    img:"",//轮播图图片
                    book:"",//书籍ID
                    index:"",//权重
                    category:"",//分类
                },
                cateGoryData:[],//分类列表数据
                bookData:[],//书籍列表数据
                bookCount:0,//书籍分页
                isShowDialog:false,
                page:1,
                dis_able:true
            }
        },
        methods:{
            editBook(){
                if(!this.dis_able){
                    this.$router.push('/layout/slideshow')
                }else{
                    this.dis_able = !this.dis_able
                }
            },
            handle_Sub(){
                //判断是否所有的数据都已经有了
                let isCan = true
                for(let key in this.formData){
                    if(!this.formData[key]){
                        isCan = false
                    }
                }
                if(isCan){
                    this.$axios.post('/swiper',this.formData).then(res => {
                        if(res.code == 200){
                            this.$message.success(res.msg)
                            this.$router.push({name:'slideshow'})
                        }else{
                            this.$message.error('缺少参数')
                        }
                    })
                }
            },
            currentchange(page){
                this.page = page
                this.getBookData()
            },
            addBook(bookid){
                this.formData.book = bookid
                this.isShowDialog = false
            },
            categoryChange(){
                this.isShowDialog = true
                this.getBookData()
            },
            async getBookData(){          
                    const data = await this.$axios.get(`/category/${this.formData.category}/books`,{pn:this.page,size:3})
                    this.bookData = data.data.books
                    this.bookCount = data.count
                    // console.log(this.bookData)
            },
            getCateGory(){
                this.$axios.get('/category',{size:1000}).then(res => {
                    if(res.code == 200){
                        this.cateGoryData = res.data
                    }else{
                        this.$message.error(res.msg)
                    }
                })
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
            // 编辑轮播图时用
            getInitData() {
                this.$axios.get(`/swiper/${this.$route.query.id}`).then(res => {
                 // console.log(res);
                if(res.code == 200){
                    this.formData={
                        ...this.formData,
                        ...res.data,
                        book:res.data.book._id,
                        category:res.data.book.type
                    }
                    this.getBookData()
                    // console.log(this.data)
                    // 后端限制，默认是每次给四条数据，权宜之计设置比较大的数，不好=============================================================
                    this.$axios.get(`/category/${this.formData.category}/books`,{size:1000}).then(res => {
                        this.bookData = res.data.books
                        this.bookCount = res.count
                    })
                }else{
                    this.$message.error(res.msg)
                }
          });
        },
        // // 添加轮播图
        addSwiper(){
            this.$axios.get(`book/${this.$route.query.id}`).then(res => {
                // console.log(res)
                this.formData={
                    book:res.data._id,
                    category:res.data.type,
                    index:1
                }
                this.$axios.get(`/category/${this.formData.category}/books`,{size:1000}).then(res => {
                    this.bookData = res.data.books
                    this.bookCount = res.count
                })
            })
            // formData:{
            //         title:"",//轮播图标题
            //         img:"",//轮播图图片
            //         book:"",//书籍ID
            //         index:"",//权重
            //         category:"",//分类
            //     },
        },
        saveBook(){
            this.$axios.put(`/swiper/${this.$route.query.id}`,this.formData).then(res => {
                if(res.code == 200){
                    this.$message.success(res.msg)
                    this.$router.push({name:'slideshow'})
                }else{
                    this.$message.errror(res.msg)
                }
            })
        }
        },
        computed:{
            getBookItem(){
                if(this.formData.book){
                    return this.bookData.filter(item => item._id == this.formData.book)
                }else{
                    return []
                }
            }
        },
        // watch:{
        //     routerName(val){
        //         if(val == 'addslideshow'){
        //             console.log('res')
        //         }else{
        //             console.log('req')
        //         }
        //     }
        // },
        created(){
            // console.log('sdad')
            this.getCateGory()
            if(this.$route.name == 'addslideshow'){
                if(this.$route.query.id == ''){
                    this.formData = {
                        title:"", img:"", book:"", index:"",category:"",
                    }
                }else{
                    this.addSwiper()
                    // console.log(this.$route.query.id)
                }
                 this.dis_able = false
            }else{
                this.getInitData()
            }
        },
        watch:{
            $route(){
                // console.log(this.$route.name)
            if(this.$route.name == 'addslideshow'){
                this.formData = {
                    title:"", img:"", book:"", index:"",category:"",
                }
                this.dis_able = false
            }
            }
        },
        // beforeRouteUpdate (to, from, next) {
        // // 在当前路由改变，但是该组件被复用时调用
        // // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // // 可以访问组件实例 `this`
        // //  if(this.$route.name == 'addslideshow'){
        // //         this.formData = {
        // //             title:"", img:"", book:"", index:"",category:"",
        // //         }
        // //     }
        // console.log(to)
        // console.log(from)
        // next()
        // },
    }
</script>

<style>
.top{
    margin-bottom: 20px;
}
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
  .avatarimg {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
<style scoped lang="scss">
.avatar{
  width: 60px;
  height: 60px;
}
.book-item{
    width: 360px;
    padding: 15px;
    border: 1px solid skyblue;
    border-radius: 6px;
    // margin-top: 20px;

    .img-wrap{
        float: left;
        width: 80px;
        height: 100px;

        img{
            display: block;
            height: 100%;
            width: 100%;
        }
    }
    .book-desc{
        float: left;
        margin-left: 20px;

        .title{
            color: #333;
            font-weight: 700;
            font-size: 14px;
            width: 240px;
        }
        .author{
            color: #ccc;
            width: 240px;
            font-size: 12px;
        }
    }
}
</style>