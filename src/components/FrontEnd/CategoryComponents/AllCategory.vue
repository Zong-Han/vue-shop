<template>
  <div class="container">
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="true"></loading>
    <div class="row py-1 py-md-5">
      <div class="col-12 mb-3">
        <banner></banner>
      </div>
      <div class="col-12 col-md-3 mb-5">
        <sidebar :re-select="reSelect"></sidebar>
      </div>
      <div class="col-12 col-md-9">
        <template v-if="filterPrice.length>0">
          <div class="row justify-content-center justify-content-lg-start">
            <div class="col-10 col-md-6 col-lg-4" v-for="item in filterPrice" :key="item.id">
              <productCard :product="item"></productCard>
            </div>
          </div>
        </template>
        <template v-else>
          <h3 class="col-12 text-muted text-center">抱歉，價格區間內沒有合適的商品喔 !</h3>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from '@/components/FrontEnd/NavComponents/Sidebar'
import productCard from '@/components/FrontEnd/CategoryComponents/Card'
import banner from '@/components/FrontEnd/CategoryComponents/Banner'

export default {
  data () {
    return {
      allproduct: [],
      filters: [],
      filterPrice: [],
      reSelect: false,
      isLoading: false,
      page: 1
    }
  },
  components: {
    sidebar,
    productCard,
    banner
  },
  methods: {
    getCategory () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`
      vm.$http.get(api).then(res => {
        if (res.data.success) {
          vm.allproduct = res.data.products
          const path = vm.$route.params.id
          var filterCategory = []
          // 選取種類
          switch (path) {
            case 'clothes':
              filterCategory = vm.allproduct.filter(ele => {
                return ele.category === '上衣'
              })
              vm.filters = filterCategory
              break

            case 'shoes':
              filterCategory = vm.allproduct.filter(ele => {
                return ele.category === '鞋子'
              })
              vm.filters = filterCategory
              break

            case 'skirt':
              filterCategory = vm.allproduct.filter(ele => {
                return ele.category === '裙子'
              })
              vm.filters = filterCategory
              break

            case 'bag':
              filterCategory = vm.allproduct.filter(ele => {
                return ele.category === '包包'
              })
              vm.filters = filterCategory
              break
            case 'all':
              vm.filters = vm.allproduct
              break
          }
          vm.filterPrice = vm.filters // 初始畫面
          vm.isLoading = false
        }
      })
    }
  },
  created () {
    const vm = this
    vm.getCategory()
    // FrontSidebar 元件選擇價位時觸發
    vm.$bus.$on('selectPrice', function (price) {
      vm.filterPrice = vm.filters
      vm.reSelect = false // FrontSidebar價位選單不更新
      var filterPrice = []
      switch (price) {
        case 1000:
          filterPrice = vm.filters.filter(ele => {
            return ele.price <= 1000
          })
          vm.filterPrice = filterPrice
          break
        case 2000:
          filterPrice = vm.filters.filter(ele => {
            return ele.price > 1000 && ele.price <= 2000
          })
          vm.filterPrice = filterPrice
          break
        case 3000:
          filterPrice = vm.filters.filter(ele => {
            return ele.price > 2000 && ele.price <= 3000
          })
          vm.filterPrice = filterPrice
          break
        default:
          vm.filterPrice = vm.filters
      }
    })
  },
  beforeRouteUpdate (to, from, next) {
    const vm = this
    vm.reSelect = true // 換路由時，FrontSidebar價位選單重新渲染
    vm.getCategory()
    next()
  }
}
</script>
