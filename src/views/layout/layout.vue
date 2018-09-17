<template>
    <div class="layout">
        <div class="header ml200">
            <h1 class="title">code-book后台管理系统</h1>
        </div>
        <div class="side-bar">
            <el-menu 
                class="el-menu-vertical-demo"
                :router="true" 
                @open="handleOpen" 
                @close="handleClose" 
                background-color="#545c64" 
                text-color="#fff" 
                active-text-color="#ffd04b"
                :unique-opened="true">
                <el-submenu index='1'>
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/">用户列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span slot="title">分类管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/">分类列表</el-menu-item>
                        <el-menu-item index="/">添加分类</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-document"></i>
                        <span slot="title">管理员用户</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/layout/users" >管理员列表</el-menu-item>
                        <el-menu-item index="/">修改密码</el-menu-item>
                        <el-menu-item index="/layout/edituser" >修改个人信息</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span slot="title">图书管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/">图书列表</el-menu-item>
                        <el-menu-item index="/">添加图书</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span slot="title">轮播图管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/">轮播图列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </div>
        <div class="main-content ml200">
            <router-view></router-view>
        </div>
    </div>

</template>

<script>
export default {
  name: "layout",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // selectmenu(index,indexPath){
    //     console.log(index)
    //     console.log(indexPath)
    // }
  },
  created(){
    //   this.selectmenu()
  }
};
</script>

<style scoped lang='scss'>
.layout {
  .ml200 {
    margin-left: 200px;
  }
  .header {
    background-color: #545c64;
  }
  .title {
    text-align: center;
    font-weight: 600;
    line-height: 60px;
    height: 60px;
    color: #ccc;
    border-bottom: 1px solid #f1f1f1;
  }
  .side-bar {
    padding-top: 60px;
    width: 199px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    border-right: 1px solid #888;
    background-color: #545c64;
  }
//   .el-menu-vertical-demo {
//     border: none;
//   }
    /deep/{
        .el-menu-vertical-demo{
            border: none;
        }
    }

  .main-content{
      padding: 15px;
  }
}
</style>