<template v-cloak>
  <section class="company pt-5 pb-5">
    <div class="container-fluid pt-md-5">
      <div class="row no-gutters flex-column flex-md-row justify-content-around text-center">
        <div class="col-12 col-md-3">
          <div class="company-info pt-md-5 pb-md-5 text-dark-blue">
            <strong class="count d-block">9999</strong>
            <strong>會員數量</strong>
          </div>
        </div>
        <div class="col-12 col-md-3">
          <div class="company-info pt-md-5 pb-md-5 text-dark-blue">
            <strong class="count d-block">999</strong>
            <strong>合作夥伴</strong>
          </div>
        </div>
        <div class="col-12 col-md-3">
          <div class="company-info pt-md-5 pb-md-5 text-dark-blue">
            <strong class="count d-block">99</strong>
            <strong>產品數量</strong>
          </div>
        </div>
        <div class="col-12 col-md-3">
          <div class="company-info pt-md-5 pb-md-5 text-dark-blue">
            <strong class="count d-block">9</strong>
            <strong>表揚獎項</strong>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

.company {
  background-image: url("../../../assets/image/company-info.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 400px;

  .company-info {
    font-weight: 500;
    font-size: 1.5rem;
  }
}
</style>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      canCount: true
    };
  },
  methods: {
    // handleScroll() {
    //   const vm = this;
    //   let countHeight = $(".count").offset().top - window.innerHeight;
    //   if (vm.canCount && $(window).scrollTop() > countHeight) {
    //     $(".count").each(function() {
    //       $(this)
    //         .prop("Counter", 0)
    //         .animate(
    //           { Counter: $(this).text() },
    //           {
    //             duration: 2000,
    //             easing: "linear",
    //             step: function(now) {
    //               $(this).text(Math.ceil(now));
    //             }
    //           }
    //         );
    //     });
    //     vm.canCount = false;
    //   }
    // }
  },
  mounted() {
    // window.addEventListener("scroll", this.handleScroll);
  }
};
</script>