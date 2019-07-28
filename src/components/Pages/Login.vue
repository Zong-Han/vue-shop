<template>
  <div v-cloak>
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="true"></loading>-->
    <header>
      <navbar></navbar>
    </header>
    <div class="main mt-5 pt-lg-5">
      <div class="container ">
        <div class="row justify-content-center align-items-center">
          <div class="col-10 col-lg-7 mb-3 mt-1">
            <banner></banner>
          </div>
          <div class="col-10 col-lg-5 col-lg-4">
            <form class="form-signin text-dark-blue shadow-sm" @submit.prevent="signin">
              <h1 class="h3 mb-3 font-weight-normal text-center">
                會員登入
                <i class="fas fa-user"></i>
              </h1>
              <input
                v-validate="'required|email'"
                name="email"
                type="email"
                id="inputEmail"
                class="form-control mb-1 border-secondary"
                placeholder="請輸入 Email 帳號"
                v-model="user.username"
              />
              <p class="text-danger text-center mb-1">{{ errors.first('email') }}</p>
              <input
                v-validate="'required|min:6'"
                data-vv-as="密碼"
                name="password"
                type="password"
                id="inputPassword"
                class="form-control mb-1 border-secondary"
                placeholder="請輸入密碼"
                v-model="user.password"
              />
              <p class="text-danger text-center">{{ errors.first('password') }}</p>
              <div class="checkbox mb-3">
                <label>
                  <input type="checkbox" value="remember-me" /> 記住我的資訊
                </label>
              </div>
              <div class="text-right">
                <button class="btn btn-md btn-submit btn-inline-block mr-2">註冊</button>
                <button class="btn btn-md btn-dark btn-inline-block" type="submit">登入</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <footer class="mt-5">
      <footerInfo></footerInfo>
    </footer>
  </div>
</template>

<script>
import navbar from '@/components/FrontEnd/NavComponents/Navbar'
import banner from '@/components/FrontEnd/CategoryComponents/Banner'
import footerInfo from '@/components/FrontEnd/FooterComponents/FooterInfo'
export default {
  name: 'login',
  data () {
    return {
      user: { username: '', password: '' },
      isLoading: false
    }
  },
  components: {
    navbar,
    banner,
    footerInfo
  },
  methods: {
    signin: function () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.APIPATH}/admin/signin`
      this.$http
        .post(api, {
          username: vm.user.username,
          password: vm.user.password
        })
        .then(response => {
          if (response.data.message === '登入成功') {
            vm.isLoading = false
            vm.$router.push('/admin/products')
          } else {
            vm.isLoading = false
            vm.$bus.$emit('message:loginFail', '登入失敗')
          }
        })
    }
  }
}
</script>

<style lang="scss" scope>
.form-signin {
  width: 100%;
  padding: 15px;
  height: 400px;
}

.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
