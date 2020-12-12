<template>
  <div
    class="d-flex flex-wrap flew-md-nowrap justify-content-center align-items-center
    pb-2 m-3 border-bottom"
  >
    <Loading :active.sync="isLoading" />
    <div class="container d-flex justify-content-between mt-2">
      <h1 class="h2 mb-0">{{ pageTitle }}</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button
            class="btn btn-primary"
            data-toggle="modal"
            toggle-target="#adminProductModal"
            @click="openUpdateModal(true,target)"
          >
            建立新的產品
          </button>
        </div>
      </div>
    </div>
    <table class="table mt-4"></table>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      pageTitle: '購物車',
      carts: [],
      pagination: {},
      isLoading: false,
    };
  },
};
</script>
