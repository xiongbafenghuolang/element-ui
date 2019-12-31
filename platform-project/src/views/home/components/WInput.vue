<template>
  <div>
    <!-- $attrs存储的是props之外的部分 -->
    <input :value="value" @input="onInput" v-bind="$attrs">
  </div>
</template>

<script>
  export default {
      inheritAttrs:false, // 避免顶层的标签继承属性
      props: {
        value: {
          type: String,
          default:''
        },
      },
      methods: {
        onInput(e) {
          // 通知父组件数值发生变化
          this.$emit('input', e.target.value)

          // 通知FormItem校验
          this.$parent.$emit('validate')
        },
      },
  }
</script>

<style scoped>

</style>
