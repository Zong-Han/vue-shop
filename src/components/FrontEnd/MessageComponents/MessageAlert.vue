<template>
  <div class="message-alert">
    <div
      class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages"
      :key="i"
    >
      {{ item.message }}
      <button
        type="button"
        class="close"
        @click="removeMessage(i)"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageAlert',
  data () {
    return {
      messages: []
    }
  },
  methods: {
    updateMessage (message, status) {
      const timestamp = Math.floor(new Date() / 1000)
      this.messages.push({
        message,
        status,
        timestamp
      })
      this.removeMessageWithTiming(timestamp)
    },
    removeMessage (num) {
      this.messages.splice(num, 1)
    },
    removeMessageWithTiming (timestamp) {
      const vm = this
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1)
          }
        })
      }, 3000)
    }
  },
  created () {
    const vm = this
    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning

    // Dashboard
    vm.$bus.$on('message:push', (message, status = 'warning') => {
      vm.updateMessage(message, status)
    })

    // ShoppingCard components
    vm.$bus.$on('message:addTocart', (message, status = 'success-change') => {
      vm.updateMessage(message, status)
    })

    vm.$bus.$on('message:selectNumber', (message, status = 'danger-fail') => {
      vm.updateMessage(message, status)
    })

    // CartOrders compoment
    vm.$bus.$on('message:deleteCart', (message, status = 'success-change') => {
      vm.updateMessage(message, status)
    })

    vm.$bus.$on(
      'message:sendCouponCode',
      (message, status = 'success-change') => {
        vm.updateMessage(message, status)
      }
    )

    vm.$bus.$on(
      'message:sendCouponCodeFalse',
      (message, status = 'success-change') => {
        vm.updateMessage(message, status)
      }
    )

    // Subscribe components
    vm.$bus.$on('message:subscribe', (message, status = 'success-change') => {
      vm.updateMessage(message, status)
    })

    // login components
    vm.$bus.$on('message:loginFail', (message, status = 'danger-fail') => {
      vm.updateMessage(message, status)
    })

    // CardOrders components
    vm.$bus.$on('message:checkoutFail', (message, status = 'danger-fail') => {
      vm.updateMessage(message, status)
    })
  }
}
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 80%;
  right: 1%;
  bottom: 1%;
  z-index: 1100;
}

.alert-success-change {
  background-color: #368663;
  color: white;
}
.alert-danger-fail {
  background-color: red;
  color: #fff;
}
</style>
