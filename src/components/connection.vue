<template>
  <div id="connection"></div>
</template>

<script>
export default {
  name: "apiConnection",
  data() {
    return {
      totalVuePackages: null,
    };
  },
  async created() {
    fetch(`https://api.ebird.org/v2/data/obs/FR/recent`, {
      method: "GET",
      headers: {
        "x-ebirdapitoken": "u0mb9n49a1an",
      },
    }).then((response) => response.json());
    // .then((data) => console.table(data))
  },
};
</script>
