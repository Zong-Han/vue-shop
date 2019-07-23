<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{'disabled':pageItem.has_pre===false}" @click="goPage(-1)">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          :class="{'active':item===pageItem.current_page}"
          v-for="(item,index) in pageItem.total_pages"
          :key="index"
          @click="goPage(0)"
        >
          <a class="page-link" href="#">{{item}}</a>
        </li>
        <li class="page-item" :class="{'disabled':pageItem.has_next===false}" @click="goPage(1)">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["pageItem"],
  methods: {
    goPage(num) {
      const vm=this
      if (num === 0) {
        num = Number(event.target.textContent) < this.pageItem.current_page ? -1 : 1
      }
      if (this.pageItem.has_pre || this.pageItem.has_next) {
        vm.$bus.$emit('changePage',num);
      }
    }
  }
};
</script>