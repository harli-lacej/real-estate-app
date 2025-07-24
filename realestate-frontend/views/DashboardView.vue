    <template>
    <figure>
    <img class="banner" src="/dashboard.png" alt="Dashboard poster">
    </figure>
    <div style="height: 50px;"></div>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-4">
                <div class="card mb-3  card-fill" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <figure>
                            <img src="/icon1.png" class="img-fluid rounded-start" width="150" height="150" alt="Image">
                            </figure>
                        </div>
                        <div class="col-md-8 card-div">
                            <div class="card-body">
                                <h5 class="card-title"><span class="value">{{ countAvailable+countUnavailable }}</span> properties listed</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="col-md-4">
                <div class="card mb-3  card-fill" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                          <figure>
                            <img src="/icon3.png" class="img-fluid rounded-start" width="150" height="150" alt="Image">
                            </figure>
                        </div>
                        <div class="col-md-8 card-div">
                            <div class="card-body">
                                <h5 class="card-title"><span class="value">{{ countAvailable }}</span> properties available</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="col-md-4">
                <div class="card mb-3  card-fill" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                          <figure>
                            <img src="/icon2.png" class="img-fluid rounded-start" width="150" height="150" alt="Image">
                          </figure>
                        </div>
                        <div class="col-md-8 card-div">
                            <div class="card-body">
                                <h5 class="card-title"><span class="value">{{ countUnavailable }}</span> properties unavailable</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br>
    <br>

    <div class="container mt-4">
        <div class="row">
            <div class="col-md-8">
                <div class="form-div">
                <div>
                <h3 class="form-title">Add new property</h3>
                </div>
                <form @submit="handleAddProperty">
                    <div class="form-group form-element">
                        <label for="title">Title:</label>
                        <input type="text" class="form-control" id="title" placeholder="Write the post title here" required>
                    </div>
                    <div class="form-group form-element">
                        <label for="desc">Description:</label>
                        <textarea id="desc" class="form-control" name="desc" rows="4" required></textarea>
                    </div>
                    <p>To be sold or to be rent:</p>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="rent" required>
                        <label class="form-check-label" for="inlineRadio1">Rent</label>
                    </div>
                    <div class="form-check form-check-inline form-element">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="sell">
                        <label class="form-check-label" for="inlineRadio2">Sell</label>
                    </div>
                    <p>Available:</p>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio3" value="yes" required>
                        <label class="form-check-label" for="inlineRadio1">Yes</label>
                    </div>
                    <div class="form-check form-check-inline form-element">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio4" value="no">
                        <label class="form-check-label" for="inlineRadio2">No</label>
                    </div>
                    <div class="form-group form-element">
                        <label for="address">Address:</label>
                        <input type="text" class="form-control" id="address" placeholder="Street, house no, ZIP, City, Region, Country">
                    </div>
                    <div class="form-group form-element">
                        <label for="price">Price:</label>
                        <input type="number" id="price" class="form-control" name="price">
                    </div>
                    <div class="form-group form-element">
                        <label for="exampleFormControlSelect1">Property type:</label>
                        <select class="form-control" id="exampleFormControlSelect1" required>
                            <option value="Apartment">Apartment</option>
                            <option value="Villa">Villa</option>
                            <option value="Commercial space">Commercial space</option>
                            <option value="Ground">Ground</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div class="form-group form-element">
                        <label for="surface">Surface area:</label>
                        <input type="number" id="surface" class="form-control" name="surface" required>
                    </div>
                    <div class="form-group form-element">
                        <label for="year">Building year:</label>
                        <input type="number" id="year" class="form-control" name="year" required>
                    </div>
                    <div class="mb-3 form-element">
                        <label for="formFile" class="form-label">Upload Images</label>
                        <input class="form-control" type="file" id="formFile" multiple required>
                    </div>
                    <button class="btn btn-primary" type="submit">Submit <i class="fa-solid fa-arrow-right"></i></button>
                </form>
                </div>
                <div class="form-div">
                    <h3 class="mt-4 form-title">Delete property</h3>
                    <form @submit="handleDeleteProperty">
                        <div class="form-group form-element">
                            <label for="property-id">Property ID:</label>
                            <input type="text" id="property-id" class="form-control" name="id" required>
                        </div>
                        <button class="btn btn-danger" type="submit">Delete</button>
                    </form>
                </div>
            </div>
    
            <div class="col-md-4">
                <!-- <h3  class="form-title">View listed properties</h3>
                <router-link to="/properties" class="btn btn-info">Go to Properties</router-link> -->
            </div>
            <div class="free-space"></div>
        </div>
        </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  components: {
    Navbar,
    Footer,
  },

  data() {
    return {
    countListed: 0,
    countAvailable: 0,
    countUnavailable: 0,
      newProperty: {
        title: '',
        desc: '',
        rentOrSell: '',
        available: '',
        address: '',
        price: '',
        type: '',
        surface: '',
        year: ''
      },
      deleteId: null
    };
  },

  mounted() {
    document.title = "RealDeal | Admin Dashboard";
    this.fetchCounts();
  },

  methods: {
  async fetchCounts() {
    try {
      const [availableRes, unavailableRes] = await Promise.all([
        axios.get('https://real-estate-app-4vp2.onrender.com/properties/available/count'),
        axios.get('https://real-estate-app-4vp2.onrender.com/unavailable/count')
      ]);

      this.countAvailable = availableRes.data.count;
      this.countUnavailable = unavailableRes.data.count;
    } catch (error) {
      console.error('Error fetching property counts:', error);
    }
  },
  async handleAddProperty(event) {
  event.preventDefault();

  const form = new FormData();
  form.append('title', document.getElementById('title').value);
  form.append('description', document.getElementById('desc').value);
  form.append('rentOrSell', document.querySelector('input[name="inlineRadioOptions"]:checked')?.value);
  form.append('available', document.querySelector('input[name="inlineRadioOptions2"]:checked')?.value);
  form.append('address', document.getElementById('address').value);
  form.append('price', document.getElementById('price').value);
  form.append('propertyType', document.getElementById('exampleFormControlSelect1').value);
  form.append('surfaceArea', document.getElementById('surface').value);
  form.append('buildingYear', document.getElementById('year').value);

const imageInput = document.getElementById("formFile");
const files = imageInput.files;

if (files && files.length > 0) {
  for (const file of files) {
    form.append('images', file);
  }
}

  console.log("Submitting new property with data:");
  for (let pair of form.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  try {
    const response = await axios.post('https://real-estate-app-4vp2.onrender.com/properties', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log("Add Property Response:", response.data);
    Swal.fire("Success", "Property added successfully!", "success");
    this.fetchCounts();
  } catch (err) {
    console.error("Add Property Error:", err.response?.data || err.message);
    Swal.fire("Error", err.response?.data.message || "Error adding property", "error");
  }
},


    async  handleDeleteProperty(event) {
        event.preventDefault();

  const propertyId = document.getElementById("property-id").value;

  try {
    await axios.delete(`https://real-estate-app-4vp2.onrender.com/properties/${propertyId}`);
    Swal.fire("Property Deleted!", "The property has been successfully deleted.", "success").then(() => {
      this.$router.push("/properties");
    });
  } catch (err) {
    console.error(err);
    Swal.fire("Error", "Property not found or failed to delete", "error");
  }
    }
  }
};
</script>
