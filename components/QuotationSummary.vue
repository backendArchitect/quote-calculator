<!-- src/components/QuotationSummary.vue -->
<template>
  <div class="quotation-summary">
    <h2>Quotation Summary</h2>
    <div class="form-data-summary" v-if="formData">
      <h3>Event Details</h3>
      <p><strong>Person Name:</strong> {{ formData.personName }}</p>
      <p><strong>Date:</strong> {{ formData.date }}</p>
      <p><strong>Place:</strong> {{ formData.place }}</p>
      <p><strong>Time:</strong> {{ formData.time }}</p>
    </div>
    <div
      v-for="event in selectedEvents"
      :key="event.name"
      class="event-summary"
    >
      <h3>{{ event.name }}</h3>
      <ul>
        <li v-for="service in event.services" :key="service.name">
          {{ service.name }} - {{ service.price }} INR x
          {{ service.quantity }} = {{ service.price * service.quantity }} INR
        </li>
      </ul>
    </div>
    <div v-if="selectedExtras.length > 0" class="extras-summary">
      <h3>Extras</h3>
      <ul>
        <li v-for="extra in selectedExtras" :key="extra.name">
          {{ extra.name }} - {{ extra.price }} INR x {{ extra.quantity }} =
          {{ extra.price * extra.quantity }} INR
        </li>
      </ul>
    </div>
    <div class="total-summary">
      <h3>Subtotal: {{ subtotal }} INR</h3>
      <h3>Discount ({{ discountPercentage }}%): {{ discountAmount }} INR</h3>
      <h2>Total: {{ totalAmount }} INR</h2>
    </div>
    <button @click="printQuotation" class="print-button">
      Print Quotation
    </button>
  </div>
</template>

<script setup lang="ts">
import { useQuotationCalculator } from "../composables/useQuotationCalculator";

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
});

const {
  selectedEvents,
  selectedExtras,
  subtotal,
  discountPercentage,
  discountAmount,
  totalAmount,
} = useQuotationCalculator();

function printQuotation() {
  window.print();
}
</script>

<style scoped>
.quotation-summary {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.form-data-summary,
.event-summary,
.extras-summary {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
}

h2,
h3 {
  color: #333;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}

.total-summary {
  text-align: right;
  font-weight: bold;
  margin-top: 20px;
}

.print-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.print-button:hover {
  background-color: #45a049;
}

@media print {
  .quotation-summary {
    max-width: 100%;
  }

  .print-button {
    display: none;
  }

  body {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }

  .form-data-summary,
  .event-summary,
  .extras-summary {
    break-inside: avoid;
  }
}
</style>  
