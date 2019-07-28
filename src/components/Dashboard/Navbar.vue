<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-info flex-md-nowrap p-1">
      <router-link to="/" class="navbar-brand col-2 mr-0 text-center">衣美診所</router-link>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link text-white" href="#" @click.prevent="logout">登出</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<style lang="scss" scoped>
.navbar-brand {
  font-size: 1.2rem;
}

.navbar .form-control {
  padding: 0.75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}

</style>

<script>
export default {
  methods: {
    logout () {
      const vm = this
      const api = `${process.env.APIPATH}/logout`
      this.$http.post(api).then(response => {
        vm.$router.push('/login')
      })
    }
  }
}
</script>
