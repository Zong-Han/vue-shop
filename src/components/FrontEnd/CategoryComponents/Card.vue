<template>
  <div class="popular-card shadow-sm mb-3">
    <div class="popular-card-header w-100 mb-1">
      <router-link class="d-block h-100" :to="{name:'productInfo',params: { id: product.id }}">
        <div class="popular-card-img" :style="{'background-image':'url('+product.imageUrl+')'}"></div>
      </router-link>
    </div>
    <div class="popular-card-body p-3 text-dark-blue">
      <ul class="p-0 mb-0">
        <li class="font-weight-bold">{{product.title}}</li>
        <li class="origin-price">NT{{product.origin_price|currencyFilter}}</li>
        <li class="text-light-red">ON SALE NT{{product.price |currencyFilter}}</li>
      </ul>
    </div>
    <div
      class="popular-card-footer d-flex justify-content-between border-top py-3 pr-1 pl-1 pr-lg-2 position-relative"
    >
      <div class="col-10">
        <shopping-cart :product-id="product.id">
          <span>ADD TO CART</span>
        </shopping-cart>
      </div>
      <div class="col-2 text-center">
        <router-link :to="{name:'productInfo',params:{id:product.id}}">
          <i class="fas fa-search-plus text-dark-blue"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import shoppingCart from '../ShoppingCartComponents/ShoppingCart'

export default {
  props: ['product'],
  components: {
    shoppingCart
  }
}
</script>

<style lang="scss" scoped>
.popular-card {

  .popular-card-header {
    position: relative;
    overflow: hidden;
    height: 250px;

    .popular-card-img {
      background-size: cover;
      background-position: center;
      width: 100%;
      height: 100%;
      max-height: 100%;
      transform: scale(1, 1);
      transition: all 0.5s linear;
    }
  }

  .popular-card-body {
    li {
      font-size: 1rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 2;
    }
  }

  .popular-card-footer {
    font-size: 1.1rem;
    overflow: hidden;

    .fa-search-plus:hover {
      color: #f96f93;
    }
  }

  &:hover {
    box-shadow: 0.125rem 0.5rem 2rem rgba(0, 0, 0, 0.4);
    .popular-card-img {
      transform: scale(1.2, 1.2);
    }
  }
}
</style>
