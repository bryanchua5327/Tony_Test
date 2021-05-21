<template>
  <div>
    <div class="top-div">
      <div class="profile-div">
        <v-avatar class="mx-16" :size="$vuetify.breakpoint.mobile ? 200 : 336">
          <v-img
            :src="
              user.type == `Professional`
                ? ProfessionalPhotoUrl
                : studentPhotoUrl
            "
          ></v-img>
        </v-avatar>

        <div
          class="user-info"
          :class="$vuetify.breakpoint.mobile ? 'mx-2' : 'mx-16'"
        >
          <h3 v-html="user.type"></h3>
          <div class="profile-with-icon">
            <h1 class="extra-large primary--text">
              {{ user.firstName }} {{ user.lastName }}
            </h1>
            <v-btn
              icon
              class="ml-4"
              @click="editProfileConfirm = !editProfileConfirm"
            >
              <v-icon color="primary" v-if="isProfileOwner"
                >mdi-pencil</v-icon
              ></v-btn
            >
          </div>
          <h1>
            {{ user.role }} at <strong>{{ user.organization }}</strong>
          </h1>
          <div class="profile-with-icon">
            <v-icon color="primary" class="mr-4">mdi-map-marker</v-icon>
            <h2>{{ user.location }}</h2>
          </div>

          <h2>"{{ user.oneLiner }}"</h2>
          <div>
            <v-chip
              color="primary"
              outlined
              v-for="(item, n) in user.field"
              :key="n"
              class="ma-2 ml-0"
              >{{ item }}</v-chip
            >
          </div>
        </div>
      </div>
    </div>
    <div>
      <h1 class="mb-4 primary--text">Questions for {{ user.firstName }}</h1>
      <div class="questions-scrollable">
        <QuestionsCard
          v-for="(item, n) in nosQuestionCards"
          :key="n"
        ></QuestionsCard>
      </div>
    </div>

    <v-row>
      <v-col
        :cols="$vuetify.breakpoint.mobile ? 12 : 8"
        v-if="user.type == `Professional`"
      >
        <Lists
          id="Career"
          type="Career"
          title="Career Highlights"
          :items="career.items"
          :editable="isProfileOwner"
        ></Lists
      ></v-col>
      <v-col
        :cols="$vuetify.breakpoint.mobile ? 12 : 8"
        v-if="user.type == `Student`"
      >
        <Lists
          id="Extra Curricular"
          type="Extra Curricular"
          title="Extra Curricular"
          :items="cocu.items"
          :editable="isProfileOwner"
        ></Lists
      ></v-col>
      <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 4">
        <Lists
          id="Education"
          type="Education"
          title="Education"
          :items="education.items"
          :editable="isProfileOwner"
        ></Lists
      ></v-col>
      <v-col
        :cols="$vuetify.breakpoint.mobile ? 12 : 8"
        v-if="user.type == `Student`"
      >
        <Lists
          id="Awards"
          type="Awards"
          title="Awards"
          :items="awards.items"
          :editable="isProfileOwner"
        ></Lists
      ></v-col>
    </v-row>

    <v-dialog
      v-model="editProfileConfirm"
      width="100vw"
      :max-width="$vuetify.breakpoint.mobile ? '300px' : '600px'"
    >
      <UserForm :user="{ ...user }" @submitted="submitted"></UserForm>
    </v-dialog>
  </div>
</template>

<script>
import { firestoreDB } from "@/firebase/init.js";
export default {
  components: {
    Lists: () => import("~/components/AppComponents/Lists.vue"),
    QuestionsCard: () => import("~/components/AppComponents/QuestionsCard.vue"),
    UserForm: () => import("~/components/AppComponents/Profile/UserForm.vue"),
  },
  data() {
    return {
      ProfessionalPhotoUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      studentPhotoUrl:
        "https://images.pexels.com/photos/4144099/pexels-photo-4144099.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      editProfileConfirm: false,
      user: {},
      education: [],
      career: [],
      cocu: [],
      awards: [],
    };
  },
  computed: {
    isProfileOwner() {
      return this.$route.params.id == `D1hXL82HoYplI1SJOyh0`;
      //checks url params against logged-in user ID
    },
    nosQuestionCards() {
      if (this.$vuetify.breakpoint.mobile) {
        return 4;
      } else {
        return 10;
      }
    },
  },
  methods: {
    submitted(e) {
      console.log(e);
      this.getUserData();
      this.editProfileConfirm = false;
    },
    getUserData() {
      firestoreDB
        .collection("Users")
        .doc(this.$route.params.id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.user = doc.data();
          } else {
            console.log("User not found");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      firestoreDB
        .collection("Users")
        .doc(this.$route.params.id)
        .collection("Details")
        .doc("Career")
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.career = doc.data();
          } else {
            console.log("Career History not found");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      firestoreDB
        .collection("Users")
        .doc(this.$route.params.id)
        .collection("Details")
        .doc("Education")
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.education = doc.data();
          } else {
            console.log("Education History not found");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      firestoreDB
        .collection("Users")
        .doc(this.$route.params.id)
        .collection("Details")
        .doc("Awards")
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.award = doc.data();
          } else {
            console.log("Award History not found");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      firestoreDB
        .collection("Users")
        .doc(this.$route.params.id)
        .collection("Details")
        .doc("Extra Curricular")
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.cocu = doc.data();
          } else {
            console.log("Extra-Curricular History not found");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created() {
    this.getUserData();
  },
};
</script>

<style>
.top-div {
  width: 100%;
  height: 536px;
  display: grid;
  align-content: center;
}
.profile-div {
  display: flex;
  align-items: center;
  margin: 30px 0px;
}
.profile-with-icon {
  display: flex;
  margin: 8px 0px;
  align-items: center;
}
.questions-scrollable {
  margin-bottom: 30px;
  width: 100%;
  overflow-x: scroll;
  white-space: nowrap;
  padding: 10px;
}

.questions-scrollable::-webkit-scrollbar {
  width: 20px;
}

/* Track */
.questions-scrollable::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 15px;
}

/* Handle */
.questions-scrollable::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 15px;
}

/* Handle on hover */
.questions-scrollable::-webkit-scrollbar-thumb:hover {
  background: #555;
  border-radius: 15px;
}

@media only screen and (max-width: 800px) {
  .profile-div {
    display: initial;
    text-align: center;
  }
  .user-info {
    margin: 30px 0px;
  }
  .top-div {
    width: 100%;
    height: 700px;
    display: grid;
    align-content: center;
  }
  .profile-with-icon {
    justify-content: center;
  }
  .questions-scrollable {
    overflow-x: none;
  }
}
</style>