<template>
  <div class="sign-up view-padding registration">
    <Loading :loading="loading"></Loading>
    <div class="container">
      <h5 class="text-center description-title">
        {{ $t("form.Fill Information Correctly") }}
      </h5>
      <transition-group name="fade">
        <Errors v-if="showErrors" :error="error" key="error">
          <template #errors>
            <div class="errors">
              <!-- <strong>{{ showErrors }} </strong> -->
              <strong v-for="(err, i) in showErrors" :key="i"
                >{{ err }}
              </strong>
              <button
                @click="error = ''"
                type="button"
                class="btn-close close-alert"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          </template>
        </Errors>
        <Success v-if="success" :success="success" key="success">
          <template #success>
            <div class="errors">
              <strong>{{ successMessage }} </strong>
              <button
                @click="success = ''"
                type="button"
                class="btn-close close-alert"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          </template>
        </Success>
      </transition-group>
      <form action="" class="text-capitalize form" @submit.prevent="signUp">
        <div class="form-group">
          <h5 class="text-capitalize">{{ $t("form.Personal Information") }}</h5>
        </div>

        <div class="form-group">
          <label for="" class="form-label">{{ $t("form.name") }}</label>
          <div class="input-container">
            <input class="form-input" type="text" v-model="userData.name" />
            <fa class="icon" icon="user" />
          </div>
          <div class="validation-errors">
            <span
              v-if="!$v.userData.name.required && $v.userData.name.$dirty"
              class="text-danger"
              >{{ $t("validation.name") }}</span
            >
          </div>
        </div>

        <div class="form-group">
          <label for="" class="form-label">{{ $t("form.email") }}</label>
          <div class="input-container">
            <input class="form-input" type="email" v-model="userData.email" />
            <fa class="icon" icon="envelope" />
          </div>
          <div class="validation-errors">
            <span
              v-if="!$v.userData.email.required && $v.userData.email.$dirty"
              class="text-danger"
              >{{ $t("validation.email") }}</span
            >
            <span v-if="!$v.userData.email.email" class="text-danger">{{
              $t("validation.validemail")
            }}</span>
          </div>
        </div>

        <div class="form-group">
          <label for="" class="form-label">{{ $t("form.phone") }}</label>
          <div class="input-container">
            <input class="form-input" type="tel" v-model="userData.phone" />
            <fa class="icon" icon="phone-alt" />
          </div>
          <div class="validation-errors">
            <span
              v-if="!$v.userData.phone.required && $v.userData.phone.$dirty"
              class="text-danger"
              >{{ $t("validation.phone") }}</span
            >
          </div>
        </div>

        <div class="form-group">
          <label for="" class="form-label">{{ $t("form.password") }}</label>
          <div class="input-container">
            <input
              type="password"
              autocomplete
              class="form-input password-input"
              v-model="userData.password"
            />
            <fa
              class="icon show-password"
              @click="showAndHidePassword"
              icon="eye"
            />
          </div>
          <div class="validation-errors">
            <span
              v-if="
                !$v.userData.password.required && $v.userData.password.$dirty
              "
              class="text-danger"
              >{{ $t("validation.validpassword") }}</span
            >
            <span v-if="!$v.userData.password.minLength" class="text-danger"
              >{{ $t("validation.Password must be at least") }}
              {{ $v.userData.password.$params.minLength.min }}
              {{ $t("validation.characters") }}</span
            >
          </div>
        </div>

        <div class="form-group">
          <label for="" class="form-label">{{
            $t("form.Confirm Password")
          }}</label>
          <div class="input-container">
            <input
              type="password"
              autocomplete
              class="form-input password-input"
              v-model="userData.password_confirmation"
            />
            <fa
              class="icon show-password"
              @click="showAndHidePassword"
              icon="eye"
            />
          </div>
          <div class="validation-errors">
            <span
              v-if="
                !$v.userData.password_confirmation.required &&
                $v.userData.password_confirmation.$dirty
              "
              class="text-danger"
              >{{ $t("validation.confirmation password") }}</span
            >
            <span
              v-if="!$v.userData.password_confirmation.sameAsPassword"
              class="text-danger"
              >{{ $t("validation.same password") }}</span
            >
          </div>
        </div>

        <!-- Start Company Details -->
        <transition name="moveUp">
          <div class="company">
            <div class="company-details form-group">
              <h5 class="text-capitalize">{{ $t("form.company details") }}</h5>
            </div>

            <div class="form-group">
              <label for="" class="form-label">{{
                $t("form.The Company Name")
              }}</label>
              <div class="input-container">
                <input
                  type="text"
                  class="form-input"
                  v-model="userData.name_company"
                />
                <fa class="icon" icon="building" />
              </div>
              <div class="validation-errors">
                <span
                  v-if="
                    !$v.userData.name_company.required &&
                    $v.userData.name_company.$dirty
                  "
                  class="text-danger"
                  >{{ $t("validation.company name") }}</span
                >
              </div>
            </div>

            <div class="form-group">
              <label for="" class="form-label">{{
                $t("form.company Size")
              }}</label>
              <div class="size-options">
                <div class="user-type text-capitalize">
                  <input
                    type="radio"
                    name="company_size"
                    class="form-input-radio"
                    value="small"
                    v-model="userData.company_size"
                  />
                  <label class="user-label" for="Company">{{
                    $t("form.small")
                  }}</label>
                </div>
                <div class="user-type text-capitalize">
                  <input
                    type="radio"
                    name="company_size"
                    class="form-input-radio"
                    value="middle"
                    v-model="userData.company_size"
                  />
                  <label class="user-label" for="Company">{{
                    $t("form.middle")
                  }}</label>
                </div>
                <div class="user-type text-capitalize">
                  <input
                    type="radio"
                    name="company_size"
                    class="form-input-radio"
                    value="large"
                    v-model="userData.company_size"
                  />
                  <label class="user-label" for="Company">{{
                    $t("form.large")
                  }}</label>
                </div>
                <div class="user-type text-capitalize">
                  <input
                    type="radio"
                    name="company_size"
                    class="form-input-radio"
                    value="extra"
                    v-model="userData.company_size"
                  />
                  <label class="user-label" for="Company">{{
                    $t("form.extra")
                  }}</label>
                </div>
              </div>
              <div class="validation-errors">
                <span
                  v-if="
                    !$v.userData.company_size.required &&
                    $v.userData.company_size.$dirty
                  "
                  class="text-danger"
                  >{{ $t("validation.company size") }}</span
                >
              </div>
            </div>

            <div class="form-group">
              <label for="" class="form-label">{{
                $t("form.Company Establishment Date")
              }}</label>
              <div class="input-container">
                <input
                  type="date"
                  class="form-input date"
                  placeholder="00 / 00 / 0000"
                  v-model="userData.date"
                />
                <!-- <fa class="icon" icon="calendar" /> -->
              </div>

              <div class="validation-errors">
                <span
                  v-if="!$v.userData.date.required && $v.userData.date.$dirty"
                  class="text-danger"
                  >{{ $t("validation.date") }}</span
                >
              </div>
            </div>

            <div class="form-group Tagline">
              <label for="" class="form-label">{{ $t("form.tags") }}</label>
              <vue-tags-input
                v-model="tag"
                :tags="userData.tagline"
                @tags-changed="(newTags) => (userData.tagline = newTags)"
              />
              <div class="validation-errors">
                <span
                  v-if="
                    !$v.userData.tagline.required && $v.userData.tagline.$dirty
                  "
                  class="text-danger"
                  >{{ $t("validation.tags") }}</span
                >
              </div>
            </div>

            <transition name="swip">
              <div
                class="preview-container-image form-group"
                v-if="companyImagePreview"
              >
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
                $t("form.Company Image")
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
                  @change="handleUploadFileImage($event)"
                  class="file-input"
                  type="file"
                  id="photo"
                />
              </div>
            </div>

            <!-- Start Country And City -->
            <div class="form-group">
              <div class="countries">
                <label for="" class="form-label">{{
                  $t("form.Country")
                }}</label>
                <select
                  class="select-box"
                  name=""
                  @change="getCountryId($event)"
                >
                  <option value="choose your country">
                    {{ $t("form.Choose Your Country") }}
                  </option>
                  <option
                    v-for="country in countries"
                    :key="country.id"
                    :value="country.id"
                  >
                    {{ country.name }}
                  </option>
                </select>
              </div>
              <div class="citis">
                <label for="" class="form-label">Citis</label>
                <select class="select-box" name="" @change="getCityId($event)">
                  >
                  <option value="choose your city">
                    {{ $t("form.Choose Your City") }}
                  </option>
                  <option
                    v-for="city in cities"
                    :key="city.id"
                    :value="city.id"
                  >
                    {{ city.name }}
                  </option>
                </select>
              </div>
            </div>
            <!-- End Country And City -->
            <div class="form-group verifid">
              <input type="checkbox" class="check-box" />
              <label for="" class="form-label-verifid">
                {{ $t("form.Verify") }}
              </label>
            </div>
          </div>
        </transition>
        <!-- End Company Details -->

        <button class="submit-button d-block text-capitalize">
          {{ $t("form.Create") }}
        </button>
      </form>
      <div class="terms text-center">
        <p>
          {{ $t("form.By clicking Agree") }}
          &amp; {{ $t("form.Join you agree to the Pharma In User Agreement") }}
          <router-link class="links" :to="{ name: 'PrivacyPolicy' }">{{
            $t("form.Privacy Policy")
          }}</router-link>
          &amp;
          <router-link class="links" :to="{ name: 'CookiePolicy' }">{{
            $t("form.Cookie Policy")
          }}</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { append_Object_Items_ToFormData } from "@/axios/helpers";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import VueTagsInput from "@johmun/vue-tags-input";
export default {
  name: "SignUpCompany",
  data() {
    return {
      success: false,
      successMessage: "",
      error: "",
      loading: false,
      companyImagePreview: null,
      reader: new FileReader(),
      tag: "",
      userData: {
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
        type: "company",
        name_company: "",
        company_size: "",
        date: "",
        image: "",
        country_id: "",
        city_id: "",
        tagline: [],
      },
    };
  },
  components: { VueTagsInput },
  mounted() {
    this.getAllCountries();
    this.getAllCities();
  },
  created() {
    this.reader.onload = () => {
      this.companyImagePreview = this.reader.result;
    };
  },
  computed: {
    ...mapState({
      countries: (state) => state.places.countries,
      cities: (state) => state.places.cities,
    }),
    showErrors() {
      return this.error;
    },
  },
  methods: {
    ...mapActions({
      getAllCountries: "places/getAllCountries",
      getAllCities: "places/getAllCities",
    }),

    getCountryId(event) {
      this.$store.dispatch("places/getAllCountries", event.target.value);
      this.userData.country_id = event.target.value;
    },
    getCityId(event) {
      this.$store.dispatch("places/getAllCities", event.target.value);
      this.userData.city_id = event.target.value;
    },
    handleUploadFileImage(event) {
      this.userData.image = event.target.files[0];
      this.reader.readAsDataURL(this.userData.image);
    },
    showAndHidePassword() {
      let passwordInputs = document.querySelectorAll(".password-input");
      passwordInputs.forEach((input) => {
        input.getAttribute("type") == "password"
          ? input.setAttribute("type", "text")
          : input.setAttribute("type", "password");
      });
    },
    signUp() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("error");
      } else {
        this.loading = true;
        let user = append_Object_Items_ToFormData(this.userData);
        this.$store
          .dispatch("auth/RegisterModule/signUp", user)
          .then((response) => {
            this.successMessage = response.data.message;
          })
          .catch((error) => {
            this.error = error.response.data.message;
          })
          .finally(() => {
            this.loading = false;
            if (!this.showErrors) {
              this.success = true;
              setTimeout(() => {
                this.$router.push({ name: "Registration" });
              }, 700);
            }
          });
      }
    },
  },
  validations: {
    userData: {
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      phone: {
        required,
      },
      password: {
        required,
        minLength: minLength(8),
      },
      password_confirmation: {
        required,
        sameAsPassword: sameAs("password"),
      },
      type: {
        required,
      },
      name_company: {
        required,
      },
      company_size: {
        required,
      },
      date: {
        required,
      },
      tagline: {
        required,
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/pages/registrationForms.scss";
</style>
