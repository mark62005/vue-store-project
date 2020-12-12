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
              @click="getProduct(product.id)"
            >
              <i
                v-if="product.id === status.loadingItem"
                class="fas fa-spinner fa-spin"
              ></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addToCart(product.id)"
            >
              <i
                v-if="product.id === status.loadingItem"
                class="fas fa-spinner fa-spin"
              ></i>
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
    <!-- Modal -->
    <div
      id="productModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5
              id="productModalLabel"
              class="modal-title"
            >
              {{ singleProduct.title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img
              :src="singleProduct.image"
              class="img-fluid"
              :alt="singleProduct.title"
            >
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ singleProduct.content }}</p>
              <footer class="blockquote-footer text-right">{{ singleProduct.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div
                v-if="!singleProduct.price"
                class="h4"
              >
                {{ singleProduct.origin_price }} 元
              </div>
              <del
                v-if="singleProduct.price"
                class="h6"
              >原價 {{ singleProduct.origin_price }} 元</del>
              <div
                v-if="singleProduct.price"
                class="h4"
              >
                現在只要 {{ singleProduct.price }} 元
              </div>
            </div>
            <select
              v-model="qty"
              name=""
              class="form-control mt-3"
            >
              <option
                value=""
                disabled
              >
                -- 請選擇數量 --
              </option>
              <option
                v-for="num in 10"
                :key="num"
                :value="num"
              >
                選購 {{ num }} {{ singleProduct.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ totalPrice }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addToCart(singleProduct.id, singleProduct.num)"
            >
              <i
                v-if="singleProduct.id === status.loadingItem"
                class="fas fa-spinner fa-spin"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
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
      singleProduct: {},
      pagination: {},
      isLoading: false,
      qty: '',
      status: {
        loadingItem: '',
      },
    };
  },
  computed: {
    totalPrice() {
      return this.qty * this.singleProduct.price;
    },
  },
  watch: {
    qty() {
      const qty = this.qty * 1;
      this.singleProduct.num = qty;
    },
  },
  async created() {
    this.getProducts();
    this.getCart();
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products?page=${page}`;
      this.isLoading = true;
      this.axios.get(api).then((res) => {
        this.products = res.data.products;
        this.pagination = res.data.pagination;
        this.isLoading = false;
      }).catch((res) => this.$bus.$emit('message:push', res.data.message, 'danger'));
    },
    getProduct(id) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${id}`;
      this.status.loadingItem = id;
      this.axios.get(api).then((res) => {
        this.singleProduct = res.data.product;
        this.qty = '';
        $('#productModal').modal('show');
        this.status.loadingItem = '';
      }).catch((res) => this.$bus.$emit('message:push', res.data.message, 'danger'));
    },
    addToCart(id, qty = 1) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      this.status.loadingItem = id;
      this.axios.post(api, { data: cart }).then((res) => {
        console.log(res.data);
        this.status.loadingItem = '';
        this.getCart();
        $('#productModal').modal('hide');
      }).catch((res) => this.$bus.$emit('message:push', res.data.message, 'danger'));
    },
    getCart() {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      this.isLoading = true;
      this.axios.get(api).then((res) => {
        console.log(res.data);
        this.isLoading = false;
      }).catch((res) => this.$bus.$emit('message:push', res.data.message, 'danger'));
    },
  },
};
</script>
