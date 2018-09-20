<template>
    <div class="layout">
        <div class="header ml200">
            <h1 class="title">code-book后台管理系统</h1>
            <el-dropdown size="medium" >
                <el-button type="primary">
                    <img class="img" :src='imgUrl'>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="editclick">修改个人信息</el-dropdown-item>
                    <el-dropdown-item @click.native="quit">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
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
                        <el-menu-item index="/login">用户列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span slot="title">分类管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/layout/management">分类列表</el-menu-item>
                        <el-menu-item index="/layout/addclassify">添加分类</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-document"></i>
                        <span slot="title">管理员用户</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/layout/users" >管理员列表</el-menu-item>
                        <el-menu-item index="/layout/editpassword">修改密码</el-menu-item>
                        <el-menu-item index="/layout/edituser" >修改个人信息</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span slot="title">图书管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/layout/book">图书列表</el-menu-item>
                        <el-menu-item index="/layout/addbook">添加图书</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span slot="title">轮播图管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/layout/slideshow">轮播图列表</el-menu-item>
                        <el-menu-item index="/layout/addslideshow">添加轮播图</el-menu-item>
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
  data(){
      return{
          imgUrl:""
      }
  },
  methods: {
      quit(){
          this.$axios.get('/logout').then(res => {
            //   console.log(res)
            if(res.code == 200){
                this.$message.success({
                    message:res.msg,
                    duration: 1500,
                    center:true
                })
                this.$router.push('/login')
            }
          })
      },
      editclick(){
          console.log('adsas')
          this.$router.push("/layout/edituser");
      },
      getImg(){
          this.imgUrl = this.$store.state.userinfo.avatar
      },
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
//   watch:{//===========================================
//       imgUrl(){
//           this.imgUrl = this.$store.state.userinfo.avatar
//       }
//   },
  computed: {
    img() {
        return this.$store.state.userinfo.avatar;
    }
    },
    watch: {
        img(val) {
            this.imgUrl = val;
        }
    },
  created(){
    //   this.selectmenu()
    this.getImg()
  }
};
</script>
<style scoped lang='scss'>
    .img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 1px solid #409EFF;
    }   
  .el-dropdown {
    vertical-align: top;
    position: absolute;
    right: 20px;
    top:10px;
    // /deep/{
    //     border: none
    // }
  }
  .el-dropdown > button {
      width: 60px;
      height: 60px;
      border: none;
      margin: 0;
      padding: 0;
      border-radius: 50%
  }

.layout {
  .ml200 {
    margin-left: 200px;
  }
  .header {
    background-color: #545c64;
    // display: flex
    position:relative;
  }
  .title {
    text-align: center;
    font-weight: 600;
    line-height: 80px;
    height: 80px;
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