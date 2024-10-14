<template>
  <div class="welcome-container">
    <h1 class="welcome-title">Welcome to the Quotation Calculator</h1>
    <div class="button-container">
      <NuxtLink to="/calculator" class="button calculator-button"
        >Go to Calculator</NuxtLink
      >
      <NuxtLink to="/pricing" class="button pricing-button"
        >Go to Pricing</NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
// No script needed for this page
</script>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f4f8;
  font-family: Arial, sans-serif;
}

.welcome-title {
  font-size: 2.5rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
  animation: fadeIn 1s ease-in-out;
}

.button-container {
  display: flex;
  gap: 1rem;
}

.button {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  text-decoration: none;
  text-align: center;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.calculator-button {
  background-color: #3498db;
  color: white;
}

.calculator-button:hover {
  background-color: #2980b9;
}

.pricing-button {
  background-color: #2ecc71;
  color: white;
}

.pricing-button:hover {
  background-color: #27ae60;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .welcome-title {
    font-size: 2rem;
  }

  .button-container {
    flex-direction: column;
  }

  .button {
    width: 200px;
  }
}
</style>
