<template>
  <section class="mt-5" id="popular" v-cloak>
    <div class="container">
      <title-describe>POPULAR</title-describe>
      <div class="row">
        <div class="col-12 col-md-6 col-lg-4" v-for="(item,index) in popular" :key="item.id">
          <template v-if="index<6">
            <product :product="item"></product>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import product from "@/components/FrontEnd/CategoryComponents/Card";
import titleDescribe from "@/components/FrontEnd/TitleComponents/TitleDescribe";

export default {
  data() {
    return {
      popular: []
    };
  },
  components: {
    product,
    titleDescribe
  },
  created() {
    const vm = this;
    const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=1`;
    vm.$http.get(api).then(res => {
      if (res.data.success) {
        vm.popular = res.data.products;
      }
    });
  }
};
</script>