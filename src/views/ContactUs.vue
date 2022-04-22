<template>
  <div class="contact-us view-padding">
    <Loading :loading="loading"></Loading>
    <div class="container">
      <h2 class="text-center text-capitalize section-heading title">
        {{ $t("global.contact us") }}
      </h2>
      <form class="main-form-container text-capitalize">
        <div class="form-group text-capitalize">
          <div class="form-label">{{ $t("form.name") }}</div>
          <input type="text" class="form-input" v-model="contactForm.name" />
          <div class="validation-errors">
            <span
              v-if="!$v.contactForm.name.required && $v.contactForm.name.$dirty"
              class="text-danger"
              >{{ $t("validation.name") }}</span
            >
          </div>
        </div>

        <div class="form-group">
          <label for="" class="form-label">{{ $t("form.email") }}</label>
          <input class="form-input" type="email" v-model="contactForm.email" />
          <div class="validation-errors">
            <span
              v-if="
                !$v.contactForm.email.required && $v.contactForm.email.$dirty
              "
              class="text-danger"
              >{{ $t("validation.email") }}</span
            >
            <span v-if="!$v.contactForm.email.email" class="text-danger">{{
              $t("validation.validemail")
            }}</span>
          </div>
        </div>

        <div class="form-group">
          <label for="" class="form-label">{{ $t("form.subject") }}</label>
          <input class="form-input" type="text" v-model="contactForm.subject" />
          <div class="validation-errors">
            <span
              v-if="
                !$v.contactForm.subject.required &&
                $v.contactForm.subject.$dirty
              "
              class="text-danger"
              >{{ $t("validation.subject") }}</span
            >
          </div>
        </div>

        <div class="form-group">
          <label for="" class="form-label">{{ $t("form.message") }}</label>
          <textarea
            class="form-input text-area"
            v-model="contactForm.message"
          ></textarea>
          <div class="validation-errors">
            <span
              v-if="
                !$v.contactForm.message.required &&
                $v.contactForm.message.$dirty
              "
              class="text-danger"
              >{{ $t("validation.message") }}</span
            >
          </div>
        </div>

        <button
          @click="contactUs"
          class="details-button review-button d-block text-capitalize"
          type="button"
        >
          send
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { append_Object_Items_ToFormData } from "@/axios/helpers";
export default {
  name: "ContactUs",
  data() {
    return {
      loading: false,
      contactForm: {
        name: null,
        email: null,
        subject: null,
        message: null,
      },
    };
  },
  methods: {
    contactUs() {
      this.$v.contactForm.$touch();
      if (this.$v.contactForm.$invalid) {
        console.log("error");
      } else {
        this.loading = true;
        let contactData = append_Object_Items_ToFormData(this.contactForm);
        this.$store
          .dispatch("WebsiteInfo/sendContactMessage", contactData)
          .then(() => {
            this.$router.push({ name: "Home" });
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
  validations: {
    contactForm: {
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      subject: {
        required,
      },
      message: {
        required,
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.contact-us {
  .title {
    color: $maincolor;
  }
  .main-form-container {
    position: relative;
    overflow-y: auto;
    background-color: $white;
    width: 100%;
    max-width: 800px;
    margin: auto;
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
    }
    // .send-btn {
    //   @extend %form-submit-button;
    // }
  }
}
</style>
