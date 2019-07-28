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
      <category-card></category-card>
      <jumbotron>
        <template v-slot:jumbotron-img>
          <div class="jumbotron-subbg"></div>
        </template>
      </jumbotron>
      <new-products></new-products>
      <jumbotron-info></jumbotron-info>
      <popular-card></popular-card>
      <subscribe></subscribe>
    </div>
    <footer>
      <footer-info></footer-info>
    </footer>
  </div>
</template>

<script>
import navbar from '@/components/FrontEnd/NavComponents/Navbar'
import jumbotron from '@/components/FrontEnd/JumbotronComponents/Jumbotron'
import jumbotronInfo from '@/components/FrontEnd/JumbotronComponents/JumbotronInfo'
import categoryCard from '@/components/FrontEnd/CategoryComponents/categoryCard'
import newProducts from '@/components/FrontEnd/NewProductComponents/NewProducts'
import popularCard from '@/components/FrontEnd/PopularComponents/PopularCard'
import subscribe from '@/components/FrontEnd/SubscribeComponents/Subscribe'
import footerInfo from '@/components/FrontEnd/FooterComponents/FooterInfo'

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
    popularCard,
    jumbotronInfo,
    subscribe,
    footerInfo
  }
}
</script>
