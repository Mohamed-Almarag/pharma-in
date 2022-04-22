<template>
  <div class="profile view-padding">
    <Loading :loading="loading"></Loading>
    <div class="top-prfile">
      <div class="container">
        <div class="user-photos-container">
          <div class="user-photo">
            <div class="images w-100 h-100">
              <img
                v-if="imgPreviewUrl"
                class="img w-100 h-100 d-block"
                :src="imgPreviewUrl"
                alt="user-photo"
              />
              <img
                v-if="image"
                class="img w-100 h-100 d-block"
                :src="image"
                alt="user-photo"
              />
              <img v-else
                class="img w-100 h-100 d-block"
                src="@/assets/images/default.png"
                alt="user-photo"
              />
            </div>
            <div
              class="
                change-photos
                w-100
                h-100
                d-flex
                align-items-center
                justify-content-center
              "
            >
              <label class="upload-photo d-block" for="upload-photo"
                ><fa class="icon" icon="camera"
              /></label>
              <input
                @change="handelUploadFileImage($event)"
                class="file-input d-none"
                type="file"
                id="upload-photo"
              />
            </div>
          </div>
          <div class="save-images text-capitalize" v-if="imgPreviewUrl">
            <button @click="ChangeImage" class="save d-block rounded-pill">
              {{ $t("profile.save") }}
            </button>
            <button
              @click="cancelChangeImage"
              class="save cancel d-block rounded-pill"
            >
              {{ $t("profile.cancel") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="tabs-container">
      <div class="container">
        <div
          class="buttons prfile-btns d-flex justify-content-between flex-wrap"
        >
          <button
            @click="activeComponent = 'PortofolioContainer'"
            class="tabs d-block text-uppercase"
            :class="{ active: activeComponent == 'PortofolioContainer' }"
          >
            {{ $t("profile.Portofolio") }}
          </button>
          <button
            @click="activeComponent = 'AppliedJobs'"
            class="tabs d-block text-uppercase"
            :class="{ active: activeComponent == 'AppliedJobs' }"
          >
            {{ $t("profile.jobs") }}
          </button>
          <button
            @click="activeComponent = 'AppliedCourses'"
            class="tabs d-block text-uppercase"
            :class="{ active: activeComponent == 'AppliedCourses' }"
          >
            {{ $t("profile.Courses") }}
          </button>
          <button
            @click="activeComponent = 'Activity'"
            class="tabs d-block text-uppercase"
            :class="{ active: activeComponent == 'Activity' }"
          >
            {{ $t("profile.activity") }}
          </button>
        </div>

        <div class="show-active">
          <transition name="presintation">
            <component :is="activeComponent"></component>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PortofolioContainer from "@/components/Profile/PortofolioContainer.vue";
import AppliedJobs from "@/components/Profile/AppliedJobs.vue";
import Activity from "@/components/Profile/Activity.vue";
import AppliedCourses from "@/components/Profile/AppliedCourses.vue";

export default {
  name: "Profile",
  data() {
    return {
      activeComponent: "PortofolioContainer",
      image: null,
      imgPreviewUrl: null,
      showButtons: false,
      loading: false,
      reader: new FileReader(),
    };
  },
  created() {
    this.reader.onload = () => {
      this.imgPreviewUrl = this.reader.result;
    };
  },
  mounted() {
    this.image = this.$store.state.userDetails.image;
  },
  methods: {
    handelUploadFileImage(event) {
      this.image = event.target.files[0];
      this.reader.readAsDataURL(this.image);
    },
    ChangeImage() {
      this.loading = true;
      let imageSrc = new FormData();
      imageSrc.append("image", this.image);
      this.$store
        .dispatch("ProfileModule/changeProfieImage", imageSrc)
        .then(() => {
          this.imgPreviewUrl = null;
        })
        .finally(() => {
          window.location.reload();
          this.loading = false;
        });
    },
    cancelChangeImage() {
      this.imgPreviewUrl = null;
      this.image = this.$store.state.userDetails.image;
    },
  },
  components: { PortofolioContainer, AppliedJobs, Activity, AppliedCourses },
};
</script>

<style lang="scss" scoped>
.profile {
  .swip-enter-active {
    animation: grow 1s linear 1;
  }

  .top-prfile {
    background-image: url("../assets/images/profile/01.png");
    height: 60vh;
    width: 100%;
    background-size: cover;
    background-position: center center;
    position: relative;
    &::before {
      @extend %before;
    }
    .user-photos-container {
      width: fit-content;
      .user-photo {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        position: absolute;
        overflow: hidden;
        top: calc(100% - 60px);
        &:hover {
          .change-photos {
            transform: scale(1);
          }
        }
        .images {
          position: relative;
          z-index: 55;
        }
        .change-photos {
          background-color: rgba($black, 0.3);
          position: absolute;
          z-index: 60;
          inset: 0;
          transition: 0.3s;
          color: $white;
          border-radius: 50%;
          transform: scale(0);
          .upload-photo {
            .icon {
              cursor: pointer;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              padding: 8px;
              animation: flashing 1500ms infinite;
            }
            .file-input {
              display: none;
            }
          }
        }
      }
      .save-images {
        position: absolute;
        top: calc(100% - 30px);
        left: 250px;
        width: 300px;
        height: 60px;
        display: flex;
        align-items: center;
        gap: 20px;
        @media (min-width: 320px) and (max-width: 567px) {
          left: 150px;
          width: fit-content;
          display: block;
          .save {
            margin-bottom: 10px;
          }
        }
        .save {
          border: none;
          padding: 8px 10px;
          color: $white;
          background-color: $maincolor;
          width: 100px;

          &.cancel {
            background-color: #dc3545;
          }
        }
      }
    }
  }

  .about-me {
    padding: 80px 20px;
    margin: 20px 0;
    .show {
      box-shadow: $box-shadow;
      border-radius: 10px;
      padding: 30px 15px;
      .bio-title {
        color: $textcolor2;
      }
      .bio-p {
        color: $textcolor;
        margin: 0;
      }
    }
  }

  .educations-experince {
    .all-user-educations {
      .educations-lists {
        box-shadow: $box-shadow;
        border-radius: 10px;
        padding: 15px;
        .title {
          color: $textcolor2;
        }
        .items {
          position: relative;
          border-radius: 7px;
          background-color: rgba($textcolor, 0.1);
          margin-top: 30px;
          padding: 10px;
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
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            .join-date {
              gap: 8px;
              &.join {
                margin: 10px 0;
              }
            }
          }
        }
      }
    }
  }
  .edit {
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
    cursor: pointer;
    &.plus {
      top: 20px;
      right: 20px;
    }
    &:hover {
      color: $white;
      background-color: $secondcolor;
      animation: flashing 1500ms infinite;
    }
    .icon {
      font-size: 14px;
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
