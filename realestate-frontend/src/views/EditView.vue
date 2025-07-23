<template>
  <figure>
    <img class="banner" src="/edit-banner.png" alt="Dashboard poster" />
  </figure>

  <div class="container mt-4">
    <div class="row">
      <div class="col-md-8">
        <div class="form-div">
          <h3 class="form-title">Edit listing with ID: {{ propertyId }}</h3>

          <form @submit.prevent="handleEditProperty">
            <!-- Title -->
            <div class="form-group form-element">
              <label for="title">Title:</label>
              <input v-model="form.title" type="text" class="form-control" id="title" required />
            </div>

            <!-- Description -->
            <div class="form-group form-element">
              <label for="desc">Description:</label>
              <textarea v-model="form.description" id="desc" class="form-control" rows="4" required></textarea>
            </div>

            <!-- Rent or Sell -->
            <p>To be sold or to be rent:</p>
            <div class="form-check form-check-inline">
              <input v-model="form.rentOrSell" class="form-check-input" type="radio" value="rent" required />
              <label class="form-check-label">Rent</label>
            </div>
            <div class="form-check form-check-inline">
              <input v-model="form.rentOrSell" class="form-check-input" type="radio" value="sell" />
              <label class="form-check-label">Sell</label>
            </div>

            <!-- Available -->
            <p>Available:</p>
            <div class="form-check form-check-inline">
              <input v-model="form.available" class="form-check-input" type="radio" :value="true" required />
              <label class="form-check-label">Yes</label>
            </div>
            <div class="form-check form-check-inline">
              <input v-model="form.available" class="form-check-input" type="radio" :value="false" />
              <label class="form-check-label">No</label>
            </div>

            <!-- Address -->
            <div class="form-group form-element">
              <label for="address">Address:</label>
              <input v-model="form.address" type="text" class="form-control" id="address" />
            </div>

            <!-- Price -->
            <div class="form-group form-element">
              <label for="price">Price:</label>
              <input v-model="form.price" type="number" class="form-control" id="price" />
            </div>

            <!-- Property Type -->
            <div class="form-group form-element">
              <label for="propertyType">Property type:</label>
              <select v-model="form.propertyType" class="form-control" id="propertyType" required>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Commercial space">Commercial space</option>
                <option value="Ground">Ground</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <!-- Surface Area -->
            <div class="form-group form-element">
              <label for="surface">Surface area:</label>
              <input v-model="form.surfaceArea" type="number" class="form-control" id="surface" required />
            </div>

            <!-- Building Year -->
            <div class="form-group form-element">
              <label for="year">Building year:</label>
              <input v-model="form.buildingYear" type="number" class="form-control" id="year" required />
            </div>

            <!-- Submit -->
            <button class="btn btn-primary" type="submit">
              Submit changes <i class="fa-solid fa-arrow-right"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const propertyId = route.params.id || route.query.id;
const isLoading = ref(false);
const errorMessage = ref('');

const form = reactive({
  title: '',
  description: '',
  rentOrSell: '',
  available: true,
  address: '',
  price: 0,
  propertyType: '',
  surfaceArea: 0,
  buildingYear: 2000,
});

const fetchProperty = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const res = await axios.get(`https://real-estate-app-4vp2.onrender.com/properties/${propertyId}`);
    const property = res.data;
    Object.assign(form, {
      title: property.title,
      description: property.description,
      rentOrSell: property.rentOrSell,
      available: property.available,
      address: property.address,
      price: property.price,
      propertyType: property.propertyType,
      surfaceArea: property.surfaceArea,
      buildingYear: property.buildingYear,
    });
  } catch (err) {
    console.error('Failed to fetch property:', err);
    errorMessage.value = 'Failed to load property details';
    router.push('/');
  } finally {
    isLoading.value = false;
  }
};

const handleEditProperty = async () => {
  isLoading.value = true;
  try {
    await axios.patch(`https://real-estate-app-4vp2.onrender.com/properties/${propertyId}`, form);
    router.push('/properties');
  } catch (err) {
    console.error("Update failed (silent):", err);
    router.push('/properties');
  } finally {
    isLoading.value = false;
  }
};;

onMounted(fetchProperty);
</script>
