<template>
    <div>
        <h2>轮播图列表</h2>
        <div class="content">
            <el-table slot="empty" :data="swiper" align='center'>
                <el-table-column label="轮播图图片" category align='center' header-align='center'>
                    <template slot-scope="scope">
                        <img :src="scope.row.img" :onerror="errorImg" class="avatar">
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="轮播图标题" width="180" align='center' show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="书籍图片" width="120" align='center' header-align='center'>
                    <template slot-scope="scope">
                        <img :src="scope.row.book.img" :onerror="errorImg" class="avatar">
                    </template>
                </el-table-column>
                <el-table-column prop="book.title" label="书籍名" width="180" align='center' show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="book.author" label="作者" width="180" align='center'  show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="index" label="权重值" width="90" sortable align='center'>
                </el-table-column>
                <el-table-column label="操作" align='center'>
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="detail_swiper(scope.row._id)">详情</el-button>
                        <el-button type="danger" size="small" @click="del_swiper(scope.row._id)" disabled>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                style='float:right'
                background
                :page-size="5"
                layout="prev, pager, next"
                size="small"
                :total='count'
                @current-change="currentchange">
            </el-pagination>    
            <!-- <el-row class="elrow">
                <el-col :span='6' v-for="(item,index) in swiper" :key="index" >
                    <el-card>
                        <div slot="header">
                            <span>{{item.title}}</span>
                        </div>
                        <div >
                        </div>
                    </el-card>
                </el-col>
            </el-row> -->
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                swiper:[],
                count:0,
                page:1,
                errorImg:'this.src="'+require('../../../static/images/404.jpg')+'"',
            }
        },
        methods:{
            detail_swiper(id){
                this.$router.push({name:'det_slideshow',query:{id}})
            },
            del_swiper(id){
                this.$confirm('此操作将永久删除该轮播图, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('/swiper/delete',{ids:[id]}).then(res => {
                        if(res.code = 200){
                            this.$message.success({ message: res.msg});
                        }
                        this.getData()
                    }).catch(err => {
                        this.$message.error({message: '删除失败'});
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            currentchange(page){
                this.page = page
                this.getData()
            },
            getData(){
                this.$axios.get('/swiper',{pn:this.page,size:5}).then(res => {
                    // console.log(res)
                    if(res.code == 200){
                        this.swiper = res.data
                        this.count = res.count
                    }else{
                        this.$message.error({
                            message:res.msg,
                            center:true
                        })
                    }
                })
            }
        },
        created(){
            this.getData()
        },
    }
</script>

<style scoped lang='scss'>
.avatar{
    width: 50px;
    height: 50px;
    
}
.content{
    // .elrow{
    //     height: 200px;
    // }
}
</style>