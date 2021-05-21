<template>
  <v-card class="pa-10">
    <v-alert type="success" v-if="submitStatus">Success</v-alert>

    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="submit"
      id="history-form"
    >
      <v-text-field
        v-model="organizationReactive"
        label="Organization"
        required
      ></v-text-field>
      <v-row>
        <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 4">
          <v-menu
            v-model="menuStartDate"
            :close-on-content-click="true"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="detailReactive.dateStarted"
                label="Start Date"
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                id="Start Date"
                required
                hide-details=""
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="detailReactive.dateStarted"
              @input="menu2 = false"
            ></v-date-picker> </v-menu
        ></v-col>
        <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 4">
          <v-menu
            v-model="menuEndDate"
            :close-on-content-click="true"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="detailReactive.dateEnd"
                label="End Date"
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                id="End Date"
                :disabled="detailReactive.current"
                hide-details=""
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="detailReactive.dateEnd"
              @input="menu2 = false"
            ></v-date-picker> </v-menu
        ></v-col>
        <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 4">
          <v-checkbox
            v-model="detailReactive.current"
            label="Are you Currently working here?"
          ></v-checkbox
        ></v-col>
      </v-row>

      <v-text-field
        v-model="detailReactive.title"
        label="Title"
        required
      ></v-text-field>

      <v-textarea
        v-model="detailReactive.description"
        label="Description"
        required
        rows="3"
      ></v-textarea>

      <div
        class="d-flex"
        :class="
          $vuetify.breakpoint.mobile
            ? `justify-center flex-column`
            : `justify-space-between`
        "
      >
        <div :class="$vuetify.breakpoint.mobile ? `d-flex flex-column` : ``">
          <v-btn color="error" class="my-4" @click="reset"> Reset Form </v-btn>
          <v-btn
            type="submit"
            :disabled="!valid"
            color="success"
            form="history-form"
            class="my-4"
            >Submit</v-btn
          >
        </div>

        <!-- delete button renders when and only when it's in edit mode -->
        <!-- which is dictated by whether or not an index is given -->
        <v-btn
          color="warning"
          class="my-4"
          form="history-form"
          v-if="index.length > 1"
          @click="deleteConfirm = !deleteConfirm"
          >Delete</v-btn
        >
      </div>
    </v-form>
    <v-dialog v-model="deleteConfirm" width="400px">
      <v-card
        class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
        color="primary"
        dark
      >
        <h2 class="white--text text--lighten-1 mb-4">
          Are you sure you want to delete?
        </h2>

        <v-btn plain dark color="red darken-1" @click="deleteItem()"
          >Delete</v-btn
        >
        <v-btn plain dark @click="deleteConfirm = !deleteConfirm">Cancel</v-btn>
        <!-- </v-card> -->
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { firestoreDB } from "@/firebase/init.js";
export default {
  props: {
    detail: {
      type: Object,
      default: () => ({
        title: "",
        dateStarted: "",
        dateEnd: "",
        current: false,
        description: "",
      }),
    },
    organization: {
      type: String,
      default: "",
    },
    index: {
      type: Array,
      default: () => [],
    },

  },
  watch: {
    current: {
      handler() {
        this.detail.dateEnd = "";
      },
    },
    detail: {
      handler() {
        this.detailReactive = this.detail;
      },
    },
  },
  data() {
    return {
      submitStatus: false,
      valid: true,
      menuStartDate: false,
      menuEndDate: false,
      detailReactive: {},
      organizationReactive: "",
      deleteConfirm: false,
    };
  },
  methods: {
    //easier way to reset a form and it follows the schema too
    reset() {
      this.$refs.form.reset();
    },
    //submits with a payload for further action by the lists page
    submit(e) {
      this.$emit(
        "submitted",
        this.organizationReactive,
        this.detailReactive,
        this.index
      );
      console.log("submit");
    },
    //deletes with a payload for further action by the lists page
    deleteItem() {
      this.$emit("deleted", this.index);
      this.deleteConfirm = false;
    },
  },
  created() {
    //We cannot directly mutate props, and there's an issue of reactivity between child and parent component
    // So i created a placeholder element that references the props and grants reactivity to only the child component
    this.organizationReactive = this.organization;
    this.detailReactive = this.detail;
  },
  computed: {
    // obtains information on if the user is still working on the current location.
    // this is mainly used to toggle disable on dateEnd.
    current() {
      return this.detail.current;
    },
  },
};
</script>

<style>
</style>