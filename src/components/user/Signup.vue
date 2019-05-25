<template>
   <v-container>
       <v-layout row v-if="error">
           <v-flex xs12 sm6 offset-sm3>
               <app-alert @dismissed="onDismissed" :text="error"></app-alert>
           </v-flex>
       </v-layout>

       <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <v-form>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                            name = "email"
                                            label = "Email Address"
                                            id="email"
                                            v-model="email"
                                            type="email"
                                            :rules="emailRules"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>

                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                            name = "password"
                                            label = "Password"
                                            id="password"
                                            v-model="password"
                                            type="password"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>

                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                            name = "confirm_password"
                                            label = "Confirm Password"
                                            id="confirm_password"
                                            v-model="confirm_password"
                                            :rules="[comparePasswords]"
                                            type="password"
                                            required
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>

                                <v-layout row>
                                    <v-flex xs12>
                                        <v-btn class="primary" @click="onSignup" :disabled="loading" :loading="loading">
                                            Sign Up
                                            <template v-slot:loader>
                                                <span class="custom-loader">
                                                <v-icon light>cached</v-icon>
                                                </span>
                                            </template>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
       </v-layout>
       
   </v-container>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            password: '',
            confirm_password: ''
        }
    },
    methods: {
        onSignup() {
            //vuex
           this.$store.dispatch('signUserUp',{email: this.email,password: this.password});
        },
        onDismissed() {
            this.$store.dispatch('clearError');
        }
    },
    computed: {
        comparePasswords() {
            return this.password !== this.confirm_password ? "Passwords do not match" : true;
        },
        user() {
            return this.$store.getters.user;
        },
        error() {
            return this.$store.getters.error;
        },
        loading() {
            return this.$store.getters.loading;
        }
    },
    watch: {
        user(value) {
            if(value !==null && value != undefined) {
                this.$router.push('/');
            }
        }
    }

}
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>