<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
.form-500{
  width: 500px;
}
.clearfix::after{
  content: '';
  display:block;
  clear: both;
  height: 0;
  width: 0;
}
</style>
