<template>
  <header>
    <h1>Welcome to My Nuxt App</h1>
    <nav>
      <nuxt-link to="/">Home</nuxt-link> |
      <nuxt-link to="/about">About</nuxt-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
header {
  background-color: #f5f5f5;
  padding: 10px;
  text-align: center;
}
nav a {
  margin: 0 10px;
}
</style>
