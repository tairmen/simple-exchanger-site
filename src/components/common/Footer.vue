<template>
  <div class="footer flex w-full justify-between border-t-2 border-gray pt-4">
    <img src="/Logo.png" alt="LOGO_FOOTER" class="w-[194px] h-[39px] logo">

    <div class="flex flex-col w-[105px]">
      <div class="flex items-center mb-4">
        <img src="/Vector.svg" alt="TELEGRAM" class="mr-2">
        <a target="_blank" href="#" class="decoration-0 text-primary">
          Telegram
        </a>
      </div>
      <div class="flex items-center mb-4">
        <img src="/Vector2.svg" alt="TELEGRAM" class="mr-2">
        <a target="_blank" href="#" class="decoration-0 text-primary">
          Facebook
        </a>
      </div>
      <div class="flex items-center mb-4">
        <img src="/Vector3.svg" alt="TELEGRAM" class="mr-2">
        <a target="_blank" href="#" class="decoration-0 text-primary">
          Instagram
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
  .footer {
    @media (max-width: 768px) {
      flex-direction: column;
      width: 100%;
      border: none;
    }
  }
  .logo {
    @media (max-width: 768px) {
      margin-bottom: 12px;
    }
  }
</style>