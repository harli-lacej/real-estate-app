<template>
  <div>
    <figure>
        <img class="banner image-profile" src="/about-us-banner.png" alt="Real estate graphic">
    </figure>
    <div class="free-space"></div>
    <div class="free-space"></div>
    <div class="container text-center">
        <div class="row align-items-center">
          <div class="col">
          </div>
          <div class="col">
            <h1 class="title">Our history</h1>
          </div>
          <div class="col">
          </div>
        </div>
      </div>
      <div class="container text-left">
        <div class="row align-items-center">
          <div class="col">
            <p class="fs-5"><span class="text-orange">Established in 2010</span>, our real estate firm began with a vision to redefine the property market through professionalism, integrity, and innovation. 
                Starting as a small agency with just a handful of listings, we quickly gained a reputation for excellence in customer service and market expertise.
                By 2015, our client base had expanded significantly, leading to the opening of multiple offices and a diverse portfolio that included residential, commercial, 
                and luxury properties. Our commitment to transparency and customer satisfaction set us apart, earning the trust of homeowners, investors, and businesses alike.</p>
                
                <p class="fs-5">The 2020s marked a new era of growth, as we embraced digital transformation by integrating cutting-edge technology into our operations. Online property listings,
                 virtual tours, and <span class="text-orange">AI-driven market analysis</span> helped us reach a wider audience and streamline the buying and selling process.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="free-space"></div>
    <div class="free-space"></div>
    <div class="container text-center">
        <div class="row align-items-center">
            <div class="col">
            </div>
            <div class="col">
                <h1 class="title">Team</h1>
            </div>
            <div class="col">
            </div>
        </div>
    </div>
    
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card team-card">
                    <img class="card-img-top team-image" src="/pfp3.png" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title form-title">Jane Doe</h5>
                        <p class="card-text text-white">Manager and Real Estate Agent</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card team-card">
                    <img class="card-img-top team-image" src="/pfp.png" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title form-title">John Doe</h5>
                        <p class="card-text text-white">Real Estate Agent</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card team-card">
                    <img class="card-img-top team-image" src="/pfp2.png" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title form-title">John Smith</h5>
                        <p class="card-text text-white">Real Estate Agent and Marketing</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    
    <div class="free-space"></div>
    <div class="free-space"></div>
    <div class="container text-center">
        <div class="row align-items-start">
            <div class="col d-flex flex-column p-3">
                <h6 class="fs-4">CORPORATE CULTURE</h6>
                <p>We follow the principles of integrity, we believe in building mutual moral relationships by following the laws and regulations with all our clients and our associates.
                We are devoted to our clients, offering the highest standards of professionalism and experience, maintaining privacy and confidentiality, as well as our skills in presenting a diverse portfolio of real estate.</p>
            </div>
            <div class="col d-flex flex-column p-3">
                <h6 class="fs-4">MISSION</h6>
                <p>Making life easier for our clients, whether they are individuals or businesses, by offering a full range of services in Real Estate, Asset & Property Management, and Hospitality...</p>
            </div>
            <div class="col d-flex flex-column p-3">
                <h6 class="fs-4">VISION</h6>
                <p>Our vision is to become a leader in the Austrian market, offering our expertise and quality services covering all 360 degrees in the field of Real Estate...</p>
            </div>
        </div>
    </div> 
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
    document.title = "RealDeal | About Us";
  },
};
</script>
