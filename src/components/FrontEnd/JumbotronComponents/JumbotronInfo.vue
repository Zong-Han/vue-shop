<template v-cloak>
  <section id="company" class="bg-light">
    <div class="container">
      <div class="row no-gutters justify-content-center">
        <div class="col-12 col-md-7 py-3 py-md-5 text-dark-blue">
          <h3 class="company-about text-capitalize text-center ">about me</h3>
          <ul class="company-info list-unstyled p-3 d-flex flex-wrap justify-content-center">
            <li class="col-6 mb-1 text-center">
              <p class="mb-1 text-muted text-capitalize">membership</p>
              <span>1000</span>
            </li>
            <li class="col-6 mb-1 text-center">
              <p class="mb-1 text-muted text-capitalize">partner</p>
              <span>1000</span>
            </li>
            <li class="col-6 mb-1 text-center">
              <p class="mb-1 text-muted text-capitalize">products</p>
              <span>1000</span>
            </li>
            <li class="col-6 mb-1 text-center">
              <p class="mb-1 text-muted text-capitalize">awards</p>
              <span>1000</span>
            </li>
            <li class="col-10 mt-3 text-left border-top">
              <small
                class="text-muted"
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi iusto, facere est quasi hic placeat, at autem labore voluptates dolores eaque ad. Delectus, minus natus ipsum optio aut explicabo doloribus.</small>
            </li>
          </ul>
        </div>
        <div class="col-10 col-md-5 order-first order-md-1">
          <div class="company-img"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.company-about {
  font-size: 1.5rem;
}

.company-info {
  font-size: 1.2rem;
}

.company-img {
  background-image: url("../../../assets/image/company-info.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 400px;
}

@media (min-width: 768px) {
  .company-img {
    height: 100%;
  }
}

</style>
