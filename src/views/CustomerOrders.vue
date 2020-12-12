<template>
  <div
    class="d-flex flex-wrap flew-md-nowrap justify-content-center align-items-center
    pb-2 m-3 border-bottom"
  >
    <Loading :active.sync="isLoading" />
    <div class="container d-flex justify-content-between mt-2">
      <h1 class="h2 mb-0">{{ pageTitle }}</h1>
    </div>
    <div class="row mt-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="col-md-4 mb-4"
      >
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{ backgroundImage: `url(${product.image})` }"
          >
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ product.category }}</span>
            <h5 class="card-title">
              <a
                href="#"
                class="text-dark"
              >{{ product.title }}</a>
            </h5>
            <p class="card-text">{{ product.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div
                v-if="!product.price"
                class="h5"
              >
                {{ product.origin_price }} 元
              </div>
              <del
                v-if="product.price"
                class="h6"
              >原價 {{ product.origin_price }} 元</del>
              <div
                v-if="product.price"
                class="h5"
              >
                現在只要 {{ product.price }} 元
              </div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
            >
              <i class="fas fa-spinner fa-spin"></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
            >
              <i class="fas fa-spinner fa-spin"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <Pagination
      :pagination="pagination"
      @change-page="getProducts"
    />
  </div>
</template>

<script>
// import $ from 'jquery';
import Pagination from '../components/Pagination.vue';

export default {
  name: 'CustomerOrder',
  components: {
    Pagination,
  },
  data() {
    return {
      pageTitle: '模擬訂單',
      products: [],
      pagination: {},
      isLoading: false,
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products`;
      this.isLoading = true;
      this.axios.get(api).then((res) => {
        this.products = res.data.products;
        this.pagination = res.data.pagination;
        this.isLoading = false;
      }).catch((res) => this.$bus.$emit('message:push', res.data.message, 'danger'));
    },
  },
};
</script>
