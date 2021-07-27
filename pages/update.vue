<template>
  <div>
    <h1>Update Subcontractor performance</h1>
    <h2>{{ wpc.name }}</h2>

    {{ wpc }}
    <template>
      <div>
        <v-data-table
          :headers="headers"
          :items="wpc.work"
          :items-per-page="5"
          class="elevation-1"
          disable-sort
        >
          <template v-slot:[`item.rating`]="{ item }">
            <div class="d-flex align-center justify-center">
              <v-rating
                :readonly="item.subCons ? false : true"
                :value="item.rating"
                v-model="rating[`${item.subCons}`]"
                color="yellow darken-3"
                background-color="grey darken-1"
                half-increments
                hover
                @input="log(rating[`${item.subCons}`], item.subCons)"
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
export default {
  name: "index",
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
      subCons: [],
      wpc: "",
      wpcWork: "",
      rating: {},
    };
  },
  methods: {
    log(item, subCons) {
      console.log(item, subCons);
    },
    /**
     * @param name name of subcon
     * @param rating rating given to subcon
     *
     * Dispatch actions to store to commit mutation and push rating to the scoring
     * Refreshes after dispatching to get most updated rating.
     */
    rateSubCon(name, rating) {
      console.log(name, rating);
      this.$store.dispatch("rateSubCon", { rating, name });
      this.$store.dispatch("updateWPCWork", {
        name: this.wpc.name,
        work: this.wpc.work,
      });
      this.refreshWorksList(this.wpc.name);
    },

    refreshWorksList(name) {
      this.wpc = this.$store.getters["getWPC"].find((x) => x.name == name);
      console.log(this.wpc);
    },
  },
  created() {
    const name = this.$route.query.name;
    this.refreshWorksList(name);
  },
};
</script>


<style scoped>
</style>
