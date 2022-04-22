<template>
  <div class="defination-company">
    <div class="container">
      <div class="description">
        <div class="row">
          <div class="part-one col-sm-12 col-md-5">
            <div class="details">
              <h1 class="text-capitalize">
                {{ infos.website_name }}
              </h1>
              <p class="paragraph text-capitalize" v-html="infos.bio">
                {{ infos.bio }}
              </p>

              <div class="watch-video">
                <button
                  @click="showVideo"
                  class="
                    video-btn
                    d-flex
                    align-items-center
                    justify-content-center
                    text-capitalize
                  "
                >
                  <span class="watch d-block">{{ $t("home.Watch video") }}</span
                  ><span class="play-now d-block"><fa icon="play" /></span>
                </button>
                <transition name="fade">
                  <div class="popup-video clip-path" v-if="show">
                    <div class="vedio-container">
                      <span @click="showVideo" class="close-form-modal"
                        ><fa class="icon" icon="times"
                      /></span>
                      <video class="vedio" :src="infos.video" controls>
                        {{
                          $t("global.Your browser does not support HTML5 video")
                        }}
                      </video>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
          <div class="part-two col-sm-12 col-md-7">
            <div class="img-container">
              <img
                draggable="false"
                class="w-100"
                src="@/assets/images/homee/01.png"
                alt="doctors"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DefinationCompany",
  data() {
    return {
      show: false,
    };
  },

  mounted() {
    this.pharmaInfo();
  },
  computed: {
    infos() {
      return this.$store.state.WebsiteInfo.pharmaInfo;
    },
  },
  methods: {
    pharmaInfo() {
      this.$store.dispatch("WebsiteInfo/phrmaInfo");
    },
    showVideo() {
      this.show = !this.show;
    },
  },
};
</script>

<style lang="scss" scoped>
.defination-company {
  .description {
    .part-one {
      position: relative;
      display: flex;
      align-items: center;
      .details {
        position: absolute;
        width: 120%;
        height: 90%;
        top: 5%;
        border-radius: 10px;
        background-color: $white;
        padding: 30px;
        box-shadow: $chat-shadow;
        @media (min-width: 320px) and (max-width: 768px) {
          position: relative;
          width: 100%;
          height: 100%;
          top: unset;
          margin-bottom: 30px;
          padding: 0;
          box-shadow: unset;
        }
        h1 {
          font-size: 2.8rem;
          font-weight: bold;
          color: $maincolor;
          text-shadow: $text-shadow;
          span {
            color: $secondcolor;
          }
        }
        p {
          margin: 20px 0;
          color: $textcolor2;
        }
        .about-place {
          color: $textcolor;
        }
        .watch-video {
          margin-top: 30px;
          .video-btn {
            position: relative;
            background-color: $maincolor;
            color: $white;
            border: none;
            border-radius: $radius;
            box-shadow: $box-shadow;
            transition: $transition;
            &:hover {
              background-color: $secondcolor;
            }
            .play-now,
            .watch {
              padding: 10px;
            }
          }
        }
        .popup-video {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba($black, 0.3);
          z-index: 99999 * 99;
          display: flex;
          align-items: center;
          justify-content: center;
          .vedio-container {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 90vw;
            height: 90vh;
            padding: 30px;
            background-color: $white;
            box-shadow: $box-shadow;
            border-radius: $radius;
            @media (min-width: 320px) and (max-width: 768px) {
              padding: 0;
            }
            .vedio {
              max-width: 100%;
              max-height: 100%;
              &:focus {
                box-shadow: unset !important;
                outline: none !important;
              }
            }
          }
        }
      }
    }
    .part-two {
      overflow: hidden;

      .img-container {
        box-shadow: $chat-shadow;
        border-radius: $radius;

        img {
          border-radius: $radius;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
