<template>
  <v-card class="questions-card">
    <v-img
      :src="`https://picsum.photos/500/300?image=${Math.floor(
        Math.random() * 100
      )}`"
      :aspect-ratio="`${400 / 220}`"
      gradient="to top right, rgba(0,0,0,.7), rgba(0,0,0,.3)"
    >
      <div class="grid-container">
        <div class="Photo">
          <v-avatar size="55"> <img :src="photoUrl" /> </v-avatar>
        </div>
        <div class="Header d-flex justify-space-between pt-4 pr-4">
          <h4 class="white--text">
            <strong>{{ user.firstName.substring(0, 10) }}</strong>
          </h4>
          <h4 class="white--text">
            {{ School.substring(0, 10) + ".." }}
          </h4>
        </div>
        <div class="Text">
          <h1 class="white--text">"{{ title.substring(0, 50) + ".." }}"</h1>
        </div>
        <div class="Foot">
          <div class="d-flex justify-space-between align-center footer">
            <h4 class="white--text">
              <span>
                <v-icon x-small color="white"
                  >mdi-message-text-outline</v-icon
                ></span
              >
              {{ Math.floor(Math.random() * 100) }} Comments
            </h4>
            <h4 class="white--text">
              <span> <v-icon x-small color="white">mdi-calendar</v-icon></span>
              {{ `${date}`.substring(4, 21) }}
            </h4>
          </div>
        </div>
      </div>
    </v-img>
  </v-card>
</template>

<script>

export default {
  data() {
    return {
      photoUrl: "https://cdn.vuetifyjs.com/images/john.jpg",
      School: "SMK Methodist something",
      user: {
        userId: 123,
        type: "Student",
        firstName: "Donald ",
        lastName: "Glover",
        email: "DGindahouse@hotmail.com",
        phoneNumber: "0123429200",
        field: ["doctor", "engineer", "lawyer"],
        location: "Kuala Lumpur,Malaysia",
        oneLiner: "Helping is second nature to me",
        role: "Co-founder",
        organization: "Anytec",
      },
      title: "What Is The Difference Between Chemist And Chemical Engineer?",
      date: new Date(),
    };
  },
};
</script>

<style scoped>
.questions-card {
  width: 400px;
  margin: 30px 30px 30px 0px;
  display: inline-block;
  transition: all ease 0.5s;
}
.questions-card:hover {
  transition: all ease 0.5s;
  transform: scale(1.05);
}
.question-image {
  position: relative;
}
.grid-container {
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: 1fr 2fr 2fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "Photo Header"
    "Photo Text"
    "Photo Text"
    "Foot Foot";
}
.Photo {
  grid-area: Photo;
  display: grid;
  place-items: center;
  padding: 0px 30px;
}
.Text {
  grid-area: Text;
  place-items: center;
  height: 100%;
  display: grid;
  line-height: 1.6em;
}

.Header {
  grid-area: Header;
}

.Foot {
  grid-area: Foot;
}
.footer {
  height: 100%;
  padding: 0px 30px;
}
@media only screen and (max-width: 800px) {
  .questions-card {
    display: initial;
  }
}
</style>