<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title class="primary--text">
                        {{meetup.title}}
                    </v-card-title>
                    <v-img
                                    :src="meetup.imageUrl"
                                    height="400px"
                                ></v-img>
                    <v-card-text>
                        <div class="primary--text">{{meetup.date | date}} - {{meetup.location}}</div>
                        {{meetup.description}}
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="primary">
                            Register
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

export default {
    props: ['id'],
    computed: {
        meetup() {
            return this.$store.getters.loadedMeetup(this.id);
        }
    }    
}
</script>