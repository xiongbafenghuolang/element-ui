<template>
  <div id="app">
    <router-view></router-view>
    <router-link :to="{name:'login',params:{username:'wuxiong',id:'555'}}">Login</router-link>
    <router-link :to="{name:'register',params:{username:'wyatt',id:'111',sex:'男'}}">Register</router-link>
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {

  },
  data() {
    return {

    }
  },
  created() {

  },
  mounted() {

  },
  computed: {

  },
  watch: {

  },
  methods: {

  },
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
