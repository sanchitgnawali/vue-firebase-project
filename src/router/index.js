import Vue from 'vue';
import Router from 'vue-router';
import Home from './../components/Home.vue';
import Meetups from '../components/meetup/Meetups.vue';
import CreateMeetup from '../components/meetup/CreateMeetup.vue';
import Meetup from '../components/meetup/Meetup.vue';
import Profile from '../components/user/Profile.vue';
import Signin from '../components/user/Signin.vue';
import Signup from '../components/user/Signup.vue';
import PageNotFound from '../components/PageNotFound.vue';
Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {path: '/',name: 'Home',component:Home},
        {path: '/meetups',name: 'Meetups',component:Meetups},
        {path: '/meetup/new',name: 'CreateMeetup',component:CreateMeetup},
        {path:'/meetups/:id',name:'Meetup',props: true,component:Meetup},
        {path: '/profile',name: 'Profile',component:Profile},
        {path: '/signin',name: 'Signin',component:Signin},
        {path: '/signup',name: 'Signup', component: Signup},
        {path: '*',name: 'PageNotFound',component:PageNotFound}
    ]
});
