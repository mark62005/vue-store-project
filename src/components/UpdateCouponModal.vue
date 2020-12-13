<template>
  <div
    id="updateCouponModal"
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
              {{ modalTitle }}{{ pageTitle }}
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
              rules="required"
            >
              <div class="form-group">
                <!-- 輸入框 -->
                <label for="title">標題</label>
                <input
                  id="title"
                  v-model.trim="item.title"
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
                  v-model.trim="item.coupon_code"
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
                v-model="item.percent"
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
                  v-model="item.is_enabled"
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
</template>

<script>
import $ from 'jquery';

export default {
  name: 'UpdateModal',
  props: {
    item: {
      type: Object,
      required: true,
    },
    isNew: {
      type: Boolean,
      required: true,
    },
    pageTitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      status: {
        isLoading: false,
      },
    };
  },
  computed: {
    modalTitle() {
      if (this.isNew) return '新增';
      return '編輯';
    },
    api() {
      const API_PATH = process.env.VUE_APP_API_PATH;
      const CUSTOM_PATH = process.env.VUE_APP_CUSTOM_PATH;
      if (this.isNew) return `${API_PATH}/api/${CUSTOM_PATH}/admin/coupon`;
      return `${API_PATH}/api/${CUSTOM_PATH}/admin/coupon/${this.item.id}`;
    },
    httpMethod() {
      if (this.isNew) return 'post';
      return 'put';
    },
    due_date() {
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T');
      if (this.isNew) return new Date();
      return dateAndTime[0];
    },
  },
  watch: {
    due_date() {
      const timestamp = Math.floor(new Date(this.due_date) / 1000);
      this.tempCoupon.due_date = timestamp;
    },
  },
  methods: {
    updateItem() {
      this.axios[this.httpMethod](this.api, { data: this.item }).then((res) => {
        $('#updateCouponModal').modal('hide');
        this.$emit('get-items');
        this.$bus.$emit('message:push', res.data.message, 'success');
      }).catch((res) => this.$bus.$emit('message:push', res.data.message, 'danger'));
    },
    updateCoupon() {
      if (!this.isNew) this.due_date = new Date(this.tempCoupon.due_date * 1000);
      this.axios[this.httpMethod](this.api, { data: this.item }).then((res) => {
        console.log(res, this.tempCoupon);
        $('#updateCouponModal').modal('hide');
        this.getCoupons();
        this.$bus.$emit('message:push', res.data.message, 'success');
      }).catch((res) => this.$bus.$emit('message:push', res.data.message, 'danger'));
    },
  },
};
</script>
