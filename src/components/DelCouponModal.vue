<template>
  <div>
    <div
      id="delCouponModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="delModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5
              id="delModalLabel"
              class="modal-title"
            >
              <span>刪除產品</span>
            </h5>
            <button
              type="button"
              class="close text-white"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ coupon.title }}</strong> 優惠劵(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="delCoupon(coupon.id)"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'DelCouponModal',
  props: {
    coupon: {
      type: Object,
      required: true,
    },
  },
  methods: {
    delCoupon(id) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon/${id}`;
      this.axios.delete(api)
        .then((res) => {
          this.$emit('get-coupons');
          this.$bus.$emit('message:push', res.data.message, 'success');
        })
        .catch((res) => this.$bus.$emit('message:push', res.data.message, 'danger'));
      $('#delCouponModal').modal('hide');
    },
  },
};
</script>
