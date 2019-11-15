<template>
  <div id="app">
   <!-- {{prizeTime | formatDate(0)}} -->
    <!-- {{counter}}==3333555=={{fullName}}
    <p>{{textA}}===={{textB}} -------{{textC}}---------{{textPlus}}</p> -->
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <!-- <router-link :to="{name:'login',params:{username:'wuxiong',id:'555'}}">Login</router-link>
    <router-link :to="{name:'register',params:{username:'wyatt',id:'111',sex:'男'}}">Register</router-link>
    <router-link :to="{name:'diagram',params:{username:'wyatt',id:'0000'}}">Diagram</router-link> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "app",
  components: {},
  data() {
    return {
      prizeTime: '1573783919699'
    };
  },
  created() {
    window.console.log('go', this.$go)
  },
  mounted() {

    // let i  = 1
    // let timer = null;
    // clearInterval(timer);
    // timer = setInterval(()=>{
    //   this.$store.commit('updateCount',i++)
    // },1000)

    const myName = "xiong";
    // 直接调用 mutations
    // setTimeout(()=>{
    //   this.$store.commit('updateName',myName)
    // },2000)

    // mapMutatios 调用 mutatios
    setTimeout(() => {
      this.updateName(myName);
    }, 2000);

    // 直接调用 actions
    // this.$store.dispatch('updateCountAsync',{
    //   num: 5,
    //   time: 2000
    // })

    // mapActions 调用 actions
    this.updateCountAsync({
      num: 5,
      time: 2000
    });
    // this.updateText(123)
    // this['a/updateText'](500)
    this['b/textAction']()
  },
  computed: {
    // textA() {
    //   return this.$store.state.a.text;
    // },
    textB() {
      return this.$store.state.b.text;
    },
    // ...mapState(['count']),
    // ...mapState({
    //   counter:'count'
    // }),
    ...mapState({
      counter: state => state.count,
      textA: state => state.a.text,
      textC: state => state.c.text
    }),
    ...mapGetters({
      fullName: "fullName",
      textPlus: "a/textPlus"
    })
    // count() {
    //   return this.$store.state.count
    // },
    // fullName() {
    //   return this.$store.getters.fullName
    // }
  },
  watch: {},
  methods: {
    ...mapActions(["updateCountAsync","b/textAction"]),
    // ...mapMutations(["updateName","updateText"])
    //  ...mapMutations(["updateName","a/updateText"])
    ...mapMutations(["updateName","a/add"])
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
