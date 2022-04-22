<template>
  <div class="company-jobs">
    <h3>all jobs</h3>
    <span
      @click="showFormModal"
      class="edit plus d-block text-center rounded-circle shadow-lg"
      ><fa class="icons" icon="plus"
    /></span>
    <Loading :loading="loading"></Loading>
    <div class="for-company">
      <div class="row">
        <div
          class="all-jobs col-md-4 col-sm-6"
          v-for="job in allCompanyJobs"
          :key="job.id"
        >
          <div class="every-job">
            <div class="cover-photo shadow">
              <div class="icons-container">
                <span @click="getEachJobToEdit(job.id)" class="edit-job d-block"
                  ><fa class="icon" icon="pen"
                /></span>
                <span @click="deleteJob(job.id)" class="edit-job delete d-block"
                  ><fa class="icon" icon="trash"
                /></span>
              </div>
              <img
                :src="job.cover_photo"
                :alt="job.title"
                class="img w-100 h-100"
              />
            </div>
            <div class="content">
              <h6 class="title">
                {{ job.title | justSpecificWordsHeading }}
              </h6>
              <p class="description">
                {{ job.description | justSpecificWords }}
              </p>
            </div>
            <div
              class="details d-flex justify-content-between align-items-center"
            >
              <span
                class="
                  d-block
                  status-job
                  shadow-sm
                  rounded-pill
                  text-capitalize
                "
                >{{ job.status }}</span
              >
              <router-link
                class="
                  text-capitalize
                  shadow-sm
                  d-block
                  go-job-details
                  text-center
                "
                :to="`/all-jobs/${job.id}`"
                ><fa class="icon" icon="eye"
              /></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- start Comapny Form For Add A New Jobs -->
    <transition name="grow">
      <div class="form-container" v-if="showJobForm">
        <form action="" class="main-form text-capitalize">
          <span @click="showFormModal" class="close"
            ><fa class="icon" icon="times"
          /></span>
          <div class="form-group">
            <label class="d-block form-label">title</label>
            <input
              type="text"
              class="form-input d-block w-100"
              v-model="jobData.title"
            />
            <div class="validations-errors">
              <span
                class="text-danger"
                v-if="!$v.jobData.title.required && $v.jobData.title.$dirty"
                >ttile is required</span
              >
            </div>
          </div>

          <div class="form-group">
            <label class="d-block form-label">description</label>
            <textarea
              class="form-input text-area d-block"
              v-model="jobData.description"
            ></textarea>

            <div class="validations-errors">
              <span
                class="text-danger"
                v-if="
                  !$v.jobData.description.required &&
                  $v.jobData.description.$dirty
                "
                >description is required</span
              >
            </div>
          </div>

          <div class="form-group">
            <label class="d-block form-label">address</label>
            <input
              type="text"
              class="form-input d-block w-100"
              v-model="jobData.address"
            />
            <div class="validations-errors">
              <span
                class="text-danger"
                v-if="!$v.jobData.address.required && $v.jobData.address.$dirty"
                >address is required</span
              >
            </div>
          </div>

          <div class="form-group">
            <label class="d-block form-label">salary</label>
            <input
              type="text"
              class="form-input d-block w-100"
              v-model="jobData.salary"
            />
            <div class="validations-errors">
              <span
                class="text-danger"
                v-if="!$v.jobData.salary.required && $v.jobData.salary.$dirty"
                >salary is required</span
              >
            </div>
          </div>

          <div class="form-group">
            <label class="d-block form-label">position number</label>
            <input
              type="text"
              class="form-input d-block w-100"
              v-model="jobData.position_no"
            />
            <div class="validations-errors">
              <span
                class="text-danger"
                v-if="
                  !$v.jobData.position_no.required &&
                  $v.jobData.position_no.$dirty
                "
                >position number is required</span
              >
            </div>
          </div>

          <div class="form-group">
            <label for="" class="form-label d-block">tags</label>
            <vue-tags-input
              v-model="tag"
              :tags="tags"
              @tags-changed="(newTags) => (tags = newTags)"
            />
          </div>

          <!-- status -->
          <div class="form-group job-type">
            <label class="d-block form-label">job status</label>

            <div class="checkbox-container">
              <div class="user-type text-capitalize">
                <input
                  type="radio"
                  name="usertype"
                  class="form-input-radio"
                  value="pending"
                  v-model="jobData.status"
                />
                <label class="user-label" for="pending">Pending</label>
              </div>
              <div class="user-type text-capitalize">
                <input
                  type="radio"
                  name="usertype"
                  class="form-input-radio"
                  value="published"
                  v-model="jobData.status"
                />
                <label class="user-label" for="published">published</label>
              </div>
              <div class="user-type text-capitalize">
                <input
                  type="radio"
                  name="usertype"
                  class="form-input-radio"
                  value="closed"
                  v-model="jobData.status"
                />
                <label class="user-label" for="closed">closed</label>
              </div>
              <div class="user-type text-capitalize">
                <input
                  type="radio"
                  name="usertype"
                  class="form-input-radio"
                  value="rejected"
                  v-model="jobData.status"
                />
                <label class="user-label" for="rejected">rejected</label>
              </div>
            </div>
          </div>
          <!-- status   -->

          <!-- types and cheeck box -->
          <div class="form-group job-type">
            <label class="d-block form-label">job type</label>

            <div class="checkbox-container">
              <label class="checkbox" for="full_time">
                <input
                  class="checkbox__input"
                  id="full_time"
                  type="checkbox"
                  name="myCheckboxName"
                  value="full_time"
                  v-model="jobData.types"
                />
                <div class="checkbox__box"></div>
                full time
              </label>

              <label class="checkbox" for="part_time">
                <input
                  class="checkbox__input"
                  id="part_time"
                  type="checkbox"
                  name="myCheckboxName"
                  value="part_time"
                  v-model="jobData.types"
                />
                <div class="checkbox__box"></div>
                part time
              </label>

              <label class="checkbox" for="remotely">
                <input
                  class="checkbox__input"
                  id="remotely"
                  type="checkbox"
                  name="myCheckboxName"
                  value="remotely"
                  v-model="jobData.types"
                />
                <div class="checkbox__box"></div>
                remotely
              </label>

              <label class="checkbox" for="per_project">
                <input
                  class="checkbox__input"
                  id="per_project"
                  type="checkbox"
                  name="myCheckboxName"
                  value="per_project"
                  v-model="jobData.types"
                />
                <div class="checkbox__box"></div>
                per project
              </label>
              <!-- <button @click="getarrayItems">sho</button> -->
            </div>
          </div>
          <!-- types and cheeck box -->

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

          <button
            v-if="showAddButton"
            @click="createJob"
            class="job-btn d-block"
            type="button"
          >
            create
          </button>
          <button
            v-if="showEditButton"
            @click="editJob"
            class="job-btn d-block"
            type="button"
          >
            save
          </button>
        </form>
      </div>
    </transition>
    <!-- End Comapny Form For Add A New Jobs -->
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapState } from "vuex";
import VueTagsInput from "@johmun/vue-tags-input";
export default {
  name: "CompanyJobs",
  data() {
    return {
      jobIdToEdit: null,
      loading: false,
      showAddButton: false,
      showEditButton: false,
      showJobForm: false,
      FormInEditMode: false,
      imagePreview: null,
      reader: new FileReader(),
      tag: "",
      tags: [],

      jobData: {
        title: null,
        description: null,
        cover_photo: null,
        position_no: null,
        salary: null,
        address: null,
        status: null,
        types: [],
        tags: [],
        _method: "PUT",
      },
    };
  },
  computed: {
    ...mapState({
      allCompanyJobs: (state) => state.ProfileModule.companyJobsLists,
    }),
  },
  created() {
    this.reader.onload = () => {
      this.imagePreview = this.reader.result;
    };
  },
  mounted() {
    this.companyJobs();
  },
  methods: {
    companyJobs() {
      this.loading = true;
      this.$store.dispatch("ProfileModule/getCompanyJobsLists").finally(() => {
        this.loading = false;
      });
    },
    createJob(e) {
      e.preventDefault();
      this.showAddButton = true;
      this.showEditButton = false;
      this.$v.jobData.$touch();
      if (this.$v.jobData.$invalid) {
        console.log("error");
      } else {
        this.loading = true;
        let jobForm = new FormData();

        let allJobTyps = this.jobData.types;
        allJobTyps.forEach(function (item, index) {
          jobForm.append(`type[${index}]`, `${item}`);
        });

        jobForm.append("title", this.jobData.title);
        jobForm.append("description", this.jobData.description);
        jobForm.append("cover_photo", this.jobData.cover_photo);
        jobForm.append("position_no", this.jobData.position_no);
        jobForm.append("salary", this.jobData.salary);
        jobForm.append("address", this.jobData.address);
        jobForm.append("status", this.jobData.status);
        jobForm.append("tags", this.tags);
        this.$store
          .dispatch("ProfileModule/setAnewCompanyJob", jobForm)
          .then(() => {
            this.showJobForm = false;
            this.showAddButton = false;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },

    getEachJobToEdit(jobId) {
      // this.FormInEditMode = true;
      this.jobIdToEdit = jobId;
      this.showJobForm = true;
      this.showAddButton = false;
      this.showEditButton = true;
      this.$store
        .dispatch("ProfileModule/getJobToEdit", jobId)
        .then((response) => {
          this.jobData.title = response.title;
          this.jobData.description = response.description;
          this.jobData.position_no = response.position_no;
          this.jobData.salary = response.salary;
          this.jobData.address = response.address;
          this.jobData.status = response.status;
          this.jobData.types = response.types;

          let typeContainer = [];
          let allJobTyps = response.type;
          allJobTyps.forEach(function (item) {
            // let items = (`type[${index}]`, `${item}`);
            // typeContainer.push(items);
            // console.log(items);
            typeContainer.push(`${item}`);
          });

          this.jobData.types = typeContainer;
          console.log(typeContainer);
        });
    },

    editJob(e) {
      e.preventDefault();
      this.$v.jobData.$touch();
      if (this.$v.jobData.$invalid) {
        console.log("error");
      } else {
        this.loading = true;
        let formData = new FormData();

        let allJobTyps = this.jobData.types;
        allJobTyps.forEach(function (item, index) {
          formData.append(`type[${index}]`, `${item}`);
        });
        formData.append("title", this.jobData.title);
        formData.append("address", this.jobData.address);
        formData.append("description", this.jobData.description);
        formData.append("_method", this.jobData._method);
        formData.append("cover_photo", this.jobData.cover_photo);
        formData.append("position_no", this.jobData.position_no);
        formData.append("salary", this.jobData.salary);
        formData.append("status", this.jobData.status);
        formData.append("tags", this.tags);

        let payload = { id: this.jobIdToEdit, data: formData };
        this.$store
          .dispatch("ProfileModule/editJob", payload)
          .then(() => {
            this.companyJobs();
          })
          .finally(() => {
            window.location.reload();
            this.loading = false;
            this.resetForm();
          });
      }
    },

    deleteJob(id) {
      this.loading = true;
      this.$store.dispatch("ProfileModule/deleteJob", id).then(() => {
        this.loading = false;
      });
    },
    showFormModal() {
      this.showJobForm = !this.showJobForm;
      this.showAddButton = !this.showAddButton;
      this.resetForm();
    },
    resetForm() {
      this.jobData.title = null;
      this.jobData.description = null;
      this.jobData.cover_photo = null;
      this.jobData.position_no = null;
      this.jobData.salary = null;
      this.jobData.address = null;
      this.jobData.status = null;
      this.jobData.type = [];
      this.jobData.tags = [];
    },

    handelUploadFileImage(event) {
      this.jobData.cover_photo = event.target.files[0];
      this.reader.readAsDataURL(this.jobData.cover_photo);
    },
  },
  components: { VueTagsInput },
  validations: {
    jobData: {
      title: {
        required,
      },
      description: {
        required,
      },
      address: {
        required,
      },
      salary: {
        required,
      },
      position_no: {
        required,
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.company-jobs {
  position: relative;
  padding: 50px 0 0;
  .edit {
    width: 35px;
    line-height: 35px;
    height: 35px;
    transition: 0.5s;
    color: $textcolor;
    position: absolute;
    cursor: pointer;
    background-color: #d1d1d18c;
    top: 20px;
    right: 20px;
    &.plus {
      &:hover {
        background-color: $maincolor;
        color: $white;
      }
    }
    // .icon {
    //   font-size: 14px;
    // }
  }
  .for-company {
    .all-jobs {
      .every-job {
        border-radius: 10px;
        padding: 10px;
        margin-bottom: 40px;
        background-color: $bgcard;
        &:hover {
          .img {
            transform: scale(1.2);
          }
          .icons-container {
            clip-path: circle(100%) !important;
          }
        }
        .cover-photo {
          border-radius: 10px;
          height: 230px;
          overflow: hidden;
          position: relative;
          .img {
            transition: 0.5s;
          }
          .icons-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 44;
            display: flex;
            justify-content: space-around;
            align-items: center;
            background-color: rgba($black, 0.3);
            clip-path: circle(0);
            transition: 0.5s;
            .edit-job {
              color: $textcolor;
              width: 35px;
              line-height: 35px;
              height: 35px;
              transition: 0.5s;
              cursor: pointer;
              text-align: center;
              border-radius: 50%;
              background-color: $secondcolor;
              color: $white;
              &:hover {
                color: $white;
                background-color: $secondcolor;
                animation: flashing 1500ms infinite;
              }
              &.delete {
                background-color: $cancel;
                &:hover {
                  color: $white;
                  background-color: $cancel;
                  animation: flashingDelete 1500ms infinite;
                }
              }
            }
          }
        }
        .content {
          padding: 25px 0 0;
          .title {
            color: $textcolor2;
            margin-bottom: 15px;
            font-weight: bold;
          }
          .description {
            margin-bottom: 20px;
            color: $textcolor;
          }
        }
        .details {
          .status-job {
            background-color: $secondcolor;
            width: fit-content;
            padding: 7px 20px;
            color: $white;
          }
          .go-job-details {
            width: 35px;
            line-height: 35px;
            height: 35px;
            transition: 0.5s;
            color: $textcolor;
            color: $maincolor;
            border-radius: 50%;
            box-shadow: $box-shadow;
            box-shadow: 0 1px 12px rgba($black, 0.4);
            &:hover {
              background-color: $maincolor;
              color: $white;
            }
            .icon {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
  .form-container {
    position: fixed;
    inset: 0;
    background-color: rgba($black, 0.4);
    width: 100%;
    height: 100%;
    z-index: 5555;
    padding: 50px;
    transform: scale(1);

    &.grow-enter,
    &.grow-leave-to {
      transform: scale(0);
    }
    &.grow-enter-active,
    &.grow-leave-active {
      transition: transform 0.8s ease-in-out;
    }

    .main-form {
      position: relative;
      padding: 30px;
      width: 900px;
      overflow-y: auto;
      background-color: $white;
      height: 85vh;
      width: 100%;
      max-width: 800px;
      margin: auto;
      .close {
        @extend %close;
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
        .validations-errors {
          margin: 20px 0 0;
        }
        &.job-type {
          .user-type {
            .form-inputs {
              color: red;
            }
            .user-labels {
              color: red !important;
            }
          }
        }
      }
      .job-btn {
        @extend %form-submit-button;
        margin: 40px auto 0;
      }
    }
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
  }
}
// .edit-mod {
//   &.form-container {
//     display: flex;
//   }
//   .main-form {
//     overflow-y: unset !important;
//     height: 30vh !important;
//     .form-group .form-label {
//     }
//   }
// }
.checkbox-container {
  display: flex;
  gap: 30px;
  align-items: center;
}
.checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}
.checkbox__input {
  display: none;
}
.checkbox__box {
  width: 1.25em;
  height: 1.25em;
  border: 2px solid $bordercolor;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  flex-shrink: 0;
  transition: background 0.15s, border-color 0.15s;
}
.checkbox__box::after {
  content: "\2714";
  color: #ffffff;
  transform: scale(0);
  transition: tranform 0.15s;
}
.checkbox__input:checked + .checkbox__box {
  background: $secondcolor;
  border-color: $secondcolor;
}
.checkbox__input:checked + .checkbox__box::after {
  transform: scale(1);
}
.user-type {
  .form-input-radio {
    appearance: none;
    margin: 0;
    background-color: $white;
    cursor: pointer;
    width: 0.9em;
    height: 0.9em;
    border: 2px solid $bordercolor;
    border-radius: 50%;
    transition: 0.5s;
    &:hover,
    &:checked {
      background-color: $secondcolor;
      box-shadow: 0 3px 9px rgba($black, 0.3);
      border-color: $secondcolor;
    }
  }
  .user-label {
    margin: 0 7px;
  }
}
</style>
