<template>
  <div>
    <nav class="navbar fix-navbar">
      <router-link to="/" exact class="font-weight-bold d-lg-none text-dark text-decoration-none">
        <i class="fas fa-home"></i>
        衣美診所
      </router-link>
      <span class="icons ml-auto d-lg-none">
        <i class="fas fa-bars cursor-pointer" @click="showShopNavbar"></i>
      </span>
      <ul class="shop-nav text-center list-unstyled">
        <li class="text-right d-lg-none">
          <i class="fas fa-times fa-2x mr-1 text-muted cursor-pointer" @click="showShopNavbar"></i>
        </li>
        <li class="pt-3 pb-3 d-none d-lg-block">
          <router-link to="/" exact class="text-dark-blue text-decoration-none">
            <i class="fas fa-home"></i>
            衣美診所
          </router-link>
        </li>
        <li class="pt-3 pb-3 position-relative" ref="category">
          <router-link
            to="/all-category/category/clothes"
            class="text-dark-blue text-decoration-none"
            :class="{'color-active': routeId}"
          >
            <i class="fas fa-box-open"></i>
            CATEGORY
          </router-link>
          <i class="fas fa-caret-down text-muted cursor-pointer" @click="showCategory"></i>
          <ul class="category-navbar text-center list-unstyled text-decoration-none">
            <li class="p-2 p-lg-3">
              <router-link
                to="/all-category/category/clothes"
                class="text-dark-blue text-decoration-none"
              >
                <i class="fas fa-tshirt"></i>
                CLOTHES 上衣
              </router-link>
            </li>
            <li class="p-2 p-lg-3">
              <router-link
                to="/all-category/category/skirt"
                class="text-dark-blue text-decoration-none"
              >
                <i class="fas fa-female"></i>
                SKIRT 裙子
              </router-link>
            </li>
            <li class="p-2 p-lg-3">
              <router-link
                to="/all-category/category/shoes"
                class="text-dark-blue text-decoration-none"
              >
                <i class="fas fa-shoe-prints"></i>
                SHOES 鞋子
              </router-link>
            </li>
            <li class="p-2 p-lg-3">
              <router-link
                to="/all-category/category/bag"
                class="text-dark-blue text-decoration-none"
              >
                <i class="fas fa-shopping-bag"></i>
                BAG 包包
              </router-link>
            </li>
          </ul>
        </li>
        <li class="pt-3 pb-3" ref="category2">
          <router-link to="/all-category/category/all" class="text-dark-blue text-decoration-none">
            <i class="fas fa-fire"></i>
            POPULAR
          </router-link>
        </li>
        <li class="pt-3 pb-3">
          <router-link to="/login" class="text-dark-blue text-decoration-none">
            <i class="fas fa-user"></i>
            LOGIN
          </router-link>
        </li>
        <li class="pt-3 pb-3">
          <router-link
            to="/all-category/cart-orders"
            class="text-dark-blue text-decoration-none"
            :class="{'text-danger ':totalOrders>0}"
          >
            <i class="fas fa-shopping-cart"></i>
            CHECKOUT
            <template v-if="totalOrders>0">({{totalOrders}})</template>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<style lang="scss" scoped>
.fix-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 1030;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);

  .shop-nav {
    position: absolute;
    top: 0;
    right: -50%;
    width: 0;
    height: 100vh;
    opacity: 0;
    overflow: hidden;
    transition: all 0.5s linear;
    background-color: white;

    li {
      letter-spacing: 4px;

      a:hover,
      .fa-caret-down:hover,
      .fa-caret-down:active {
        color: #ff6f61;
      }
    }

    li .router-link-exact-active,
    li .router-link-active {
      color: #ff6f61;
    }

    .color-active {
      color: #ff6f61;
    }

    .category-navbar {
      line-height: 1.2;
      max-height: 0;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s linear;

      a:hover {
        color: #ff6f61;
      }

      &.active-category {
        padding-top: 1rem;
        opacity: 1;
        width: 100%;
        max-height: 250px;
        visibility: visible;
      }
    }
  }

  .active {
    width: 70%;
    opacity: 1;
    visibility: visible;
    right: 0;
    z-index: 1;
  }

  @media (min-width: 768px) {
    .icons {
      .fa-bars {
        font-size: 1.5rem;
      }
    }
  }

  @media (min-width: 992px) {
    .shop-nav {
      position: relative;
      right: 0;
      width: 100%;
      height: auto;
      opacity: 1;
      display: flex;
      background-color: transparent;

      li {
        font-weight: 600;
        font-size: 1.2rem;
        letter-spacing: normal;
        width: 100%;
        white-space: nowrap;
      }
    }
  }
}
</style>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      totalOrders: 0,
      pathId: ['clothes', 'skirt', 'shoes', 'bag']
    }
  },
  methods: {
    showShopNavbar () {
      $('.shop-nav').toggleClass('active p-2')
      // mobile hide navbar
      $('.main').click(function (e) {
        if ($('.shop-nav').hasClass('active')) {
          $('.shop-nav').removeClass('active p-2')
        }
      })
    },
    showCategory () {
      $('.category-navbar').toggleClass('active-category')
    },
    // 顯示目前購物車內有幾筆資料
    getTotalOrders () {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      vm.$http.get(api).then(response => {
        if (response.data.success) {
          vm.totalOrders = response.data.data.carts.length
        }
      })
    }
  },
  watch: {
    $route (to, from) {
      $('.shop-nav').removeClass('active p-2')
      $('.category-navbar').removeClass('active-category')
    }
  },
  computed: {
    routeId () {
      const vm = this
      const id = vm.$route.params.id
      if (vm.pathId.includes(id)) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    const vm = this
    vm.getTotalOrders()

    // 註冊點擊加入購物車後總數量變更事件
    vm.$bus.$on('getTotalOrders', function (val) {
      vm.getTotalOrders()
    })

    // 註冊點擊刪除購物車後總數量變更事件
    vm.$bus.$on('getDeleteOrders', function (val) {
      vm.getTotalOrders()
    })
  }
}
</script>
