<template>
  <div class="company-guide">
    <div class="main-decription">
      <h2 class="main-section-title text-capitalize text-center">
        {{ $t("home.Guide") }}
      </h2>
      <p class="text-center text-capitalize paragraph description">
        {{ $t("home.Hundreds Of Institutions") }}
      </p>
    </div>
    <div class="container">
      <div class="description">
        <div class="row">
          <div class="part-two col-md-7">
            <div class="img-container">
              <img
                draggable="false"
                class="w-100"
                src="@/assets/images/homee/03.png"
                alt=""
              />
            </div>
          </div>
          <div class="part-one col-md-5">
            <div class="details">
              <h5 class="text-capitalize">{{ $t("home.Nothing Is Far") }}</h5>
              <p class="text-capitalize">
                {{ $t("home.Hospitals Clinics") }}
              </p>
              <ul class="job-lists list-unstyled">
                <li class="job">
                  <fa class="job-icon" icon="check" /><span class="job-text"
                    >Hospitals</span
                  >
                </li>
                <li class="job">
                  <fa class="job-icon" icon="check" /><span class="job-text"
                    >Clinics</span
                  >
                </li>
                <li class="job">
                  <fa class="job-icon" icon="check" /><span class="job-text"
                    >Pharmaceutical Companies</span
                  >
                </li>
                <li class="job">
                  <fa class="job-icon" icon="check" /><span class="job-text"
                    >Labs</span
                  >
                </li>
              </ul>
              <div class="get-job">
                <button class="details-button review-button text-capitalize">
                  <router-link
                    class="router-link d-block"
                    :to="{ name: 'Guide' }"
                    >{{ $t("home.Find It Now") }}</router-link
                  >
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompanyGuide",
};
</script>

<style lang="scss" scoped>
.company-guide {
  padding-bottom: 70px;
  @media (min-width: 320px) and (max-width: 768px) {
    padding-bottom: 0;
  }
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
        left: -20%;
        right: -20%;
        @media (min-width: 320px) and (max-width: 768px) {
          position: relative;
          width: 100%;
          height: 100%;
          top: unset;
          margin-bottom: 0;
          padding: 0;
          box-shadow: unset;
          left: auto;
          right: auto;
          padding-top: 30px;
        }
        h5 {
          font-size: 1.1rem;
          font-weight: bold;
          color: $maincolor;
          text-shadow: $text-shadow;
          span {
            color: $secondcolor;
          }
        }
        p {
          margin: 20px 0;
          color: $textcolor;
        }
        .job-lists {
          .job {
            margin-bottom: 20px;
            .job-text {
              margin: 0 10px;
              color: $textcolor;
            }
          }
          .job-icon {
            color: $secondcolor;
          }
        }
      }
    }
    .part-two {
      .img-container {
        img {
          border-radius: 10px;
          height: 100%;
          object-fit: cover;
          max-height: 550px;
          @media (min-width: 320px) and (max-width: 767px) {
            max-height: 500px;
          }
        }
      }
    }
  }
}
</style>
