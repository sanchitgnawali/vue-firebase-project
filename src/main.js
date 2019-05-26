import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import * as firebase from 'firebase';
import router from './router/index';
import {store} from './store/index';
import DateFilter from './filters/date';
import AlertComponent from './components/shared/Alert.vue';

Vue.config.productionTip = false
Vue.filter('date',DateFilter);
Vue.component('app-alert',AlertComponent);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    var firebaseConfig = {
      apiKey: "AIzaSyAzYHu0u0oO4BmL_njykGOyZKJRloN3JZs",
      authDomain: "devmeetup-d0ff3.firebaseapp.com",
      databaseURL: "https://devmeetup-d0ff3.firebaseio.com",
      projectId: "devmeetup-d0ff3",
      storageBucket: "devmeetup-d0ff3.appspot.com",
      messagingSenderId: "56356671159",
      appId: "1:56356671159:web:439cc24fb00e8df1"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    //load the meetups from the firebase
    this.$store.dispatch('loadMeetups');
  }
}).$mount('#app')
