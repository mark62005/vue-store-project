<template>
  <div>
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <a
        class="navbar-brand col-sm-3 col-md-2 mr-0"
        href="#"
      >Company name</a>
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      >
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a
            class="nav-link"
            href="#"
            @click.prevent="signOut"
          >登出</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    signOut() {
      const api = `${process.env.VUE_APP_API_PATH}/logout`;
      this.axios.post(api)
        .then((res) => {
          this.$router.push('/login');
          this.$bus.$emit('message:push', res.data.message, 'success');
        }).catch((res) => this.$bus.$emit('message:push', res.data.message, 'danger'));
    },
  },
};
</script>
