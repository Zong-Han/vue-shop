<template>
  <section id="popular" class="py-5" v-cloak>
    <div class="container">
      <title-describe>POPULAR</title-describe>
      <div class="row justify-content-center">
        <div class="col-10 col-md-6 col-lg-3" v-for="(item,index) in popular" :key="item.id">
          <template v-if="index<4">
            <product :product="item"></product>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import product from '../CategoryComponents/Card'
import titleDescribe from '../TitleComponents/TitleDescribe'
export default {
  data () {
    return {
      popular: []
    }
  },
  components: {
    product,
    titleDescribe
  },
  created () {
    const vm = this
    const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=1`
    vm.$http.get(api).then(res => {
      if (res.data.success) {
        vm.popular = res.data.products
      }
    })
  }
}
</script>
