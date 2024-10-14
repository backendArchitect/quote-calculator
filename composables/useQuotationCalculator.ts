// src/composables/useQuotationCalculator.ts
import { ref, computed } from "vue";
import { events, services, extras } from "../constants/pricingData";

const selectedEvents = ref<
  Array<{
    name: string;
    services: Array<{ name: string; price: number; quantity: number }>;
  }>
>([]);
const selectedExtras = ref<
  Array<{ name: string; price: number; quantity: number }>
>([]);

export function useQuotationCalculator() {
  const totalAmount = computed(() => {
    const eventsTotal = selectedEvents.value.reduce((total, event) => {
      return (
        total +
        event.services.reduce(
          (sum, service) => sum + service.price * service.quantity,
          0
        )
      );
    }, 0);
    const extrasTotal = selectedExtras.value.reduce(
      (total, extra) => total + extra.price * extra.quantity,
      0
    );
    return eventsTotal + extrasTotal;
  });

  function selectEvent(
    eventName: string,
    service: { name: string; price: number },
    quantity: number
  ) {
    let existingEvent = selectedEvents.value.find((e) => e.name === eventName);
    if (!existingEvent) {
      existingEvent = { name: eventName, services: [] };
      selectedEvents.value.push(existingEvent);
    }

    let existingService = existingEvent.services.find(
      (s) => s.name === service.name
    );
    if (!existingService) {
      existingEvent.services.push({ ...service, quantity });
    } else {
      existingService.quantity = quantity;
    }

    // Remove service if quantity is 0
    existingEvent.services = existingEvent.services.filter(
      (s) => s.quantity > 0
    );

    // Remove event if no services
    selectedEvents.value = selectedEvents.value.filter(
      (e) => e.services.length > 0
    );
  }

  function selectExtra(
    extra: { name: string; price: number },
    quantity: number
  ) {
    const index = selectedExtras.value.findIndex((e) => e.name === extra.name);
    if (index !== -1) {
      if (quantity > 0) {
        selectedExtras.value[index].quantity = quantity;
      } else {
        selectedExtras.value.splice(index, 1);
      }
    } else if (quantity > 0) {
      selectedExtras.value.push({ ...extra, quantity });
    }
  }

  return {
    events,
    services,
    extras,
    selectedEvents,
    selectedExtras,
    totalAmount,
    selectEvent,
    selectExtra,
  };
}
