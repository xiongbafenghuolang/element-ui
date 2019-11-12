// actions跟mutations差不多，都是用来修改数据，但是为啥有器存在，因为muttions必须是同步操作，如果你要写异步代码必须在actions中写
// actions就是用来修改异步数据
export default {
  updateCountAsync (store,obj) {
    setTimeout(()=> {
      store.commit('updateCount', obj.num)
    },obj.time)
  }
}
