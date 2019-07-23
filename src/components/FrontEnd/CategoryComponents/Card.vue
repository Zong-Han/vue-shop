<template>
  <div class="popular-card mb-3 cursor-pointer">
    <div class="popular-card-header position-relative w-100">
      <router-link :to="{name:'productInfo',params: { id: product.id }}">
        <img class="popular-card-img" :src="product.imageUrl" alt="Popular-Image" />
      </router-link>
    </div>
    <div class="popular-card-body p-2 text-dark-blue">
      <ul>
        <li>{{product.title}}</li>
        <li class="origin-price">NT{{product.origin_price|currencyFilter}}</li>
        <li class="text-light-red">ON SALE NT{{product.price |currencyFilter}}</li>
      </ul>
    </div>
    <div class="popular-card-footer p-2 position-relative">
      <shopping-cart :product-id="product.id">
        <span>ADD TO CART</span>
      </shopping-cart>
      <router-link :to="{name:'productInfo',params:{id:product.id}}">
        <i class="fas fa-search-plus mt-2 fa-1x text-dark-blue cursor-pointer"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import shoppingCart from "@/components/FrontEnd/ShoppingCartComponents/ShoppingCart";

export default {
  props: ["product"],
  components: {
    shoppingCart,
  }
};
</script>

<style lang="scss" scoped>

.popular-card {
  box-shadow: 0.125rem 0.25rem 0.25rem #e2e2e2;

  .popular-card-header {
    overflow: hidden;
    padding-top: 75%;

    .popular-card-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: scale(1, 1);
      transition: all 1s linear;
    }
  }

  .popular-card-body {
    li {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: 700;
      line-height: 2;
      font-size: 1rem;
    }
  }

  .popular-card-footer {
    border-top: 1px solid black;
    font-size: 1rem;
    font-weight: 600;
    overflow: hidden;

    .fa-search-plus {
      float: right;
      &:hover,
      &:active {
        color: #f96f93;
      }
    }
  }

  &:hover {
    box-shadow: 0.125rem 0.5rem 2rem rgba(0, 0, 0, 0.4);
    .popular-card-img {
      transform: scale(1.5, 1.5);
    }
  }

  @media (min-width: 768px) {
    .popular-card-body li,
    .popular-card-footer {
      font-size: 1.2rem;
    }
  }

}
</style>
