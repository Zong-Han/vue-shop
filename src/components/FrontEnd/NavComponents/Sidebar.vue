<template>
  <div>
    <nav class="sidebar text-dark-blue text-center">
      <ul class="category-list mb-3 list-unstyled">
        <li class="p-2">
          <router-link
            to="clothes"
            class="text-dark-blue"
            :class="{'active':$route.params.id=='clothes'}"
          >
            <i class="fas fa-tshirt"></i>
            CLOTHES
          </router-link>
        </li>
        <li class="p-2">
          <router-link
            to="skirt"
            class="text-dark-blue"
            :class="{'active':$route.params.id=='skirt'}"
          >
            <i class="fas fa-female"></i>
            SKIRT
          </router-link>
        </li>
        <li class="p-2">
          <router-link
            to="shoes"
            class="text-dark-blue"
            :class="{'active':$route.params.id=='shoes'}"
          >
            <i class="fas fa-shoe-prints"></i>
            SHOES
          </router-link>
        </li>

        <li class="p-2">
          <router-link to="bag" class="text-dark-blue" :class="{'active':$route.params.id=='bag'}">
            <i class="fas fa-shopping-bag"></i>
            BAG
          </router-link>
        </li>
      </ul>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text text-dark-blue bg-white border-secondary" for="money-select">售價</label>
        </div>
        <select class="custom-select border-secondary text-dark-blue" id="money-select" v-model="price" @change="priceSelect">
          <option selected value="null">選擇價位</option>
          <option value="1000">0-1000</option>
          <option value="2000">1000-2000</option>
          <option value="3000">2000-3000</option>
        </select>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  .category-list {
    border: 1px solid #273057;
    font-size: 1.2rem;
    line-height: 1.5;

    li a:hover {
      color: #ff6f61;
      text-decoration: none;
    }

    .active {
      color: #ff6f61;
    }
  }

  .option-list {
    li {
      border: 1px solid #273057;
      &:hover {
        cursor: pointer;
        background-color: #ff6f61;
        text-decoration: none;
      }
    }
  }
}
</style>

<script>
export default {
  data () {
    return {
      price: null
    }
  },
  props: ['reSelect'],
  methods: {
    priceSelect () {
      const vm = this
      vm.$bus.$emit('selectPrice', Number(vm.price))// 觸發 AllCategory 元件
    }
  },
  watch: {
    reSelect: { // 價位選單重新更新
      immediate: true,
      handler (newVal, oldVal) {
        const vm = this
        if (newVal === true) {
          vm.price = null
        }
      }
    }
  }
}
</script>
