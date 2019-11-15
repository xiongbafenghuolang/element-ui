<template>
  <div>
   {{msg}}
   <p> {{$route.params.username}}-{{$route.params.id}}--{{$route.params.sex}}</p>
  </div>
</template>
<script>
export default {
  beforeRouteEnter (to, from, next) {
    window.console.log(this, 'beforeRouteEnter'); // undefined
    window.console.log('register before enter')
    next(vm => {
      //因为当钩子执行前，组件实例还没被创建
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      window.console.log(vm);//当前组件的实例
    });
  },
   beforeRouteUpdate (to, from, next) {
    window.console.log(this, 'beforeRouteUpdate'); //当前组件实例
    window.console.log('register before update')
    next()
  },
   beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      window.console.log(this, 'beforeRouteLeave'); //当前组件实例
      window.console.log('register before leave')
      next()
   },
  name: 'register',
  data() {
    return {
      msg: ' this is register page!'
    }
  }
}
</script>
<style lang="scss">

</style>
