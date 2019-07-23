<template>
  <section class="category pt-3 pt-md-5 pb-5" id="category">
    <div class="container">
      <title-describe>CATEGORY</title-describe>
      <div
        class="category-info d-flex flex-lg-row justify-content-center align-items-center text-center text-soft-cyan"
      >
        <p class="mr-lg-3">LOVE YOURSELF NOW</p>
        <p class="text-light-red ml-2 mr-lg-3">ON SALE</p>
      </div>
      <div class="row justify-content-center">
        <div class="col-12 col-md-5">
          <div class="category-card h-5 position-relative mb-2">
            <img src="../../../assets/image/category-clothes.jpg" class="category-card-img" alt="clothes" />
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
                <img src="../../../assets/image/category-shoes.jpg" class="category-card-img" alt="shoes" />
                <router-link
                  to="all-category/category/shoes"
                  class="card-img-overlay btn text-white"
                >SHOES</router-link>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="category-card position-relative h-2 mb-2">
                <img src="../../../assets/image/category-skirt.jpg" class="category-card-img" alt="bag" />
                <router-link
                  to="all-category/category/skirt"
                  class="card-img-overlay btn text-white"
                >SKIRT</router-link>
              </div>
            </div>
            <div class="col-12 col-md-12">
              <div class="category-card position-relative h-2">
                <img src="../../../assets/image/category-bag.jpg" class="category-card-img" alt="bag" />
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
import titleDescribe from "@/components/FrontEnd/TitleComponents/TitleDescribe";

export default {
  data() {
    return {};
  },
  components: {
    titleDescribe
  }
};
</script>