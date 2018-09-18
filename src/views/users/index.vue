<template>
    <div class="user-manage">
        <div class="breadcrumb">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
                <el-button @click="$router.push('/layout/adduser')" size='mini' type="primary" circle icon="el-icon-plus"></el-button>
                <!-- <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item> -->
            </el-breadcrumb>
        </div>
        <el-table :data="tableData">
            <el-table-column prop="nickname" label="昵称：" width="160" align='center'>
            </el-table-column>
            <el-table-column prop="createdTime" label="创建日期" width="160" align='center'>
            </el-table-column>
            <el-table-column prop="desc" label="个性签名" width="240" align='center' show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="email" label="电子邮箱" width="180" align='center'>
            </el-table-column>
            <el-table-column label="用户头像" width="100" align='center'>
                <template slot-scope="scope" align='center'>
                    <img :src="scope.row.avatar" alt="" :onerror="errorImg" class="avatar">
                </template>
            </el-table-column>
            <el-table-column label="操作" align='center'>
                <template slot-scope="scope">
                    <el-button @click="handleDetails" size="small" type='primary' >编辑</el-button>
                    <el-button @click="handleDel(scope.row._id)" size="small" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="bottom"
            background
            layout="prev, pager, next"
            :page-size = "5"
            :total = "count"
            next-click prev-click
            @current-change="currentchange">
        </el-pagination>
    </div>
</template>

<script>
export default {
  data() {
    return {
      count:0,
      page:1,
      tableData: [],
      errorImg:'this.src="'+require('../../../static/images/404.jpg')+'"'
    };
  },
  methods: {
      currentchange(page){
          this.page = page
          this.getData()
      },
    getData() {
      this.$axios.get("/user",{pn: this.page,size: 5}).then(res => {
        //   console.log(res)
          this.count = res.count
        if (res.code == 200) {
        //   console.log(res.data);
          res.data.forEach(item=>{
            //   console.log(item)
              let Y = item.createdTime.slice(0,4)
              let M = item.createdTime.slice(5,7)
            //   if(M<10){console.log(M)console.log(M.substr(1,1))}
              let D = item.createdTime.slice(8,10)
              item.createdTime = `${Y}年${M}月${D}日`
              return item
          })
          this.tableData = res.data;
        }
      });
    },
    handleDetails(){
        console.log('没有接口')
        // this.$axios.push('')
    },
    handleDel(userID){
        this.$confirm('此操作将永久删除该管理员, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$axios.post('/user/delete',{userIds: [userID]}).then(res => {
                // console.log(res)
                if(res.code == 200){
                    this.$message.success({
                        message:res.msg,
                        duration:1500,
                        center:true
                    })
                    this.getData()
                }else{
                    this.$message.error({
                        message:res.msg,
                        duration:1500,
                        center:true
                    })
                }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped lang='scss'>
.user-manage {
  .breadcrumb{
      margin-bottom: 5px;
      line-height: 30px;
      height: 30px;
  }
  .avatar {
    width: 50px;
    height: 50px;
  }
    .bottom{
        float: right;
        margin-top: 5px;
    }
}
</style>

