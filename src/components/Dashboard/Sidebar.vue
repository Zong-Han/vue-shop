<template>
  <div>
    <nav class="col-md-2 d-none d-md-block background-white sidebar">
      <div class="sidebar-sticky">
        <ul class="nav flex-column text-center">
          <li class="nav-item">
            <a class="nav-link text-dark-blue" href="#">
              <i class="fas fa-user p-1"></i>管理員
            </a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-dark" to="/admin/products">
              <i class="fas fa-box-open p-1"></i>產品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-dark" to="/admin/orders">
              <i class="fas fa-shopping-cart p-1"></i>訂單列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-dark" to="/admin/coupon">
              <i class="fas fa-money-check-alt p-1"></i>優惠券
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
}
a.router-link-exact-active{
  color:#ff6f61 !important;
}
</style>
