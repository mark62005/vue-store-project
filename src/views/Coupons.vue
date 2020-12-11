<template>
  <div
    class="d-flex flex-wrap flew-md-nowrap justify-content-center align-items-center
    pb-2 m-3 border-bottom"
  >
    <!-- loading -->
    <!-- header -->
    <div class="container d-flex justify-content-between mt-2">
      <h1 class="h2 mb-0">{{ pageTitle }}</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button
            class="btn btn-primary"
            data-toggle="modal"
            toggle-target="#adminCouponModal"
            @click="openUpdateModal(true,target)"
          >
            建立新的優惠劵
          </button>
        </div>
      </div>
    </div>
    <!-- table -->
    <table class="table mt-4">
      <thead>
        <tr>
          <th>優惠劵名稱</th>
          <th>優惠碼</th>
          <th width="80">折扣</th>
          <th width="120">到期日</th>
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
          v-for="coupon in coupons"
          :key="coupon.id"
        >
          <td>{{ coupon.title }}</td>
          <td>{{ coupon.code }}</td>
          <td>{{ coupon.percent }} %</td>
          <td>{{ coupon.due_date }}</td>
          <td class="text-center">
            <span
              v-if="coupon.is_enabled"
              class="text-success"
            >已啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td class="d-flex justify-content-between">
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openUpdateModal(false, coupon.id)"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              data-toggle="modal"
              toggle-target="#delProductModal"
              @click="openDelModal(coupon.id)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="coupons.length === 0">
      <p class="h6">暫時未有優惠劵</p>
    </div>
    <AdminCouponModal
      :temp-coupon="target"
      :is-new="isNew"
      @get-coupons="getCoupons"
    />
    <DelCouponModal
      :coupon="target"
      @get-coupons="getCoupons"
    />
  </div>
</template>

<script>
import $ from 'jquery';
import AdminCouponModal from '../components/AdminCouponModal.vue';
import DelCouponModal from '../components/DelCouponModal.vue';

export default {
  name: 'Coupons',
  components: {
    AdminCouponModal,
    DelCouponModal,
  },
  data() {
    return {
      pageTitle: '優惠劵',
      coupons: [],
      target: {},
      pagination: {},
      isLoading: false,
      isNew: false,
    };
  },
  async created() {
    this.getCoupons();
  },
  methods: {
    getCoupons() {
      const API_PATH = process.env.VUE_APP_API_PATH;
      const CUSTOM_PATH = process.env.VUE_APP_CUSTOM_PATH;
      const api = `${API_PATH}/api/${CUSTOM_PATH}/admin/coupons`;
      this.isLoading = true;
      this.axios.get(api)
        .then((res) => {
          this.coupons = res.data.coupons;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((res) => this.$bus.$emit('message:push', res.data.messages, 'danger'));
    },
    openUpdateModal(isNew, id) {
      const target = this.coupons.find((item) => item.id === id);
      $('#adminCouponModal').modal('show');
      if (isNew) {
        this.isNew = true;
        this.target = {
          due_date: 0,
        };
      } else {
        this.isNew = false;
        this.target = { ...target };
        // change time format from unix timestamp
        const date = new Date(this.target.due_date * 1000);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        this.target.due_date = `${year}/${month}/${day}`;
      }
    },
    openDelModal(id) {
      const target = this.coupons.find((item) => item.id === id);
      this.target = { ...target };
      $('#delCouponModal').modal('show');
    },
  },
};
</script>
