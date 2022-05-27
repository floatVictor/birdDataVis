<template>
  <div class="fetchData">
    <varList @countryCode="updateCountryCode" />
  </div>
</template>

<script>
  import varList from "@/components/varList.vue";

  export default {
    name: "fetchData",
    data() {
      return {
        country: "FR",
        recentNotableData: [],
      };
    },
    setup() {},
    components: {
      varList,
    },
    recentNotableObsRegion(mess) {
      fetch("ttps://api.ebird.org/v2/data/obs/" + mess + "/recent", {
        method: "GET",
        headers: {
          "x-ebirdapitoken": "u0mb9n49a1an",
        },
      })
        .then(function (response) {
          this.recentNotableData = response;
          console.table(this.recentNotableData);
          this.$emit("recentNotableData", this.recentNotableData);
        })
        .then((data) => console.table(data));
    },
  };
</script>
