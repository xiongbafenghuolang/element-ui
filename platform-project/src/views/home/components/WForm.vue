<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    provide() {
      return {
        form: this // 传递form实例给后代，比如formitem用来校验
      }
    },
    props: {
      model: {
        type: Object,
        require: true
      },
      rules: {
        type: Object
      }
    },
    methods: {
      validate(cb) {
        // map 结果是若干Promise数组
        const tasks = this.$children.filter(item => item.prop).map(item => item.validate())
        // 所有任务必须全部成功才算通过
        Promise.all(tasks)
          .then(() => cb(true))
          .catch(() => cb(false))
      },
    },
  }
</script>

<style scoped>

</style>
