<template>
  <div class="price-list">
    <nav class="navigation">
      <NuxtLink to="/" class="nav-button home-button">Home</NuxtLink>
      <NuxtLink to="/pricing" class="nav-button pricing-button"
        >Pricing</NuxtLink
      >
    </nav>
    <h1>Event Photography and Videography Price List</h1>

    <section class="events">
      <h2>Events</h2>
      <div class="event-grid">
        <div v-for="event in events" :key="event.name" class="event-item">
          <h3>{{ event.name }}</h3>
          <span class="category">{{ event.category }}</span>
        </div>
      </div>
    </section>

    <section class="services">
      <h2>Services</h2>
      <div
        v-for="(categoryServices, category) in services"
        :key="category"
        class="service-category"
      >
        <h3>{{ formatCategory(category) }}</h3>
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Price (INR)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="service in categoryServices" :key="service.name">
              <td>{{ service.name }}</td>
              <td>{{ formatPrice(service.price) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="extras">
      <h2>Extras</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price (INR)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="extra in extras" :key="extra.name">
            <td>{{ extra.name }}</td>
            <td>{{ formatPrice(extra.price) }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { events, services, extras } from "../constants/pricingData";

function formatCategory(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function formatPrice(price: number): string {
  return price.toLocaleString("en-IN");
}
</script>

<style scoped>
.price-list {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
}

h1,
h2,
h3 {
  color: #333;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

section {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.event-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.event-item {
  background-color: #e0f2f1;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
}

.event-item h3 {
  margin: 0 0 10px 0;
}

.category {
  font-size: 0.9em;
  color: #666;
}

.service-category {
  margin-bottom: 30px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tr:hover {
  background-color: #f5f5f5;
}

@media (max-width: 768px) {
  .event-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  th,
  td {
    padding: 8px;
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
</style>
