<template>
  <div>
    <h1>Update Subcontractor performance</h1>
    <h2>{{ wpc.name }}</h2>
    <Navigation></Navigation>
    <v-card-subtitle
      >Here is where you actually rate your subcontractors<br />When you rate
      them using the rating star, the value gets emitted as a float<br />We can
      also set allow ratings for jobs that have an assigned
      subcontractors</v-card-subtitle
    >

    <template>
      <div>
        <v-data-table
          :headers="headers"
          :items="wpc.work"
          :items-per-page="10"
          class="elevation-1"
          disable-sort
        >
          <template v-slot:[`item.rating`]="{ item }">
            <div class="d-flex align-center justify-center">
              <v-rating
                :readonly="item.subCons && !item.rating ? false : true"
                v-model="item.rating"
                color="yellow darken-3"
                background-color="grey darken-1"
                half-increments
                hover
                @input="rateSubCon(item.subCons, item.rating)"
              ></v-rating>
              {{ `(${item.rating ? item.rating.toFixed(1) : 0})` }}
            </div>
          </template>
        </v-data-table>
      </div>
    </template>
  </div>
</template>

<script>
import Navigation from "~/components/Navigation.vue";
import _ from "lodash";
import { mapGetters } from "vuex";

export default {
  name: "UpdateSubconsPage",
  components: {
    Navigation: () => import("@/components/Navigation"),
  },
  // middleware: "authentication"
  data() {
    return {
      headers: [
        { text: "Status", value: "status" },
        { text: "Sub-Contractor", value: "subCons" },
        { text: "Description", value: "scope" },
        { text: "EST Value(RM)", value: "200000" },
        { text: "Target Award Date", value: "startDate" },
        { text: "Revised Award Date", value: "revisedAwardDate" },
        { text: "Progress Amount", value: "progressAmt" },
        { text: "Work Progress (%)", value: "progressPercent" },
        { text: "Rating", value: "rating", align: "center" },
      ],
      wpcName: "",
    };
  },
  computed: {
    ...mapGetters(["getOneWPC"]),

    wpc() {
      const wpc = this.getOneWPC(this.wpcName);
      return _.cloneDeep(wpc);
    },
  },

  methods: {
    /**
     * @param name name of subcon
     * @param rating rating given to subcon
     *
     * Dispatch actions to store to commit mutation and push rating to the scoring
     * Refreshes after dispatching to get most updated rating.
     */
    rateSubCon(name, rating) {
      this.$store.dispatch("rateSubCon", { rating, name });
      this.$store.dispatch("updateWPCWork", {
        name: this.wpc.name,
        work: this.wpc.work,
      });
    },
  },
  created() {
    this.wpcName = this.$route.query.name;
  },
};
</script>


<style scoped>
</style>
