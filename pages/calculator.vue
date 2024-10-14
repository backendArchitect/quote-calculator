<!-- src/App.vue -->
<template>
  <div id="app">
    <h1>Quotation Calculator</h1>
    <InputForm v-if="!formSubmitted" @submit="handleFormSubmit" />
    <template v-else-if="!selectionCompleted">
      <EventSelector @complete-selection="completeSelection" />
    </template>
    <template v-else>
      <QuotationSummary />
      <button @click="resetCalculator">Start New Quotation</button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import InputForm from "./components/InputForm.vue";
import EventSelector from "./components/EventSelector.vue";
import QuotationSummary from "./components/QuotationSummary.vue";
import { useQuotationCalculator } from "../composables/useQuotationCalculator";

const { selectedEvents, selectedExtras, totalAmount } =
  useQuotationCalculator();

const formSubmitted = ref(false);
const selectionCompleted = ref(false);

function handleFormSubmit(formData: any) {
  console.log("Form data:", formData);
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
}
</script>
