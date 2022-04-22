<template>
  <!-- Start Education -->
  <div class="contact">
    <Loading :loading="loading"></Loading>
    <div class="educations" v-if="experinceLists">
      <h5 class="title">your Experince</h5>
      <p class="education-text" v-if="experinceLists == null">
        add your education here
      </p>

      <ul
        class="educations-lists list-unstyled text-capitalize"
        v-if="experinceLists !== null"
      >
        <li class="items" v-for="item in experinceLists" :key="item.id">
          <div class="where-educate d-flex">
            <fa class="d-block icon" icon="graduation-cap" />
            <h6 class="name">{{ item.title }}</h6>
          </div>

          <div class="dates-container">
            <div class="join-date join d-flex">
              <span class="d-block">join date : </span>
              <span class="d-block dates">{{ item.join_date }}</span>
            </div>
            <div class="join-date d-flex">
              <span class="d-block">leave date : </span>
              <span class="d-block dates">{{ item.leave_date }}</span>
            </div>
          </div>

          <div class="icons-container">
            <span
              @click="getEducationItemDetailsForEdit(item.id)"
              class="edit d-block"
              ><fa class="icon" icon="pen"
            /></span>
            <span @click="deleteEducation(item.id)" class="edit delete d-block"
              ><fa class="icon" icon="trash"
            /></span>
          </div>
        </li>
      </ul>

      <span class="edit plus" @click="showFormModal"
        ><fa class="icon" icon="plus"
      /></span>

      <transition name="fade">
        <div
          class="profile-education-from text-capitalize"
          v-if="showEduactionForm"
        >
          <form class="educate-form">
            <span @click="showFormModal" class="close"
              ><fa class="icon" icon="times"
            /></span>
            <div class="form-group">
              <label for="" class="form-label d-block">name</label>
              <input
                class="form-input d-block"
                type="text"
                v-model="educationForm.title"
              />
              <div class="validation-error">
                <span
                  v-if="
                    !$v.educationForm.title.required &&
                    $v.educationForm.title.$dirty
                  "
                  class="text-danger"
                  >title is required!</span
                >
              </div>
            </div>
            <div class="form-group">
              <label for="" class="form-label d-block">join date</label>
              <input
                class="form-input d-block date"
                type="date"
                v-model="educationForm.join_date"
              />
              <div class="validation-error">
                <span
                  v-if="
                    !$v.educationForm.join_date.required &&
                    $v.educationForm.join_date.$dirty
                  "
                  class="text-danger"
                  >join date is required!</span
                >
              </div>
            </div>
            <div class="form-group">
              <label for="" class="form-label d-block">leave date</label>
              <input
                class="form-input d-block date"
                type="date"
                v-model="educationForm.leave_date"
              />
              <div class="validation-error">
                <span
                  v-if="
                    !$v.educationForm.leave_date.required &&
                    $v.educationForm.leave_date.$dirty
                  "
                  class="text-danger"
                  >leave date is required!</span
                >
              </div>
            </div>
            <button
              v-if="showAddButton"
              @click="createEXperince"
              class="edcation-btn d-block"
              type="button"
            >
              <span
                v-if="isLoading"
                :class="{ disabled: (isLoading = true) }"
                class="loading"
                >loading...</span
              >
              create
            </button>
            <button
              v-if="showEditButton"
              @click="editEducation"
              class="edcation-btn d-block"
            >
              save
            </button>
          </form>
        </div>
      </transition>
    </div>
  </div>
  <!-- Start Education -->
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapState } from "vuex";
// import { append_Object_Items_ToFormData } from "@/axios/helpers";
export default {
  name: "Experince",
  data() {
    return {
      loading: false,
      educationIdWhenEdit: null,
      isLoading: false,
      showAddButton: false,
      showEditButton: false,
      protfolioId: null,
      showEduactionForm: false,
      educationForm: {
        title: null,
        join_date: null,
        leave_date: null,
        profile_id: null,
        _method: "PUT",
      },
    };
  },
  mounted() {
    this.getUserExperince();
    this.protfolioId = this.$store.state.ProfileModule.getPortofolioId;
  },
  computed: {
    ...mapState({
      experinceLists: (state) => state.ProfileModule.userExperienceLists,
    }),
  },
  methods: {
    showFormModal() {
      this.showEduactionForm = !this.showEduactionForm;
      this.showAddButton = !this.showAddButton;
      this.resetForm();
    },
    resetForm() {
      this.educationForm.title = null;
      this.educationForm.join_date = null;
      this.educationForm.leave_date = null;
    },

    getEducationItemDetailsForEdit(itemId) {
      this.educationIdWhenEdit = itemId;
      console.log(`here item id ${itemId}`);
      console.log(
        `here this.educationIdWhenEdit id ${this.educationIdWhenEdit}`
      );
      this.showEduactionForm = true;
      this.showAddButton = false;
      this.showEditButton = true;
      this.$store
        .dispatch("ProfileModule/getSingleExperienceToEdit", itemId)
        .then((response) => {
          // console.log(response);
          this.educationForm.title = response.title;
          this.educationForm.join_date = response.join_date;
          this.educationForm.leave_date = response.leave_date;
        });
    },
    getUserExperince() {
      this.$store.dispatch("ProfileModule/getUserExperienceLists");
    },

    createEXperince(e) {
      e.preventDefault();
      this.showAddButton = true;
      this.$v.educationForm.$touch();
      if (this.$v.educationForm.$invalid) {
        console.log("error");
      } else {
        this.loading = true;
        let experinceData = new FormData();
        experinceData.append("title", this.educationForm.title);
        experinceData.append("join_date", this.educationForm.join_date);
        experinceData.append("leave_date", this.educationForm.leave_date);
        experinceData.append("profile_id", this.protfolioId);
        this.$store
          .dispatch("ProfileModule/setUserExperience", experinceData)
          .then(() => {
            this.loading = false;
            this.showEduactionForm = false;
            this.showAddButton = false;
          });
      }
    },

    editEducation(e) {
      e.preventDefault();
      this.$v.educationForm.$touch();
      if (this.$v.educationForm.$invalid) {
        console.log("error");
      } else {
        this.loading = true;
        let experinceData = new FormData();
        experinceData.append("title", this.educationForm.title);
        experinceData.append("join_date", this.educationForm.join_date);
        experinceData.append("leave_date", this.educationForm.leave_date);
        experinceData.append("_method", this.educationForm._method);
        experinceData.append("profile_id", this.protfolioId);
        let payload = { id: this.educationIdWhenEdit, data: experinceData };
        this.$store
          .dispatch("ProfileModule/editUserExperience", payload)
          .then(() => {
            this.getUserExperince();
          })
          .finally(() => {
            this.loading = false;
            this.showEduactionForm = false;
            this.resetForm();
          });
      }
    },

    deleteEducation(id) {
      this.loading = true;
      this.$store
        .dispatch("ProfileModule/deleteSingleExperience", id)
        .then(() => {
          this.loading = false;
        });
    },
  },
  validations: {
    educationForm: {
      title: {
        required,
      },
      join_date: {
        required,
      },
      leave_date: {
        required,
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.contact {
  background-color: rgba($textcolor, 0.3);
  margin-bottom: 20px;
  .educations {
    padding: 15px 15px 30px;
    position: relative;
    box-shadow: $box-shadow;
    // border-radius: 10px;
    margin-top: 30px;
    .title {
      color: $textcolor2;
    }
    .education-text {
      color: $textcolor;
      margin: 20px 0 0;
    }
  }

  .educations-lists {
    border-radius: 10px;
    .items {
      position: relative;
      // box-shadow: $box-shadow;
      border-radius: 7px;
      background-color: $bgcard;
      margin-top: 30px;
      padding: 15px;
      .where-educate {
        gap: 8px;
        .name {
          color: $textcolor2;
        }
        .icon {
          color: $secondcolor;
        }
      }
      .dates-container {
        color: $textcolor;
        .join-date {
          gap: 8px;
          &.join {
            margin: 10px 0;
          }
        }
      }
      .icons-container {
        position: absolute;
        right: 15px;
        top: 15px;

        .edit {
          box-shadow: $box-shadow;
          width: 30px;
          height: 30px;
          text-align: center;
          border-radius: 50%;
          line-height: 30px;
          color: $textcolor;
          transition: 0.5s;
          cursor: pointer;
          &:hover {
            color: $white;
            background-color: $secondcolor;
            animation: flashing 1500ms infinite;
          }
          &.delete {
            margin-top: 20px;
            &:hover {
              color: $white;
              background-color: #f00;
              animation: flashingDelete 1500ms infinite;
            }
          }
          .icon {
            font-size: 12px;
          }
        }
      }
    }
  }
}
.plus {
  position: absolute;
  top: 20px;
  right: 80px;
  box-shadow: $box-shadow;
  width: 35px;
  height: 35px;
  text-align: center;
  border-radius: 50%;
  line-height: 35px;
  color: $textcolor;
  transition: 0.5s;
  background-color: $white;

  cursor: pointer;
  &.plus {
    top: 20px;
    right: 20px;
  }
  &:hover {
    color: $white;
    background-color: $maincolor;
    animation: flashingAdd 1500ms infinite;
  }
  .icon {
    font-size: 14px;
  }
}
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
.loading {
  position: absolute;
  z-index: 33;
  width: 100%;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $secondcolor;
  user-select: none;
  pointer-events: none;
}
</style>
