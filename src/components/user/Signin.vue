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
                                       <v-btn class="primary" @click="onSignin" :disabled="loading" :loading="loading">
                                            Sign In
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
        onSignin() {
            //vuex
            this.$store.dispatch('signUserIn',{email: this.email,password: this.password});
        },
        onDismissed() {
            this.$store.dispatch('clearError');
        }
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        loading() {
            return this.$store.getters.loading;
        },
        error() {
            return this.$store.getters.error;
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