<template>
  <div id="carouselExampleSlidesOnly" class="carousel slide carousel-fade" data-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          src="../../../assets/image/category-jumbotron.jpg"
          class="banner"
          alt="category-jumbotron"
        />
      </div>
      <div class="carousel-item">
        <img
          src="../../../assets/image/category-jumbotron2.jpg"
          class="banner"
          alt="category-jumbotron"
        />
      </div>
      <div class="carousel-item">
        <img
          src="../../../assets/image/category-jumbotron3.jpg"
          class="banner"
          alt="category-jumbotron"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner {
  display: block;
  width: 100%;
  height: 300px;
  cursor: pointer;
}
@media (min-width: 576px) {
  .banner {
    height: 350px;
  }
}
@media (min-width: 992px) {
  .banner {
    height: 500px;
  }
}
</style>

<script>
import $ from "jquery";

export default {
  mounted() {
    $(".carousel").carousel({
      interval: 3000
    });
  }
};
</script>

