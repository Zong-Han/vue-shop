<template>
  <div>
    <table class="table">
      <thead>
        <th></th>
        <th>品名</th>
        <th>數量</th>
        <th>單價</th>
      </thead>
      <tbody>
        <tr v-for="item in carts.carts" :key="item.id">
          <td class="align-middle">
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="deleteCart(item.id)"
            >
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
          <td class="align-middle">
            {{ item.product.title }}
            <div class="text-success" v-if="item.coupon">
          已套用優惠券
            </div>
          </td>
          <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
          <td class="align-middle">{{ item.final_total | currencyFilter}}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-right">總計</td>
          <td class="text-right">{{ carts.total | currencyFilter }}</td>
        </tr>
        <tr v-if="carts.final_total !== carts.total ">
          <td colspan="3" class="text-right text-success">折扣價</td>
          <td class="text-right text-success">{{ carts.final_total | currencyFilter }}</td>
        </tr>
      </tfoot>
    </table>
    <div class="input-group mb-3 input-group-sm">
      <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="couponCode">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" @click="sendCouponCode">套用優惠碼</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      couponCode: ''
    }
  },
  props: ['carts'],

  methods: {
    deleteCart (id) {
      const vm = this
      vm.$emit('deleteCart', id)
    },
    sendCouponCode () {
      const vm = this
      vm.$emit('useCouponCode', this.couponCode)
    }

  }
}
</script>
