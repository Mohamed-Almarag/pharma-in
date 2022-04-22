<template>
  <transition name="fade">
    <div class="clip-path form-modal-container" v-if="showCompany">
      <Loading :loading="loading"></Loading>
      <form action="" class="form-modal" @submit.prevent="createCompany()">
        <h5 class="title text-uppercase text-center">create a company</h5>
        <span @click="close" class="close close-form-modal"
          ><fa class="icon" icon="times"
        /></span>
        <div class="form-group">
          <label for="" class="form-label">{{ $t("form.company name") }}</label>
          <input
            class="form-input"
            type="text"
            v-model="companyData.company_name"
          />
          <div class="validation-errors">
            <span
              v-if="
                !$v.companyData.company_name.required &&
                $v.companyData.company_name.$dirty
              "
              class="text-danger"
              >{{ $t("validation.company name") }}</span
            >
          </div>
        </div>
        <div class="form-group">
          <label for="" class="form-label">{{ $t("form.email") }}</label>
          <input class="form-input" type="email" v-model="companyData.email" />
          <div class="validation-errors">
            <span
              v-if="
                !$v.companyData.email.required && $v.companyData.email.$dirty
              "
              class="text-danger"
              >{{ $t("validation.email") }}</span
            >
            <span v-if="!$v.companyData.email.email" class="text-danger">{{
              $t("validation.validemail")
            }}</span>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="form-label">address</label>
          <input class="form-input" type="text" v-model="companyData.address" />
          <div class="validation-errors">
            <span
              v-if="
                !$v.companyData.address.required &&
                $v.companyData.address.$dirty
              "
              class="text-danger"
              >address is required!</span
            >
          </div>
        </div>
        <div class="form-group">
          <label for="" class="form-label">location</label>
          <input
            class="form-input"
            type="text"
            v-model="companyData.location"
          />
          <div class="validation-errors">
            <span
              v-if="
                !$v.companyData.location.required &&
                $v.companyData.location.$dirty
              "
              class="text-danger"
              >location is required!</span
            >
          </div>
        </div>
        <div class="form-group">
          <label for="" class="form-label">phone</label>
          <input class="form-input" type="text" v-model="companyData.phone" />
          <div class="validation-errors">
            <span
              v-if="
                !$v.companyData.phone.required && $v.companyData.phone.$dirty
              "
              class="text-danger"
              >phone is required!</span
            >
          </div>
        </div>
        <div class="form-group">
          <label for="" class="form-label">website</label>
          <input class="form-input" type="text" v-model="companyData.website" />
          <div class="validation-errors">
            <span
              v-if="
                !$v.companyData.website.required &&
                $v.companyData.website.$dirty
              "
              class="text-danger"
              >website is required!</span
            >
          </div>
        </div>
        <div class="form-group">
          <label for="" class="form-label">description</label>
          <textarea
            class="form-input text-area"
            v-model="companyData.description"
          ></textarea>
          <div class="validation-errors">
            <span
              v-if="
                !$v.companyData.description.required &&
                $v.companyData.description.$dirty
              "
              class="text-danger"
              >description is required!</span
            >
          </div>
        </div>
        <!-- start company size  -->
        <div class="form-group">
          <label class="form-label">Company Size</label>
          <div class="sizes-options">
            <div class="user-type text-capitalize">
              <input
                type="radio"
                name="company_size"
                class="form-input-radio"
                value="small"
                v-model="companyData.company_size"
              />
              <label class="user-label" for="Company ">small</label>
            </div>
            <div class="user-type text-capitalize">
              <input
                type="radio"
                name="company_size"
                class="form-input-radio"
                value="middle"
                v-model="companyData.company_size"
              />
              <label class="user-label" for="Company ">middle</label>
            </div>
            <div class="user-type text-capitalize">
              <input
                type="radio"
                name="company_size"
                class="form-input-radio"
                value="large"
                v-model="companyData.company_size"
              />
              <label class="user-label" for="Company ">large</label>
            </div>
          </div>
          <div class="validation-errors">
            <span
              v-if="
                !$v.companyData.company_size.required &&
                $v.companyData.company_size.$dirty
              "
              class="text-danger"
              >company size is required!</span
            >
          </div>
        </div>
        <!-- end company size  -->
        <!-- start employee size  -->
        <div class="form-group">
          <label class="form-label">employee Size</label>
          <div class="sizes-options">
            <div class="user-type text-capitalize">
              <input
                type="radio"
                name="employee_size"
                class="form-input-radio"
                value="1–10employees"
                v-model="companyData.employee_size"
              />
              <label class="user-label" for="employee_size "
                >1–10employees</label
              >
            </div>
            <div class="user-type text-capitalize">
              <input
                type="radio"
                name="employee_size"
                class="form-input-radio"
                value="11–50employees"
                v-model="companyData.employee_size"
              />
              <label class="user-label" for="employee_size "
                >11–50employees</label
              >
            </div>
            <div class="user-type text-capitalize">
              <input
                type="radio"
                name="employee_size"
                class="form-input-radio"
                value="51–200employees"
                v-model="companyData.employee_size"
              />
              <label class="user-label" for="employee_size "
                >51–200employees</label
              >
            </div>
          </div>
          <div class="validation-errors">
            <span
              v-if="
                !$v.companyData.company_size.required &&
                $v.companyData.company_size.$dirty
              "
              class="text-danger"
              >employee size is required!</span
            >
          </div>
        </div>
        <!-- end employee size ,,,,,,  -->
        <!-- start employee size  -->
        <div class="form-group">
          <label class="form-label">employee type</label>
          <div class="sizes-options employee">
            <div class="user-type text-capitalize">
              <input
                type="radio"
                name="employee_type"
                class="form-input-radio"
                value="PublicCompany"
                v-model="companyData.employee_type"
              />
              <label class="user-label" for="employee_type "
                >Public Company</label
              >
            </div>
            <div class="user-type text-capitalize">
              <input
                type="radio"
                name="employee_type"
                class="form-input-radio"
                value="Self-employed"
                v-model="companyData.employee_type"
              />
              <label class="user-label" for="employee_type "
                >Self employed</label
              >
            </div>
            <div class="user-type text-capitalize">
              <input
                type="radio"
                name="employee_type"
                class="form-input-radio"
                value="GovernmentAgency"
                v-model="companyData.employee_type"
              />
              <label class="user-label" for="employee_type "
                >GovernmentAgency</label
              >
            </div>
            <div class="user-type text-capitalize">
              <input
                type="radio"
                name="employee_type"
                class="form-input-radio"
                value="Nonprofit"
                v-model="companyData.employee_type"
              />
              <label class="user-label" for="employee_type ">Nonprofit</label>
            </div>
            <div class="user-type text-capitalize">
              <input
                type="radio"
                name="employee_type"
                class="form-input-radio"
                value="SoleProprietorship"
                v-model="companyData.employee_type"
              />
              <label class="user-label" for="employee_type "
                >SoleProprietorship</label
              >
            </div>
            <div class="user-type text-capitalize">
              <input
                type="radio"
                name="employee_type"
                class="form-input-radio"
                value="PrivatelyHeld"
                v-model="companyData.employee_type"
              />
              <label class="user-label" for="employee_type "
                >PrivatelyHeld</label
              >
            </div>
            <div class="user-type text-capitalize">
              <input
                type="radio"
                name="employee_type"
                class="form-input-radio"
                value="Partnership"
                v-model="companyData.employee_type"
              />
              <label class="user-label" for="employee_type ">Partnership</label>
            </div>
          </div>
          <div class="validation-errors">
            <span
              v-if="
                !$v.companyData.company_size.required &&
                $v.companyData.company_size.$dirty
              "
              class="text-danger"
              >employee size is required!</span
            >
          </div>
        </div>
        <!-- end employee size  -->
        <div class="form-group">
          <label for="" class="form-label d-block">tags</label>
          <vue-tags-input
            v-model="companyData.tag"
            :tags="companyData.tags"
            @tags-changed="(newTags) => (companyData.tags = newTags)"
          />
        </div>
        <transition name="swip">
          <div class="preview-container-image" v-if="companyImagePreview">
            <img
              draggable="false"
              class="preview-image d-block m-auto"
              :src="companyImagePreview"
              alt="preview"
            />
          </div>
        </transition>

        <div class="form-group choose-photo-container">
          <label class="choose-label d-block text-capitalize">{{
            $t("global.choose photo")
          }}</label>
          <div class="choose-photo">
            <label
              class="
                upload-photo
                d-flex
                justify-content-center
                align-items-center
                rounded-circle
              "
              for="photo"
              ><fa class="icon" icon="camera"
            /></label>
            <input
              @change="handelCompanyUploadFileImage($event)"
              class="file-input"
              type="file"
              id="photo"
            />
          </div>
        </div>
        <button class="submit-form-modal text-capitalize d-block">send</button>
      </form>
    </div>
  </transition>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import VueTagsInput from "@johmun/vue-tags-input";
export default {
  name: "CreateCompany",
  data() {
    return {
      companyImagePreview: null,
      knowUserType: null,
      loading: false,
      companyData: {
        company_name: null,
        email: null,
        address: null,
        location: null,
        phone: null,
        website: null,
        description: null,
        employee_size: null,
        employee_type: null,
        company_size: null,
        tag: "",
        tags: [],
        logo: null,
        type_id: null,
        reader: new FileReader(),
      },
    };
  },
  props: {
    showCompany: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // user details come from store
    let userDetailsInStore = this.$store.state.userDetails;
    this.knowUserType = userDetailsInStore.type;
    if (this.knowUserType == "company") {
      this.companyData.type_id = userDetailsInStore.id;
    }
  },
  created() {
    // this.reader.onload = () => {
    //   this.imagePreview = this.reader.result;
    // };
    this.companyData.reader.onload = () => {
      this.companyImagePreview = this.companyData.reader.result;
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },

    handelCompanyUploadFileImage(event) {
      this.companyData.logo = event.target.files[0];
      this.companyData.reader.readAsDataURL(this.companyData.logo);
    },
    createCompany() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("error");
      } else {
        this.loading = true;
        let newCompanyData = new FormData();
        newCompanyData.append("company_name", this.companyData.company_name);
        newCompanyData.append("email", this.companyData.email);
        newCompanyData.append("address", this.companyData.address);
        newCompanyData.append("location", this.companyData.location);
        newCompanyData.append("phone", this.companyData.phone);
        newCompanyData.append("website", this.companyData.website);
        newCompanyData.append("description", this.companyData.description);
        newCompanyData.append("employee_size", this.companyData.employee_size);
        newCompanyData.append("employee_type", this.companyData.employee_type);
        newCompanyData.append("company_size", this.companyData.company_size);
        newCompanyData.append("tags", this.companyData.tags);
        newCompanyData.append("logo", this.companyData.logo);
        newCompanyData.append("type_id", this.companyData.type_id);
        this.$store
          .dispatch("ProfileModule/setAnewCompany", newCompanyData)
          .then(() => {
            // window.location.reload()
            this.showCompany = false;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
  components: { VueTagsInput },
  validations: {
    companyData: {
      company_name: {
        required,
      },
      email: {
        required,
        email,
      },
      phone: {
        required,
      },
      address: {
        required,
      },
      location: {
        required,
      },
      website: {
        required,
      },
      description: {
        required,
      },
      employee_size: {
        required,
      },
      employee_type: {
        required,
      },
      tags: {
        required,
      },
      company_size: {
        required,
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
