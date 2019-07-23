<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right">
      <button
        type="button"
        class="btn btn-outline-success"
        data-toggle="modal"
        data-target="#couponModalCenter"
        @click="openCoupon"
      >建立新的優惠券</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th class="text-center">到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(coupon,index) in coupons" :key="index">
          <td>{{coupon.title}}</td>
          <td>{{coupon.percent}}</td>
          <td class="text-center">{{coupon.due_date}}</td>
          <td>
            <span v-if="coupon.is_enabled" class="text-success">啟用</span>
            <span v-else class="text-success">未啟用</span>
          </td>
          <td v-if="coupon">
            <button class="btn btn-outline-primary btn-sm" @click="openCoupon(coupon)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteCoupon(coupon)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :page-item="pageItem" @changePage="changePage"></pagination>
    <!-- Modal -->
    <div
      class="modal fade"
      id="couponModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="couponModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="couponModalLongTitle">優惠券</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" @click="clearSelected">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="couponTitle">標題</label>
              <input
                type="text"
                class="form-control"
                id="couponTitle"
                aria-describedby="couponHelp"
                placeholder="優惠券標題"
                v-model="newCoupon.title"
              />
            </div>
            <div class="form-group">
              <label for="couponCode">優惠碼</label>
              <input
                type="text"
                class="form-control"
                id="couponCode"
                aria-describedby="couponHelp"
                placeholder="優惠碼"
                v-model="newCoupon.code"
              />
            </div>
            <div class="form-group">
              <label for="expiryDate">到期日</label>
              <datepicker
                placeholder="選擇到期日"
                input-class="form-control"
                id="expiryDate"
                v-model="newCoupon.due_date"
                :format="format"
                :language="zhlanguage"
                :highlighted="highlighted"
              ></datepicker>
            </div>
            <div class="form-group">
              <label for="percentage">折扣百分比</label>
              <input
                type="number"
                class="form-control"
                id="percentage"
                aria-describedby="percentageHelp"
                placeholder="折扣百分比"
                v-model.number="newCoupon.percent"
              />
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="is_enabled"
                  v-model="newCoupon.is_enabled"
                  @change="isEnable"
                />
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-success" @click="confirmCoupon">確認優惠券</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import $ from "jquery";
import Datepicker from "vuejs-datepicker";
import { zh } from "vuejs-datepicker/dist/locale";

export default {
  data: function() {
    return {
      coupons: [],
      newCoupon: {},
      isLoading: false,
      pageItem: {},
      format: "yyyy-MM-dd",
      zhlanguage: zh,
      highlighted: {
        to: new Date()
      }
    };
  },
  components: {
    Datepicker
  },
  methods: {
    getCoupon: function() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${this.pageItem.current_page}`;
      vm.isLoading = !vm.isLoading;
      this.$http.get(api).then(response => {
        console.log(response.data);
        this.pageItem = response.data.pagination;
        this.coupons = response.data.coupons;
        vm.isLoading = !vm.isLoading;
      });
    },
    openCoupon(coupon) {
      $("#couponModalCenter").modal("show");
      if (coupon.id) {
        this.newCoupon = coupon;
      } else {
        this.newCoupon = {};
      }
    },
    isEnable() {
      if (this.newCoupon.is_enabled === true) {
        this.newCoupon.is_enabled = 1;
      } else {
        this.newCoupon.is_enabled = 0;
      }
    },
    confirmCoupon() {
      const vm = this;
      if (vm.newCoupon.id) {
        //更新
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${this.newCoupon.id}`;
        vm.$http.put(api, { data: vm.newCoupon }).then(response => {
          if (response.data.success) {
            console.log(response.data.message);
            vm.getCoupon();
          }
        });
      } else {
        //新增優惠券
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
        vm.$http.post(api, { data: vm.newCoupon }).then(response => {
          if (response.data.success) {
            vm.isLoading = !vm.isLoading;
            console.log(response.data.message);
            vm.getCoupon();
            vm.isLoading = !vm.isLoading;
          }
        });
      }
      $("#couponModalCenter").modal("hide");
    },
    deleteCoupon(coupon) {
      let vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${coupon.id}`;
      vm.$http.delete(api).then(response => {
        if (response.data.success) {
          console.log(response.data.message);
          vm.isLoading = !vm.isLoading;
          vm.getCoupon();
          vm.isLoading = !vm.isLoading;
        }
      });
    },
    changePage(num) {
      this.pageItem.current_page = this.pageItem.current_page + num;
      this.getCoupon();
    },
    clearSelected() {
      $('.modal input[type="text"]').val("");
    }
  },
  created() {
    const vm = this;
    this.getCoupon();
  }
};
</script>