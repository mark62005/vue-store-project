<template>
  <div
    class="d-flex flex-wrap flew-md-nowrap justify-content-center align-items-center
    pb-2 m-3 border-bottom"
  >
    <Loading :active.sync="isLoading" />
    <div class="container d-flex justify-content-between mt-2">
      <h1 class="h2 mb-0">{{ pageTitle.first }}{{ pageTitle.second }}</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button
            class="btn btn-primary"
            data-toggle="modal"
            toggle-target="#updateProductModal"
            @click="openUpdateModal(true,target)"
          >
            建立新的產品
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否已啟用</th>
          <th
            width="120"
            class="text-center"
          >
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in products"
          :key="product.id"
        >
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td class="text-right">
            {{ product.origin_price | currency }}
          </td>
          <td class="text-right">
            {{ product.price | currency }}
          </td>
          <td class="text-center">
            <span
              v-if="product.is_enabled"
              class="text-success"
            >已啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td class="d-flex justify-content-between">
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openUpdateModal(false, product.id)"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              data-toggle="modal"
              toggle-target="#delModal"
              @click="openDelModal(product.id)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :pagination="pagination"
      @change-page="getProducts"
    />
    <UpdateModal
      :page-title="pageTitle.first"
      :item="target"
      :is-new="isNew"
      @get-items="getProducts"
    />
    <DelModal
      :item="target"
      :page-title="pageTitle.first"
      @get-items="getProducts"
    />
  </div>
</template>

<script>
import $ from 'jquery';
import DelModal from '../components/DelModal.vue';
import Pagination from '../components/Pagination.vue';
import UpdateModal from '../components/updateProductModal.vue';

export default {
  name: 'Products',
  components: {
    UpdateModal,
    DelModal,
    Pagination,
  },
  data() {
    return {
      pageTitle: {
        first: '產品',
        second: '列表',
      },
      products: [],
      target: {},
      isNew: false,
      isLoading: false,
      pagination: {},
    };
  },
  async created() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/products?page=${page}`;
      this.isLoading = true;
      this.axios.get(api).then((res) => {
        this.products = res.data.products;
        this.pagination = res.data.pagination;
      }).catch((res) => this.$bus.$emit('message:push', res.data.message, 'danger'));
      this.isLoading = false;
    },
    openUpdateModal(isNew, id) {
      const target = this.products.find((item) => item.id === id);
      $('#updateProductModal').modal('show');
      if (isNew) {
        this.isNew = true;
        this.target = {
          title: '未命名',
          category: '未分類',
          unit: '單位',
          origin_price: 0,
          price: 0,
        };
      } else {
        this.target = { ...target };
        this.isNew = false;
      }
    },
    openDelModal(id) {
      const target = this.products.find((item) => item.id === id);
      this.target = { ...target };
      $('#delModal').modal('show');
    },
  },
};
</script>
