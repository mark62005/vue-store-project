import Vue from 'vue';

Vue.prototype.$bus = new Vue();

// Message
// this.$bus.$emit('message:push', message, status)
// message: {
//   type: String,
//   content: 訊息內容
// }
// status: {
//   type: String,
//   content: 'success' / 'danger'
// }
