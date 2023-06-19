<template>
  <div class="w-[60%] m-auto app">
    <Header />
    <MakeOrder />
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/common/Header.vue';
import MakeOrder from './components/MakeOrder.vue';
import Footer from './components/common/Footer.vue';
</script>

<style scoped>
  .app {
    min-height: 100vh;
    @media (max-width: 768px) {
      width: 100%;
      padding: 0 20px;
    }
  }
</style>
