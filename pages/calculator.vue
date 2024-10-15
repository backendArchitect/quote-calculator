<template>
  <div id="app">
    <nav class="navigation">
      <NuxtLink to="/" class="nav-button home-button" @click="resetCalculator"
        >Home</NuxtLink
      >
      <NuxtLink to="/pricing" class="nav-button pricing-button"
        >Pricing</NuxtLink
      >
    </nav>
    <h1>Quotation Calculator</h1>
    <InputForm v-if="!formSubmitted" @submit="handleFormSubmit" />
    <template v-else-if="!selectionCompleted">
      <EventSelector @complete-selection="completeSelection" />
    </template>
    <template v-else>
      <QuotationSummary :formData="formData" />
      <button @click="resetCalculator" class="reset-button">
        Start New Quotation
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import InputForm from "./components/InputForm.vue";
import EventSelector from "./components/EventSelector.vue";
import QuotationSummary from "./components/QuotationSummary.vue";
import { useQuotationCalculator } from "../composables/useQuotationCalculator";

const { selectedEvents, selectedExtras, totalAmount, discountPercentage } =
  useQuotationCalculator();

const formSubmitted = ref(false);
const selectionCompleted = ref(false);
const formData = ref(null);

function handleFormSubmit(data: any) {
  console.log("Form data:", data);
  formData.value = data;
  formSubmitted.value = true;
}

function completeSelection() {
  selectionCompleted.value = true;
}

function resetCalculator() {
  formSubmitted.value = false;
  selectionCompleted.value = false;
  selectedEvents.value = [];
  selectedExtras.value = [];
  formData.value = null;
  discountPercentage.value = 0;
}
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 5rem auto 0;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #ffffff;
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.nav-button {
  padding: 10px 20px;
  text-decoration: none;
  color: #ffffff;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.home-button {
  background-color: #3498db;
}

.home-button:hover {
  background-color: #2980b9;
}

.pricing-button {
  background-color: #2ecc71;
}

.pricing-button:hover {
  background-color: #27ae60;
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5em;
}

.reset-button {
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 20px auto 0;
  padding: 12px 20px;
  font-size: 16px;
  color: #ffffff;
  background-color: #e74c3c;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.reset-button:hover {
  background-color: #c0392b;
}

.reset-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.5);
}

@media (max-width: 600px) {
  #app {
    padding: 10px;
  }

  h1 {
    font-size: 2em;
  }

  .navigation {
    flex-direction: column;
    gap: 10px;
  }

  .nav-button {
    width: 100%;
    text-align: center;
  }
}
</style>
