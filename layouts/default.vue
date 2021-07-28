<template>
  <v-app>
    <!-- Sizes your content based upon application components -->

    <v-main class="main-div">
      <!-- Provides the application the proper gutter -->

      <v-container fluid class="main-cont">
        <!-- <AppBar @sideNavToggle="toggleSideBar" /> -->
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "~/components/Appheader.vue";
export default {
  components: {
    AppBar,
  },
  name: 'DefaultLayout',
  data() {
    return {
      drawer: false,
    };
  },
  methods: {},
};
</script>

<style scoped>
.main-cont {
  width: 700px;
  padding-bottom: 100px;
}
.main-div {
  background-color: #f5f5f5;
}
.shader {
  background-color: #e3e3e3;
  height: 535px;
}
.push-up {
  position: relative;
  bottom: 535px;
}
.footer {
  position: absolute;
  bottom: 0;
}
@media only screen and (max-width: 800px) {
  .main-cont {
    width: 100%;
  }
  .main-div {
    background-color: #f5f5f5;
  }
}
</style>