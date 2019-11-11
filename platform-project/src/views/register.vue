<template>
  <div>
   {{msg}}
   <p> {{$route.params.username}}-{{$route.params.id}}--{{$route.params.sex}}</p>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data() {
    return {
      msg: ' this is register page!'
    }
  },
}
</script>
<style lang="scss">

</style>
