<template>
  <form @submit.prevent="submitForm" class="input-form">
    <div class="form-group">
      <label for="date">Date:</label>
      <input type="date" id="date" v-model="date" required />
    </div>
    <div class="form-group">
      <label for="place">Place:</label>
      <input type="text" id="place" v-model="place" required />
    </div>
    <div class="form-group">
      <label for="time">Time:</label>
      <input type="time" id="time" v-model="time" />
    </div>
    <div class="form-group">
      <label for="personName">Party Name:</label>
      <input type="text" id="personName" v-model="personName" required />
    </div>
    <button type="submit" class="submit-button">Next</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const date = ref("");
const place = ref("");
const time = ref("");
const personName = ref("");

const emit = defineEmits(["submit"]);

function submitForm() {
  emit("submit", {
    date: date.value,
    place: place.value,
    time: time.value,
    personName: personName.value,
  });
}
</script>

<style scoped>
.input-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

input {
  width: 95%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #45a049;
}

.submit-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.4);
}
</style>
