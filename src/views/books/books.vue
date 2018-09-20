<template>
    <div>
        <div class="header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>图书管理</el-breadcrumb-item>
                <el-breadcrumb-item>图书列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content">
            <el-table 
                slot="empty"
                :data="data"
                align='center'
                tooltip-effect="light">
                <el-table-column label="书籍封面" width="120" align='center'  header-align='center'>
                    <template slot-scope="scope" header-align='center' align='center'>
                        <img :src="scope.row.img" :onerror="errorImg" class="avatar-img">
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="书名" width="240" align='center' empty-text show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="author" label="作者" width="180" align='center' show-overflow-tooltip>
                </el-table-column>
                <!-- <el-table-column prop="desc" label="简介" width="240"    align='center' show-overflow-tooltip>
                </el-table-column> -->
                <el-table-column prop="createTime" label="创建日期" width="180" align='center' show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="index" label="权重值" width="120" sortable align='center'>
                </el-table-column>
                <el-table-column label="操作" align='center' width="240">
                    <template slot-scope="scope">
                        <div v-if="!isAdd">
                            <el-button size="small" @click="bookdetails(scope.row._id)">详情</el-button>
                            <el-button size="small" type="danger" @click="del_book(scope.row._id,scope.row.type._id)" disabled>删除</el-button>
                        </div>
                            <el-button v-else size="small" type="primary" @click="addtypeBook(scope.row._id)">添加</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination
            class = "bottom"
            background
            
            :page-size = "5"
            layout="prev, pager, next"
            next-click prev-click
            :total = "count"
            @current-change="currentchange">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                data:[],
                errorImg:'this.src="'+require('../../../static/images/404.jpg')+'"',
                count:0,
                getcount:1,
                page:1,
                isAdd:false,
            }
        },
        methods:{
            addtypeBook(bookid){
                this.$axios.post(`category/${this.$route.query.id}/book/${bookid}`).then(res => {
                    // console.log(res)
                    if(res.code == 200){
                        this.$message.success(res.msg)
                    }else{
                        this.$message.error(res.msg)
                    }
                })
            },
            bookdetails(bookId){
                // this.$router.push({
                //     name:'bookdetails',
                //     params: {
                //         bookid: bookId
                //     }
                // })
                    this.$router.push({
                        path: `/layout/bookdetails/${bookId}`,
                    })
            },
            del_book(bookId,typeId){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.del(`/book/${bookId}`).then(res => {
                        // console.log(res)
                        if(res.code == 200){
                            this.$message.success({
                                message: res.msg,
                                center:true
                            })
                            this.getData()
                        }else{
                            this.$message.error({
                                message:res.msg,
                                center:true
                            })
                        }
                    }),
                    this.$axios.del(`/category/${typeId}/book/${bookId}`).then(res => { })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            currentchange(page){
                this.page = page;
                this.getData()
            },
            // {pn:'',size:5}
            getData(){
                this.$axios.get('/book',{pn:this.page,size:5}).then(res => {
                    // console.log(res)
                    if(res.code == 200){
                        res.data.forEach(item=>{
                            let Y = item.createTime.slice(0,4)
                            let M = item.createTime.slice(5,7)
                            let D = item.createTime.slice(8,10)
                            item.createTime = `${Y}年${M}月${D}日`
                        return item})
                        this.data = res.data
                    }else{
                        this.$message.error(res.msg)
                    }
                    //  console.log(this.data)
                })
               
            },
            getCount(){
                this.$axios.get('/book',{pn:this.getcount}).then(res => {
                    // console.log(res.data)
                    if(res.data.length !== 0){
                        this.count += res.data.length
                        this.getcount++
                        this.getCount()
                    }
                    // console.log(this.count)
                })
            },
        },
        watch:{
            $route(){
                if(this.$route.name != 'addtypebook'){
                    this.isAdd = false
                }
            }
        },
        created(){
            this.getData()
            this.getCount()
            if(this.$route.name == 'addtypebook'){
                this.isAdd = true
                // console.log(this.$route.query.id)
            }else{
                this.isAdd = false
            }
        }
    }
</script>

<style scoped lang="scss">
.avatar-img{
    width: 50px;
    height: 50px;
}
.content{

    // .el-tooltip__popper{
    //     width: 500px;
    // }
}
.bottom{
    float: right;
    margin-top: 10px;
}
</style>