<template>
  <!-- Start Create Profile -->
  <div class="create-portofolio">
    <Loading :loading="loading"></Loading>
    <h5 class="titl text-uppercase text-center">create portofolio</h5>

    <p class="texts text-capitalize">
      feel free to do what you want in your portfolio , you can create and edit
      or delte your portolio like what you want so let us go to do that
    </p>
    <div class="icons-list">
      <CreateCompany
        @close="showCompanyoModal"
        :showCompany="showCompany"
      ></CreateCompany>
      <button
        v-if="knowUserType == 'company'"
        @click="showCompanyoModal"
        class="complete-portfolio details-button d-block text-capitalize"
      >
        create a company
      </button>
      <button
        v-if="knowUserType == 'customer' && portofolioNotNull == null"
        @click="showProtofolioModal = true"
        class="complete-portfolio details-button d-block text-capitalize"
      >
        complete your portfolio
      </button>
      <button
        v-if="knowUserType == 'customer' && portofolioNotNull != null"
        @click="getPotfolioDataToEditIt"
        class="complete-portfolio details-button d-block text-capitalize"
      >
        edit your portfolio
      </button>
    </div>
    <!-- Start All Portofolio Details -->
    <transition name="fade">
      <div class="prtofolio-details clip-path" v-if="showProtofolioModal">
        <div class="step-one" v-if="step == 1">
          <form
            action=""
            class="main-form-container text-capitalize"
            @submit.prevent="createPortofolio"
          >
            <h5 class="titl text-uppercase text-center">
              create your portofolio
            </h5>
            <span @click="showHideProtofolioModal" class="close-form-modal"
              ><fa class="icon" icon="times"
            /></span>
            <div class="form-group">
              <label for="" class="form-label d-block">your bio</label>
              <input
                type="text"
                class="form-input d-blcok"
                v-model="portofolio.bio"
              />
            </div>
            <div class="form-group">
              <label for="" class="form-label d-block">your address</label>
              <input
                type="text"
                class="form-input d-blcok"
                v-model="portofolio.address"
              />
            </div>
            <div class="form-group">
              <label for="" class="form-label d-block"
                >your qualifications</label
              >
              <input
                type="text"
                class="form-input d-blcok"
                v-model="portofolio.qualification"
              />
            </div>
            <div class="form-group">
              <label for="" class="form-label d-block">your achievements</label>
              <input
                type="text"
                class="form-input d-blcok"
                v-model="portofolio.achievement"
              />
            </div>
            <div class="form-group">
              <label for="" class="form-label d-block"
                >your portfolio link</label
              >
              <input
                type="text"
                class="form-input d-blcok"
                v-model="portofolio.portfolio_link"
              />
            </div>

            <div class="form-group">
              <label for="" class="form-label d-block">your skills</label>
              <vue-tags-input
                v-model="tag"
                :tags="tags"
                @tags-changed="(newTags) => (tags = newTags)"
              />
            </div>

            <transition name="swip">
              <div class="preview-container" v-if="imagePreview">
                <img
                  draggable="false"
                  class="preview d-block m-auto"
                  :src="imagePreview"
                  alt="preview"
                />
              </div>
            </transition>

            <div class="form-group job-imag">
              <label class="form-label d-block text-capitalize"
                >choose photo</label
              >
              <div class="choose-photo">
                <label
                  class="
                    upload-photo
                    d-flex
                    justify-content-center
                    align-items-center
                    rounded-circle
                  "
                  for="job-photo"
                  ><fa class="icon" icon="camera"
                /></label>
                <input
                  @change="handelUploadFileImage($event)"
                  class="file-input"
                  type="file"
                  id="job-photo"
                />
              </div>
            </div>

            <div class="form-group cv">
              <label class="form-label d-block text-capitalize"
                >choose your cv</label
              >
              <div class="user-cv">
                <label class="upload-cv" for="upload-cv"
                  ><fa class="icon" icon="file-upload" />
                  <span class="upolad text-capitalize">upload</span></label
                >
                <input
                  @change="handelUploadFile($event)"
                  class="cvfile-input"
                  type="file"
                  id="upload-cv"
                />
              </div>
            </div>
            <button class="send-applay-data text-capitalize d-block">
              send
            </button>
          </form>
        </div>
        <div class="step-two" v-if="step == 2">
          <span @click="showHideProtofolioModal" class="close-form-modal"
            ><fa class="icon" icon="times"
          /></span>
          <Education></Education>
          <button
            class="send-applay-data text-capitalize d-block"
            @click="changeStep"
          >
            next
          </button>
        </div>
        <div class="step-two" v-if="step == 3">
          <span @click="showHideProtofolioModal" class="close-form-modal"
            ><fa class="icon" icon="times"
          /></span>
          <Experince></Experince>
          <button
            class="send-applay-data text-capitalize d-block"
            @click="showHideProtofolioModal"
          >
            finish
          </button>
        </div>
      </div>
    </transition>
    <!-- End All Portofolio Details -->
  </div>
  <!-- End Create Profile -->
</template>

<script>
import Education from "@/components/Profile/Education.vue";
import Experince from "@/components/Profile/Experince.vue";
import CreateCompany from "@/components/Profile/CreateCompany.vue";
import { mapState } from "vuex";
import VueTagsInput from "@johmun/vue-tags-input";

export default {
  name: "Portfolio",
  data() {
    return {
      showCompany: false,
      knowUserType: null,
      isPortofolioCreated: "",
      step: 1,
      loading: false,
      imagePreview: null,
      reader: new FileReader(),
      test: {},
      portfolioId: null,
      userId: null,
      showProtofolioModal: false,
      tag: "",
      tags: [],
      portofolio: {
        bio: null,
        address: null,
        qualification: null,
        achievement: null,
        portfolio_link: null,
        skills: [],
        cv_file: null,
        logo: null,
      },
    };
  },
  mounted() {
    // user details come from store
    let userDetailsInStore = this.$store.state.userDetails;
    this.knowUserType = userDetailsInStore.type;
    this.isPortofolioCreated = userDetailsInStore.userportfolio;
    console.log(this.isPortofolioCreated);
    if (this.knowUserType == "customer") {
      if (userDetailsInStore.userportfolio != null) {
        this.userId = userDetailsInStore.userportfolio.id;
      }
    }
    // isPortofolioCreated
    this.test = { ...this.something };
  },
  created() {
    this.reader.onload = () => {
      this.imagePreview = this.reader.result;
    };
  },
  computed: {
    ...mapState({
      something: (state) => state.ProfileModule.getSinglePortfolioDetails,
    }),
    portofolioNotNull() {
      return this.isPortofolioCreated;
    },
  },
  methods: {
    showCompanyoModal() {
      this.showCompany = !this.showCompany;
    },
    changeStep() {
      this.step = 3;
    },
    createPortofolio() {
      this.loading = true;
      let protfolioData = new FormData();
      protfolioData.append("bio", this.portofolio.bio);
      protfolioData.append("address", this.portofolio.address);
      protfolioData.append("qualification", this.portofolio.qualification);
      protfolioData.append("achievement", this.portofolio.achievement);
      protfolioData.append("portfolio_link", this.portofolio.portfolio_link);
      protfolioData.append("cv_file", this.portofolio.cv_file);
      protfolioData.append("skills", this.tags);
      if (this.portofolio.logo) {
        protfolioData.append("logo", this.portofolio.logo);
      }
      this.$store
        .dispatch("ProfileModule/setUserPortfolioData", protfolioData)
        .then(() => {
          this.step = 2;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getPotfolioDataToEditIt() {
      this.showProtofolioModal = true;
      this.$store
        .dispatch("ProfileModule/getUserPortfolioDataToEdit", this.userId)
        .then(() => {
          let potofolioData =
            this.$store.state.ProfileModule.getSinglePortfolioDetails;
          this.portofolio.bio = potofolioData.bio;
          this.portofolio.address = potofolioData.address;
          this.portofolio.qualification = potofolioData.qualification;
          this.portofolio.achievement = potofolioData.achievement;
          this.portofolio.portfolio_link = potofolioData.portfolio_link;
          this.portofolio.cv_file = potofolioData.cv_file;
          this.portofolio.logo = this.imagePreview;
          this.imagePreview = potofolioData.logo;

          let userSkills = [];
          potofolioData.skills.map((item) => {
            userSkills.push({ text: item, tiClasses: ["ti-valid"] });
            console.log(userSkills);
            console.log(item);
          });
          this.tags = userSkills;
        });
    },

    showEidt() {
      this.showProtofolioModal = true;
      let someOne = JSON.parse(localStorage.getItem("user-data"));
      console.log(someOne);
      this.portofolio.bio = someOne.userportfolio.bio;
      this.portofolio.qualification = someOne.userportfolio.qualification;
      this.portofolio.achievement = someOne.userportfolio.achievement;
      this.portofolio.portfolio_link = someOne.userportfolio.portfolio_link;
      let xxx = [];
      someOne.userportfolio.skills.map((item) => {
        xxx.push({ text: item, tiClasses: ["ti-valid"] });
        console.log(item);
      });
      console.log(xxx);
      // someOne.userportfolio.skills.forEach((element) => {
      //   // console.log(element);
      //   let ttt = { text: element, tiClasses: ["ti-valid"] };
      //   console.log(ttt);
      // });
      // xxx.push(ttt);
      this.tags = xxx;

      // this.$store
      //   // .dispatch("ProfileModule/getEdit", this.portfolioId)
      //   .dispatch("ProfileModule/getEdit", this.userId)
      //   .then((item) => {
      //     console.log(item);
      //     this.portofolio.bio = item.userportfolio.bio;
      //   });
    },
    showHideProtofolioModal() {
      this.showProtofolioModal = !this.showProtofolioModal;
      window.location.reload();
    },
    handelUploadFileImage(event) {
      this.portofolio.logo = event.target.files[0];
      this.reader.readAsDataURL(this.portofolio.logo);
    },
    handelUploadFile(event) {
      this.portofolio.cv_file = event.target.files[0];
    },
  },

  components: { VueTagsInput, Education, Experince, CreateCompany },
};
</script>

<style lang="scss" scoped>
.create-portofolio {
  padding: 20px 0;
  background-color: rgba($textcolor, 0.1);
  border-radius: 10px;
  .titl {
    color: $secondcolor;
  }
  .texts {
    color: $textcolor;
    line-height: 2;
    font-size: 1rem;
    margin: 30px auto;
    width: 80%;
  }
  .icons-list {
    .icons {
      box-shadow: $box-shadow;
      width: 35px;
      height: 35px;
      text-align: center;
      border-radius: 50%;
      line-height: 35px;
      color: $textcolor;
      transition: 0.5s;
      background-color: $white;
      &.add {
        &:hover {
          color: $white;
          background-color: $maincolor;
          animation: flashingAdd 1500ms infinite;
        }
      }
      &.edit {
        &:hover {
          color: $white;
          background-color: $secondcolor;
          animation: flashing 1500ms infinite;
        }
      }
      &.delete {
        &:hover {
          color: $white;
          background-color: #f00;
          animation: flashingDelete 1500ms infinite;
        }
      }
      cursor: pointer;
      .icon {
        font-size: 14px;
      }
    }
  }
  .create-btn {
    background-color: $maincolor;
    color: $white;
    padding: 8px;
    width: 200px;
    border: none;
    margin: 30px auto 0;
    border-radius: 4px;
    display: block;
  }
  .prtofolio-details {
    position: fixed;
    z-index: 7777;
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($black, 0.5);
    padding: 50px;
    .main-form-container,
    .step-two {
      padding: 50px;
      overflow-y: auto;
      background-color: $white;
      height: 85vh;
      width: 100%;
      max-width: 800px;
      margin: auto;
      position: relative;
      .preview-container {
        padding: 30px;
        border-radius: 10px;
        background-color: #eee;
        transition: 0.5s;
        transform: rotateY(0);
        &.swip-enter,
        &.swip-leave-to {
          transform: rotateY(90deg);
        }
        &.swip-enter-active,
        &.swip-leave-active {
          transition: transform 0.8s ease-in-out;
        }
        .preview {
          width: 400px;
          border-radius: 10px;
          height: 280px;
        }
      }
      .form-group {
        margin-bottom: 30px;
        color: $textcolor;
        .form-label {
          margin-bottom: 15px;
        }
        .form-input {
          width: 100%;
          border: 1px solid $bordercolor;
          outline: none;
          padding: 7px;
          color: $textcolor;
          transition: 0.5s;
          &:focus {
            border-color: $secondcolor;
            box-shadow: 0 1px 12px rgba($secondcolor, 0.3);
          }
          &.text-area {
            height: 200px;
            resize: none;
          }
        }
        // for image
        &.job-imag {
          margin-top: 15px;
          .choose-photo {
            .file-input {
              display: none;
            }
            .upload-photo {
              width: 40px;
              height: 40px;
              background-color: #eee;
              color: $textcolor;
              box-shadow: $box-shadow;
              transition: 0.5s;
              &:hover {
                background-color: $secondcolor;
                color: $white;
              }
              .icon {
                cursor: pointer;
                font-size: 14px;
              }
            }
          }
        }

        &.cv {
          margin-top: 20px;
          display: flex;
          gap: 20px;
          align-items: center;
          .form-label {
            margin-bottom: 0;
          }
          .user-cv {
            .upload-cv {
              box-shadow: 0 1px 12px rgba($black, 0.2);
              padding: 6px 20px;
              border-radius: 8px;
              color: $textcolor;
              cursor: pointer;
              transition: 0.5s;
              &:hover {
                background-color: $secondcolor;
                color: $white;
                box-shadow: 0 1px 12px rgba($secondcolor, 0.7);
                .icon {
                  animation: upDown 0.8s linear infinite;
                }
              }
              .upolad {
                margin: 0 8px;
              }
            }
            .cvfile-input {
              display: none;
            }
          }
        }
      }
    }
  }
  .send-applay-data {
    @extend %form-submit-button;
  }
  // .complete {
  //   @extend %form-submit-button;
  //   width: 50%;
  //   margin: 15px auto;
  // }
}
</style>
