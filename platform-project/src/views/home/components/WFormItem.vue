<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <!-- 校验信息 -->
    <p style="color:red;" v-if="errorMsg">
      {{errorMsg}}
    </p>
  </div>
</template>

<script>
import Schema from 'async-validator'

  export default {
    props: {
      label: {
        type: String,
        default:''
      },
      prop: {
        type: String
      }
    },
    inject:['form'], // 注入
    data() {
      return {
        errorMsg: ''
      }
    },
    mounted() {
      // 监听校验事件，并执行监听
      this.$on('validate',() => {
        this.validate()
      })
    },
    methods: {
      /** 执行组件的校验 */
      validate() {
        // 1. 获取校验规则
        const rules = this.form.rules[this.prop]
        // 2. 获取数据
        const value = this.form.model[this.prop]
        // 3. 执行校验
        const desc = {
          [this.prop]:rules
        }
        const schema = new Schema(desc)
        // 参数1是校验的值
        return schema.validate({[this.prop]:value},errors => {
          if(errors) {
            // 有错显示错误
            this.errorMsg = errors[0].message
          } else {
            // 无错清楚错误
            this.errorMsg = ''
          }
        })
      },
    },
  }
</script>

<style scoped>

</style>
