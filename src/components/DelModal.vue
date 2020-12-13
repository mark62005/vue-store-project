<template>
  <div>
    <div
      id="delModal"
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
              <span>刪除{{ pageTitle }}</span>
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
            是否刪除 <strong class="text-danger">{{ item.title }}</strong> 商品(刪除後將無法恢復)。
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
              @click="delProduct(item.id)"
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
  name: 'DelModal',
  props: {
    item: {
      type: Object,
      required: true,
    },
    pageTitle: {
      type: String,
      required: true,
    },
  },
  computed: {
    api() {
      const API_PATH = process.env.VUE_APP_API_PATH;
      const CUSTOM_PATH = process.env.VUE_APP_CUSTOM_PATH;
      if (this.pageTitle === '產品') return `${API_PATH}/api/${CUSTOM_PATH}/admin/product`;
      return `${API_PATH}/api/${CUSTOM_PATH}/admin/coupon`;
    },
  },
  methods: {
    delProduct(id) {
      const api = `${this.api}/${id}`;
      console.log(api);
      this.axios.delete(api)
        .then((res) => {
          this.$emit('get-items');
          this.$bus.$emit('message:push', res.data.message, 'success');
        })
        .catch((res) => this.$bus.$emit('message:push', res.data.message, 'danger'));
      $('#delModal').modal('hide');
    },
  },
};
</script>
