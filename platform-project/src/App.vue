<template>
  <div id="app">
    <MyHeader :tableData="tableData" :msg="msg" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import MyHeader from './components/MyHeader'

export default {
  name: 'app',
  components: {
    MyHeader
  },
  data() {
    return {
       msg: "my name is wyatt! this is a project about element-ui!",
       tableData: []
    }
  },
  created() {
    window.console.log(this.$go);
    this.$api.apiAddress()
      .then(res => {
         if(res.code == '200') {
           this.tableData = res.data.tableData;
         }
      })
  },
  mounted() {
    
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
