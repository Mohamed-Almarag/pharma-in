<template>
  <div class="friends-page view-padding">
    <Loading :loading="loading"></Loading>
    <transition name="fade">
      <Errors v-if="error" :error="error">
        <template #errors>
          <div class="errors">
            <strong>{{ error }} </strong>
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
    </transition>
    <div class="container">
      <div class="all-friends">
        <div class="row">
          <div
            class="friend-card col-md-4 col-lg-3 col-sm-6"
            v-for="user in users"
            :key="user.id"
          >
            <div class="card-container overflow-hidden">
              <div class="photo">
                <img
                  v-if="user.image"
                  class="img w-100 h-100"
                  :src="user.image"
                  :alt="user.name"
                />
                <img
                  v-else
                  class="img w-100 h-100"
                  src="../../assets/images/default.png"
                  alt="freind"
                />
              </div>
              <div class="content">
                <h6 class="name text-capitalize">{{ user.name }}</h6>
                <button
                  @click="addFriend(user.id)"
                  class="add-friend d-block text-capitalize"
                >
                  {{ $t("social.add friend") }}
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
import { mapState } from "vuex";
export default {
  name: "OtherFreinds",
  data() {
    return {
      error: "",
      loading: false,
      friend_id: "",
    };
  },
  mounted() {
    this.getAllUsers();
  },
  computed: {
    ...mapState({
      users: (state) => state.SocialModule.users,
    }),
  },
  methods: {
    getAllUsers() {
      this.loading = true;
      this.$store.dispatch("SocialModule/getAllUsers").finally(() => {
        this.loading = false;
      });
    },
    addFriend(id) {
      let payload = new FormData();
      payload.append("friend_id", id);
      this.loading = true;
      this.$store
        .dispatch("SocialModule/addFriend", payload)
        .catch((error) => {
          this.error = error.response.data.message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.friends-page {
  .all-friends {
    .card-container {
      transition: $transition;
      border: 1px solid $bordercolor;
      border-radius: $radius;
      margin-bottom: 30px;
      &:hover {
        .img {
          transform: scale(1.1);
          filter: contrast(1);
        }
      }
      .photo {
        height: 200px;
        overflow: hidden;
        .img {
          transition: $transition;
          filter: contrast(0.7);
        }
      }
      .content {
        .name {
          color: $textcolor;
          padding: 10px 5px;
        }
        .add-friend {
          border: none;
          background-color: $bgcard;
          color: $textcolor;
          width: 70%;
          padding: 8px;
          border-radius: $radius - 2px;
          margin: 0 auto 13px;
          transition: $transition;
          &:hover {
            color: $white;
            background-color: $maincolor;
          }
          &.delete {
            &:hover {
              color: $white;
              background-color: $cancel;
            }
          }
        }
      }
    }
  }
}
</style>
