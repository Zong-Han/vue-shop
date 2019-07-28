<template>
  <div>
    <navbar></navbar>
    <div class="container-fluid">
      <div class="row">
        <sidebar></sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
[role="main"] {
  padding-top: 60px;
}

</style>

<script>
import navbar from './Navbar'
import sidebar from './Sidebar'

export default {
  name: 'Dashboard',
  components: {
    navbar,
    sidebar
  }
}
</script>
