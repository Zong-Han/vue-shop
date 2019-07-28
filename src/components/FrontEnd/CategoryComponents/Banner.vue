<template>
  <div id="carouselExampleSlidesOnly" class="carousel slide carousel-fade" data-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div class="banner-1"></div>
      </div>
      <div class="carousel-item">
        <div class="banner-2"></div>
      </div>
      <div class="carousel-item">
        <div class="banner-3"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

%banner-background {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 350px;
  max-height: 100%;
}

@media (min-width: 992px) {
  %banner-background {
    height: 500px;
  }
}

.banner-1 {
  @extend %banner-background;
  background-image: url("../../../assets/image/category-jumbotron.jpg");
}
.banner-2 {
  @extend %banner-background;
  background-image: url("../../../assets/image/category-jumbotron2.jpg");
}
.banner-3 {
  @extend %banner-background;
  background-image: url("../../../assets/image/category-jumbotron3.jpg");
}

</style>

<script>
import $ from 'jquery'

export default {
  mounted () {
    $('.carousel').carousel({
      interval: 3000
    })
  }
}
</script>
