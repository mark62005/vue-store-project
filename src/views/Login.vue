<template>
  <div class="body">
    <form
      class="form-signin"
      @submit.prevent="signIn"
    >
      <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      <label
        for="inputEmail"
        class="sr-only"
      >電子信箱</label>
      <input
        id="inputEmail"
        v-model="user.username"
        type="email"
        class="form-control"
        placeholder="你的電子信箱"
        required
        autofocus
      >
      <label
        for="inputPassword"
        class="sr-only"
      >密碼</label>
      <input
        id="inputPassword"
        v-model="user.password"
        type="password"
        class="form-control"
        placeholder="密碼"
        required
      >
      <div class="checkbox mb-3">
        <label>
          <input
            type="checkbox"
            value="remember-me"
          > 記住我
        </label>
      </div>
      <button
        class="btn btn-lg btn-primary btn-block"
        type="submit"
      >
        登入
      </button>
      <p class="mt-5 mb-3 text-muted">&copy; 2020</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signIn() {
      const api = `${process.env.VUE_APP_API_PATH}/admin/signin`;
      this.axios.post(api, this.user).then((res) => {
        console.log(res.data);
        this.$bus.$emit('message:push', res.data.message, 'success');
        const { token } = res.data;
        const { expired } = res.data;
        document.cookie = `myToken=${token}; expires=${new Date(expired)};`;
        this.$router.push({ path: '/admin/products' });
      }).catch((res) => this.$bus.$emit('message:push', res.data.message, 'danger'));
    },
  },
};
</script>

<style scoped>
html,
.body {
  height: 100vh;
}

.body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
