<template>
   <v-container>
       <v-layout row class="mb-5">
           <v-flex xs12 sm6 offset-sm3>
               <h1 class="primary--text">Create New Meetup</h1>
           </v-flex>
           
       </v-layout>

       <v-layout row>
           <v-flex xs12>
               <v-form>
                <v-layout row>
                    <v-flex xs12 sm6 offset-sm3>
                        <v-text-field
                            name="title"
                            label="Title"
                            id="title"
                            required
                            v-model="title"
                        >
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs12 sm6 offset-sm3>
                        <v-text-field
                            name="location"
                            label="Location"
                            id="location"
                            v-model="location"
                            required
                        >
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs12 sm6 offset-sm3>
                        <v-text-field
                            name="imageUrl"
                            label="Image URL"
                            id="imageUrl"
                            required
                            v-model="imageUrl"
                        >
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs12 sm6 offset-sm3>
                        <v-img
                            :src="imageUrl"
                            height="200"
                            width="auto"
                        >

                        </v-img>
                    </v-flex>
                </v-layout>
                
                <v-layout row>
                    <v-flex xs12 sm6 offset-sm3>
                        <v-textarea
                            name="description"
                            label="Description"
                            id="description"
                            v-model="description"
                            required
                        >
                        </v-textarea>
                    </v-flex>
                </v-layout>

                <v-layout row class="mb-3">
                    <v-flex xs12 sm6 offset-sm3>
                        <h2>Choose Date time</h2>
                        <v-date-picker v-model="date"></v-date-picker>
                        
                    </v-flex>
                </v-layout>

                <v-layout row class="mb-5">
                    <v-flex xs12 sm6 offset-sm3>
                        <v-time-picker v-model="time" format="24hr" reactive="true"></v-time-picker>
                        
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs12 sm6 offset-sm3>
                        <v-btn class="primary" :disabled="!isFormValid" @click="onCreateMeetup">Create Meetup</v-btn>
                    </v-flex>
                </v-layout>
            </v-form>
           </v-flex>
            
       </v-layout>
   </v-container>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            location: '',
            imageUrl: '',
            description: '',
            date: new Date().toISOString().substr(0,10),
            time: new Date()
        }
    },
    computed: {
        isFormValid() {
            return this.title !== '' &&
                    this.location !== '' &&
                    this.description !== '' &&
                    this.imageUrl !== ''
        },
        submittableDateTime() {
            const date = new Date(this.date);
            if(typeof this.time === 'string') {
                const hours = this.time.match(/^(\d+)/)[1];
                const minutes = this.time.match(/:(\d+)/)[1];
                date.setHours(hours);
                date.setMinutes(minutes);
            } else {
                date.setHours(this.time.getHours());
                date.setMinutes(this.time.getMinutes());
            }
            
            return date;
        }
    },
    methods: {
        onCreateMeetup() {
            const meetupData = {
                title: this.title,
                location: this.location,
                imageUrl: this.imageUrl,
                description: this.description,
                date: this.submittableDateTime,
                id: 'asdflj23'
            }

            this.$store.dispatch('createMeetup',meetupData);
            this.$router.push('/meetups')
        }
    }
}
</script>