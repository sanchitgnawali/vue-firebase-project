import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loadedMeetups:[
            {imageUrl: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg', id:'asdfljlkjd',title:"Meetup in Newyork",date: new Date(),location: 'New York'},
            {imageUrl: 'https://en.parisinfo.com/var/otcp/sites/images/media/1.-photos/02.-sites-culturels-630-x-405/tour-eiffel-trocadero-630x405-c-thinkstock/37221-1-fre-FR/Tour-Eiffel-Trocadero-630x405-C-Thinkstock.jpg', id:'asdfljldfakjd',title:"Meetup in Paris",date: new Date(),location: 'Paris'},
            {imageUrl: 'https://cdn.londonandpartners.com/assets/73295-640x360-london-skyline-ns.jpg', id:'asdfljlkjdf2d',title:"Meetup in London",date: new Date(),location: 'London'}
        ],
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        setLoadedMeetups(state,payload) {
            state.loadedMeetups = payload;
        },
        createMeetup (state,payload) {
            state.loadedMeetups.push(payload);
        },
        setUser (state,payload) {
            state.user = payload;
        },
        setLoading(state,payload) {
            state.loading = payload;
        },
        setError(state,payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null;
        }
    },
    actions: {
        loadMeetups({commit}) {
            commit('setLoading',true);
            firebase.database().ref('meetups').once('value')
            .then(data =>{
                const meetups = [];
                const obj = data.val();

                for(let key in obj) {
                    meetups.push({
                        id: key,
                        title: obj[key].title,
                        description: obj[key].description,
                        imageUrl:  obj[key].imageUrl,
                        date: obj[key].date
                    });
                }
                commit('setLoadedMeetups',meetups);
                commit('setLoading',false);
            })
            .catch(error =>{
                console.log(error);
                commit('setLoading',false);
            })
        },
        createMeetup({commit},payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date.toISOString()
            }
            firebase.database().ref('meetups').push(meetup)
                .then(data => {
                    console.log(data);
                    commit('createMeetup',{...meetup,id:data.key});

                }).catch(error=>{
                    console.log(error);
                });
        },
        signUserUp({commit},payload) {
            commit('setLoading',true);
            commit('clearError');

            firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
            .then(
                data => {
                    commit('setLoading',false);
                    const newUser = {
                        id: data.user.uid,
                        registeredMeetups: []
                    }
                    
                    commit('setUser',newUser);
                }
            ).catch( error => {
                commit('setLoading',false);
                commit('setError',error);
               
            });
        },
        signUserIn({commit},payload) {
            commit('setLoading',true);
            commit('clearError');
            firebase.auth().signInWithEmailAndPassword(payload.email,payload.password)
                .then(user => {
                    commit('setLoading',false);
                   
                    const newUser = {
                        id: user.id,
                        registeredMeetups: []
                    }
                    commit('setUser',newUser);
                }).catch(error => {
                    commit('setLoading',false);
                    commit('setError',error);
                    
                });
        },
        clearError({commit}) {
            commit('clearError');
        }
    },
    getters:{
        loadedMeetups(state) {
            return state.loadedMeetups.sort((meetupA,meetupB)=>{
                return meetupA.date > meetupB.date;
            });
        },
        loadedMeetup(state) {
            return (meetupId) => {
                return state.loadedMeetups.find((meetup)=> {
                    return meetup.id == meetupId;
                });
            }
        },
        user(state) {
            return state.user;
        },
        error(state) {
            return state.error;
        },
        loading(state) {
            return state.loading;
        }
    }
});