<template>
  <div>
    <div class="text-right mt-4">
      <button
        class="btn btn-primary"
        data-toggle="modal"
        toggle-target="#adminProductModal"
        @click="openUpdateModal(true,target)"
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
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openUpdateModal(false, product.id)"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              data-toggle="modal"
              toggle-target="#delProductModal"
              @click="openDelModal(product.id)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal -->
    <AdminProductModal
      :temp-product="target"
      :is-new="isNew"
      @get-products="getProducts"
    />
    <DelProductModal
      :product="target"
      @get-products="getProducts"
    />
  </div>
</template>

<script>
import $ from 'jquery';
import AdminProductModal from '../components/AdminProductModal.vue';
import DelProductModal from '../components/DelProductModal.vue';

export default {
  name: 'Products',
  components: {
    AdminProductModal,
    DelProductModal,
  },
  data() {
    return {
      products: undefined,
      newProduct: undefined,
      target: {},
      isNew: false,
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
    openUpdateModal(isNew, id) {
      const target = this.products.find((item) => item.id === id);
      $('#adminProductModal').modal('show');
      if (isNew) {
        this.isNew = true;
        this.target = {
          title: '未命名',
          category: '未分類',
          origin_price: 0,
          price: 0,
        };
      } else {
        this.target = { ...target };
        this.isNew = false;
      }
    },
    openDelModal(id) {
      console.log('del', id);
      const target = this.products.find((item) => item.id === id);
      this.target = { ...target };
      $('#delProductModal').modal('show');
    },
  },
};
</script>
