  <template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>信箱</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>修改訂單</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product,index) in orders" :key="product.id">
          <td>{{translateTime[index]}}</td>
          <td>{{product.user.email}}</td>
          <td>
            <tr v-for="(order,index) in product.products" :key="index">
              <td class="border-0">{{order.product.title}}</td>
              <td>{{order.qty}}</td>
            </tr>
          </td>
          <td class="text-right">{{product.total |currencyFilter}}</td>
          <td>
            <span v-if="product.is_paid">已付款</span>
            <span v-else>未付款</span>
          </td>
          <td v-if="product">
            <button class="btn btn-outline-primary btn-sm" @click="openModel(product)">編輯</button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :page-item="pegeItem"></pagination>

    <!-- Modal -->
    <div
      class="modal"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="name">顧客姓名</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="顧客姓名"
                    v-model="newProduct.user.name"
                  />
                </div>

                <div class="form-group">
                  <label for="address">收件地址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="address"
                    placeholder="顧客地址"
                    v-model="newProduct.user.address"
                  />
                </div>
                <div class="form-row">
                  <div class="form-group col-4">
                    <label for="tel">聯絡電話</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="tel"
                      placeholder="顧客地址"
                      v-model="newProduct.user.tel"
                    />
                  </div>
                  <div class="form-group col-8">
                    <label for="email">信箱</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="email"
                      placeholder="顧客Email"
                      v-model="newProduct.user.email"
                    />
                  </div>
                </div>
                <div>
                  <p>總價錢 {{newProduct.total | currencyFilter}}</p>

                  <p>
                    付款狀態
                    <template>
                      <span
                        v-if="newProduct.is_paid"
                        :class="{'text-success':newProduct.is_paid}"
                      >已付款</span>
                      <span v-else :class="{'text-danger':newProduct.is_paid==false}">未付款</span>
                    </template>
                  </p>
                </div>
                <hr />
                <div class="form-group">
                  <label for="content">顧客說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="顧客說明內容"
                    v-model="newProduct.message"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="confirmProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import pagination from '../Dashboard/Pagination'

export default {
  data: function () {
    return {
      orders: [],
      newProduct: { user: { name: '', tel: '', address: '' } },
      isLoading: false,
      pegeItem: {}
    }
  },
  components: {
    pagination
  },

  methods: {
    getOrders: function () {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders`;
      vm.isLoading = !vm.isLoading
      this.$http.get(api).then(response => {
        console.log(response.data)
        this.pegeItem = response.data.pagination
        this.orders = response.data.orders
        vm.isLoading = !vm.isLoading
      })
    },
    openModel (product) {
      $('#productModal').modal('show')
      if (product.id) {
        this.newProduct = product
      }
    },
    modifyModel (product) {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order/${product.id}`
      vm.$http.put(api, vm.newProduct).then(response => {
        if (response.data.success) {
          console.log(response.data.message)
          vm.getOrders()
        }
      })
    },
    isEnable () {
      if (this.newProduct.is_enabled === true) {
        this.newProduct.is_enabled = 1
      } else {
        this.newProduct.is_enabled = 0
      }
    },
    confirmProduct () {
      const vm = this
      if (vm.newProduct.id) {
        // 更新
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${this.newProduct.id}`;
        vm.$http.put(api, { data: vm.newProduct }).then(response => {
          if (response.data.success) {
            vm.getProducts()
          }
        })
      } else {
        // 新增
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
        vm.$http.post(api, { data: vm.newProduct }).then(response => {
          if (response.data.success) {
            vm.isLoading = !vm.isLoading
            console.log(response.data.message)
            vm.getProducts()
            vm.isLoading = !vm.isLoading
          }
        })
      }
      $('#productModal').modal('hide')
    }
  },
  computed: {
    translateTime () {
      const timeStamp = []
      this.orders.forEach(time => {
        const date = new Date(time.create_at * 1000)
        const Y = date.getFullYear() + '-'
        const M =
          (date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1) + '-'
        const D = date.getDate() + ' '
        const h = date.getHours() + ':'
        const m = date.getMinutes() + ':'
        const s = date.getSeconds()
        timeStamp.push(Y + M + D + h + m + s)
      })

      return timeStamp
    }
  },
  created () {
    const vm = this
    vm.getOrders()
  }
}
</script>
