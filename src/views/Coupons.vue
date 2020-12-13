<template>
  <div
    class="d-flex flex-wrap flew-md-nowrap justify-content-center align-items-center
    pb-2 m-3 border-bottom"
  >
    <Loading :active.sync="isLoading" />
    <!-- header -->
    <div class="container d-flex justify-content-between mt-2">
      <h1 class="h2 mb-0">{{ pageTitle }}</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button
            class="btn btn-primary"
            data-toggle="modal"
            toggle-target="#updateCouponModal"
            @click="openCouponModal(true,target)"
          >
            建立新的{{ pageTitle }}
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
          <th width="120">折扣百分比</th>
          <th
            width="130"
          >
            到期日
          </th>
          <th width="100">是否啟用</th>
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
          <td>{{ coupon.percent }}%</td>
          <td>{{ coupon.due_date | date }}</td>
          <td>
            <span
              v-if="coupon.is_enabled"
              class="text-success"
            >已啟用</span>
            <span
              v-else
              class="text-muted"
            >未起用</span>
          </td>
          <td class="d-flex justify-content-between">
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openCouponModal(false, coupon.id)"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              data-toggle="modal"
              toggle-target="#delModal"
              @click="openDelModal(coupon.id)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="coupons == []"
      class="h6"
    >
      暫時未有優惠劵
    </div>
    <Pagination
      :pagination="pagination"
      @change-page="getCoupons"
    />
    <UpdateModal
      :item="target"
      :is-new="isNew"
      :page-title="pageTitle"
      @get-items="getCoupons"
    />
    <DelModal
      :item="target"
      :page-title="pageTitle"
      @get-items="getCoupons"
    />
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '../components/Pagination.vue';
import UpdateModal from '../components/UpdateCouponModal.vue';
import DelModal from '../components/DelModal.vue';

export default {
  name: 'Coupons',
  components: {
    Pagination,
    DelModal,
    UpdateModal,
  },
  data() {
    return {
      pageTitle: '優惠劵',
      coupons: [],
      target: {},
      isNew: false,
      isLoading: false,
      pagination: {},
    };
  },
  created() {
    this.getCoupons();
  },
  methods: {
    openCouponModal(isNew, id) {
      $('#updateCouponModal').modal('show');
      if (isNew) {
        this.isNew = true;
        this.target = {
          title: '',
          is_enabled: 0,
          percent: 100,
          due_date: '0',
          code: '',
        };
      } else {
        const target = this.coupons.find((item) => item.id === id);
        this.isNew = false;
        this.target = { ...target };
      }
    },
    getCoupons(page = 1) {
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupons?page=${page}`;
      this.isLoading = true;
      this.$http.get(url, this.tempProduct).then((res) => {
        this.coupons = res.data.coupons;
      }).catch((res) => this.$bus.$emit('message:push', res.data.message, 'danger'));
      this.isLoading = false;
    },
    openDelModal(id) {
      const target = this.coupons.find((item) => item.id === id);
      this.target = { ...target };
      $('#delModal').modal('show');
    },
  },
};
</script>
