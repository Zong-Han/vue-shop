<template>
  <div>
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="true"></loading>
    <section class="pt-5 pb-2 text-dark-blue">
      <div class="container">
        <div class="product-info row align-items-center justify-content-between pt-5 pb-2">
          <div class="product-head col-12 col-lg-5">
            <img :src="product.imageUrl" class="product-img" alt="product-Image" />
          </div>
          <div class="col-12 col-lg-7 pt-4 pb-3">
            <div class="product-body">
              <i class="fas fa-thumbtack fa-1x"></i>
              <div class="row content">
                <div class="col-12 mb-2">
                  <ul>
                    <li class="product-title mb-3">{{product.title}}</li>
                    <li class="mb-3">
                      <p class="product-description">產品說明</p>
                      {{product.description}}
                    </li>
                    <li
                      class="origin-price d-inline-block mr-2"
                    >原價 {{product.origin_price|currencyFilter}}</li>
                    <li
                      class="on-sale d-inline-block text-light-red"
                    >特價{{product.price|currencyFilter}}</li>
                  </ul>
                </div>
                <div class="col-12 d-flex align-items-center mt-3 mb-3">
                  <span class="mr-3">商品尺吋:</span>
                  <ul class="option-list">
                    <li class="d-inline-block p-1 mr-1">S</li>
                    <li class="d-inline-block p-1 mr-1">M</li>
                    <li class="d-inline-block p-1 mr-1">L</li>
                    <li class="d-inline-block p-1 mr-1">XL</li>
                  </ul>
                </div>
                <div class="col-12">
                  <p class="mb-1">付款方式:</p>
                  <ul class="d-flex">
                    <li>
                      <img class="cursor-pointer" src="@/assets/image/visa_electron.png" alt="visa" />
                    </li>
                    <li>
                      <img class="cursor-pointer" src="@/assets/image/jcb.png" alt="jcb" />
                    </li>
                    <li>
                      <img class="cursor-pointer" src="@/assets/image/alipay.png" alt="alipay" />
                    </li>
                    <li>
                      <img class="cursor-pointer" src="@/assets/image/atm.png" alt="atm" />
                    </li>
                  </ul>
                </div>
                <div class="col-10 mt-3 mb-3">
                  <div class="input-group">
                    <select
                      class="custom-select"
                      id="inputGroupSelect"
                      aria-label="select with button addon"
                      v-model.number="num"
                    >
                      <option value="null" disabled selected>請選擇數量</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <div class="input-group-append">
                      <button class="btn btn-outline-secondary" type="button">{{product.unit}}</button>
                    </div>
                  </div>
                </div>
                <div class="col-10 mb-3">
                  <ul class="d-flex justify-content-between">
                    <li class="text-left text-light-red">總價{{product.price*num|currencyFilter}}</li>
                    <li>
                      <shopping-cart :product-id="product.id" :number="num">
                        <span>加入購物車</span>
                      </shopping-cart>
                    </li>
                    <!-- <li>BACK</li> -->
                  </ul>
                </div>
                <div class="col-12">
                  <p>溫馨提醒:</p>
                  <p>
                    下單付款後，店家會立即出貨，正常約3-5個工作天就可以收到您訂購的商品。
                    如商品有瑕疵，請不要撕掉吊牌，並於一個星期內寄送回公司地址，我們將寄送新的商品給您，謝謝您的光臨。
                  </p>
                  <i class="fas fa-1x fa-reply cursor-pointer" @click="goBack">BACK</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <subscribe></subscribe>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.shopping-cart {
  border-color: #f96f93;
}
.main {
  margin-top: 1rem;
}

.product-info {
  border-top: 1px solid #e4f9fe;
  border-bottom: 1px solid #fcefe7;

  .product-head {
    box-shadow: 0.125rem 0.25rem 1rem rgba($color: #515151, $alpha: 0.5);
    padding: 0;

    .product-img {
      width: 100%;
      max-height: 600px;
    }
  }

  .product-body {
    position: relative;
    padding: 1.5em;
    background: #fff;

    box-shadow: 0.25em 0.25em 0.5em #d2f0f8;

    .fa-thumbtack {
      position: absolute;
      top: -1rem;
      left: 0;
      z-index: 999;
      color: #d79763;
    }

    .content {
      .product-title {
        color: #21a775;
        font-size: 1.5rem;
        font-weight: 700;

        &::after {
          content: "";
          display: block;
          width: 80%;
          height: 0px;
          border-top: 1px solid #21a775;
        }
      }

      .product-description {
        font-size: 1.2rem;
        font-weight: 600;
      }

      .on-sale {
        font-size: 1.5rem;
        font-weight: 700;
      }
    }

    .option-list {
      li {
        cursor: pointer;
        text-align: center;
        width: 25px;
        border: 1px solid black;

        &:hover,
        &:active {
          background-color: black;
          color: #e4f9fe;
        }
      }
    }
  }
  @media (min-width: 576px) {
    .product-body {
      transform: rotate(2deg);
    }
    .content {
      transform: rotate(-2deg);
    }
  }
}
</style>

<script>
import shoppingCart from "@/components/FrontEnd/ShoppingCartComponents/ShoppingCart";
import sidebar from "@/components/FrontEnd/NavComponents/FrontSidebar";
import subscribe from "@/components/FrontEnd/SubscribeComponents/Subscribe";

import $ from "jquery";
export default {
  data() {
    return {
      product: {},
      num: null,
      isLoading: false
    };
  },
  components: {
    sidebar,
    subscribe,
    shoppingCart
  },
  methods: {
    goBack() {
      const vm = this;
      vm.$router.go(-1);
    }
  },
  created() {
    const vm = this;
    const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
    vm.isLoading = true;
    vm.$http.get(api).then(res => {
      if (res.data.success) {
        let productSearch = res.data.products.filter(
          ele => ele.id === vm.$route.params.id
        );
        vm.product = productSearch[0];
        vm.isLoading = false;
      }
    });
  }
};
</script>