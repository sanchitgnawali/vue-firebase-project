<template>
    <v-container>
        <v-layout row wrap class="mb-3">
            <v-flex xs12 sm6 class="text-sm-right text-xs-center">
                <v-btn large router to="/meetups" class="info">Explore Meetups</v-btn>
            </v-flex>
            <v-flex xs12 sm6 class="text-sm-left text-xs-center">
                <v-btn large router to="/meetup/new" class="info">Organize Meetup</v-btn>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs12>
                <v-carousel style="cursor:pointer">
                    <v-carousel-item v-for="meetup in meetups"
                    :src="meetup.imageUrl"
                    :key="meetup.id" @click="onLoadMeetup(meetup.id)">
                    <div class="title">
                        {{meetup.title}}
                    </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
export default {
    
    computed: {
           meetups() {
               return this.$store.getters.loadedMeetups;
           }
    },
    methods: {
        onLoadMeetup(id) {
            this.$router.push('/meetups/'+id);
        }
    }
}
</script>

<style scoped>
    .title {
        position: absolute;
        bottom: 50px;
        background-color: #000;
        color: #fff;
        padding: 20px;
    }
</style>