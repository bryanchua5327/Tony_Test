<template>
  <div>
    <h1>Subwork</h1>
    <h2>{{ $route.query.code }} - List of Subcons Available</h2>
    <template>
      <div>
        <v-data-table
          :headers="headers"
          :items="subCons"
          :items-per-page="5"
          class="elevation-1"
          disable-sort
        >
          <template v-slot:[`item.rating`]="{ item }">
            <div class="d-flex align-center justify-center">
              <v-rating
                v-model="item.rating"
                color="yellow darken-3"
                background-color="grey darken-1"
                half-increments
                hover
                @input="rateSubCon(item.name, item.rating)"
              ></v-rating>
              {{ `(${item.rating.toFixed(1)})` }}
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
        { text: "Name", value: "name" },
        { text: "Rating", value: "rating", align: "center" },
      ],
      subCons: [],
    };
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
      this.refreshSubConList();
    },

    refreshSubConList() {
      this.subCons = this.$store.getters["getRating"].filter((x) =>
        x.work.includes(this.$route.query.code)
      );
    },
  },
  created() {
    this.refreshSubConList();
  },
};
</script>


<style scoped>
</style>
