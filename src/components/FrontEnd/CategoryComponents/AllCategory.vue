<template>
  <div class="container">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="true"
    ></loading>
    <div class="row pt-5 pb-5">
      <div class="col-12 mb-3">
        <banner></banner>
      </div>
      <div class="col-12 col-md-3 mb-5">
        <sidebar :re-select="reSelect"></sidebar>
      </div>
      <div class="col-12 col-md-9">
        <div class="row justify-content-center justify-content-lg-start">
          <div class="col-10 col-md-6 col-lg-4" v-for="item in filterPrice" :key="item.id">
            <productCard :product="item"></productCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/FrontEnd/NavComponents/FrontSidebar";
import productCard from "@/components/FrontEnd/CategoryComponents/Card";
import banner from "@/components/FrontEnd/CategoryComponents/Banner";

export default {
  data() {
    return {
      allproduct: [],
      filters: [],
      filterPrice: [],
      reSelect: false,
      isLoading: false,
      page:1
    };
  },
  components: {
    sidebar,
    productCard,
    banner
  },
  methods: {
    getCategory() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      vm.$http.get(api).then(res => {
        if (res.data.success) {
          vm.allproduct = res.data.products;
          let path = vm.$route.params.id;
          //選取種類
          switch (path) {
            case "clothes":
              var filterCategory = vm.allproduct.filter(ele => {
                return ele.category === "上衣";
              });
              vm.filters = filterCategory;
              break;

            case "shoes":
              var filterCategory = vm.allproduct.filter(ele => {
                return ele.category === "鞋子";
              });
              vm.filters = filterCategory;
              break;

            case "skirt":
              var filterCategory = vm.allproduct.filter(ele => {
                return ele.category === "裙子";
              });
              vm.filters = filterCategory;
              break;

            case "bag":
              var filterCategory = vm.allproduct.filter(ele => {
                return ele.category === "包包";
              });
              vm.filters = filterCategory;
              break;
            case "all":
              vm.filters = vm.allproduct;
              break;
          }
          vm.filterPrice = vm.filters; //初始畫面
          vm.isLoading = false;
        }
      });
    }
  },
  created() {
    const vm = this;
    vm.getCategory();
    // FrontSidebar 元件選擇價位時觸發
    vm.$bus.$on("selectPrice", function(price) {
      vm.filterPrice = vm.filters; 
      vm.reSelect = false; //FrontSidebar價位選單不更新
      switch (price) {
        case 1000:
          var filter_Price = vm.filters.filter(ele => {
            return ele.price <= 1000;
          });
          vm.filterPrice = filter_Price;
          break;
        case 2000:
          var filter_Price = vm.filters.filter(ele => {
            return ele.price > 1000 && ele.price <= 2000;
          });
          vm.filterPrice = filter_Price;
          break;
        case 3000:
          var filter_Price = vm.filters.filter(ele => {
            return ele.price > 2000 && ele.price <= 3000;
          });
          vm.filterPrice = filter_Price;
          break;
        default:
          vm.filterPrice = vm.filters;
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    const vm = this;
    vm.reSelect = true; //換路由時，FrontSidebar價位選單重新渲染
    vm.getCategory();
    next();
  }
};
</script>
