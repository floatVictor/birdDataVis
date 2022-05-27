<template>
    <div class = "varList">
        <dropDown @sendValue = "received"/>
    </div>   
</template>

<script>
import dropDown from "@/components/dropDown.vue"

export default {
    name : "varList",
    data() {
        return {
            country : "FR",
        }
    },
    components : {
        dropDown,
    },
    methods : {
        received(mess) {
            this.country = mess
            console.log(mess)
            this.$emit("countryCode",this.country)
        }
    },
}

</script>
