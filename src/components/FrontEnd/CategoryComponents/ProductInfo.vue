<template>
  <div>
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="true"></loading>
    <section class="pt-md-5 pb-2 text-dark-blue">
      <div class="container">
        <div class="product-info row justify-content-between align-items-center pt-5 pb-2">
          <div class="product-head col-12 col-lg-5">
            <img :src="product.imageUrl" class="imf-fluid product-img" alt="product-Image" />
          </div>
          <div class="col-12 col-lg-7 pt-4 pb-3">
            <div class="product-body">
              <i class="fas fa-thumbtack fa-1x text-secondary"></i>
              <div class="row content">
                <div class="col-12 mb-2">
                  <ul class="list-unstyled">
                    <li class="product-title mb-3 text-light-red">
                      <h2 class="font-weight-bold">{{product.title}}</h2>
                    </li>
                    <li class="mb-3 d-flex justify-content-between">
                      <small class="text-muted">商品編號 {{product.id}}</small>
                      <ul class="list-unstyled d-flex text-light-red">
                        <li>
                          <i class="fas fa-star"></i>
                        </li>
                        <li>
                          <i class="fas fa-star"></i>
                        </li>
                        <li>
                          <i class="fas fa-star"></i>
                        </li>
                        <li>
                          <i class="fas fa-star"></i>
                        </li>
                        <li>
                          <i class="fas fa-star"></i>
                        </li>
                      </ul>
                    </li>
                    <li class="mb-3 text-success">
                      <i class="fas fa-check"></i>
                      <small>線上獨賣</small>
                      <i class="fas fa-check"></i>
                      <small>全館滿千優惠</small>
                    </li>
                    <li class="mb-3">
                      <p class="product-description">商品描述</p>
                      {{product.description}}
                    </li>
                    <li
                      class="origin-price d-inline-block mr-2 text-muted"
                    >商品原價 {{product.origin_price|currencyFilter}}</li>
                    <li
                      class="on-sale d-inline-block text-light-red"
                    >網購價{{product.price|currencyFilter}}</li>
                  </ul>
                </div>
                <div class="col-12">
                  <p class="mb-1">付款方式:</p>
                  <ul class="d-flex list-unstyled">
                    <li>
                      <img src="@/assets/image/visa_electron.png" alt="visa" />
                    </li>
                    <li>
                      <img src="@/assets/image/jcb.png" alt="jcb" />
                    </li>
                    <li>
                      <img src="@/assets/image/alipay.png" alt="alipay" />
                    </li>
                    <li>
                      <img src="@/assets/image/atm.png" alt="atm" />
                    </li>
                  </ul>
                </div>
                <div class="col-lg-7">
                  <div class="form-group">
                    <label for="select-size">商品尺吋</label>
                    <select class="custom-select" id="select-size" aria-label="select with size">
                      <option value="null" disabled selected>請選擇商品尺吋</option>
                      <option value="1">S</option>
                      <option value="2">M</option>
                      <option value="3">L</option>
                      <option value="4">XL</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-7 mt-1 mb-3">
                  <label for="select-num" class="d-block">商品數量</label>
                  <div class="input-group">
                    <select
                      class="custom-select"
                      id="select-num"
                      aria-label="select with number"
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
                <div class="col-lg-12 mb-3">
                  <ul class="d-flex justify-content-between list-unstyled">
                    <li class="text-left text-light-red">總價{{product.price*num|currencyFilter}}</li>
                    <li>
                      <shopping-cart :product-id="product.id" :number="num">
                        <span>加入購物車</span>
                      </shopping-cart>
                    </li>
                  </ul>
                </div>
                <div class="col-12">
                  <p class="border-top">溫馨提醒:</p>
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
  padding: 1rem;
  background-color: #ff6f61;
  color: white;
  &:hover {
    color: white;
  }
}
.main {
  margin-top: 1rem;
}

.product-info {
  .product-head {
    position: relative;
    &::before {
      content: "";
      display: block;
      padding-top: 100%;
    }

    .product-img {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
    }
  }

  .product-body {
    position: relative;
    padding: 1.5em;
    background: #fff;
    box-shadow: 0.25em 0.25em 0.5em #d2f0f8;

    .fa-thumbtack {
      position: absolute;
      top: -0.5rem;
      left: 0;
      z-index: 999;
    }

    .content {
      .product-title {
        border-bottom: 1px solid #ff6f61;
      }
      .product-description,
      .on-sale {
        font-size: 1.5rem;
      }
    }
  }
}
</style>

<script>
import shoppingCart from '@/components/FrontEnd/ShoppingCartComponents/ShoppingCart'
import subscribe from '@/components/FrontEnd/SubscribeComponents/Subscribe'
export default {
  data () {
    return {
      product: {},
      num: null,
      isLoading: false
    }
  },
  components: {
    subscribe,
    shoppingCart
  },
  methods: {
    goBack () {
      const vm = this
      vm.$router.go(-1)
    }
  },
  created () {
    const vm = this
    const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`
    vm.isLoading = true
    vm.$http.get(api).then(res => {
      if (res.data.success) {
        const productSearch = res.data.products.filter(
          ele => ele.id === vm.$route.params.id
        )
        vm.product = productSearch[0]
        vm.isLoading = false
      }
    })
  }
}
</script>
