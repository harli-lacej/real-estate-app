<template>
<div>
  <figure>
    <img class="banner image-profile" src="/contact-banner.png" alt="Contact poster">
  </figure>
    <div class="free-space"></div>
    <div class="free-space"></div>
<div class="container text-center">
    <div class="row align-items-center">
      <div class="col"></div>
      <div class="col">
        <h1 class="title">How to reach us?</h1>
      </div>
      <div class="col"></div>
    </div>
  </div>
  <div class="container text-left mt-5">
    <div class="row align-items-stretch">
      <div class="col-md-6">
        <h5 class="carousel-heading-sm"><span>How to contact us?</span></h5>
        <p>
          <svg class="number-bulletpoint" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"></path>
          </svg> Tel: 067 334 355 657 <br>
  
          <svg class="number-bulletpoint" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"></path>
          </svg> Email: email@real-deal.com <br>
  
          <svg class="number-bulletpoint" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"></path>
          </svg> Or fill the form below:
        </p>

         <div class="form-div">
        <form @submit="submitForm">
          <div class="mb-3">
            <label for="email" class="form-label">Email:</label>
            <input type="email" class="form-control" id="email" name="email" placeholder="Enter your email address" required>
          </div>
          <div class="mb-3">
            <label for="message" class="form-label">Message:</label>
            <textarea class="form-control" id="message" name="message" rows="7" required></textarea>
          </div>
          <button class="btn btn-primary w-100" type="submit">Send</button>
        </form>
        </div>
        <h5 class="carousel-heading-sm"><span>When are we open?</span></h5>
         <i class="fa-solid fa-clock"></i><time datetime="Mo-Fr 09:00-17:00">  Monday to Friday, 9am–5pm</time>
      </div>
  
      <div class="col-md-6">
        <h5 class="carousel-heading-sm"><span>Where to find us?</span></h5>
        <div id="map" style="height: 90%; min-height: 90%; border-radius: 10px;"></div>
      </div>
    </div>
  </div>
  <div class="free-space"></div>
  <div class="free-space"></div>
  <div class="free-space"></div>
  <div class="free-space"></div>
  </div>
  </template>

<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import L from 'leaflet';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

export default {
  components: {
    Navbar,
    Footer,
  },
  mounted() {
    document.title = "RealDeal | Contact";

    const linzCoords = [48.3069, 14.2858];
    const map = L.map('map', {
      scrollWheelZoom: false
    }).setView(linzCoords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker(linzCoords).addTo(map)
      .bindPopup('Linz, Austria')
      .openPopup();

    map.on('click', () => {
      map.scrollWheelZoom.enable();
    });

    map.on('mouseout', () => {
      map.scrollWheelZoom.disable();
    });
  },
  methods: {
    async submitForm(e) {
      e.preventDefault();

      const name = document.getElementById('email').value.split('@')[0];
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      const time = new Date().toLocaleString();

      const templateParams = {
        name,
        time,
        message
      };

      try {
        const response = await emailjs.send(
          'service_b7edcqk',
          'template_tn4s6wn',
          templateParams,
          'b-DQz1ANuq8K0CBFy'
        );
        Swal.fire("Message sent!", "Your message to us has been sucessfully sent!", "success");
      } catch (error) {
        console.error('EmailJS error:', error);
        Swal.fire("Error", err.response?.data.message || "Error sending message!", "error");
      }
    }
  }
};
</script>


