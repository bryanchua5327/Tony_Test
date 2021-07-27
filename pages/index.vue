<template>
  <div>
    <h1>WPC Account Main page</h1>
    <h2>{{ wpc.name }}</h2>
    <Navigation></Navigation>
    <v-card-subtitle
      >Click on code to view individual subwork's
      Subcontractors</v-card-subtitle
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
          <template v-slot:[`item.action`]="{ item }">
            <v-btn class="mr-2" icon @click="action(item)">
              <v-icon small color="green">mdi-pencil</v-icon></v-btn
            >

            <v-btn class="mr-2" icon @click="action(item)">
              <v-icon small color="red">mdi-delete</v-icon></v-btn
            >
          </template>
          <template v-slot:[`item.code`]="{ item }">
            <nuxt-link :to="`/subworks?code=${item.code}`">{{
              item.code
            }}</nuxt-link>
          </template></v-data-table
        >
      </div>
    </template>
  </div>
</template>

<script>
import Navigation from "~/components/Navigation.vue";
export default {
  components: {
    Navigation,
  },
  name: "index",
  // middleware: "authentication"
  data() {
    return {
      headers: [
        { text: "Scope", value: "scope" },
        { text: "Code", value: "code" },
        { text: "Start Date", value: "startDate" },
        { text: "Amount(RM)", value: "amount" },
        { text: "Grade", value: "grade" },
        { text: "Action", value: "action", align: "center" },
      ],

      work: [],
      wpc: null,
    };
  },
  methods: {
    action(item) {
      console.log(item);
    },
  },
  created() {
    //name= ABC Company  --WPC company
    const name = this.$route.query.name;
    console.log(name);
    this.wpc = this.$store.getters["getWPC"].find((x) => x.name == name);
  },
};
</script>

<style scoped>
</style>
