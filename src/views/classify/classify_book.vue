<template>
    <div>
        <div class="header">
            <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>分类管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/layout/management' }">分类列表</el-breadcrumb-item>
                <el-breadcrumb-item>分类图书详情列表</el-breadcrumb-item>
                <el-button @click="addtypeBook" size='mini' type="primary" circle icon="el-icon-plus"></el-button>
            </el-breadcrumb>

        </div>
        <div class="content">
            <el-form :inline="true" :model="data" class="demo-form-inline">
                <el-form-item label="分类名：">
                    <el-input v-model="data.title" size='medium' disabled></el-input>
                </el-form-item>
                <el-form-item label="权重值：">
                    <el-input v-model="data.index" size='medium' disabled></el-input>
                </el-form-item>
                <el-form-item label="书籍数：">
                    <el-input :value="count" size='medium' disabled></el-input>
                </el-form-item>
                <el-form-item label="分类图标：">
                    <img class="data_icon" :src="data.icon" >
                </el-form-item>
            </el-form>
        </div>
        <div class="books">
            <el-table 
                slot="empty"
                :data="books">
                <el-table-column label="书籍封面" width="120" align='center'>
                    <template slot-scope="scope" header-align='center' align='center'>
                        <img :src="scope.row.img" :onerror="errorImg" class="avatar-img">
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="书名" width="180" align='center' empty-text show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="author" label="作者" width="180" align='center' show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="createTime" label="创建日期" width="180" align='center' show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="index" label="权重值" width="180" align='center'>
                </el-table-column>
                <el-table-column label="操作" align='center'>
                    <template slot-scope="scope">
                        <el-button size="small" type='primary' @click="handleclick(scope.row._id)">生成轮播图</el-button>
                        <el-button size="small" @click="detail_book(scope.row._id)">详情</el-button>
                        <el-button size="small" type="danger" @click="del_book(scope.row._id)" disabled>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination
            class = "bottom"
            background
            :page-size = "3"
            layout="prev, pager, next"
            next-click prev-click
            :total = "count"
            @current-change="currentchange">
        </el-pagination>
    </div>
</template>

<script>
// /category/:id/book/:bookid
    export default {
        data(){
            return{
                books:[],
                data:{},
                errorImg:'this.src="'+require('../../../static/images/404.jpg')+'"',
                page:1,
                count:"",
                // length:this.data.books.length,
            }
        },
        methods:{
            addtypeBook(){
                let id = this.data._id
                this.$router.push({name:'addtypebook',query:{id}})
            },
            //生成轮播图
            handleclick(id){
                this.$router.push({name:'addslideshow',query:{id}})
            },
            detail_book(id){
                this.$router.push({
                    path: `/layout/bookdetails/${id}`,
                })
            },
            del_book(bookId){
                // console.log(bookId)
                this.$axios.del(`/book/${bookId}`).then(res => {
                    if(res.code == 200){
                        this.$message.success({
                            messsage:res.msg,
                            center:true
                        })
                        this.getData()
                    }else{
                        this.$message.error({
                            messsage:res.msg,
                            center:true
                        })
                    }
                })
                let typeID= this.data._id
                this.$axios.del(`/category/${typeID}/book/${bookId}`)
            },
            currentchange(page){
                this.page = page;
                this.getData()
            // console.log(this.getCounts)
            },
            getData(){
                let typeId = this.$route.params.id
                this.count = this.$route.params.count
                this.$axios.get(`category/${typeId}/books`,{pn:this.page,size:3}).then(res => {
                    // console.log(res)
                    if(res.code == 200){
                        this.data  = res.data
                        // console.log(this.data)
                        // console.log(this.books)
                        // console.log(res.data.books)
                        res.data.books.forEach(item=>{
                            let Y = item.createTime.slice(0,4)
                            let M = item.createTime.slice(5,7)
                            let D = item.createTime.slice(8,10)
                            item.createTime = `${Y}年${M}月${D}日`
                            return item})
                        this.books = res.data.books
                    }else{
                        this.$message.error({
                            messsage:res.msg,
                            duration:1500,
                            center:true
                        })
                    }
                })
            },
        },
        created(){
            this.getData()
        },
    }
</script>

<style scoped lang="scss">
.content{
    margin: 20px 0; 
    height: 80px;

    .data_icon{
        width: 80px;
        height: 80px;
    }
}
.avatar-img{
    width: 60px;
    height: 60px;
}
.bottom{
    float: right;
    margin-top: 20px;
}
  .breadcrumb {
    line-height: 29px;
    height: 29px;
  }
</style>