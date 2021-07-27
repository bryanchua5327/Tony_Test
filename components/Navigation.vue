<template>
  <v-main>
    <v-select
      label="Navigate"
      solo
      :items="[`WPC`, `Subworks`, `Update`]"
      v-model="select"
    ></v-select>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      select: null,
    };
  },
  watch: {
    select: {
      handler() {
        const select = this.select;
        if (select == `WPC`) {
          this.$router.push({ path: "/", query: { name: "ABC Company" } });
        } else if (select == `Subworks`) {
          this.$router.push({ path: "/subworks", query: { code: "PR01" } });
        } else if (select == `Update`) {
          this.$router.push({
            path: "/update",
            query: { name: "ABC Company" },
          });
        }
      },
    },
  },
};
</script>

<style>
</style>