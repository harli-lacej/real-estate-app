<template>
  <div v-if="!isLoading">
    <div v-if="property">

      <!-- Swiper Carousel for Images -->
<!-- Swiper Carousel for Images -->
<div class="image-container">
  <Swiper
    :modules="[Navigation, Pagination]"
    navigation
    pagination
    class="mySwiper"
  >
    <SwiperSlide v-for="(image, index) in property.images" :key="index">
      <figure>
      <img :src="getImageUrl(index)" class="carousel-image" />
      </figure>
    </SwiperSlide>
  </Swiper>
</div>


      <!-- Property Data -->
      <!-- Property Data -->
<div class="container mt-4">
  <div class="row align-items-start g-4">
    
    <!-- Left: Title + Address + Description -->
    <div class="col-md-8">
      <h1 class="property-details-title">{{ property.title }}</h1>
      <p class="property-details-address">
<i class="fa-solid fa-location-dot"></i>      
        {{ property.address }}</p>
    </div>

        <!-- Right: Info Box -->

        <div class="col-md-12">
  <div class="rounded p-3 info-box-orange d-flex justify-content-between text-center">
    <div class="flex-fill">
      <strong>Price:</strong><br>
      <p class="p-info-box"><span>EUR {{ property.price }}</span></p>
    </div>
    <div class="flex-fill">
      <strong>Type:</strong><br>
      <p class="p-info-box">{{ property.propertyType }}</p>
    </div>
    <div class="flex-fill">
      <strong>Surface Area:</strong><br>
      <p class="p-info-box">{{ property.surfaceArea }} m²</p>
    </div>
  </div>
</div>


<!-- Description block -->
<div class="property-description mt-4">
  <h4 class="mb-3 property-details">Property Details</h4>
  <p class="mb-4"><strong>Description:</strong><br>{{ property.description }}</p>

  <div class="row text-muted">
    <div class="col-sm-6 mb-2">
      <i class="fa-solid fa-handshake"></i>
      <strong class="ms-1">Rent or Sell:</strong>
      <span class="ms-1">{{ property.rentOrSell }}</span>
    </div>
    <div class="col-sm-6 mb-2">
      <i class="fa-solid fa-check-circle"></i>
      <strong class="ms-1">Available:</strong>
      <span class="ms-1">{{ property.available ? 'Yes' : 'No' }}</span>
    </div>
    <div class="col-sm-6 mb-2">
      <i class="fa-solid fa-calendar-alt"></i>
      <strong class="ms-1">Building Year:</strong>
      <span class="ms-1">{{ property.buildingYear }}</span>
    </div>
    <div class="col-sm-6 mb-2">
      <i class="fa-solid fa-envelope"></i>
      <strong class="ms-1">Contact: email@real-deal.com</strong>
      <span class="ms-1"></span>
    </div>
  </div>
  <div class="free-space"></div>
  <div class="free-space"></div>
  <div class="free-space"></div>

  <a :href="`/login?redirect=/edit/${propertyId}`" class="edit-link"><strong class="ms-1" >Admin, you want to edit this post? Click here!</strong></a>

</div>

  </div>
</div>
<div class="free-space"></div>

    </div>
    <div v-else>
      <p>Property not found</p>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

const route = useRoute();
const router = useRouter();

const property = ref(null);
const isLoading = ref(true);

// Use query parameter instead of route parameter
const propertyId = route.query.id;

const getImageUrl = (index) => {
  return `https://real-estate-app-4vp2.onrender.com/properties/${propertyId}/image/${index}`;
};

onMounted(async () => {
  if (!propertyId) {
    console.error('No property ID provided.');
    router.push('/');
    return;
  }

  try {
    // Make sure this matches your backend API endpoint
    const res = await axios.get(`http://localhost:3000/properties/${propertyId}`);
    console.log('API Response:', res);
    property.value = res.data;
  } catch (err) {
    console.error('Failed to fetch property:', err);
    console.error('Error details:', err.response?.data || err.message);
    router.push('/');
  } finally {
    isLoading.value = false;
  }
});
</script>