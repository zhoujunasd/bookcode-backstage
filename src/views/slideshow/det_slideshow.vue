<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/layout/slideshow' }">轮播图列表</el-breadcrumb-item>
            <el-breadcrumb-item>轮播图详情</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
  data() {
    return {
      data: ""
    };
  },
  methods: {
    getInitData() {
      this.$axios.get(`/swiper/${this.$route.query.id}`).then(res => {
        console.log(res);
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