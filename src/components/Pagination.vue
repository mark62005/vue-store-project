<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul
        v-if="pagination.page == 0"
        class="pagination"
      >
        <li
          class="page-item"
          :class="{ disabled: !pagination.has_pre }"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="changePage(pagination.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item active">
          <a
            class="page-link"
            href="#"
            @click.prevent="changePage(1)"
          >1</a>
        </li>
        <li
          class="page-item"
          :class="{ disabled: !pagination.has_next }"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="changePage(pagination.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
      <ul
        v-else
        class="pagination"
      >
        <li
          class="page-item"
          :class="{ disabled: !pagination.has_pre }"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="changePage(pagination.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li
          v-for="page in pagination.total_pages"
          :key="page"
          class="page-item"
          :class="{ active: page === pagination.current_page }"
        >
          <a
            class="page-link"
            href="#"
            @click.prevent="changePage(page)"
          >{{ page }}</a>
        </li>
        <li
          class="page-item"
          :class="{ disabled: !pagination.has_next }"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="changePage(pagination.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pagination: {
      type: Object,
      required: true,
    },
  },
  methods: {
    changePage(page) {
      this.$emit('change-page', page);
    },
  },
};
</script>
