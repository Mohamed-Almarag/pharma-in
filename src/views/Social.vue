<template>
  <div class="social view-padding">
    <Loading :loading="loading"></Loading>
    <div class="container">
      <div class="row">
        <!-- Start aside  -->
        <aside
          :class="{ visible: isVisible == true }"
          class="aside col-lg-3 col-md-4 text-capitalize"
        >
          <button
            @click="sideBarVisible"
            class="
              bars-icon-container
              d-flex-align-items-center
              justify-content-center
            "
          >
            <span class="three-icon d-block">
              <span class="line line-1 d-block"></span>
              <span class="line line-2 d-block"></span>
              <span class="line line-3 d-block"></span>
            </span>
          </button>
          <div class="aside-container">
            <router-link class="d-block link" :to="{ name: 'Profile' }"
              ><fa class="icon" icon="user" />{{
                $t("social.Profile")
              }}</router-link
            >
            <router-link class="d-block link" :to="{ name: 'Freinds' }"
              ><fa class="icon" icon="user-friends" />{{
                $t("social.friends")
              }}</router-link
            >
            <router-link class="d-block link" :to="{ name: 'MyRequests' }"
              ><fa class="icon" icon="paper-plane" />{{
                $t("social.My Requests")
              }}</router-link
            >
            <router-link class="d-block link" :to="{ name: 'MyFreindsRequsts' }"
              ><fa class="icon" icon="user-check" />{{
                $t("social.Freinds Requsts")
              }}
            </router-link>
            <router-link class="d-block link" :to="{ name: 'OtherFreinds' }"
              ><fa class="icon" icon="users" />{{
                $t("social.Other Freinds")
              }}</router-link
            >
            <div class="active-freinds d-md-block d-lg-none">
              <div class="all-friends text-capitalize">
                <div v-for="freind in myFreinds" :key="freind.id">
                  <div
                    class="every-freind d-flex align-items-center"
                    v-if="showLoginUser !== freind.users.id"
                    @click="openFreindsChatting(freind, freind.users.id)"
                  >
                    <img
                      v-if="freind.users.image"
                      class="d-block"
                      :src="freind.users.image"
                      alt="friend"
                    />
                    <img
                      v-else
                      class="d-block"
                      src="@/assets/images/default.png"
                      alt="friend"
                    />
                    <span class="d-block">{{ freind.users.name }}</span>
                  </div>
                  <div
                    class="every-freind d-flex align-items-center"
                    v-if="showLoginUser == freind.users.id"
                    @click="openFreindsChatting(freind, freind.friends.id)"
                  >
                    <img
                      v-if="freind.friends.image"
                      class="d-block"
                      :src="freind.friends.image"
                      alt="friend"
                    />
                    <img
                      v-else
                      class="d-block"
                      src="@/assets/images/default.png"
                      alt="friend"
                    />
                    <span class="d-block">{{ freind.friends.name }}</span>
                  </div>
                </div>
              </div>

              <transition name="fade">
                <div
                  class="main-chatting-container clip-path"
                  v-if="showChattBox"
                >
                  <div
                    class="chatting-container"
                    v-if="showLoginUser !== freindChattingObj.users.id"
                  >
                    <div
                      class="
                        chat-header
                        d-flex
                        align-items-center
                        justify-content-between
                      "
                    >
                      <div
                        class="friend-details d-flex align-items-center"
                        v-if="freindChattingObj != null"
                      >
                        <img
                          v-if="freindChattingObj.users.image"
                          :src="freindChattingObj.users.image"
                          alt="ferind"
                          class="d-blcok rounded-circle friend-img"
                        />
                        <img
                          v-else
                          class="d-blcok rounded-circle friend-img"
                          src="@/assets/images/default.png"
                          alt="friend"
                        />
                        <h6 class="freind-name text-capitalize">
                          {{ freindChattingObj.users.name }}
                        </h6>
                      </div>
                      <span
                        @click="closeFreindsChatting"
                        class="
                          d-block
                          close-chatting
                          rounded-circle
                          text-center
                        "
                        ><fa class="icon" icon="times"
                      /></span>
                    </div>
                    <div class="chat-body" v-chat-scroll>
                      <span
                        class="d-block message"
                        v-for="(message, index) in chatItems"
                        :key="index"
                      >
                        {{ message.title }}
                      </span>
                    </div>
                    <div class="chat-footer d-flex">
                      <div class="chat-text">
                        <form @keypress.enter="addMessage">
                          <textarea
                            v-focus
                            class="chat-textarea d-block h-100 w-100"
                            v-model="message"
                          ></textarea>
                        </form>
                      </div>
                      <div class="chat-actions">
                        <span>icon</span>
                      </div>
                    </div>
                  </div>
                  <div
                    class="chatting-container"
                    v-if="showLoginUser == freindChattingObj.users.id"
                  >
                    <div
                      class="
                        chat-header
                        d-flex
                        align-items-center
                        justify-content-between
                      "
                    >
                      <div
                        class="friend-details d-flex align-items-center"
                        v-if="freindChattingObj != null"
                      >
                        <img
                          v-if="freindChattingObj.friends.image"
                          :src="freindChattingObj.friends.image"
                          alt="ferind"
                          class="d-blcok rounded-circle friend-img"
                        />
                        <img
                          v-else
                          class="d-blcok rounded-circle friend-img"
                          src="@/assets/images/default.png"
                          alt="friend"
                        />
                        <h6 class="freind-name text-capitalize">
                          {{ freindChattingObj.friends.name }}
                        </h6>
                      </div>
                      <span
                        @click="closeFreindsChatting"
                        class="
                          d-block
                          close-chatting
                          rounded-circle
                          text-center
                        "
                        ><fa class="icon" icon="times"
                      /></span>
                    </div>
                    <div class="chat-body" v-chat-scroll>
                      <span
                        :class="{ yes: showLoginUser == message.sender_id }"
                        class="d-block message"
                        v-for="(message, index) in chatItems"
                        :key="index"
                      >
                        {{ message.title }}
                      </span>
                    </div>
                    <div class="chat-footer d-flex">
                      <div class="chat-text">
                        <form @keypress.enter="addMessage">
                          <textarea
                            v-focus
                            class="chat-textarea d-block h-100 w-100"
                            v-model="message"
                          ></textarea>
                        </form>
                      </div>
                      <div class="chat-actions">
                        <span>icon</span>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
              <transition name="fade">
                <Errors v-if="showErrors" :error="error">
                  <template #errors>
                    <div class="errors">
                      <!-- <strong>{{ showErrors }} </strong> -->
                      <span
                        v-if="!$v.message.required && $v.message.$dirty"
                        class="text-danger"
                        >{{ $t("social.chat empty message") }}</span
                      >
                      <button
                        @click="error = false"
                        type="button"
                        class="btn-close close-alert"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                      ></button>
                    </div>
                  </template>
                </Errors>
              </transition>
            </div>
          </div>
        </aside>
        <!-- End aside  -->
        <!-- Start posts container  -->
        <div class="col-sm-12 col-md-8 col-lg-6">
          <AllPosts></AllPosts>
        </div>

        <div class="active-freinds col-lg-3 d-lg-block d-md-none">
          <div class="all-friends text-capitalize">
            <div v-for="freind in myFreinds" :key="freind.id">
              <div
                class="every-freind d-flex align-items-center"
                v-if="showLoginUser !== freind.users.id"
                @click="openFreindsChatting(freind, freind.users.id)"
              >
                <img
                  v-if="freind.users.image"
                  class="d-block"
                  :src="freind.users.image"
                  alt="friend"
                />
                <img
                  v-else
                  class="d-block"
                  src="@/assets/images/default.png"
                  alt="friend"
                />
                <span class="d-block">{{ freind.users.name }}</span>
              </div>
              <div
                class="every-freind d-flex align-items-center"
                v-if="showLoginUser == freind.users.id"
                @click="openFreindsChatting(freind, freind.friends.id)"
              >
                <img
                  v-if="freind.friends.image"
                  class="d-block"
                  :src="freind.friends.image"
                  alt="friend"
                />
                <img
                  v-else
                  class="d-block"
                  src="@/assets/images/default.png"
                  alt="friend"
                />
                <span class="d-block">{{ freind.friends.name }}</span>
              </div>
            </div>
          </div>
          <!-- start chat model  -->
          <transition name="fade">
            <div class="main-chatting-container clip-path" v-if="showChattBox">
              <div
                class="chatting-container"
                v-if="showLoginUser !== freindChattingObj.users.id"
              >
                <div
                  class="
                    chat-header
                    d-flex
                    align-items-center
                    justify-content-between
                  "
                >
                  <div
                    class="friend-details d-flex align-items-center"
                    v-if="freindChattingObj != null"
                  >
                    <img
                      v-if="freindChattingObj.users.image"
                      :src="freindChattingObj.users.image"
                      alt="ferind"
                      class="d-blcok rounded-circle friend-img"
                    />
                    <img
                      v-else
                      class="d-blcok rounded-circle friend-img"
                      src="@/assets/images/default.png"
                      alt="friend"
                    />
                    <h6 class="freind-name text-capitalize">
                      {{ freindChattingObj.users.name }}
                    </h6>
                  </div>
                  <span
                    @click="closeFreindsChatting"
                    class="d-block close-chatting rounded-circle text-center"
                    ><fa class="icon" icon="times"
                  /></span>
                </div>
                <div class="chat-body" v-chat-scroll>
                  <span
                    class="d-block message"
                    v-for="(message, index) in chatItems"
                    :key="index"
                  >
                    {{ message.title }}
                  </span>
                </div>
                <div class="chat-footer d-flex">
                  <div class="chat-text">
                    <form @keypress.enter="addMessage">
                      <textarea
                        v-focus
                        class="chat-textarea d-block h-100 w-100"
                        v-model="message"
                      ></textarea>
                    </form>
                  </div>
                  <div class="chat-actions">
                    <span>icon</span>
                  </div>
                </div>
              </div>
              <div
                class="chatting-container"
                v-if="showLoginUser == freindChattingObj.users.id"
              >
                <div
                  class="
                    chat-header
                    d-flex
                    align-items-center
                    justify-content-between
                  "
                >
                  <div
                    class="friend-details d-flex align-items-center"
                    v-if="freindChattingObj != null"
                  >
                    <img
                      v-if="freindChattingObj.friends.image"
                      :src="freindChattingObj.friends.image"
                      alt="ferind"
                      class="d-blcok rounded-circle friend-img"
                    />
                    <img
                      v-else
                      class="d-blcok rounded-circle friend-img"
                      src="@/assets/images/default.png"
                      alt="friend"
                    />
                    <h6 class="freind-name text-capitalize">
                      {{ freindChattingObj.friends.name }}
                    </h6>
                  </div>
                  <span
                    @click="closeFreindsChatting"
                    class="d-block close-chatting rounded-circle text-center"
                    ><fa class="icon" icon="times"
                  /></span>
                </div>
                <div class="chat-body" v-chat-scroll>
                  <span
                    :class="{ yes: showLoginUser == message.sender_id }"
                    class="d-block message"
                    v-for="(message, index) in chatItems"
                    :key="index"
                  >
                    {{ message.title }}
                  </span>
                </div>
                <div class="chat-footer d-flex">
                  <div class="chat-text">
                    <form @keypress.enter="addMessage">
                      <textarea
                        v-focus
                        class="chat-textarea d-block h-100 w-100"
                        v-model="message"
                      ></textarea>
                    </form>
                  </div>
                  <div class="chat-actions">
                    <span>icon</span>
                  </div>
                </div>
              </div>
            </div>
          </transition>
          <transition name="fade">
            <Errors v-if="showErrors" :error="error">
              <template #errors>
                <div class="errors">
                  <!-- <strong>{{ showErrors }} </strong> -->
                  <span
                    v-if="!$v.message.required && $v.message.$dirty"
                    class="text-danger"
                    >{{ $t("social.chat empty message") }}</span
                  >
                  <button
                    @click="error = false"
                    type="button"
                    class="btn-close close-alert"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              </template>
            </Errors>
          </transition>
          <!-- end chat model  -->
        </div>
      </div>
      <!-- end posts container  -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AllPosts from "@/components/Social/AllPosts.vue";
import { db } from "@/firebase/init";
import { required } from "vuelidate/lib/validators";
export default {
  name: "Social",
  data() {
    return {
      isVisible: false,
      loading: false,
      showConfirm: false,
      // chatting
      showChattBox: false,
      freindChattingObj: null,
      chat_ame: "",
      chat_sender_id: "",
      chat_receiver_id: "",
      title: "",
      message: "",
      allMessages: [],
      user_id: "",
      error: false,
      // testing: {},
    };
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },
  mounted() {
    this.getAllPosts();
    this.getAllMyFreinds();
    let userData = JSON.parse(localStorage.getItem("user-data"));
    this.user_id = userData.id;
  },
  computed: {
    ...mapState({
      posts: (state) => state.SocialModule.allPosts,
      myFreinds: (state) => state.SocialModule.myFreinds,
    }),
    chatItems() {
      return this.allMessages;
    },
    chatName() {
      return this.chat_ame;
    },
    chatSenderId() {
      return this.chat_sender_id;
    },
    chatReciverId() {
      return this.chat_receiver_id;
    },
    showLoginUser() {
      return this.user_id;
    },
    showErrors() {
      return this.error;
    },
  },
  components: {
    AllPosts,
  },
  methods: {
    sideBarVisible() {
      this.isVisible = !this.isVisible;
    },
    showModal() {
      this.showPost = !this.showPost;
    },
    // start posts methods
    getAllPosts() {
      this.loading = true;
      this.$store.dispatch("SocialModule/getAllPosts").finally(() => {
        this.loading = false;
      });
    },

    showConfirmModal() {
      this.showConfirm = !this.showConfirm;
    },
    // end posts methods
    getAllMyFreinds() {
      this.loading = true;
      this.$store.dispatch("SocialModule/myFreinds").finally(() => {
        this.loading = false;
      });
    },
    // start chatting
    openFreindsChatting(item, id) {
      let payload = new FormData();
      payload.append("receiver_id", id);
      this.$store
        .dispatch("SocialModule/chooseFreindToChatt", payload)
        .then((res) => {
          this.showChattBox = true;
          this.freindChattingObj = item;
          let data = res.data.data;
          this.chat_ame = data.name;
          this.chat_sender_id = data.sender.id;
          this.chat_receiver_id = data.receiver.id;
        })
        .then(() => {
          db.ref(this.chatName).on("value", (snapshot) => {
            const data = snapshot.val();
            this.allMessages = data;
          });
        });
    },
    addMessage() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.error = true;
      } else {
        db.ref(this.chatName)
          .push({
            receiver_id: this.chatSenderId,
            sender_id: this.chatReciverId,
            title: this.message,
          })
          .then(() => {
            this.message = "";
          });
      }
      db.ref(this.chatName).on("value", (snapshot) => {
        const data = snapshot.val();
        this.allMessages = data;
      });
    },
    closeFreindsChatting() {
      this.showChattBox = false;
      this.freindChattingObj = {};
    },
  },
  validations: {
    message: {
      required,
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/style/pages/socialMedia.scss";
// .fade-enter,
// .fade-leave-to {
//   clip-path: circle(0);
// }
// .fade-enter-active,
// .fade-leave-active {
//   transition: clip-path 0.5s ease-in-out;
// }
</style>
