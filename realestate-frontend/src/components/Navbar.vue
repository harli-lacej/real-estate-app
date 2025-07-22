<template>
  <nav class="navbar navbar-expand-lg navbar-dark my-nav">
    <div class="container">
      <figure>
        <img src="/logo-nav-bar.png" alt="Real estate graphic" />
      </figure>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item nav-item-1">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item nav-item-1">
            <router-link class="nav-link" to="/about">About us</router-link>
          </li>
          <li class="nav-item nav-item-1">
            <router-link class="nav-link" to="/properties">Properties</router-link>
          </li>
          <li class="nav-item nav-item-1">
            <router-link class="nav-link" to="/contact">Contact</router-link>
          </li>
          <li class="nav-item nav-item-2">
            <button class="btn btn-info"><router-link class="nav-link" to="/login">Log in</router-link></button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
import '@/assets/main.css'
</script>

<style scoped>
</style>
