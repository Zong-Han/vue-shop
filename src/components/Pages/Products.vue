<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-2 mb-1">
      <button class="btn btn-outline-primary mb-2" @click="openModel">建立新的產品</button>
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="搜尋產品"
        aria-label="Search"
        v-model="search"
      />
    </div>

    <table class="table mt-2">
      <thead>
        <tr>
          <th>分類</th>
          <th>產品名稱</th>
          <th>原價</th>
          <th>售價</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product,index) in searchPriduct" :key="index">
          <td>{{product.category}}</td>
          <td>{{product.title}}</td>
          <td>{{product.origin_price |currencyFilter}}</td>
          <td>{{product.price |currencyFilter}}</td>
          <td>
            <span v-if="product.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-danger">未啟用</span>
          </td>
          <td v-if="product">
            <button class="btn btn-outline-primary btn-sm mb-1 mr-1" @click="openModel(product)">編輯</button>
            <button class="btn btn-outline-danger btn-sm mb-1" @click="deleteModel(product)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :page-item="pageItem"></pagination>

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
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="newProduct.imageUrl"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <!-- <i class="fas spinner fa-spin"></i> -->
                  </label>
                  <loading :active.sync="isLoading" :is-full-page="false"></loading>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadImg"
                  />
                </div>
                <img :src="newProduct.imageUrl" class="img-fluid" alt />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="newProduct.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      v-model="newProduct.category"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="newProduct.unit"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model.number="newProduct.origin_price"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model.number="newProduct.price"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                    v-model="newProduct.description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                    v-model="newProduct.content"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="newProduct.is_enabled"
                      @change="isEnable"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
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
export default {
  data: function () {
    return {
      products: [],
      newProduct: {},
      isLoading: false,
      pageItem: {},
      search: ''
    }
  },
  computed: {
    searchPriduct () {
      const vm = this
      var filterProduct = vm.search.toLowerCase()
      if (filterProduct.trim() !== '') {
        return vm.products.filter(item => {
          const word = item.title.split('')// 將每一個字串分開成一個個字，並回傳新的陣列
          return word.indexOf(filterProduct) > -1
        })
      } else {
        return vm.products
      }
    }
  },
  methods: {
    getProducts: function () {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${this.pageItem.current_page}`
      vm.isLoading = !vm.isLoading
      this.$http.get(api).then(response => {
        this.pageItem = response.data.pagination
        this.products = response.data.products
        vm.isLoading = !vm.isLoading
      })
    },
    openModel (product) {
      $('#productModal').modal('show')
      if (product.id) {
        this.newProduct = product
      } else {
        this.newProduct = {}
      }
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
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${this.newProduct.id}`
        vm.$http.put(api, { data: vm.newProduct }).then(response => {
          if (response.data.success) {
            vm.getProducts()
          }
        })
      } else {
        // 新增
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`
        vm.$http.post(api, { data: vm.newProduct }).then(response => {
          if (response.data.success) {
            vm.isLoading = !vm.isLoading
            vm.getProducts()
            vm.isLoading = !vm.isLoading
          }
        })
      }
      $('#productModal').modal('hide')
    },
    deleteModel (product) {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${product.id}`
      vm.$http.delete(api).then(response => {
        if (response.data.success) {
          vm.isLoading = !vm.isLoading
          vm.getProducts()
          vm.isLoading = !vm.isLoading
        }
      })
    },
    uploadImg () {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`
      const uploadImg = vm.$refs.files.files[0]
      const formData = new FormData()
      formData.append('uploadImg', uploadImg)
      vm.isLoading = !vm.isLoading
      vm.$http
        .post(api, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          if (response.data.success) {
            vm.$set(vm.newProduct, 'imageUrl', response.data.imageUrl)
          } else {
            vm.$bus.$emit('message:push', response.data.message, 'danger')
          }
          vm.isLoading = !vm.isLoading
        })
    }
  },
  created () {
    const vm = this
    vm.getProducts()
    vm.$bus.$on('changePage', function (num) {
      vm.pageItem.current_page = vm.pageItem.current_page + num
      vm.getProducts()
    })
  }
}
</script>
