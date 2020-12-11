<template>
  <div>
    <Navbar />
    <Alert />
    <div class="container-fluid">
      <div class="row">
        <Sidebar />
        <main
          role="main"
          class="col-md-9 ml-sm-auto col-lg-10 px-4"
        >
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
import Alert from '../components/Alert.vue';

export default {
  name: 'Dashboard',
  components: {
    Navbar,
    Sidebar,
    Alert,
  },
  created() {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.axios.defaults.headers.common.Authorization = myCookie;
  },
};
</script>
