<template>
  <div class="dashboard-container">
    <h2>欢迎使用流程节点通用开发管理平台</h2>
    <w-form :model="model" :rules="rules" ref="loginForm">
      <w-form-item label="用户名" prop="userName">
        <w-input v-model="model.userName" ></w-input>
      </w-form-item>
      <w-form-item label="密码" prop="password">
        <w-input v-model="model.password"  type="password"></w-input>
      </w-form-item>
      <w-form-item></w-form-item>
    </w-form>

    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    {{model}}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import WInput from './components/WInput'
import WFormItem from './components/WFormItem'
import WForm from './components/WForm'

export default {
  name: 'Home',
  components: {
    WInput,
    WFormItem,
    WForm
  },
  data() {
    return {
      model: {
        userName:'',
        password:''
      },
      rules:{
        userName: [{
          require:true,message:'用户名必填'
        }],
        password: [{
          require:true,message:'用户名必填'
        }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    onLogin() {
      this.$refs.loginForm.validate((isValid) => {
        if(isValid) {
          window.console.log('登录')
        } else {
          window.console.log('爆粗')
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
