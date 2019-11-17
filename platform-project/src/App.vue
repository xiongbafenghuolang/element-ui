<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: "app",
  components: {},
  data() {
    return {

    };
  },
  created() {
    window.console.log('go', this.$go)
  },
  mounted() {

  },
  computed: {

  },
  watch: {

  },
  methods: {

  }
};
</script>

<style lang="scss">

</style>
