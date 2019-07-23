<template>
  <div>
    <nav class="navbar fix-navbar">
      <router-link to="/" class="brand d-lg-none text-white">
        <i class="fas fa-home"></i>
        衣美診所
      </router-link>
      <span class="icons ml-auto d-lg-none">
        <i class="fas fa-bars fa-1x text-white cursor-pointer" @click="showShopNavbar"></i>
      </span>
      <ul class="shop-nav text-center">
        <li class="text-right d-lg-none">
          <i class="fas fa-times fa-1x mr-3 text-dark-gray cursor-pointer" @click="showShopNavbar"></i>
        </li>
        <li class="pt-3 pb-3 d-none d-lg-block">
          <router-link to="/" class="text-dark-blue">
            <i class="fas fa-home"></i>
            衣美診所
          </router-link>
        </li>
        <li class="pt-3 pb-3 position-relative">
          <router-link to="/all-category/category/clothes" class="text-dark-blue">
            <i class="fas fa-box-open"></i>
            CATEGORY
          </router-link>
          <i class="fas fa-caret-down text-dark-gray cursor-pointer" @click="showCategory"></i>
          <ul class="category-navbar text-center">
            <li class="p-2 p-lg-3">
              <router-link to="/all-category/category/clothes" class="text-dark-blue">
                <i class="fas fa-tshirt"></i>
                CLOTHES 上衣
              </router-link>
            </li>
            <li class="p-2 p-lg-3">
              <router-link to="/all-category/category/skirt" class="text-dark-blue">
                <i class="fas fa-female"></i>
                SKIRT 裙子
              </router-link>
            </li>
            <li class="p-2 p-lg-3">
              <router-link to="/all-category/category/shoes" class="text-dark-blue">
                <i class="fas fa-shoe-prints"></i>
                SHOES 鞋子
              </router-link>
            </li>
            <li class="p-2 p-lg-3">
              <router-link to="/all-category/category/bag" class="text-dark-blue">
                <i class="fas fa-shopping-bag"></i>
                BAG 包包
              </router-link>
            </li>
          </ul>
        </li>
        <li class="pt-3 pb-3">
          <router-link to="/all-category/category/all" class="text-dark-blue">
            <i class="fas fa-star"></i>
            NEW
          </router-link>
        </li>
        <li class="pt-3 pb-3">
          <router-link to="/all-category/category/all" class="text-dark-blue">
            <i class="fas fa-fire"></i>
            POPULAR
          </router-link>
        </li>
        <li class="pt-3 pb-3">
          <router-link to="/login" class="text-dark-blue">
            <i class="fas fa-user"></i>
            LOGIN
          </router-link>
        </li>
        <li class="pt-3 pb-3">
          <router-link to="/all-category/cart-orders" :class="{'text-light-red':totalOrders>0}">
            <i class="fas fa-shopping-cart"></i>
            CHECKOUT
            <template v-if="totalOrders>0">({{totalOrders}})</template>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      totalOrders: 0
    };
  },
  methods: {
    showShopNavbar() {
      $(".shop-nav").toggleClass("active p-2");
      //mobile hide navbar
      $(".main").click(function(e) {
        if ($(".shop-nav").hasClass("active")) {
          $(".shop-nav").removeClass("active p-2");
        }
      });
    },
    showCategory() {
      $(".category-navbar").toggleClass("active");
    },
    //顯示目前購物車內有幾筆資料
    getTotalOrders() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.$http.get(api).then(response => {
        if (response.data.success) {
          vm.totalOrders = response.data.data.carts.length;
        }
      });
    }
  },
  created() {
    const vm = this;
    vm.getTotalOrders();

    //註冊點擊加入購物車後總數量變更事件
    vm.$bus.$on("getTotalOrders", function(val) {
      vm.totalOrders = val;
    });

    //註冊點擊刪除購物車後總數量變更事件
    vm.$bus.$on("getTotalOrders", function(val) {
      vm.getTotalOrders();
    });
  }
};
</script>