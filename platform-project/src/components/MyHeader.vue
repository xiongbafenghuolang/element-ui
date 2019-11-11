<template>
  <div>
    <!-- {{msg}} -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <input type="text" @input="handleInput" :value="value" />
  </div>
</template>
<script>
export default {
  name: "my-header",
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: String,
    tableData: Array,
  },
  methods: {
    handleInput(e) {
      this.$emit('input',e.target.value);
    }
  },
};
</script>

