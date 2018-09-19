<template>
    <div class="classify">
        <div class="header">
            <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>分类管理</el-breadcrumb-item>
                <el-breadcrumb-item>分类列表</el-breadcrumb-item>
                <el-button @click="$router.push('/layout/addclassify')" size='mini' type="primary" circle icon="el-icon-plus"></el-button>
            </el-breadcrumb>
        </div>
        <div class="content">
            <el-table slot="empty" :data="formdata">
                <el-table-column label="分类图标" width="120" align='center'>
                    <template slot-scope="scope" align='center'>
                        <img :src="scope.row.icon" :onerror="errorImg" class="avatar">
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="分类名" width="180" align='center' show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="index" label="分类权重" width="120" sortable align='center'>
                </el-table-column>
                <el-table-column prop="_id" label="typeId" width="240" align='center'>
                </el-table-column>
                <el-table-column prop="books.length" label="书籍数" width="100" align='center'>
                </el-table-column>
                <el-table-column label="操作" align='center' width="360">
                    <template slot-scope="scope">
                        <el-button size="small" type='primary' @click="ediit_classify(scope.row._id)">编辑</el-button>
                        <el-button size="small" @click="details(scope.row._id,scope.row.books.length)">详情</el-button>
                        <el-button size="small" type="danger" @click="del_classify(scope.row._id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="bottom" background :page-size="5" layout="prev, pager, next" next-click prev-click :total="count" @current-change="currentchange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: [],
      formData: {
        title: "", //分类名
        idnex: "", //分类权重
        icon: "", //分类图标
        books: [], //此分类下的所有图书ID
        _id: "" //此分类的ID
      },
      errorImg: 'this.src="' + require("../../../static/images/404.jpg") + '"',
      page: 1,
      count: 0,
      getCounts: 1,
      deleteData: {}
    };
  },
  watch: {
    // count(){
    // }
  },
  methods: {
    del_classify(typeId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.$axios.del(`/category/${typeId}`).then(res => {
            // console.log(res)
            if (res.code == 200) {
            //   this.deleteData = res.deleteData;//  ?忘了写这个是做什么的了,返回的数据是删除的分类的数据
            //   console.log(this.deleteData)
              this.$message.success({
                message: res.msg,
                duration: 1500,
                center: true
              });
              this.getData();
            } else {
              this.$message.error({
                message: res.msg,
                duration: 1500,
                center: true
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            center: true
          });
        });
    },
    details(typeId, length) {
      this.$router.push({
        name: "classify_book",
        params: {
          id: typeId,
          count: length
        }
      });
    },
    ediit_classify(typeId) {
      // console.log(typeId)
      this.$router.push({
        name: "editclassify",
        params: {
          id: typeId
        }
      });
      //  this.$router.push({
      //     path: `/layout/editclassify/${123}`,
      //  })
    },
    currentchange(page) {
      this.page = page;
      this.getData();
      // console.log(this.getCounts)
    },
    getData() {
      // ,{pn:this.page,size:this.size}
      this.$axios.get("/category", { pn: this.page, size: 5 }).then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.formdata = res.data;
        }
      });
    },
    getCount() {
      this.$axios.get("/category", { pn: this.getCounts }).then(res => {
        if (res.data.length !== 0) {
          this.count += res.data.length;
          this.getCounts++;
          this.getCount();
        }
        // else{
        //     console.log(this.count)
        // }
      });
    }
  },
  created() {
    this.getData();
    this.getCount();
  }
};
</script>

<style scoped lang='scss'>
.classify {
  .avatar {
    width: 50px;
    height: 50px;
  }
  .bottom {

    float: right;
  }
  .breadcrumb {
    line-height: 29px;
    height: 29px;
  }
}
</style>