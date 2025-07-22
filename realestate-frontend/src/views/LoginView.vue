<template>
  <div class="row login-box bg-white d-flex w-100">
    <div class="col-md-6 d-none d-md-block p-0 login-image-wrapper">
      <figure>
      <img src="/login-banner.png" alt="Login Image" class="login-image" />
      </figure>
    </div>
    <div class="col-md-6 col-12 p-5 d-flex align-items-center justify-content-center">
      <div class="w-100" style="max-width: 400px;">
        <h2 class="mb-4 text-center form-title">Admin login</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="username" class="form-label">Username:</label>
            <input
              v-model="username"
              type="text"
              class="form-control"
              id="username"
              placeholder="Enter username"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password:</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="password"
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
        <div v-if="errorMessage" class="alert alert-danger mt-3">{{ "Hmm... " + errorMessage +". Try again!" }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
 return {
    username: '',
    password: '',
    errorMessage: '',
    redirectTo: '/dashboard'
  };
  },
  mounted() {
    document.title = 'RealDeal | Login';
  },
  methods: {
    async handleLogin() {
        try {
    const res = await axios.post('http://localhost:3000/users/login', {
      username: this.username,
      password: this.password
    });

    localStorage.setItem('isLoggedIn', 'true');
    this.$router.push(this.redirectTo);
  } catch (error) {
    this.errorMessage = error.response?.data?.message || 'Login failed';
  }
    }
  },
  created() {
  const redirectParam = this.$route.query.redirect;
  if (redirectParam) {
    this.redirectTo = redirectParam;
  }
}
};
</script>
