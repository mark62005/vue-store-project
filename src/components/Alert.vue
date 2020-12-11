<template>
  <div class="message-alert">
    <div
      v-for="(item, index) in messages"
      :key="index"
      class="alert alert-dismissible"
      :class="`alert-${item.status}`"
    >
      {{ item.message }}
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="removeMessage(i)"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  data() {
    return {
      messages: [],
    };
  },
  created() {
    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    this.$bus.$on('message:push', (message, status = 'warning') => {
      this.updateMessage(message, status);
    });
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp,
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    removeMessageWithTiming(timestamp) {
      setTimeout(() => {
        this.messages.forEach((item, index) => {
          if (item.timestamp === timestamp) this.messages.splice(index, 1);
        });
      }, 5000);
    },
  },
};
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>
