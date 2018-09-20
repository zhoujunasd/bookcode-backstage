<template>
    <div class="main">
        <div class="top">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/layout/slideshow' }">轮播图列表</el-breadcrumb-item>
            <el-breadcrumb-item>轮播图详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content">
          
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
    };
  },
  methods: {
    getInitData() {
      this.$axios.get(`/swiper/${this.$route.query.id}`).then(res => {
        // console.log(res);
        if(res.code == 200){
          this.data = res.data
          console.log(this.data)
        }else{
          this.$message.error(res.msg)
        }
        
      });
    }
  },
  created() {
    this.getInitData();
  }
};
</script>

<style scoped>
</style>