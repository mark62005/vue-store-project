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
            toggle-target="#adminProductModal"
            @click="openCouponModal(true,tempCoupon)"
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
    <!-- Modal -->
    <div
      id="couponModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="couponModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <validation-observer v-slot="{ invalid }">
          <div class="modal-content border-0">
            <div class="modal-header">
              <h5
                id="couponModalLabel"
                class="modal-title"
              >
                {{ type }}{{ pageTitle }}
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
              <!-- 標題 -->
              <validation-provider
                v-slot="{ errors, classes }"
                rules="required|email"
              >
                <div class="form-group">
                  <!-- 輸入框 -->
                  <label for="title">標題</label>
                  <input
                    id="title"
                    v-model.trim="tempCoupon.title"
                    type="text"
                    name="標題"
                    class="form-control"
                    :class="classes"
                    placeholder="請輸入標題"
                  >
                  <!-- 錯誤訊息 -->
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </div>
              </validation-provider>
              <!-- 優惠碼 -->
              <validation-provider
                v-slot="{ errors, classes }"
                rules="required"
              >
                <div class="form-group">
                  <!-- 輸入框 -->
                  <label for="coupon_code">優惠碼</label>
                  <input
                    id="coupon_code"
                    v-model.trim="tempCoupon.coupon_code"
                    type="text"
                    name="優惠碼"
                    class="form-control"
                    :class="classes"
                    placeholder="請輸入優惠碼"
                  >
                  <!-- 錯誤訊息 -->
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </div>
              </validation-provider>
              <!-- 到期日 -->
              <validation-provider
                v-slot="{ errors, classes }"
                rules="required"
              >
                <div class="form-group">
                  <!-- 輸入框 -->
                  <label for="due_date">到期日</label>
                  <input
                    id="due_date"
                    v-model="due_date"
                    type="date"
                    name="到期日"
                    class="form-control"
                    :class="classes"
                    placeholder="請輸入到期日"
                  >
                  <!-- 錯誤訊息 -->
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </div>
              </validation-provider>
              <!-- 折扣百分比 -->
              <div class="form-group">
                <label for="price">折扣百分比</label>
                <input
                  id="price"
                  v-model="tempCoupon.percent"
                  type="number"
                  class="form-control"
                  placeholder="請輸入折扣百分比"
                >
              </div>
              <!-- 是否啟用 -->
              <div class="form-group">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    v-model="tempCoupon.is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                  >
                  <label
                    class="form-check-label"
                    for="is_enabled"
                  >
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                :disabled="invalid"
                @click="updateCoupon"
              >
                更新優惠券
              </button>
            </div>
          </div>
        </validation-observer>
      </div>
    </div>
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
import DelModal from '../components/DelModal.vue';

export default {
  name: 'Coupons',
  components: {
    Pagination,
    DelModal,
  },
  data() {
    return {
      pageTitle: '優惠劵',
      coupons: [],
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        due_date: 0,
        code: '',
      },
      target: {},
      due_date: new Date(),
      isNew: false,
      isLoading: false,
      pagination: {},
    };
  },
  computed: {
    api() {
      if (this.isNew) return `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon`;
      return `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon/${this.tempCoupon.id}`;
    },
    httpMethod() {
      if (this.isNew) return 'post';
      return 'put';
    },
    type() {
      if (this.isNew) return '新增';
      return '編輯';
    },
  },
  watch: {
    due_date() {
      const timestamp = Math.floor(new Date(this.due_date) / 1000);
      this.tempCoupon.due_date = timestamp;
    },
  },
  created() {
    this.getCoupons();
  },
  methods: {
    openCouponModal(isNew, id) {
      const target = this.coupons.find((item) => item.id === id);
      $('#couponModal').modal('show');
      if (isNew) {
        this.isNew = true;
        this.tempCoupon = {};
      } else {
        this.isNew = false;
        this.tempCoupon = { ...target };
        const dateAndTime = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T');
        this.due_date = { ...dateAndTime[0] };
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
    updateCoupon() {
      if (this.isNew) {
        this.$http[this.httpMethod](this.api, { data: this.tempCoupon }).then((res) => {
          console.log(res, this.tempCoupon);
          $('#couponModal').modal('hide');
          this.getCoupons();
        });
      } else {
        this.due_date = new Date(this.tempCoupon.due_date * 1000);
        this.$http[this.httpMethod](this.api, { data: this.tempCoupon }).then((res) => {
          $('#couponModal').modal('hide');
          this.getCoupons();
          this.$bus.$emit('message:push', res.data.message, 'success');
        }).catch((res) => this.$bus.$emit('message:push', res.data.message, 'danger'));
      }
    },
    openDelModal(id) {
      const target = this.coupons.find((item) => item.id === id);
      this.target = { ...target };
      $('#delModal').modal('show');
    },
  },
};
</script>
