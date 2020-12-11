<template>
  <div
    id="adminCouponModal"
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
      <div class="modal-content">
        <div class="modal-header">
          <h5
            id="couponModalLabel"
            class="modal-title"
          >
            {{ modalTitle }}優惠劵
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
          <div class="form-group">
            <label for="title">優惠劵名稱</label>
            <input
              id="title"
              v-model.trim="tempCoupon.title"
              type="text"
              class="form-control"
              placeholder="請輸入優惠劵名稱"
            >
          </div>
          <div class="form-group">
            <label for="coupon_code">優惠碼</label>
            <input
              id="coupon_code"
              v-model.trim="tempCoupon.code"
              type="text"
              class="form-control"
              placeholder="請輸入優惠碼"
            >
          </div>
          <div class="form-group">
            <label for="due_date">到期日</label>
            <input
              id="due_date"
              v-model="due_date"
              type="date"
              class="form-control"
            >
          </div>
          <div class="form-group">
            <label for="price">折扣百分比</label>
            <input
              id="price"
              v-model.number="tempCoupon.percent"
              type="number"
              min="0"
              max="100"
              class="form-control"
              placeholder="請輸入折扣百分比"
            >
          </div>
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
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="updateCoupon"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'AdminCouponModal',
  props: {
    tempCoupon: {
      type: Object,
      required: true,
    },
    isNew: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      due_date: new Date(),
    };
  },
  computed: {
    modalTitle() {
      if (this.isNew) return '新增';
      return '編輯';
    },
    api() {
      if (this.isNew) return `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon`;
      return `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon/${this.tempCoupon.id}`;
    },
    httpMethod() {
      if (this.isNew) return 'post';
      return 'put';
    },
  },
  watch: {
    due_date() {
      const timestamp = Math.floor(new Date(this.due_date) / 1000);
      this.tempCoupon.due_date = timestamp;
    },
  },
  created() {
    return this.due_date;
  },
  methods: {
    updateCoupon() {
      console.log(this.tempCoupon.due_date, this.due_date);
      this.axios[this.httpMethod](this.api, { data: this.tempCoupon })
        .then((res) => {
          $('#adminCouponModal').modal('hide');
          this.$emit('get-coupons');
          this.$bus.$emit('message:push', res.data.message, 'success');
        })
        .catch((res) => this.$bus.$emit('message:push', res.data.message, 'danger'));
    },
  },
};
</script>
