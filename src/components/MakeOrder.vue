<template>
  <form
      v-if="currencys && currencys.length && ranges && ranges.length"
      class="window w-[620px] m-auto rounded-3xl border-2 border-secondary p-8 my-8"
      @submit.prevent="createOrder"
  >
    <h1 class="header text-center uppercase text-3xl font-bold text-primary mb-4">
      Make order
    </h1>

    <h2 class="text-center text-xl text-black mb-4">
      {{ giveCurrency?.name + ' to ' + getCurrency?.name }}
    </h2>

    <InputField
      :label="`You pay ${giveCurrency?.symbol} (min ${giveCurrency?.minSell}, max ${giveCurrency?.maxSell})`"
      type="sum"
      v-model="giveValue"
      :placeholder="`sum 0.00 ${giveCurrency?.symbol}`"
      is-required
    />

    <button
      type="button"
      class="flex justify-center items-center w-[35px] h-[35px] rounded-full hover:bg-gray m-auto text-primary hover:text-secondary"
      @click="changeCurrency"
    >
      <img src="/change.svg" alt="CHANGE_BTN">
    </button>

    <p class="text-secondary text-center text-xl mb-2">
      {{ `You get ${getValue} ${getCurrency?.symbol} (min ${getCurrency?.minBuy}, max ${getCurrency?.maxBuy})` }}
    </p>

    <InputField
        label="Your email"
        v-model="email"
        type="email"
        placeholder="Your email"
        is-required
    />

    <InputField
        label="Your phone number"
        v-model="telephone"
        type="sum"
        placeholder="Your phone number"
        is-required
    />

    <button
      type="submit"
      :disabled="!giveCurrency || !getCurrency || !telephone || !email || pendingOrder"
      class="uppercase mt-2 w-full bg-primary h-[42px] rounded-md text-white text-2xl font-bold hover:bg-secondary active:bg-secondary disabled:bg-gray disabled:text-black"
    >
      create order
    </button>
  </form>
</template>

<script setup>
import api from '../axiosinstance.js';
import InputField from './common/InputField.vue';
import { onMounted, ref, computed } from 'vue';

const ranges = ref(null);
const currencys = ref(null);

const giveCurrency = ref(null);
const getCurrency = ref(null);

const giveValue = ref('0');
const getValue = computed(() => {
  if (!currencys.value && !currencys.value.length) return '0';
  const resultValue = giveCurrency.value?.name === 'USD'
      ? +giveValue.value * +price.value
      : +giveValue.value / +price.value;
  if (!resultValue) return '0.00';
  return resultValue.toFixed(2) || '0.00';
});

const email = ref('');
const telephone = ref('');

const price = computed(() => {
  if (!ranges.value && !ranges.value.length) return '0';
  let currRange;
  ranges.value.forEach(item => {
    if (+giveValue.value >= +item.rangeStart && +giveValue.value <= +item.rangeEnd) currRange = item
  });
  if (!currRange) return '0';
  return giveCurrency.value?.name === 'USD' ? currRange.valueBuyUSD : currRange.valueSellUSD;
});

const pendingOrder = ref(false);

const createOrder = async () => {
  if (!giveCurrency.value || !getCurrency.value || !telephone.value || !email.value) return;
  pendingOrder.value = true;
  try {
    const data = {
      currencyToBuyId: getCurrency.value.id,
      currencyToBuyName: getCurrency.value.name,
      currencyToSellId: giveCurrency.value.id,
      currencyToSellName: giveCurrency.value.name,
      value: giveValue.value.toString(),
      email: email.value,
      telephone: telephone.value.toString(),
    };
    await api.post('/orders', data);
    giveValue.value = '0';
  } catch (e) {
    throw new Error(e);
  }
  pendingOrder.value = false;
};

const changeCurrency = () => {
  const currGiveCurrency = giveCurrency.value;
  const currGetCurrency = getCurrency.value;
  giveCurrency.value = currGetCurrency;
  getCurrency.value = currGiveCurrency;
};

const getCurrenys = async () => {
  try {
    const res = await api.get('/currencys');
    currencys.value = res.data;
  } catch (e) {
    throw new Error(e);
  }
};

const getRanges = async () => {
  try {
    const res = await api.get('/ranges');
    ranges.value = res.data;
  } catch (e) {
    throw new Error(e);
  }
};

onMounted(async () => {
  await getCurrenys();
  await getRanges();
  giveCurrency.value = currencys.value.find(item => item.name === 'UAH');
  getCurrency.value = currencys.value.find(item => item.name === 'USD');
});
</script>

<style scoped>
.window {
  @media (max-width: 768px) {
    width: 100%;
    border: none;
  }
}
</style>