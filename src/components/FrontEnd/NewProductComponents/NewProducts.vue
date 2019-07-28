<template>
  <section class="pt-5 pb-5" id="new-products" v-cloak>
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="true"></loading>
    <div class="container">
      <title-describe>NEW PRODUSTS</title-describe>
      <div class="row justify-content-center align-items-center">
        <div class="col-12 col-lg-7">
          <div class="row justify-content-center">
            <div
              class="col-10 col-md-6 mb-2 overflow-hidden"
              v-for="(newItem,index) in products"
              :key="newItem.id"
            >
              <div v-if="index<4" class="new-products">
                <router-link :to="{name:'productInfo',params: { id: newItem.id }}">
                  <img
                    class="new-products-img rounded"
                    :src="newItem.imageUrl"
                    alt="newProducts-img"
                  />
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-5 mt-3 text-center">
          <div class="new-product-info text-dark-blue">
            <p>我們秉持著獨一無二的精神</p>
            <p>為妳挑選出最適合妳的夏季裝扮</p>
            <p>自信 優雅 甜美</p>
            <p>是我們為每一位女孩量身打造的</p>
            <p>讓我們與妳一起打造，這個 夏天</p>
          </div>
          <router-link to="all-category/category/clothes" class="btn btn-outline-dark">See More</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.new-products {
  position: relative;
  width: 100%;
  padding-top: 80%;
  .new-products-img {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    transform: scale(1, 1);
    transition: all 0.5s linear;

    &:hover {
      transform: scale(1.1, 1.1);
    }
  }

  .new-product-info {
    font-size: 1.2rem;
  }
}
</style>

<script>
import titleDescribe from '@/components/FrontEnd/TitleComponents/TitleDescribe'
export default {
  data () {
    return {
      products: [],
      isLoading: true
    }
  },
  components: {
    titleDescribe
  },
  created () {
    const vm = this
    const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=1`
    vm.$http.get(api).then(res => {
      if (res.data.success) {
        vm.products = res.data.products
        vm.isLoading = false
      }
    })
  }
}
</script>
