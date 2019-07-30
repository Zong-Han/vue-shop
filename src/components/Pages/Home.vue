<template>
  <div v-cloak>
    <header>
      <navbar></navbar>
    </header>
    <div class="main">
      <jumbotron>
        <template v-slot:jumbotron-img>
          <div class="jumbotron-bg"></div>
        </template>
        <template v-slot:title>
          <h1 class="title mt-2">2019 #NEW SUMMER CLOTHING</h1>
        </template>
        <template v-slot:subtitle>
          <h2 class="sub-title mt-3">All the clothes you want</h2>
        </template>
      </jumbotron>
      <categoryCard></categoryCard>
      <jumbotron>
        <template v-slot:jumbotron-img>
          <div class="jumbotron-subbg"></div>
        </template>
      </jumbotron>
      <newProducts></newProducts>
      <jumbotronInfo></jumbotronInfo>
      <popularCard></popularCard>
      <subscribe></subscribe>
    </div>
    <footer>
      <footerInfo></footerInfo>
    </footer>
  </div>
</template>

<script>
import navbar from '../FrontEnd/NavComponents/Navbar'
import jumbotron from '../FrontEnd/JumbotronComponents/Jumbotron'
import categoryCard from '../FrontEnd/CategoryComponents/CategoryCard'
import newProducts from '../FrontEnd/NewProductComponents/NewProducts'
import jumbotronInfo from '../FrontEnd/JumbotronComponents/JumbotronInfo'
import popularCard from '../FrontEnd/PopularComponents/PopularCard'
import subscribe from '../FrontEnd/SubscribeComponents/Subscribe'
import footerInfo from '../FrontEnd/FooterComponents/FooterInfo'

export default {
  name: 'index',
  data () {
    return {
      isLoading: true
    }
  },
  methods: {},
  components: {
    navbar,
    jumbotron,
    categoryCard,
    newProducts,
    jumbotronInfo,
    popularCard,
    subscribe,
    footerInfo
  }
}
</script>
