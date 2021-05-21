<template>
  <v-card class="pa-10">
    <!-- purely for displaying br"EAD" success status -->
    <v-alert type="success" v-if="submitStatus">Success</v-alert>

    <div class="d-flex justify-space-between">
      <h1 class="mb-4 primary--text">{{ title }}</h1>
      <v-btn icon class="ml-4" @click="addHistory = !addHistory">
        <v-icon v-if="editable" color="primary">mdi-plus</v-icon></v-btn
      >
    </div>

    <v-divider></v-divider>

    <div v-for="(item, n) in items" :key="n" class="my-4">
      <div class="d-flex justify-space-between">
        <h2 class="primary--text font-weight-bold mb-4">
          {{ item.organization }}
        </h2>
        <v-btn icon class="ml-4" @click="getWorkDetail(n)">
          <v-icon v-if="editable" color="primary">mdi-plus</v-icon></v-btn
        >
      </div>
      <div v-for="(detail, m) in item.details" :key="m" class="ma-4 mt-0 mr-0">
        <div class="d-flex justify-space-between">
          <h3 class="font-weight-bold d-flex align-center">
            <span><v-icon>mdi-play</v-icon></span
            >{{ detail.title }}
          </h3>

          <v-btn icon class="ml-4" @click="getDetail(n, m)">
            <v-icon v-if="editable" small color="primary"
              >mdi-pencil</v-icon
            ></v-btn
          >
        </div>
        <h3 v-if="detail.current == false">
          {{ detail.dateStarted }} - {{ detail.dateEnd }}
        </h3>
        <h3 v-else>{{ detail.dateStarted }} - Current</h3>
        <!-- Implementation of the read more read less button -->
        <!-- long description  -->
        <!-- https://stackoverflow.com/questions/61381344/how-to-create-a-show-more-less-button-which-applies-to-individual-element-with-v -->

        <h3 v-if="readMore[`${item.organization}${detail.title}`]">
          {{ detail.description }}
          <span>
            <a
              @click.prevent="showLess(`${item.organization}${detail.title}`)"
              v-if="readMore[`${item.organization}${detail.title}`]"
            >
              Read less
            </a></span
          >
        </h3>
        <h3 v-else>
          {{ detail.description.substring(0, 100) + ".." }}
          <span
            ><a
              @click.prevent="showMore(`${item.organization}${detail.title}`)"
              v-if="!readMore[`${item.organization}${detail.title}`]"
            >
              Read more
            </a>
          </span>
        </h3>
        <!-- short description -->

        <!-- toggleing on and off, `${item.organization}${detail.title}` is used as the hashmap id-->
      </div>
    </div>
    <v-dialog
      v-model="editHistory"
      width="100vw"
      :max-width="$vuetify.breakpoint.mobile ? '300px' : '600px'"
    >
      <!--v-if forces rerendering of component so that it does not affect other operations-->
      <UserHistoryForm
        v-if="editHistory"
        :id="`${this.type} edit`"
        :organization="organization"
        :detail="{ ...details }"
        :index="index"
        @submitted="submitEdit"
        @deleted="submitDelete"
      ></UserHistoryForm>
    </v-dialog>
    <v-dialog
      v-model="addHistory"
      width="100vw"
      :max-width="$vuetify.breakpoint.mobile ? '300px' : '600px'"
    >
      <UserHistoryForm
        v-if="addHistory"
        :id="`${this.type} add`"
        @submitted="submitAdd"
      ></UserHistoryForm>
    </v-dialog>

    <v-dialog
      v-model="addWorkHistory"
      width="100vw"
      :max-width="$vuetify.breakpoint.mobile ? '300px' : '600px'"
    >
      <UserHistoryForm
        v-if="addWorkHistory"
        :organization="organization"
        :index="index"
        :id="`${this.type} addWork`"
        @submitted="submitAddWork"
      ></UserHistoryForm>
    </v-dialog>
  </v-card>
</template>

<script>
import { firestoreDB } from "@/firebase/init.js";
export default {
  components: {
    UserHistoryForm: () =>
      import("~/components/AppComponents/Profile/UserHistoryForm.vue"),
  },
  props: {
    //title of the card
    title: {
      type: String,
    },
    //specifify if it's education/career/ awards, for better modular import of the component
    type: {
      type: String,
    },
    //data associated with the specific type
    items: {
      type: Array,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      // allows all the individual descriptions to be placed in a hashmap to determine whether or not an item is read more or read less
      readMore: {},
      organization: "",
      details: {},
      index: [],
      editHistory: false,
      addHistory: false,
      addWorkHistory: false,
      submitStatus: false,
      key: 0,
    };
  },
  methods: {
    showMore(id) {
      this.$set(this.readMore, id, true);
    },
    showLess(id) {
      this.$set(this.readMore, id, false);
    },
    //prepares the information to be shipped to the child component UserHistoryForm
    getDetail(n, m) {
      this.organization = this.items[n].organization;
      this.details = this.items[n].details[m];
      this.index = [n, m];
      this.editHistory = true;
    },

    getWorkDetail(n) {
      this.organization = this.items[n].organization;
      this.index = [n];
      this.addWorkHistory = true;
    },

    //Makes necessary modification to the items array , and submits to firebase
    submitEdit(organization, details, index) {
      this.key += 1;
      this.items[index[0]].organization = organization;
      this.items[index[0]].details[index[1]] = details;
      //   console.log(this.items, this.type);
      this.submitToFirebase();
    },
    //Makes necessary addition to the items array , and submits to firebase
    submitAdd(organization, details, index) {
      this.key += 1;
      let data = {
        organization: organization,
        details: [details],
      };
      this.items.unshift(data);
      //   console.log(this.items, this.type);
      this.submitToFirebase();
    },
    submitAddWork(organization, details, index) {
      this.key += 1;
      this.items[index[0]].details.unshift(details);
      //   console.log(this.items, this.type);
      this.submitToFirebase();
    },
    //deletes necessary entries in the items array , and submits to firebase
    submitDelete(index) {
      console.log(index);

      this.items[index[0]].details.splice(index[1], 1);
      if (this.items[index[0]].details.length == 0) {
        this.items.splice(index[0], 1);
      }
      this.submitToFirebase();
    },
    //generic code to submit to firebase
    submitToFirebase() {
      firestoreDB
        .collection("Users")
        .doc(this.$route.params.id)
        .collection("Details")
        .doc(this.type)
        .update({ items: this.items })
        .then(() => {
          this.submitStatus = true;
          this.editHistory = false;
          this.addHistory = false;
          this.addWorkHistory = false;
        })
        .then(() => new Promise((resolve) => setTimeout(resolve, 5000)))
        .then(() => {
          this.submitStatus = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.description {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>