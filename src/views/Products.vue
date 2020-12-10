<template>
  <div>
    <div class="text-right mt-4">
      <button
        class="btn btn-primary"
        data-toggle="modal"
        toggle-target="#adminProductModal"
        @click="showModal"
      >
        建立新的產品
      </button>
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
          <th width="80">編輯</th>
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
            {{ product.origin_price }}
          </td>
          <td class="text-right">
            {{ product.price }}
          </td>
          <td>
            <span
              v-if="product.is_enabled"
              class="text-success"
            >已啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm">
              編輯
            </button>
            <button class="btn btn-outline-danger btn-sm">
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <AdminProductModal @add-product="getProducts" />
  </div>
</template>

<script>
import $ from 'jquery';
import AdminProductModal from '../components/AdminProductModal.vue';

export default {
  name: 'Products',
  components: {
    AdminProductModal,
  },
  data() {
    return {
      products: undefined,
      newProduct: undefined,
    };
  },
  async created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/products`;
      this.axios.get(api).then((res) => {
        this.products = res.data.products;
      }).catch((res) => {
        console.log(res.data);
      });
    },
    showModal() {
      $('#adminProductModal').modal('show');
      console.log('click');
    },
  },
};
</script>
