<template v-cloak>
  <div>
    <header>
      <navbar></navbar>
    </header>
    <div class="main mt-4">
      <router-view></router-view>
    </div>
    <footer>
      <footerInfo></footerInfo>
    </footer>
  </div>
</template>

<script>
import navbar from '@/components/FrontEnd/NavComponents/Navbar'
import footerInfo from '@/components/FrontEnd/FooterComponents/FooterInfo'

export default {
  components: {
    navbar,
    footerInfo
  }
}
</script>
