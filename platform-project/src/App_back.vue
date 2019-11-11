<template>
  <div id="app">
    <!-- <MyHeader :tableData="tableData" :msg="msg" @input="msg = arguments[0]" /> -->
    <my-header :tableData="tableData"  v-model="msg" ></my-header>
    <router-view></router-view>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <P>Name: {{myName}}</P>
    <P>Name: {{getName()}}</P>
    <p>Number: {{number}}</p>
    <p>FullName: {{fullName}}</p>
    <P>
      <input type="text" name="" v-model="number" id="">
    </P>
    <P>
      FirstName: <input type="text" name="" v-model="firstName" id="">
    </P>
    <P>
      LastName:<input type="text" name="" v-model="lastName" id="">
    </P>
     <P>
      Obj.a:<input type="text" name="" v-model="obj.a" id="">
    </P>
    <my-footer v-model="message" ref="comp">
      <span slot="copy">this is copy</span>
      <span slot="tips" slot-scope="props" ref="span">{{props.age}} {{props.sex}} {{props.value}} {{value}}</span>
    </my-footer>
    <input type="text" name="" v-model="value" id="">

  </div>
</template>

<script>
import MyHeader from './components/MyHeader'
import MyFooter from './components/MyFooter'

export default {
  name: 'app',
  components: {
    MyHeader,
    MyFooter,
  },
  provide() {
    const data = {}
    Object.defineProperty(data,'value',{
      get: () => this.value,
      enumerable: true
    })

    return {
      grandPa: this,
      data
    }
  },
  data() {
    return {
       msg: 'my name is wyatt! this is a project about element-ui!',
       tableData: [],
       firstName: 'wu',
       lastName: 'wyatt',
       number: 0,
       fullName: '',
       obj: {
         a: '123'
       },
       value:"I am app ,you know",
       message: "I say something!!!!"
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
    window.console.log(this.$el);
    window.console.log(this.$refs.comp.value,this.$refs.span)
  },
  computed: {
    myName() {
      // window.console.log('2222')
      return `${this.firstName} ${this.lastName}`;
    }
  },
  watch: {
    obj: {
      handler() {
        window.console.log("obj.a changed")
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    getName() {
      // window.console.log("22222")
      return `${this.firstName} ${this.lastName}`;
    },
    handleClick() {
      window.console.log("clicked")
    }
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
