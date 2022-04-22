<template>
  <transition name="fade">
    <div class="clip-path form-modal-container" v-if="showPostModal">
      <Loading :loading="loading"></Loading>
      <div class="main-editor-container form-modal editor-post">
        <h5 class="title text-uppercase text-center">create a post</h5>
        <span @click="close" class="close close-form-modal"
          ><fa class="icon" icon="times"
        /></span>
        <div class="our-editor">
          <ckeditor
            :editor="editor"
            v-model="editorData"
            :config="editorConfig"
          ></ckeditor>
        </div>
        <div class="post-preview" v-if="editorData">
          <div v-html="editorData"></div>
        </div>
        <div class="our-post-photo">
          <transition name="swip">
            <div class="preview-container-image" v-if="imagePreview">
              <img
                draggable="false"
                class="preview-image d-block m-auto"
                :src="imagePreview"
                alt="preview"
              />
            </div>
          </transition>
          <div class="form-group choose-photo-container">
            <label class="choose-label d-block text-capitalize">{{
              $t("global.choose photo")
            }}</label>
            <div class="choose-photo">
              <label
                class="
                  upload-photo
                  d-flex
                  justify-content-center
                  align-items-center
                  rounded-circle
                "
                for="photo"
                ><fa class="icon" icon="image"
              /></label>
              <input
                @change="handelUploadFileImage($event)"
                class="file-input"
                type="file"
                id="photo"
              />
            </div>
          </div>
        </div>

        <button
          v-if="addMode"
          @click="addPost"
          class="submit-form-modal text-capitalize d-block"
        >
          publish
        </button>
        <button
          v-if="editMode"
          @click="updatePost()"
          class="submit-form-modal text-capitalize d-block"
        >
          save
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  name: "Post",
  data() {
    return {
      addMode: true,
      editMode: false,
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        // extraPlugins: "imageuploader",
        // The configuration of the editor.
      },
      getPostId: null,
      title: "",
      text: "",
      photo: null,
      video: "",
      reader: new FileReader(),
      imagePreview: null,
      loading: false,
    };
  },
  props: {
    showPostModal: {
      type: Boolean,
      default: false,
    },
  },

  created() {
    this.reader.onload = () => {
      this.imagePreview = this.reader.result;
    };
  },
  methods: {
    handelUploadFileImage(event) {
      this.photo = event.target.files[0];
      this.reader.readAsDataURL(this.photo);
    },
    close() {
      this.$emit("close");
    },
    showshow() {
      this.$emit("showshow");
    },
    addPost() {
      this.loading = true;
      let postData = new FormData();
      postData.append("text", this.editorData);
      postData.append("photo", this.photo);
      this.$store
        .dispatch("SocialModule/addANewPost", postData)
        .then(() => {
          this.editorData = "";
          window.location.reload();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    gtePostForEdit(id) {
      this.getPostId = id;
      (this.addMode = false),
        (this.editMode = true),
        this.$store
          .dispatch("SocialModule/getPostToEdit", id)
          .then((response) => {
            setTimeout(() => {
              this.editorData = `${response.text}`;
            }, 100);
            this.imagePreview = response.photo;
          });
    },
    updatePost() {
      this.loading = true;
      let postData = new FormData();
      postData.append("text", this.editorData);
      postData.append("photo", this.photo);
      postData.append("_method", "PUT");
      let payload = { id: this.getPostId, data: postData };
      this.$store
        .dispatch("SocialModule/updatePost", payload)
        .then(() => {
          this.editorData = "";
          window.location.reload();
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss">
.main-editor-container {
  .our-editor {
  }
  .post-preview {
    padding: 20px 0;
  }
  .our-post-photo {
  }
}
.ck-content {
  height: 300px !important;
}
.ck.ck-editor__main > .ck-editor__editable {
  transition: 0.5s !important;
}
.ck.ck-editor__main > .ck-editor__editable:focus {
  border-color: $secondcolor !important;
}
p {
  // background-color: aliceblue;
}
</style>
