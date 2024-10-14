<template>
  <div class="event-selector">
    <h2>Select Events and Services</h2>
    <div v-for="event in events" :key="event.name" class="event-section">
      <button @click="toggleEvent(event.name)" class="event-toggle">
        {{ event.name }}
        <span class="toggle-icon">{{
          isEventOpen(event.name) ? "▼" : "▶"
        }}</span>
      </button>
      <div v-if="isEventOpen(event.name)" class="event-services">
        <div
          v-for="service in services[event.category]"
          :key="service.name"
          class="service-item"
        >
          <span class="service-name">{{ service.name }}</span>
          <span class="service-price">{{ service.price }} INR</span>
          <input
            type="number"
            :value="getServiceQuantity(event.name, service.name)"
            @input="updateServiceQuantity(event.name, service, $event)"
            min="0"
            class="quantity-input"
          />
        </div>
      </div>
    </div>

    <h3>Extras</h3>
    <div class="extras-section">
      <div v-for="extra in extras" :key="extra.name" class="extra-item">
        <span class="extra-name">{{ extra.name }}</span>
        <span class="extra-price">{{ extra.price }} INR</span>
        <input
          type="number"
          :value="getExtraQuantity(extra.name)"
          @input="updateExtraQuantity(extra, $event)"
          min="0"
          class="quantity-input"
        />
      </div>
    </div>

    <div class="discount-section">
      <h3>Discount</h3>
      <div class="discount-input">
        <input
          type="number"
          v-model.number="discount"
          min="0"
          max="100"
          @input="updateDiscount"
        />
        <span>%</span>
      </div>
    </div>

    <div class="total-section">
      <h3>Subtotal: {{ subtotal }} INR</h3>
      <h3>Discount: {{ discountAmount }} INR</h3>
      <h3>Total: {{ totalAmount }} INR</h3>
    </div>

    <button @click="completeSelection" class="complete-button">
      Complete Selection
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useQuotationCalculator } from "../composables/useQuotationCalculator";

const {
  events,
  services,
  extras,
  selectedEvents,
  selectedExtras,
  subtotal,
  discountPercentage,
  discountAmount,
  totalAmount,
  selectEvent,
  selectExtra,
  setDiscount,
} = useQuotationCalculator();

const emit = defineEmits(["complete-selection"]);
const openEvents = ref<Set<string>>(new Set());
const discount = ref(0);

function toggleEvent(eventName: string) {
  if (openEvents.value.has(eventName)) {
    openEvents.value.delete(eventName);
  } else {
    openEvents.value.add(eventName);
  }
}

function isEventOpen(eventName: string): boolean {
  return openEvents.value.has(eventName);
}

function getServiceQuantity(eventName: string, serviceName: string): number {
  const event = selectedEvents.value.find((e) => e.name === eventName);
  const service = event?.services.find((s) => s.name === serviceName);
  return service?.quantity || 0;
}

function getExtraQuantity(extraName: string): number {
  const extra = selectedExtras.value.find((e) => e.name === extraName);
  return extra?.quantity || 0;
}

function updateServiceQuantity(
  eventName: string,
  service: { name: string; price: number },
  event: Event
) {
  const quantity = parseInt((event.target as HTMLInputElement).value) || 0;
  selectEvent(eventName, service, quantity);
}

function updateExtraQuantity(
  extra: { name: string; price: number },
  event: Event
) {
  const quantity = parseInt((event.target as HTMLInputElement).value) || 0;
  selectExtra(extra, quantity);
}

function updateDiscount() {
  setDiscount(discount.value);
}

watch(discountPercentage, (newValue) => {
  discount.value = newValue;
});

function completeSelection() {
  emit("complete-selection");
}
</script>

<style scoped>
.event-selector {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

h2,
h3 {
  color: #333;
  margin-top: 20px;
}

.event-section,
.extras-section {
  margin-bottom: 20px;
}

.event-toggle {
  width: 100%;
  text-align: left;
  background-color: #f0f0f0;
  border: none;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.event-toggle:hover {
  background-color: #e0e0e0;
}

.toggle-icon {
  font-size: 12px;
}

.event-services,
.extras-section {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 10px;
}

.service-item,
.extra-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}

.service-name,
.extra-name {
  flex: 1;
}

.service-price,
.extra-price {
  width: 100px;
  text-align: right;
}

.quantity-input {
  width: 60px;
  text-align: center;
  margin-left: 10px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.discount-section {
  margin-top: 20px;
}

.discount-input {
  display: flex;
  align-items: center;
}

.discount-input input {
  width: 60px;
  margin-right: 5px;
}

.total-section {
  margin-top: 20px;
  text-align: right;
  font-weight: bold;
}

.complete-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

.complete-button:hover {
  background-color: #45a049;
}
</style>
