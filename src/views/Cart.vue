<template>
  <div
    class="d-flex flex-wrap flew-md-nowrap justify-content-center align-items-center
    pb-2 m-3 border-bottom"
  >
    <Loading :active.sync="isLoading" />
    <div class="container d-flex justify-content-between mt-2">
      <h1 class="h2 mb-0">{{ pageTitle }}</h1>
    </div>
    <!-- table -->
    <table class="table mt-4">
      <thead>
        <th></th>
        <th>品名</th>
        <th>數量</th>
        <th width="150">單價</th>
      </thead>
      <tbody v-if="cart.carts">
        <tr
          v-for="item in cart.carts"
          :key="item.id"
        >
          <td class="align-middle">
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="removeItem(item.id)"
            >
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
          <td class="align-middle">
            {{ item.product.title }}
            <div
              v-if="item.coupon"
              class="text-success"
            >
              已套用優惠券
            </div>
          </td>
          <td class="align-middle">{{ item.qty }} {{ item.product.unit }}</td>
          <td class="align-middle text-right">{{ item.final_total | currency }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td>尚未加入任何產品，快去逛逛吧！</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td
            colspan="3"
            class="text-right"
          >
            總計
          </td>
          <td class="text-right">{{ cart.total | currency }}</td>
        </tr>
        <tr v-if="cart.final_total !== cart.total">
          <td
            colspan="3"
            class="text-right text-success"
          >
            折扣價
          </td>
          <td class="text-right text-success">{{ cart.final_total }}</td>
        </tr>
      </tfoot>
    </table>
    <!-- coupon -->
    <div class="input-group mb-3 input-group-sm">
      <input
        v-model.trim="coupon_code"
        type="text"
        class="form-control"
        placeholder="請輸入優惠碼"
      >
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="addCouponCode"
          @keyup.enter="addCouponCode"
        >
          套用優惠碼
        </button>
      </div>
    </div>
    <!-- user form -->
    <div class="container my-5 row justify-content-center">
      <validation-observer
        v-slot="{ invalid,handleSubmit }"
        class="col-md-6"
      >
        <form @submit.prevent="handleSubmit(createOrder)">
          <!-- email -->
          <validation-provider
            v-slot="{ errors, classes, passed }"
            rules="required|email"
          >
            <div class="form-group">
              <!-- 輸入框 -->
              <label for="email">Email</label>
              <input
                id="email"
                v-model.trim="form.user.email"
                type="email"
                name="email"
                class="form-control"
                :class="classes"
                placeholder="請輸入 Email"
              >
              <!-- 錯誤訊息 -->
              <span class="invalid-feedback">{{ errors[0] }}</span>
              <span
                v-if="passed"
                class="valid-feedback"
              >Email 正確</span>
            </div>
          </validation-provider>
          <!-- 收件人姓名 -->
          <validation-provider
            v-slot="{ errors, classes }"
            rules="required"
          >
            <div class="form-group">
              <!-- 輸入框 -->
              <label for="username">收件人姓名</label>
              <input
                id="username"
                v-model.trim="form.user.name"
                type="text"
                name="收件人姓名"
                class="form-control"
                :class="classes"
                placeholder="請輸入姓名"
              >
              <!-- 錯誤訊息 -->
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </validation-provider>
          <!-- 收件人電話 -->
          <div class="form-group">
            <label for="usertel">收件人電話</label>
            <input
              id="usertel"
              v-model="form.user.tel"
              type="tel"
              class="form-control"
              placeholder="請輸入電話"
            >
          </div>

          <validation-provider
            v-slot="{ errors, classes }"
            rules="required"
          >
            <div class="form-group">
              <!-- 輸入框 -->
              <label for="useraddress">收件人地址</label>
              <input
                id="useraddress"
                v-model.trim="form.user.address"
                type="text"
                name="收件人地址"
                class="form-control"
                :class="classes"
                placeholder="請輸入地址"
              >
              <!-- 錯誤訊息 -->
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <div class="form-group">
            <label for="comment">留言</label>
            <textarea
              id="comment"
              v-model.trim="form.message"
              name=""
              class="form-control"
              cols="30"
              rows="10"
            ></textarea>
          </div>

          <div class="text-right">
            <button
              class="btn btn-danger"
              :disabled="invalid"
            >
              送出訂單
            </button>
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Carts',
  data() {
    return {
      pageTitle: '購物車',
      cart: {},
      isLoading: false,
      coupon_code: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  async created() {
    this.getCart();
  },
  methods: {
    getCart() {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      this.isLoading = true;
      this.axios.get(api).then((res) => {
        this.cart = res.data.data;
        this.isLoading = false;
      }).catch((res) => this.$bus.$emit('message:push', res.data.message, 'danger'));
    },
    removeItem(id) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart/${id}`;
      this.isLoading = true;
      this.axios.delete(api).then((res) => {
        this.$bus.$emit('message:push', res.data.message, 'success');
        this.getCart();
        this.isLoading = false;
      }).catch((res) => this.$bus.$emit('message:push', res.data.message, 'danger'));
    },
    addCouponCode() {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/coupon`;
      const coupon = {
        code: this.coupon_code,
      };
      if (!this.coupon_code) this.$bus.$emit('message:push', '請先輸入優惠碼', 'danger');
      else {
        this.isLoading = true;
        this.axios.post(api, { data: coupon }).then((res) => {
          if (res.data.success) {
            this.$bus.$emit('message:push', res.data.message, 'success');
            this.getCart();
          } else this.$bus.$emit('message:push', res.data.message, 'danger');
        });
        this.isLoading = false;
      }
    },
    createOrder() {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/order`;
      const order = this.form;
      this.isLoading = true;
      this.axios.post(api, { data: order }).then((res) => {
        if (res.data.success) {
          this.$bus.$emit('message:push', res.data.message, 'success');
          this.getCart();
        } else this.$bus.$emit('message:push', '欄位不完整', 'danger');
        this.isLoading = false;
      });
    },
  },
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
