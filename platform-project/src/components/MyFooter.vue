<template>
  <div>
    <div :style="style">
      <div class="copy">
        <slot name="copy"></slot>
      </div>
      <div class="tips">
        <slot name="tips" :value="value" age="20" sex="男"></slot>
      </div>
    </div>
    <input type="text" @input="handleInput" :value="message1" >
    <hello-world></hello-world>
  </div>
</template>
<script>
import HelloWorld from './HelloWorld'
export default {
  name: 'my-footer',
  components: {
    HelloWorld
  },
   model: {
    prop: 'message1',
    event: 'change'
  },
  props: {
    message1: String
  },
  data() {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #FF0000'
      },
      value: 'component value AAA'
    }
  },
  methods: {
    handleInput(e) {
      this.$emit('change',e.target.value)
    }
  },
}
</script>
<style lang="scss">
  .copy {
    color: yellowgreen;
  }

  .tips {
    color: rgb(205, 143, 50);
  }
</style>
