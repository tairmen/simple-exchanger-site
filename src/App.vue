<template>
  <div class="w-[60%] m-auto app">
    <Header />
    <div
      class="m-auto header text-center text-3xl mt-4 mb-8">
      Зделайте заказ и наш оператор свяжется с вами в ближайшее время</div>
    <MakeOrder />
    <div
      class="m-auto header text-center text-2xl mt-4 mb-8">
      Перeводим деньги с Украины в Крым или с Крыма в Украину просто и безопасно. На нашем счету уже более 1000 успешных переводов в самых разных обьемах.</div>
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
}</style>
