<template>
  <div class="container pt-1 pt-md-5">
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="true"></loading>
    <div class="row text-dark-blue mt-5">
      <div class="col-12 mb-4">
        <div class="d-flex flex-column align-items-center mb-3">
          <span class="mb-1" v-if="carts.carts.length>0">
            您的購物車內有
            <span class="text-light-red">{{carts.carts.length}}</span> 筆訂單
          </span>
          <h2 v-else class="text-light-red">您的購物車內目前沒有任何訂單喔!</h2>
          <span class="mb-1 text-light-red" v-if="carts.total>=1000">您以符合周年慶滿千折百活動</span>
          <span class="mb-1" v-if="carts.total>=1000">輸入優惠碼 greentea 即可享有九折優惠</span>
        </div>
        <ul class="list-group mb-3 text-center">
          <li
            v-for="item in carts.carts"
            :key="item.id"
            class="list-group-item d-flex no-gutters flex-wrap align-items-center p-1 mb-2"
          >
            <div class="col-md-3">
              <img :src="item.product.imageUrl" class="product-icon" alt="product-icon" />
            </div>
            <div class="col-md-4 p-1 text-center mb-2">
              <h5 class="mt-1">{{item.product.title}}</h5>
              <small>{{item.product.description}}</small>
            </div>
            <div class="col-4 col-md-2">
              <span>{{ item.product.price|currencyFilter }}X{{item.qty}}{{item.product.unit}}</span>
            </div>
            <div class="col-4 col-md-2">
              <p class="mb-0">總價 {{ item.total | currencyFilter }} 元</p>
              <div class="text-success" v-if="item.coupon">已套用優惠券</div>
              <p
                class="text-nowrap text-success"
                v-if="item.final_total !== item.total "
              >折扣價 {{ item.final_total | currencyFilter }} 元</p>
            </div>
            <div class="col-4 col-md-1">
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="deleteCart(item.id)"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
          </li>
          <li class="list-group-item">
            <span>訂單總金額:</span>
            <strong
              v-if="carts.final_total == carts.total"
              class="text-light-red"
            >{{carts.total | currencyFilter}} 元</strong>
            <strong v-else class="text-light-red">{{carts.final_total | currencyFilter}} 元</strong>
          </li>
        </ul>
        <form class="card p-2">
          <div class="input-group">
            <input v-model.trim="couponCode" type="text" class="form-control" placeholder="請輸入優惠碼" />
            <div class="input-group-append">
              <button @click.prevent="sendCouponCode" class="btn btn-submit">套用優惠碼</button>
            </div>
          </div>
        </form>
      </div>
      <div class="mb-5">
        <h4 class="mb-3">訂單資訊</h4>
        <div class="row text-left">
          <div class="col-md-6 mb-3">
            <label for="CustomerName">姓名</label>
            <input
              v-model="form.user.name"
              v-validate="'required'"
              data-vv-as="姓名"
              id="CustomerName"
              name="CustomerName"
              type="text"
              class="form-control"
              placeholder="王小明"
            />
            <span class="text-danger">{{ errors.first('CustomerName') }}</span>
          </div>

          <div class="col-md-6 mb-3">
            <label for="tel">電話</label>
            <input
              v-model="form.user.tel"
              v-validate="'required|numeric'"
              data-vv-as="電話"
              id="tel"
              name="tel"
              type="text"
              class="form-control"
              placeholder="0912345678"
            />
            <span class="text-danger">{{ errors.first('tel') }}</span>
          </div>

          <div class="col-md-6 mb-3">
            <label for="email">信箱</label>
            <input
              v-model="form.user.email"
              v-validate="'required|email'"
              name="email"
              type="email"
              class="form-control"
              id="email"
              placeholder="you@example.com"
            />
            <span class="text-danger">{{ errors.first('email') }}</span>
          </div>

          <div class="col-md-6 mb-3">
            <label for="address">收件地址</label>
            <input
              v-model="form.user.address"
              v-validate="'required'"
              data-vv-as="收件地址"
              id="address"
              name="address"
              type="text"
              class="form-control"
              placeholder="Please enter your address."
            />
            <span class="text-danger">{{ errors.first('address') }}</span>
          </div>

          <div class="col-md-12 mb-3">
            <label for="message">備註</label>
            <textarea
              v-model="form.message"
              v-validate="'alpha_spaces'"
              name="message"
              class="form-control"
              data-vv-as="備註"
              id="message"
              placeholder="留下您的訊息"
              rows="5"
            ></textarea>
            <span class="text-danger">{{ errors.first('message') }}</span>
          </div>
        </div>

        <p class="mb-3">付款方式</p>
        <div class="form-check form-check-md-inline">
          <input
            v-model="paymentMethod"
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="pay-1"
          />
          <label class="form-check-label" for="inlineRadio2">信用卡繳款</label>
        </div>
        <div class="form-check form-check-md-inline">
          <input
            v-model="paymentMethod"
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="pay-2"
          />
          <label class="form-check-label" for="inlineRadio1">貨到付款</label>
        </div>

        <div class="form-check form-check-md-inline">
          <input
            v-model="paymentMethod"
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio3"
            value="pay-3"
          />
          <label class="form-check-label" for="inlineRadio3">便利商店繳款</label>
        </div>
        <div class="form-check form-check-md-inline">
          <input
            v-model="paymentMethod"
            class="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio4"
            value="pay-4"
          />
          <label class="form-check-label" for="inlineRadio4">ATM轉帳</label>
        </div>
        <!--  credit card  -->
        <div v-if="paymentMethod=='pay-1'" class="row">
          <div class="col-md-6 mb-3">
            <label for="cc-name">持卡人姓名</label>
            <input
              v-validate="'required|alpha'"
              data-vv-as="持卡人姓名"
              type="text"
              class="form-control"
              id="cc-name"
              name="cc-name"
              placeholder="王小明"
            />
            <span class="text-danger">{{ errors.first('cc-name') }}</span>
          </div>
          <div class="col-md-6 mb-3">
            <label for="cc-number">信用卡號碼</label>
            <input
              v-validate="'required|numeric'"
              data-vv-as="信用卡號碼"
              name="credit_card_num"
              id="cc-number"
              type="text"
              class="form-control"
              placeholder="xxxx-xxxx-xxxx-xxxx"
            />
            <span class="text-danger">{{ errors.first('credit_card_num') }}</span>
          </div>
          <div class="col-md-6 mb-3">
            <label for="cc-expiration">到期日</label>
            <input
              v-validate="'required|date_format:MM/yy'"
              data-vv-as="到期日"
              name="cc-expiration"
              id="cc-expiration"
              type="text"
              class="form-control"
              placeholder="12/23"
            />
            <span class="text-danger">{{ errors.first('cc-expiration') }}</span>
          </div>
          <div class="col-md-6 mb-3">
            <label for="cc-cvv">驗證碼</label>
            <input
              v-validate="'required|numeric'"
              data-vv-as="驗證碼"
              id="cc-cvv"
              name="cc-cvv"
              type="text"
              class="form-control"
              placeholder="卡片背面三碼"
            />
          </div>
        </div>
        <hr class="mb-3" />
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="save-info" />
          <label class="custom-control-label" for="save-info">記住本次交易資料</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="same-address" />
          <label class="custom-control-label" for="same-address">帳單寄送地址與收件地址相同</label>
        </div>
        <hr class="mb-3" />
        <div class="text-right mr-2">
          <button
            :class="{'disabled':carts.total===0}"
            class="btn btn-primary"
            type="submit"
            @click.prevent="checkout"
          >
            <i class="fas fa-shopping-cart"></i>
            送出訂單
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-icon {
  width: 100%;
}

.list-group {
  .list-group-item {
    padding: 0.5rem;
  }
}
</style>

<script>
export default {
  data () {
    return {
      carts: { carts: [] },
      couponCode: '',
      paymentMethod: '',
      isLoading: false,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: '留下您的訊息'
      }
    }
  },

  methods: {
    getCartOrders () {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      vm.isLoading = true
      vm.$http.get(api).then(response => {
        if (response.data.success) {
          vm.carts = response.data.data
          vm.isLoading = false
        }
      })
    },
    deleteCart (id) {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`
      vm.isLoading = true
      vm.$http.delete(api).then(res => {
        if (res.data.message === '已刪除') {
          this.getCartOrders()
          vm.isLoading = false
          vm.$bus.$emit('message:deleteCart', '商品已刪除') // 觸發訊息回饋
          vm.$bus.$emit('getDeleteOrders') // 觸發導覽列購物車數量更新
        }
      })
    },
    sendCouponCode () {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`
      vm.isLoading = true
      vm.$http.post(api, { data: { code: vm.couponCode } }).then(res => {
        if (res.data.success) {
          this.getCartOrders()
          vm.$bus.$emit('message:sendCouponCode', '已套用優惠券') // 觸發訊息回饋
        } else {
          vm.$bus.$emit('message:sendCouponCodeFalse', '優惠券套用失敗') // 觸發訊息回饋
        }
        vm.isLoading = false
      })
    },
    checkout () {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`
      vm.$http.post(api, { data: vm.form }).then(res => {
        if (res.data.success) {
          vm.$router.push(`/all-category/pay-order/${res.data.orderId}`)
        } else {
          vm.$bus.$emit('message:checkoutFail', '訂單送出失敗') // 觸發訂單送出失敗訊息回饋
        }
      })
    }
  },
  created () {
    this.getCartOrders()
  }
}
</script>
