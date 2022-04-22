<template>
  <div class="friends-page view-padding">
    <div class="container">
      <transition name="fade">
        <ConfirmModal v-if="showConfirm" :showModal="showConfirm">
          <template #message>
            <p class="paragraph text-capitalize">
              {{ $t("social.are you sure you want block it") }}
            </p>
          </template>
          <template #sure>
            <div class="d-flex confirm-container-buttons">
              <button
                @click="blockMyFreind(blockFreindId)"
                class="
                  details-button
                  confirm-btn-ok confirm-btn-cancel
                  text-capitalize
                  d-block
                "
              >
                {{ $t("social.block") }}
              </button>
              <button
                @click="showConfirmModal"
                class="details-button confirm-btn-ok text-capitalize d-block"
              >
                {{ $t("social.cancel") }}
              </button>
            </div>
          </template>
        </ConfirmModal>
      </transition>
      <div class="all-friends">
        <div class="row">
          <EmptySection v-if="myFreinds.length < 1">
            <template #message>
              <span>{{ $t("social.you don't have any freinds") }}</span>
            </template>
          </EmptySection>
          <div
            class="friend-card col-lg-3 col-md-4 col-sm-6"
            v-for="freind in myFreinds"
            :key="freind.id"
          >
            <div
              v-if="showLoginUser !== freind.users.id"
              class="card-container overflow-hidden"
            >
              <div class="photo">
                <img
                  v-if="freind.users.image"
                  class="img w-100 h-100"
                  :src="freind.users.image"
                  alt="friend"
                />
                <img
                  v-else
                  class="img w-100 h-100"
                  src="@/assets/images/default.png"
                  alt="friend"
                />
              </div>

              <div class="content">
                <h6 class="name text-capitalize">{{ freind.users.name }}</h6>
                <button
                  @click="getFreindId(freind.id)"
                  class="add-friend d-block delete text-capitalize"
                >
                  {{ $t("social.block") }}
                </button>
              </div>
            </div>
            <div
              v-if="showLoginUser == freind.users.id"
              class="card-container overflow-hidden"
            >
              <div class="photo">
                <img
                  v-if="freind.friends.image"
                  class="img w-100 h-100"
                  :src="freind.friends.image"
                  alt="friend"
                />
                <img
                  v-else
                  class="img w-100 h-100"
                  src="@/assets/images/default.png"
                  alt="friend"
                />
              </div>

              <div class="content">
                <h6 class="name text-capitalize">{{ freind.friends.name }}</h6>
                <button
                  @click="getFreindId(freind.id)"
                  class="add-friend d-block delete text-capitalize"
                >
                  {{ $t("social.block") }}
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
  name: "Freinds",
  data() {
    return {
      loading: false,
      showConfirm: false,
      user_id: "",
      freind_id: null,
      blockFreind: {
        status: "blocked",
        _method: "PUT",
      },
    };
  },
  computed: {
    ...mapState({
      myFreinds: (state) => state.SocialModule.myFreinds,
    }),
    blockFreindId() {
      return this.freind_id;
    },
    showLoginUser() {
      return this.user_id;
    },
  },
  mounted() {
    this.getAllMyFreinds();
    let userData = JSON.parse(localStorage.getItem("user-data"));
    this.user_id = userData.id;
  },
  methods: {
    getAllMyFreinds() {
      this.loading = true;
      this.$store.dispatch("SocialModule/myFreinds").finally(() => {
        this.loading = false;
      });
    },
    blockMyFreind(friendId) {
      this.loading = true;
      let blockData = new FormData();
      blockData.append("status", this.blockFreind.status);
      blockData.append("_method", this.blockFreind._method);
      let payload = { id: friendId, data: blockData };
      this.$store
        .dispatch("SocialModule/blockMyFriend", payload)
        .then(() => {
          this.showConfirm = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    showConfirmModal() {
      this.showConfirm = !this.showConfirm;
      this.freind_id = null;
    },
    getFreindId(id) {
      this.freind_id = id;
      this.showConfirm = !this.showConfirm;
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
      margin-bottom: 20px;
      &:hover {
        .img {
          filter: contrast(1);
          transform: scale(1.1);
        }
      }
      .photo {
        height: 220px;
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
