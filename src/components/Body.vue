<template>
    <div class="banner">
        <div class="btn-group btn-toggle gender">
            <div v-if="show"><input @click="switch_buttons()" type="button" name="view" class="btn btn-default" value="Graphical View" style="border: 1px solid #329ae4;"></div> 
            <div v-if="!show"><input @click="switch_buttons()" type="button" name="view" class="btn" value="Graphical View" id="custom-button"></div>
            <div v-if="!show"><input @click="switch_buttons()" type="button" name="view" class="btn btn-default" value="Table View" style="border: 1px solid #329ae4;"></div>
            <div v-if="show"><input @click="switch_buttons()" type="button" name="view" class="btn" value="Table View" id="custom-button"></div>
        </div>  
        <div id="message">
            <h3>{{message}}</h3>
        </div>

        <!-- The graph logic starts here -->
        <b-container>
            <div v-show="!show">
                <div class="container">
                    <div class="row">
                        <div class="col-sm">
                            <label style="font-size: .75em;">Select Date</label>
                            <b-form-datepicker
                            id="datepicker-full-width"
                            v-model="selected_date"
                            menu-class="w-100"
                            calendar-width="100%"
                            class="mb-2"
                            ></b-form-datepicker>
                        </div>
                        <div class="col-sm">
                            <div class="input-select">
                                <label>Select Country</label>
                                <select v-model="selected_country">
                                <option v-for="(country, index) in this.$store.state.countries" :key="index">
                                    {{ country.country }}
                                </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm">
                            <label style="font-size: .75em;">Apply Changes</label>
                            <div>
                                <b-button @click="filterChart()" variant="outline-primary">Click To Filter</b-button>
                            </div>
                        </div>
                    </div>
                    <div v-show="show_indicator" class="row">
                        <div class="d-flex align-items-center">
                            <strong style="color:green">Loading Data...</strong>
                            <div style="color:green" class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="!show" class="col-md-12" id="chart-div">
                <canvas v-if="display" id="covid-chart"></canvas>
            </div>
        </b-container>
        <!-- The graph ends starts here -->

        <!-- The table logic starts here -->
        <div v-show="show" id="table-content">
            <b-container>
                <div class="input-select">
                    <label>Filter By Country &nbsp; &nbsp; <button v-if="table_selected_country" @click="clearCountry()" type="button" class="btn btn-warning btn-sm" style="margin-bottom: 5px;">Clear</button></label> 
                    <select v-model="table_selected_country" style="height: 45px;">
                    <option value="" disabled selected>-- Select Country --</option>
                    <option v-for="(country, index) in this.$store.state.countries" :key="index">
                        {{ country.country }}
                    </option>
                    </select>
                </div>
                <div>
                    <b-table 
                    label-sort-asc="" 
                    label-sort-desc="" 
                    label-sort-clear="" 
                    :items="dataArray" 
                    :fields="table_fields" 
                    :per-page="perPage" 
                    :current-page="currentPage"
                    striped hover responsive
                    >                    
                </b-table>

                </div>
            
                <div>
                    <div class="pag" style="display:inline-block">
                        <b-pagination :per-page="perPage" v-model="currentPage" :total-rows="this.$store.state.statistics.length"></b-pagination>
                    </div>

                    <div class="per_page" style="display:inline-block">
                        &nbsp; &nbsp; Rows Per Page: &nbsp;
                    </div>
                    
                    <div style="display:inline-block">
                        <b-form-select class="select" v-model="perPage" :options="options"></b-form-select>
                    </div>
                </div>                         
            </b-container>
        </div>
        <!-- The table logic ends here -->
    </div>
</template>

<script>
    import Chart from 'chart.js'

    export default {
        name: "Body",
        data () {
            return {
                display: false,
                show: false,
                show_indicator: false,
                message: 'Covid19 Statistics',
                keyword: '',
                perPage: 10,
                currentPage: 1,
                selected_country: 'USA',
                table_selected_country: '',
                selected_date: '2022-11-18',
                type: "line",
                table_fields: [
                    {key: 'Country', label: 'Country', sortable: true},
                    {key: 'Continent', label: 'Continent', sortable: true},
                    {key: 'Total_Cases', label: 'Total Cases', sortable: true},
                    {key: 'Total_Recovered', label: 'Total Recovered', sortable: true},
                    {key: 'Total_Deaths', label: 'Total Deaths', sortable: true},
                    {key: 'Total_Tests', label: 'Total Tests', sortable: true},
                    {key: 'Population', label: 'Population', sortable: true},
                    {key: 'Day', label: 'Day', sortable: true}

                ],
                options: [5,10,25, 50, 100],
            }
        },

        computed: {
            dataArray(){
                if (this.table_selected_country){              
                    this.$store.dispatch('filterStatistics', this.table_selected_country)
                    return this.$store.state.selectedStatistic;
                    // return this.$store.state.statistics;
                }
                else{
                    return this.$store.state.statistics;
                }                
            },

            covidChartData () {
                return {
                    type: "line",
                    data: {
                    labels: this.$store.getters.labels,
                    datasets: [
                        {
                            label: "Cases",
                            type: "bar",
                            data: this.$store.getters.cases_data,
                            backgroundColor: "#fffee9",
                            borderColor: "orange",
                            borderWidth: 3
                        },
                        {
                            label: "Deaths",
                            type: "line",
                            data: this.$store.getters.deaths_data,
                            backgroundColor: "#ffdcd1",
                            borderColor: "red",
                            borderWidth: 3
                        },
                        {
                            label: "Tests",
                            type: "line",
                            data: this.$store.getters.tests_data,
                            backgroundColor: "#c7f6b6",
                            borderColor: "green",
                            borderWidth: 3
                        }
                    ]
                    },
                    options: {
                    responsive: true,
                    lineTension: 1,
                    scales: {
                        yAxes: [
                        {
                            ticks: {
                            beginAtZero: true,
                            padding: 25
                            }
                        }
                        ]
                    }
                    }
                }          
            },   
                            
        },

        mounted(){
            this.$store.dispatch('getCountries');
            this.$store.dispatch('getStatistics');
            this.filterChart();
            this.loaded = true;
            this.selected_country = 'USA';
            this.selected_date = '2022-11-18';

        },
        methods: {
            switch_buttons(){
                this.show = !this.show
                if (this.show == true){
                    this.message = 'Covid19 History'
                }
                else{
                    this.message = 'Covid19 Statistics'
                }
            },

            clearCountry(){
                this.table_selected_country = ''
            },

            filterChart(){
                this.display = true;
                this.show_indicator = true;
                return new Promise (() => {
                    this.$store.dispatch('getHistory', 
                    {country: this.selected_country, day: this.selected_date
                }).then(()=> {
                    this.show_indicator = false;

                    if(window.myChart!=undefined) {
                        window.myChart.destroy();
                    }
                    
                    const ctx = document.getElementById('covid-chart')
                    window.myChart = new Chart(ctx, this.covidChartData);
                }).catch(()=>{
                    console.log('Something is wrong')
                })
                })
            }

        },
    };
</script>

<style>
#message{
   font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
   margin-top: 40px
}

#custom-button{
    background-color: #329ae4;
    color: white;
}

#table-content{
    overflow:auto;
}

.chart{
    text-align: center;
    width: 100%;
    height: auto;
    position: relative;
    z-index: 0;
}

.cursor-pointer{
  cursor: pointer;
}

.select{
    width: 55px;
    height: 35px;
    font-family: Arial;
    background-color: whitesmoke;
    border: 1px solid #329ae4;
    position: relative;
    display: inline-block;
    border-radius: 10%;
}

.input-select {
  position: relative;
  display: inline-block;
  width: 100%;
  border-radius: 10%;
}
.input-select label {
  display: inline-block;
  width: 100%;
  font-size: 0.75em;
}
.input-select select {
  padding-right: 1.875em;
  cursor: pointer;
  color: #000;
  height: 40px;
  padding-bottom: 8px;
  border-radius: 8px;
  appearance: none;
  position: relative;
  background-color: #fff;
  color: #000;
  font-size: 100%;
  padding: 0.625em 0.5em;
  border: 1px solid #d2d2d2;
  width: 100%;
}
</style>