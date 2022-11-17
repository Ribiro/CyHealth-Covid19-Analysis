import Vue from "vue";
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);
axios.defaults.baseURL = 'https://covid-193.p.rapidapi.com';
axios.defaults.headers.common['X-RapidAPI-Key'] = '2de426e07amsh74f877917c143b7p1eb7f7jsn22096181602d';
axios.defaults.headers.common['X-RapidAPI-Host'] = 'covid-193.p.rapidapi.com';

export default new Vuex.Store({
    // state
    state: {
        statistics: {},
        history: {}
    },

    // mutations
    mutations: {
        // set the fetched statistics
        setStatistics(state, payload){
            state.statistics = payload
        },

        // set the fetched history
        setHistory(state, payload){
            state.history = payload
        }
    },

    // actions
    actions: {
        // get statistics from the statistic's endpoint
        getStatistics(context){            
            return new Promise((resolve, reject) => {
                axios.get('/statistics')
                    .then(response => {
                        context.commit('setStatistics', response.data)
                        resolve(resolve)
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error);
                        reject(error)
                    })
            })
        },

        // get history
        getHistory(context, country, day){   
            axios.defaults.params = {country: country, day: day};         
            return new Promise((resolve, reject) => {
                axios.get('/history')
                    .then(response => {
                        context.commit('setHistory', response.data)
                        resolve(resolve)
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error);
                        reject(error)
                    })
            })
        },
    }
})