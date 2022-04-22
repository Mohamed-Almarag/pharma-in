<template>
  <transition name="fade">
    <div class="apply-job" v-if="showModal">
      <Loading :loading="loading"></Loading>
      <div class="container">
        <div class="form-container">
          <!-- Start Form Details  -->
          <form class="main-form" action="" @submit.prevent="applayForJob">
            <span @click="hideApplayModal" class="close"
              ><fa class="icon" icon="times"
            /></span>
            <div class="part-one">
              <div class="form-group names">
                <label class="form-label d-block text-capitalize" for=""
                  >your name</label
                >
                <input
                  class="form-input d-block"
                  type="text"
                  v-model="userData.name"
                />
                <div class="validation-errors text-capitalize">
                  <span
                    class="error text-danger"
                    v-if="!$v.userData.name.required && $v.userData.name.$dirty"
                    >Please Write your name</span
                  >
                </div>
              </div>
              <div class="form-group names">
                <label class="form-label d-block text-capitalize" for=""
                  >your email</label
                >
                <input
                  class="form-input d-block"
                  type="email"
                  v-model="userData.email"
                />
                <div class="validation-errors text-capitalize">
                  <span
                    class="error text-danger"
                    v-if="
                      !$v.userData.email.required && $v.userData.email.$dirty
                    "
                    >Please Write your email</span
                  >
                  <span
                    class="error text-danger"
                    v-if="!$v.userData.email.email"
                    >Please Write a correct email</span
                  >
                </div>
              </div>
            </div>

            <div class="part-one">
              <div class="form-group names">
                <label class="form-label d-block text-capitalize" for=""
                  >your phone</label
                >
                <input
                  class="form-input d-block"
                  type="text"
                  v-model="userData.phone"
                />
                <div class="validation-errors text-capitalize">
                  <span
                    class="error text-danger"
                    v-if="
                      !$v.userData.phone.required && $v.userData.name.$dirty
                    "
                    >Please Write your phone</span
                  >
                </div>
              </div>

              <div class="form-group names">
                <label class="form-label d-block text-capitalize" for=""
                  >your address</label
                >
                <input
                  class="form-input d-block"
                  value="address"
                  type="text"
                  v-model="userData.address"
                />
                <div class="validation-errors text-capitalize">
                  <span
                    class="error text-danger"
                    v-if="
                      !$v.userData.address.required &&
                      $v.userData.address.$dirty
                    "
                    >Please Write your address</span
                  >
                </div>
              </div>
            </div>

            <div class="part-one">
              <div class="form-group">
                <label class="form-label d-block text-capitalize" for=""
                  >your Work Experience</label
                >
                <textarea
                  class="form-input text-area d-block"
                  v-model="userData.workExperince"
                ></textarea>
                <div class="validation-errors text-capitalize">
                  <span
                    class="error text-danger"
                    v-if="
                      !$v.userData.workExperince.required &&
                      $v.userData.workExperince.$dirty
                    "
                    >Please Write your workExperince</span
                  >
                </div>
              </div>
            </div>

            <div class="part-one">
              <div class="form-group">
                <label class="form-label d-block text-capitalize" for=""
                  >your bio</label
                >
                <textarea
                  class="form-input text-area d-block"
                  v-model="userData.bio"
                ></textarea>
                <div class="validation-errors text-capitalize">
                  <span
                    class="error text-danger"
                    v-if="!$v.userData.bio.required && $v.userData.bio.$dirty"
                    >Please Write your bio</span
                  >
                </div>
              </div>
            </div>

            <div class="part-one">
              <div class="form-group">
                <label class="form-label d-block text-capitalize" for=""
                  >your protfolio Link</label
                >
                <input
                  class="form-input d-block"
                  type="text"
                  v-model="userData.profileLink"
                />
              </div>
            </div>

            <div class="part-one">
              <div class="form-group profile">
                <label class="form-label d-block text-capitalize" for=""
                  >choose your photo</label
                >
                <div class="profile-photo rounded-circle">
                  <img
                    draggable="false"
                    class="img w-100 h-100 rounded-circle"
                    src="../../assets/images/courses/05.png"
                    alt=""
                  />
                  <div class="change-photos">
                    <label class="upload-photo" for="upload-photo"
                      ><fa class="icon" icon="camera"
                    /></label>
                    <input
                      @change="handelUploadFileImage($event)"
                      class="file-input"
                      type="file"
                      id="upload-photo"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="part-one">
              <div class="form-group cv">
                <label class="form-label d-block text-capitalize" for=""
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
            </div>

            <button class="send-applay-data d-block">send</button>
          </form>
          <!-- End Form Details  -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "ApplyJob",
  data() {
    return {
      loading: false,
      jobId: this.$route.params.id,
      userId: "",
      userData: {
        name: "",
        email: "",
        phone: "",
        address: "",
        workExperince: "",
        portfolioLink: "",
        photo: "",
        cv: "",
        bio: "",
      },
    };
  },
  computed: {
    ...mapState({
      showModal: (state) => state.JobsModule.showModal,
    }),
  },
  mounted() {
    let getUserId = JSON.parse(localStorage.getItem("user-data"));
    this.userId = getUserId.id;
  },
  methods: {
    applayForJob() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("error");
      } else {
        // (logo,user_id,job_id,bio,address,portfolio_link nullable,cv_file)

        this.loading = true;
        let jobDetails = new FormData();
        jobDetails.append("user_id", this.userId);
        jobDetails.append("job_id", this.jobId);
        jobDetails.append("name", this.userData.name);
        jobDetails.append("email", this.userData.email);
        jobDetails.append("phone", this.userData.phone);
        jobDetails.append("address", this.userData.address);
        jobDetails.append("workExperince", this.userData.workExperince);
        jobDetails.append("bio", this.userData.bio);
        jobDetails.append("portfolio_link", this.userData.portfolioLink);
        jobDetails.append("logo", this.userData.photo);
        jobDetails.append("cv_file", this.userData.cv);

        this.$store
          .dispatch("JobsModule/applyForJob", jobDetails)
          .then(() => {
            this.$store.state.JobsModule.showModal = false;
            console.log("applay applyForJob");
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    handelUploadFileImage(event) {
      this.userData.photo = event.target.files[0];
    },
    handelUploadFile(event) {
      this.userData.cv = event.target.files[0];
    },
    hideApplayModal() {
      this.$store.state.JobsModule.showModal = false;
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
      address: {
        required,
      },
      workExperince: {
        required,
      },
      bio: {
        required,
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.apply-job {
  position: fixed;
  z-index: 7777;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($black, 0.5);
  padding: 50px;
  &.fade-enter,
  &.fade-leave-to {
    opacity: 0;
  }
  &.fade-enter-active,
  &.fade-leave-active {
    transition: opacity 0.5s ease-in-out;
  }

  .form-container {
    .main-form {
      padding: 50px;
      overflow-y: auto;
      background-color: $white;
      height: 85vh;
      width: 100%;
      max-width: 800px;
      margin: auto;
      position: relative;
      .close {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 25px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        cursor: pointer;
        box-shadow: 0 1px 12px rgba($black, 0.3);
        color: $textcolor;
        border: 1px solid $bordercolor;
        border-radius: 4px;
        transition: 0.5s;
        &:hover {
          background-color: #f00;
          color: $white;
          border-color: #f00;
        }
      }

      .part-one {
        display: flex;
        gap: 20px;
        .form-group {
          margin-bottom: 20px;
          width: 100%;
          &.names {
            width: 50%;
          }
          .form-label {
            color: $textcolor;
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
          &.profile {
            margin-top: 20px;
            .profile-photo {
              width: 100px;
              height: 100px;
              border-radius: 50%;
              position: relative;
              overflow: hidden;
              &:hover {
                .change-photos {
                  clip-path: circle(100%);
                }
                .img {
                  transform: scale(1.2);
                }
              }
              .img {
                transition: 0.5s;
              }
              .change-photos {
                background-color: rgba($black, 0.3);
                position: absolute;
                z-index: 7;
                left: 50%;
                top: 50%;
                width: 100%;
                height: 100%;
                transform: translate(-50%, -50%);
                transition: 0.5s;
                clip-path: circle(0);
                display: flex;
                align-items: center;
                justify-content: center;
                .file-input {
                  display: none;
                }
                .upload-photo {
                  background-color: #ddd;
                  width: 25px;
                  height: 25px;
                  border-radius: 50%;
                  line-height: 25px;
                  text-align: center;
                  animation: flashing 1500ms infinite;
                  .icon {
                    cursor: pointer;
                    color: $white;
                    font-size: 14px;
                  }
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
      .send-applay-data {
        @extend %form-submit-button;
        margin: 30px auto 0;
      }
    }
    .validation-errors {
      padding: 15px 0;
    }
  }
}
@keyframes upDown {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
