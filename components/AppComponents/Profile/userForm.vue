<template>
  <v-card class="pa-10">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="submit"
      id="profile-form"
    >
      <v-text-field
        v-model="user.firstName"
        :counter="15"
        :rules="nameRules"
        label="First Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="user.lastName"
        :counter="15"
        :rules="nameRules"
        label="Last Name"
        required
      ></v-text-field>

      <v-combobox
        v-model="user.field"
        :items="fieldChoice"
        :rules="[(v) => !!v || 'Item is required']"
        label="Field"
        required
        chips
        multiple
      ></v-combobox>
      <v-combobox
        v-model="user.location"
        :items="locationChoice"
        :rules="[(v) => !!v || 'Item is required']"
        label="Location"
        required
        :menu-props="{ bottom: true, offsetY: true }"
      ></v-combobox>

      <v-text-field v-model="user.role" label="Role" required></v-text-field>
      <v-text-field
        v-model="user.oneLiner"
        label="OneLiner"
        required
      ></v-text-field>
      <v-text-field
        v-model="user.organization"
        label="organization"
        required
      ></v-text-field>

      <div class="d-flex">
        <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
        <v-btn
          type="submit"
          :disabled="!valid"
          color="success"
          form="profile-form"
          >Update</v-btn
        >
      </div>
    </v-form>
  </v-card>
</template>

<script>
import { firestoreDB } from "@/firebase/init.js";
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      submitStatus: false,
      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 15) || "Name must be less than 10 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      select: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: false,
      fieldChoice: ["doctor", "engineer", "lawyer"],
      locationSample: {
        PERLIS: ["PERLIS"],

        KEDAH: [
          "KOTA SETAR",
          "KUBANG PASU",
          "PADANG TERAP",
          "LANGKAWI",
          "KUALA MUDA",
          "YAN",
          "SIK",
          "BALING",
          "KULIM",
          "BANDAR BAHARU",
          "PENDANG",
          "POKOK SENA",
        ],

        KELANTAN: [
          "BACHOK",
          "KOTA BHARU",
          "MACHANG",
          "PASIR MAS",
          "PASIR PUTEH",
          "TANAH MERAH",
          "TUMPAT",
          "GUA MUSANG",
          "KUALA KRAI",
          "JELI",
          "KECIL LOJING",
        ],

        TERENGGANU: [
          "BESUT",
          "DUNGUN",
          "KEMAMAN",
          "KUALA TERENGGANU",
          "HULU TERENGGANU",
          "MARANG",
          "SETIU",
        ],

        PULAUPINANG: [
          "SEBERANG PERAI TENGAH",
          "SEBERANG PERAI UTARA",
          "SEBERANG PERAI SELATAN",
          "TIMOR LAUT",
          "BARAT DAYA",
        ],

        PERAK: [
          "BATANG PADANG",
          "MANJUNG",
          "KINTA",
          "KERIAN",
          "KUALA KANGSAR",
          "LARUT & MATANG",
          "HILIR PERAK",
          "HULU PERAK",
          "SELAMA",
          "PERAK TENGAH",
          "KAMPAR",
        ],

        PAHANG: [
          "BENTONG",
          "CAMERON HIGHLANDS",
          "JERANTUT",
          "KUANTAN",
          "LIPIS",
          "PEKAN",
          "RAUB",
          "TEMERLOH",
          "ROMPIN",
          "MARAN",
          "BERA",
        ],

        SELANGOR: [
          "KLANG",
          "KUALA LANGAT",

          "KUALA SELANGOR",
          "SABAK BERNAM",
          "ULU LANGAT",
          "ULU SELANGOR",
          "PETALING",
          "GOMBAK",
          "SEPANG",
        ],

        KUALALUMPUR: ["W.P.KUALA LUMPUR"],

        PUTRAJAYA: ["W.P.PUTRAJAYA"],

        NEGERISEMBILAN: [
          "JELEBU",
          "KUALA PILAH",
          "PORT DICKSON",
          "REMBAU",
          "SEREMBAN",
          "TAMPIN",
          "JEMPOL",
        ],
        MELAKA: ["MELAKA TENGAH", "JASIN", "ALOR GAJAH"],

        JOHOR: [
          "BATU PAHAT",
          "JOHOR BAHRU",
          "KLUANG",
          "KOTA TINGGI",
          "MERSING",
          "MUAR",
          "PONTIAN",
          "SEGAMAT",
          "KULAIJAYA",
          "LEDANG",
        ],

        LABUAN: ["W. P. LABUAN"],

        SABAH: [
          "KOTA KINABALU",
          "PAPAR",
          "KOTA BELUD",
          "TUARAN",
          "KUDAT",
          "RANAU",
          "SANDAKAN",
          "LABUK & SUGUT",
          "KINABATANGAN",
          "TAWAU",

          "LAHAD DATU",
          "SEMPORNA",
          "KENINGAU",
          "TAMBUNAN",
          "PENSIANGAN",
          "TENOM",
          "BEAUFORT",
          "KUALA PENYU",
          "SIPITANG",
          "PENAMPANG",
          "KOTA MARUDU",
          "PITAS",
          "KUNAK",
          "TONGOD",
          "PUTATAN",
        ],

        SARAWAK: [
          "KUCHING",
          "SRI AMAN",
          "SIBU",
          "MIRI",
          "LIMBANG",
          "SARIKEI",
          "KAPIT",
          "SAMARAHAN",
          "BINTULU",
          "MUKAH",
          "BETONG",
        ],
      },
    };
  },
  created() {
    // this.AddNewUser();
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    submit(e) {
      firestoreDB
        .collection("Users")
        .doc(this.user.userId)
        .update({ ...this.user })
        .then(() => (this.submitStatus = true))
        .then(() => new Promise((resolve) => setTimeout(resolve, 2000)))
        .then(() => {
          this.$emit("submitted", this.user);
          this.submitStatus = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    AddNewUser() {
      let docRef = firestoreDB.collection("Users").doc();

      let id = docRef.id;

      docRef
        .set({
          phoneNumber: "0123429200",
          firstName: "John ",
          role: "Student",
          location: "Kuala Lumpur,Malaysia",
          userId: id,
          type: "Professional",
          organization: "SMK BU",
          field: ["doctor", "engineer", "lawyer"],
          oneLiner: "I want to become a doctor",
          email: "Mayonice@hotmail.com",
          lastName: "Mayo",
        })
        .then((doc) => {
          console.log("Updated");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    locationChoice() {
      let array = [];
      let choices = this.locationSample;
      console.log(choices);
      for (var key in choices) {
        if (choices.hasOwnProperty(key)) {
          for (var item in choices[key]) {
            array.push(choices[key][item] + ", " + key);
          }
        }
      }
      return array;
    },
  },
};
</script>

<style>
</style>