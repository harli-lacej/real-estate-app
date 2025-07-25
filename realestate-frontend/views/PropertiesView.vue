<template>
  <main>
    <figure>
    <img class="banner image-profile" src="/properties-banner.png" alt="Real estate graphic">
    </figure>
    <div class="free-space"></div>
    <div class="container mt-4">

      <!-- Filters -->
      <div class="d-flex justify-content-center form-div">
        <div class="filters-container mb-2 d-flex gap-2 flex-nowrap justify-content-center w-100" style="max-width: 1000px;">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="🔎︎ Search by title or address"
            class="form-control search-bar"
          />
          <select v-model="rentOrSellFilter" class="form-select">
            <option value="">Rent or Sell</option>
            <option value="rent">Rent</option>
            <option value="sell">Sell</option>
          </select>
          <select v-model="typeFilter" class="form-select">
            <option value="">All Property types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Commercial space">Commercial space</option>
            <option value="Ground">Ground</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div class="free-space"></div>

      <!-- Property Cards -->
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div v-if="filteredProperties.length === 0" class="col-12 text-center">
          <p>Loading or no properties match your search...</p>
        </div>
        <div v-else v-for="prop in paginatedProperties" :key="prop.id" class="col">
          <RouterLink :to="`/property-details?id=${prop._id}`" class="text-decoration-none text-reset d-block h-100">
            <div class="card property-card h-100">
              <img :src="`https://real-estate-app-4vp2.onrender.com/properties/${prop._id}/image/0`" class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title form-title">{{ prop.title }}</h5>
                <p class="card-text text-muted">{{ prop.propertyType }}</p>
                <p class="card-text">{{ prop.description.substring(0, 45) }}...</p>
                <ul class="list-unstyled">
                  <li><strong>€ {{ prop.price }}</strong></li>
                  <li><strong>{{ prop.surfaceArea }} m²</strong></li>
                  <li><strong>{{ prop.buildingYear }}</strong></li>
                  <li class="d-flex gap-2 align-items-center">
                    <div :class="['text-white px-3 py-1 rounded d-inline-block', prop.available === true ? 'bg-success' : 'bg-danger']">
                      <strong>{{ prop.available === true ? 'Available' : 'Not Available' }}</strong>
                    </div>
                    <div :class="['text-white px-3 py-1 rounded d-inline-block', prop.rentOrSell === 'rent' ? 'bg-primary' : 'bg-warning']">
                      <strong>{{ prop.rentOrSell === 'rent' ? 'For Rent' : 'For Sell' }}</strong>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="card-footer bg-transparent">
                <small class="text-muted">ID: {{ prop._id }}</small>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>

      <div v-if="totalPages > 1" class="d-flex justify-content-center align-items-center mt-4 gap-2">
        <button class="btn btn-outline-primary btn-pagination" @click="currentPage--" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button class="btn btn-outline-primary btn-pagination" @click="currentPage++" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
    <div class="free-space"></div>
  </main>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import axios from 'axios';
import socket from '@/socket';

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      properties: [],
      searchQuery: '',
      rentOrSellFilter: '',
      typeFilter: '',
      currentPage: 1,
      itemsPerPage: 9,
    };
  },
  computed: {
    filteredProperties() {
      return this.properties.filter(p => {
        const matchesSearch =
          p.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          p.address.toLowerCase().includes(this.searchQuery.toLowerCase());

        const matchesRentOrSell =
          this.rentOrSellFilter === '' || p.rentOrSell === this.rentOrSellFilter;

        const matchesType =
          this.typeFilter === '' || p.propertyType === this.typeFilter;

        return matchesSearch && matchesRentOrSell && matchesType;
      });
    },
    paginatedProperties() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProperties.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredProperties.length / this.itemsPerPage);
    }
  },
  watch: {
    searchQuery() {
      this.currentPage = 1;
    },
    rentOrSellFilter() {
      this.currentPage = 1;
    },
    typeFilter() {
      this.currentPage = 1;
    }
  },
  mounted() {
  document.title = "RealDeal | Properties";
  this.fetchProperties();

  socket.on('propertyAdded', (newProperty) => {
    this.properties.push(newProperty);
  });

  socket.on('propertyUpdated', (updatedProperty) => {
    const index = this.properties.findIndex(p => p._id === updatedProperty._id);
    if (index !== -1) {
      this.$set(this.properties, index, updatedProperty);
    }
  });

  socket.on('propertyDeleted', ({ propertyId }) => {
    this.properties = this.properties.filter(p => p._id !== propertyId);
  });
}
,
  beforeUnmount() {
    socket.off('propertyAdded');
    socket.off('propertyUpdated');
    socket.off('propertyDeleted');
  },
  methods: {
    async fetchProperties() {
      try {
        const response = await axios.get('https://real-estate-app-4vp2.onrender.com/properties');
        this.properties = response.data;
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      }
    }
  }
};
</script>
