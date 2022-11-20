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
        statistics: [],
        selectedStatistic: [],
        countries: [],
        country: '',
        labels: [],
        cases_data: [],
        deaths_data: [],
        tests_data: []
    },

    // mutations
    mutations: {
        // set the fetched statistics
        setStatistics(state, payload){
            state.statistics = payload
        },

        setHistoryData(state, payload){
            state.labels = payload.labels
            state.cases_data = payload.cases
            state.deaths_data = payload.deaths
            state.tests_data = payload.tests
        },

        // set the fetched countries
        setCountries(state, payload){
            state.countries = payload
        },

        // filtering logic
        addStatisticsSelection(state, payload) {
            state.country = payload;
            let filtered = []
            for (let i=0; i<state.statistics.length; i++){
                if (state.statistics[i].Country == state.country){
                    filtered.push(state.statistics[i])
                    state.selectedStatistic = filtered
                }
            }
        },

    },

    // actions
    actions: {
        // get statistics from the statistic's endpoint
        getStatistics(context){            
            return new Promise((resolve, reject) => {
                axios.get('/statistics')
                    .then(response => {
                        const statistics = response.data.response;
                        const dataArray = [];

                        statistics.forEach(function (item, index){
                            dataArray.push({
                                Index: index,
                                Country: item.country, 
                                Continent: item.continent, 
                                Total_Cases: item.cases.total, 
                                Total_Recovered: item.cases.recovered, 
                                Total_Deaths: item.deaths.total, 
                                Total_Tests: item.tests.total, 
                                Population: item.population, 
                                Day: item.day
                            })
                        });
                        context.commit('setStatistics', dataArray)
                        resolve(resolve)
                    })
                    .catch(error => {
                        console.log(error);
                        reject(error)
                    })
            })
        },

        // Fetch countries
        getCountries(context){
            return new Promise((resolve, reject) => {
                axios.get('/countries')
                    .then(response => {
                        const countries_data = response.data.response
                        let countries = []

                        for (let i=0; i < countries_data.length; i++){
                            countries.push({
                                id: i,
                                country: countries_data[i]
                            })
                        }
                        // console.log(countries)
                        context.commit('setCountries', countries)
                        resolve(resolve)
                    })
                    .catch(error => {
                        console.log(error);
                        reject(error)
                    })
            })
        },

        // get history
        getHistory(context, payload){         
            return new Promise((resolve, reject) => {
                axios.get('/history', {params: {country: payload.country, day: payload.day}})
                    .then(response => {
                        const history = response.data.response;
                        const historyData = [];
                        const payload_data = {
                            cases: [],
                            deaths: [],
                            tests: [],
                            labels: []
                        }

                        history.forEach(function(item, index){
                            var date = new Date(item.time);

                            const date_to_use = date.getUTCHours() + ':' + date.getUTCMinutes() + ':' + date.getUTCSeconds()
                            historyData.push({
                                Index: index,
                                New_Cases: item.cases.new*1,
                                New_Deaths: item.deaths.new*1,
                                Total_Tests: item.tests['1M_pop'],
                                Time: item.time,
                                UTC_Time: date,
                                Formatted_Time: date_to_use
                            })
                        })

                        for (let i =historyData.length-1; i>=0; i--){
                            payload_data.cases.push(historyData[i].New_Cases)
                            payload_data.deaths.push(historyData[i].New_Deaths)
                            payload_data.tests.push(historyData[i].Total_Tests)
                            payload_data.labels.push(historyData[i].Formatted_Time)
                        }
                        // console.log(payload_data)
                        // context.commit('setHistory', historyData)
                        context.commit('setHistoryData', payload_data)
                        resolve(resolve)
                    })
                    .catch(error => {
                        console.log(error);
                        reject(error)
                    })
            })
        },

        filterStatistics(context, table_selected_country){
            context.commit('addStatisticsSelection', table_selected_country) 
        }
    },

    getters: {
        labels: state => {
            return state.labels;
        },
        cases_data: state => {
            return state.cases_data;
        },
        deaths_data: state => {
            return state.deaths_data;
        },
        tests_data: state => {
            return state.tests_data;
        },
        filteredStatistics: state=> {
            return state.selectedStatistic
        }
    }
})