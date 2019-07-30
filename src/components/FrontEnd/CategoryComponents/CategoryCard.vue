<template>
  <section class="category pt-3 pt-md-5 pb-5" id="category">
    <div class="container">
      <title-describe>CATEGORY</title-describe>
      <p class="category-info text-soft-cyan mr-lg-3 text-nowrap text-center">
        LOVE YOURSELF NOW
        <span>ON SALE</span>
      </p>
      <div class="row justify-content-center">
        <div class="col-12 col-md-5">
          <div class="category-card h-5 position-relative mb-2">
            <div class="card-clothes"></div>
            <router-link
              to="all-category/category/clothes"
              class="card-img-overlay btn text-white"
            >CLOTHES</router-link>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="category-card position-relative h-2 mb-2">
                <div class="card-shoes"></div>
                <router-link
                  to="all-category/category/shoes"
                  class="card-img-overlay btn text-white"
                >SHOES</router-link>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="category-card position-relative h-2 mb-2">
                <div class="card-skirt"></div>
                <router-link
                  to="all-category/category/skirt"
                  class="card-img-overlay btn text-white"
                >SKIRT</router-link>
              </div>
            </div>
            <div class="col-12 col-md-12">
              <div class="category-card position-relative h-2">
                <div class="card-bag"></div>
                <router-link
                  to="all-category/category/bag"
                  class="card-img-overlay btn text-white"
                >BAG</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import titleDescribe from '../TitleComponents/TitleDescribe'

export default {
  data () {
    return {}
  },
  components: {
    titleDescribe
  }
}
</script>

<style lang="scss" scoped>
%category-background {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  max-height: 100%;
}
.card-clothes {
  background-image: url("../../../assets/image/category-clothes.jpg");
  @extend %category-background;
}

.card-shoes {
  background-image: url("../../../assets/image/category-shoes.jpg");
  @extend %category-background;
}

.card-skirt {
  background-image: url("../../../assets/image/category-skirt.jpg");
  @extend %category-background;
}
.card-bag {
  background-image: url("../../../assets/image/category-bag.jpg");
  @extend %category-background;
}
.category {
  .category-info {
    font-size: 1.2rem;
  }

  .btn {
    font-size: 1.5rem;
  }

  .h-5 {
    height: 510px;
  }
  .h-2 {
    height: 250px;
  }

  @media (min-width: 768px) {
    .category-info {
      font-size: 2rem;
    }
    .btn {
      font-size: 2rem;
    }
  }
}
</style>
