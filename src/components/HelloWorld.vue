<template>
  <div class="hello">
    <button
      class="btn btn-primary"
      @click="signOut"
    >
      Sign out
    </button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods: {
    signOut() {
      const api = `${process.env.VUE_APP_API_PATH}/logout`;
      this.axios.post(api)
        .then(() => this.$router.push({ path: '/login' }))
        .catch((res) => console.log(res.data));
    },
  },
};
</script>
