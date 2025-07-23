<template>
  <div>
    <section class="mb-8">
      <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <figure>
            <img src="/carousel-1.png" class="d-block w-100" alt="">
            </figure>
          </div>
          <div class="carousel-item">
            <figure>
            <img src="/carousel-2.png" class="d-block w-100" alt="">
            </figure>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </section>
    <div class="free-space"></div>
    <div class="free-space"></div>
    <div class="container text-center">
        <div class="row align-items-center">
          <div class="col">
          </div>
          <div class="col">
            <h1 class="title">More than a purchase… <span class="title-span">an experience </span></h1>
          </div>
          <div class="col">
          </div>
        </div>
      </div>
      <div class="free-space"></div>
      <div class="container text-center">
        <div class="row align-items-center">
          <div class="col">
            <p class="fs-5">Buying a real estate is <span class="text-orange">a milestone</span> for every one of us. It is a long-term investment that provides the buyer a better life or expected profits for the future.
            Identifying the needs of our clients, from the most basic need, to the elite and premium ones, worthy for a demanding client,
            who knows what they are looking for and what they want to get. Only through this perspective in our work, we can offer the right package that
            meets the demands of our clients, making this a great experience for both parties.
            Developing new and innovative products in the real estate market in <span class="text-orange">Austria, the region and more.</span></p>
          </div>
          <div class="col" data-aos="fade-left" data-aos-offset="400">
            <figure>
              <img src="/photo-home-1.png" class="d-block img-fluid w-75"alt="">
            </figure>
          </div>
        </div>
      </div>
    </div>
    <div class="free-space"></div>
    <div class="container text-center">
        <div class="row align-items-center">
          <div class="col">
          </div>
          <div class="col">
            <h1 class="title">Services</h1>
          </div>
          <div class="col">
          </div>
        </div>
      </div>
      <div class="container text-center">
        <div class="row align-items-center">
          <div class="col">
            <figure>
            <img src="/s1.png" class="d-block img-fluid w-25 mx-auto"alt="">
            </figure>
            <h6 class="fs-4">Marketing Strategies Execution</h6>
            Lead generation strategy. Market research. Building a project brand which will include the main elements (Logo, color palette, main typography) and secondary elements
            
            The brand book guideline Online/Digital
          </div>
          <div class="col">
            <figure>
            <img src="/s2.png" class="d-block img-fluid w-25 mx-auto"alt="">
            </figure>
            <h6 class="fs-4">Consulting service</h6>
            Assessment of the geographic position and selection. Visibility study. Market Research. Support in concept development. Branding and Marketing Strategy. Business Plan
          </div>
          <div class="col">
            <figure>
            <img src="/s3.png" class="d-block img-fluid w-25 mx-auto"alt="">
            </figure>
            <h6 class="fs-4">Sale and post-sale</h6>
            Sale/Broker Dea Lease. Property Listing. Advisory. Sales Procedure and Implementation Reporting. Pricing strategy. Customer database management and reporting
          </div>
        </div>
      </div>
    <div class="free-space"></div>
    <div class="free-space"></div>
    <div class="free-space"></div>
    <div class="free-space"></div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
   mounted() {
    document.title = "RealDeal | Home";
  },
};
</script>
