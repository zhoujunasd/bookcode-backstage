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
                tooltip-effect="light">
                <el-table-column label="书籍封面" width="120" align='center'>
                    <template slot-scope="scope" header-align='center' align='center'>
                        <img :src="scope.row.img" :onerror="errorImg" class="avatar">
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="书名" width="160" align='center' empty-text show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="author" label="作者" width="160" align='center' show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="desc" label="简介" width="240"    align='center' show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="createTime" label="创建日期" width="160" align='center' show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="index" label="权重值" width="100" sortable align='center'>
                </el-table-column>
                <el-table-column label="操作" align='center'>
                    <template slot-scope="scope">
                        <el-button size="small" >详情</el-button>
                        <el-button size="small" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                data:[],
                errorImg:'this.src="'+require('../../../static/images/404.jpg')+'"',
            }
        },
        methods:{
            // {pn:'',size:5}
            getData(){
                this.$axios.get('/book',).then(res => {
                    // console.log(res)
                    if(res.code == 200){
                        this.data = res.data
                    }else{
                        this.$message.error(res.msg)
                    }
                     console.log(this.data)
                })
               
            }
        },
        created(){
            this.getData()
        }
    }
</script>

<style scoped lang="scss">
.avatar{
    width: 50px;
    height: 50px;
}
.content{

    // .el-tooltip__popper{
    //     width: 500px;
    // }
}

</style>