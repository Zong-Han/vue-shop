<template>
  <div class="container">
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="true"></loading>
    <div class="my-5 row justify-content-center">
      <form class="col-md-8 mt-lg-5">
        <table class="table text-dark-blue mt-5">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="align-middle">{{ item.product.title }}</td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle">{{ item.final_total | currencyFilter }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right">總計</td>
              <td class="text-center">{{ order.total | currencyFilter }}</td>
            </tr>
          </tfoot>
        </table>
        <table class="table">
          <tbody>
            <tr>
              <th>Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid" class="text-light-red">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right">
          <router-link to="/all-category/category/clothes" class="btn btn-info">繼續選購</router-link>
          <button v-if="order.is_paid === false" class="btn btn-submit" @click="pay">確認付款</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      order: {
        user: '',
        is_paid: ''
      },
      isLoading: false
    }
  },
  methods: {
    getPayOrderId () {
      const vm = this
      vm.isLoading = true
      const payOrderId = vm.$route.params.id
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${payOrderId}`
      vm.$http.get(api).then(res => {
        vm.order = res.data.order
        vm.isLoading = false
      })
    },
    pay () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.order.id}`
      vm.$http.post(api).then(res => {
        if (res.data.success) {
          vm.order.is_paid = true
          this.getPayOrderId()
          vm.$bus.$emit('getTotalOrders') // 購物車清空，導覽列數量清空
          vm.isLoading = false
        }
      })
    }
  },
  created () {
    this.getPayOrderId()
  }
}
</script>
