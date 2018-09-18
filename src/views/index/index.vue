<template>
    <div class="content">
        <h2>code-book后台管理系统</h2>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "index",
  data(){
      return{
          token:""
      }
  },
  methods: {
    getToken() {
        axios.get("http://upload.yaojunrong.com/getToken").then(res => {
            // console.log(res.data.data)
            this.$store.commit('GET_TOKEN',res.data.data)
        });
    }
  },
  created(){
      this.getToken()
  }
};
</script>

<style scoped>
.content {
}
</style>