<template>
  <!-- Vue native DOM use native  -->
  <router-link to class="btn shopping-cart" @click.native="addToCart">
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="true"></loading>
    <slot></slot>
    <img src="@/assets/image/shopping_cart_min.png" alt="shopping_cart" />
  </router-link>
</template>

<style lang="scss" scoped>
.shopping-cart {
  color: #f96f93;
  box-shadow: 0.125rem 0.125rem 0.25rem #eee;
  &:hover,
  &:active {
    background-color: #f96f93;
    color: white;
  }
}
</style>


<script>
export default {
  data() {
    return {
      isLoading: false
    };
  },
  props: {
    productId: { type: String },//產品ID
    number: { type: Number, default: 1 }//選單數量
  },
  methods: {
    addToCart() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      if (vm.number !== null) {
        vm.$http
          .post(api, { data: { product_id: vm.productId, qty: vm.number } })
          .then(res => {
            if (res.data.message === "已加入購物車") {
              vm.$bus.$emit("message:addTocart", "已加入購物車"); //觸發訊息回饋
              vm.$bus.$emit("getTotalOrders", vm.number); //觸發點擊加入購物車後，導覽列總數量變更事件
              vm.isLoading = false;
            }
          });
      } else {
        vm.$bus.$emit("message:selectNumber", "請選擇數量"); //觸發訊息回饋
        vm.isLoading = false;
      }
    }
  }
};
</script>
