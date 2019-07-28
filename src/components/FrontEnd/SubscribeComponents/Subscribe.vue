<template>
  <section class="subscribe bg-light text-center">
    <div class="container pt-5 pb-5">
      <h3 class="mb-5 text-dark-blue text-capitalize">Subscribe to our Newsletter</h3>
      <div class="row align-items-center justify-content-center">
        <div class="evaluation col-12 col-lg-8 border background-white pb-1 mb-3">
          <div
            class="media align-items-center mb-2 border-bottom"
            v-for="(item,index) in user"
            :key="item.cell"
          >
            <img :src="item.picture.medium" class="p-1" alt="menbers" />
            <i class="fas fa-quote-left align-self-start p-2"></i>
            <div class="media-body text-justify">
              {{messages[(index+messages.length)%messages.length].message}}
              <br />
              <i class="fas fa-star text-bright-yellow" v-for="i in 5" :key="i"></i>
            </div>
            <p class="pr-1 mb-1 align-self-end">{{item.name.first}}</p>
          </div>
        </div>
        <div class="col-12 col-lg-8 mt-3">
          <div class="input-group mb-3">
            <input
              v-validate="'email'"
              name="email"
              type="email"
              class="form-control"
              placeholder="Enter Email Address"
            />
            <div class="input-group-append">
              <button
                class="btn btn-dark text-capitalize"
                type="button"
                @click="subscribe"
              >subscribe</button>
            </div>
          </div>
          <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.subscribe {
  .evaluation {
    height: 300px;
    overflow-y: scroll;
  }

  @media (min-width: 992px) {
    h3 {
      font-size: 2rem;
    }
  }
}
</style>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      user: [],
      messages: [
        {
          message:
            '店家服務好、交貨速度快，衣服材質好，夏季衣櫃補貨的首選店家。'
        },
        {
          message:
            '老闆很熱心，服務態度很好，價格實在，每一件商品讓我都好想買。'
        },
        {
          message: '服務好，交貨速度快，拿到的實體包包跟照片一樣精美。'
        }
      ]
    }
  },

  methods: {
    getUser () {
      const vm = this
      $.ajax({
        url: 'https://randomuser.me/api/?gender=female&&results=8',
        dataType: 'json',
        success: function (data) {
          vm.user = data.results
        }
      })
    },
    subscribe () {
      const vm = this
      vm.$bus.$emit('message:subscribe', '已成功訂閱')
    }
  },
  created () {
    this.getUser()
  }
}
</script>
