export default {
  updateCount(state,obj) { //只允许传入两个参数，第一个参数为state,第二个参数为 obj对象，可以通过函数结构的形式将参数传入
    state.count = obj
  },
  updateName(state,obj) {
    state.firstName = obj
  },
}
