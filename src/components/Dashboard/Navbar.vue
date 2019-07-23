<template>
  <div>
    <nav class="navbar navbar-dark fixed-top background-light-red flex-md-nowrap p-1">
      <router-link to="/" class="navbar-brand col-2 mr-0 text-center">衣美診所</router-link>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link text-white" href="#" @click.prevent="logout">登出</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      const vm = this;
      const api = `${process.env.APIPATH}/logout`;
      this.$http.post(api).then(response => {
        vm.$router.push("/login");
      });
    }
  }
};
</script>