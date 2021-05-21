<template>
  <div></div>
</template>

<script>
export default {
  components: {
    Lists: () => import("~/components/AppComponents/Lists.vue"),
    QuestionsCard: () => import("~/components/AppComponents/QuestionsCard.vue"),
  },

  data() {
    return {};
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  destroyed() {
    console.log("destroyed");
  },
};
</script>

<style>
</style>