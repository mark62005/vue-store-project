<template>
  <div
    id="adminProductModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="adminProductModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-lg"
      role="document"
    >
      <validation-observer v-slot="{ invalid }">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5
              id="adminProductModalLabel"
              class="modal-title"
            >
              {{ modalTitle }}產品
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
            <div class="row">
              <div class="col-sm-4">
                <!-- 圖片網址 -->
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    id="image"
                    v-model.trim="tempProduct.imageUrl"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                  >
                </div>

                <!-- 上傳圖片 -->
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i
                      v-if="status.isLoading"
                      class="fas fa-spinner fa-spin"
                    ></i>
                  </label>
                  <input
                    id="customFile"
                    ref="files"
                    type="file"
                    class="form-control"
                    @change="uploadImage"
                  >
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                  :alt="tempProduct.title"
                >
              </div>
              <div class="col-sm-8">
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
                      v-model.trim="tempProduct.title"
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

                <div class="form-row">
                  <!-- 分類 -->
                  <div class="col">
                    <validation-provider
                      v-slot="{ errors, classes }"
                      rules="required"
                    >
                      <div class="form-group">
                        <!-- 輸入框 -->
                        <label for="category">分類</label>
                        <input
                          id="category"
                          v-model.trim="tempProduct.category"
                          type="text"
                          name="分類"
                          class="form-control"
                          :class="classes"
                          placeholder="請輸入分類"
                        >
                        <!-- 錯誤訊息 -->
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <!-- 單位 -->
                  <div class="col">
                    <validation-provider
                      v-slot="{ errors, classes }"
                      rules="required"
                    >
                      <div class="form-group">
                        <!-- 輸入框 -->
                        <label for="unit">單位</label>
                        <input
                          id="unit"
                          v-model.trim="tempProduct.unit"
                          type="unit"
                          name="單位"
                          class="form-control"
                          :class="classes"
                          placeholder="請輸入單位"
                        >
                        <!-- 錯誤訊息 -->
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                </div>

                <div class="form-row">
                  <!-- 原價 -->
                  <div class="col">
                    <validation-provider
                      v-slot="{ errors, classes }"
                      rules="required"
                    >
                      <div class="form-group">
                        <!-- 輸入框 -->
                        <label for="origin_price">原價</label>
                        <input
                          id="origin_price"
                          v-model.number="tempProduct.origin_price"
                          type="number"
                          min="0"
                          name="原價"
                          class="form-control"
                          :class="classes"
                          placeholder="請輸入原價"
                        >
                        <!-- 錯誤訊息 -->
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <!-- 售價 -->
                  <div class="col">
                    <validation-provider
                      v-slot="{ errors, classes }"
                      rules="required"
                    >
                      <div class="form-group">
                        <!-- 輸入框 -->
                        <label for="price">售價</label>
                        <input
                          id="price"
                          v-model.number="tempProduct.price"
                          type="number"
                          min="0"
                          name="售價"
                          class="form-control"
                          :class="classes"
                          placeholder="請輸入售價"
                        >
                        <!-- 錯誤訊息 -->
                        <span class="invalid-feedback">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                </div>

                <hr>

                <!-- 產品描述 -->
                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    id="description"
                    v-model.trim="tempProduct.description"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <!-- 說明內容 -->
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    id="content"
                    v-model.trim="tempProduct.content"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>
                <!-- 是否啟用 -->
                <div class="form-group">
                  <div class="form-check">
                    <input
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      true-value="1"
                      false-value="0"
                      class="form-check-input"
                      type="checkbox"
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
            </div>
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
              class="btn btn-primary"
              :disabled="invalid"
              @click="updateProduct"
            >
              確認
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
  name: 'AdminProductModal',
  props: {
    tempProduct: {
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
      if (this.isNew) return `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product`;
      return `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${this.tempProduct.id}`;
    },
    httpMethod() {
      if (this.isNew) return 'post';
      return 'put';
    },
  },
  methods: {
    updateProduct() {
      this.axios[this.httpMethod](this.api, { data: this.tempProduct }).then((res) => {
        $('#adminProductModal').modal('hide');
        this.$emit('get-products');
        this.$bus.$emit('message:push', res.data.message, 'success');
      }).catch((res) => this.$bus.$emit('message:push', res.data.message, 'danger'));
    },
    uploadImage() {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/upload`;
      const uploadedImage = this.$refs.files.files[0];
      const formData = new FormData();
      this.status.isLoading = true;
      formData.append('file-to-upload', uploadedImage);
      this.axios.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {
        this.$set(this.tempProduct, 'imageUrl', res.data.imageUrl);
        this.$bus.$emit('message:push', res.data.message, 'success');
      })
        .catch((res) => this.$bus.$emit('message:push', res.data.message, 'danger'));
      this.status.isLoading = false;
    },
  },
};
</script>
