<template>
  <div
    class="d-flex flex-wrap flew-md-nowrap justify-content-center align-items-center
    pb-2 m-3 border-bottom"
  >
    <!-- header -->
    <Loading :active.sync="isLoading" />
    <div class="container d-flex justify-content-between mt-2">
      <h1 class="h2 mb-0">{{ pageTitle }}</h1>
    </div>
    <!-- table -->
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in orders"
          :key="order.id"
          :class="{ 'text-secondary': !order.is_paid }"
        >
          <td>{{ order.create_at | date }}</td>
          <td>
            <span v-if="order.user">{{ order.user.email }}</span>
            <span
              v-else
              class="text-muted"
            >沒有</span>
          </td>
          <td>
            <!-- <ul class="list-unstyled">
              <li
                v-for="(product, index) in order.products"
                :key="index"
              >
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul> -->
            empty
          </td>
          <td class="text-right">{{ order.total | currency }}</td>
          <td>
            <strong
              v-if="order.is_paid"
              class="text-success"
            >已付款</strong>
            <span
              v-else
              class="text-muted"
            >未付款</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="!orders.length"
      class="container d-flex justify-content-center"
    >
      <p class="h6">暫時未有訂單</p>
    </div>
    <Pagination
      :pagination="pagination"
      @change-page="getOrders"
    />
  </div>
</template>

<script>
import Pagination from '../components/Pagination.vue';

export default {
  name: 'Orders',
  components: {
    Pagination,
  },
  data() {
    return {
      pageTitle: '訂單列表',
      orders: [],
      isLoading: false,
      pagination: {},
      filter: '',
    };
  },
  async created() {
    this.getOrders();
  },
  methods: {
    getOrders(page = 1) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/orders?page=${page}`;
      this.isLoading = true;
      this.axios.get(api).then((res) => {
        this.orders = res.data.orders;
        this.pagination = res.data.pagination;
      }).catch((res) => this.$emit.$bus('message:push', res.data.messages, 'danger'));
      this.isLoading = false;
    },
  },
};
</script>
