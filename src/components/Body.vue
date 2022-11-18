<template>
    <div class="banner">
        <div class="btn-group btn-toggle gender">
            <div v-if="show"><input @click="switch_buttons()" type="button" name="view" class="btn btn-default" value="Table View"></div> 
            <div v-if="!show"><input @click="switch_buttons()" type="button" name="view" class="btn" value="Table View" id="custom-button"></div>
            <div v-if="!show"><input @click="switch_buttons()" type="button" name="view" class="btn btn-default" value="Graphical View"></div>
            <div v-if="show"><input @click="switch_buttons()" type="button" name="view" class="btn" value="Graphical View" id="custom-button"></div>
        </div>  
        <div id="message">
            <h3>{{message}}</h3>
        </div>

        <!-- The table logic starts here -->
        <div v-show="!show" id="app">
            <b-container>
                <b-form-input v-model="keyword" placeholder="Search Country/Continent..."></b-form-input>
                <b-table 
                    label-sort-asc="" 
                    label-sort-desc="" 
                    label-sort-clear="" 
                    :items="dataArray" 
                    :fields="fields" 
                    :per-page="perPage" 
                    :current-page="currentPage"
                    striped hover responsive
                    >                    
                </b-table>

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

        <!-- The graph logic starts here -->
        <b-container>
            <div v-show="show" class="chart">
            <canvas id="planet-chart"></canvas>
        </div>
        </b-container>
        <!-- The graph logic starts here -->
    </div>
</template>

<script>
    import Chart from 'chart.js'
    import planetChartData from '../planet-data.js'

    export default {
        name: "Body",
        data () {
            return {
                show: false,
                message: 'Covid19 Statistics',
                keyword: '',
                perPage: 5,
                currentPage: 1,
                type: "line",
                fields: [
                    {key: 'Country', label: 'Country', sortable: true},
                    {key: 'Continent', label: 'Continent', sortable: true},
                    {key: 'Total_Cases', label: 'Total_Cases', sortable: true},
                    {key: 'Total_Recovered', label: 'Total_Cases', sortable: true},
                    {key: 'Total_Deaths', label: 'Total_Cases', sortable: true},
                    {key: 'Total_Tests', label: 'Total_Cases', sortable: true},
                    {key: 'Population', label: 'Population', sortable: true},
                    {key: 'Day', label: 'Day', sortable: true}

                ],
                options: [5,10,25, 50, 100],
                planetChartData: planetChartData             
            }
        },
        mounted(){
            this.$store.dispatch('getStatistics');
            this.$store.dispatch('getHistory', 'usa', '2022-11-17');
            const ctx = document.getElementById('planet-chart');
            new Chart(ctx, this.planetChartData);
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
            }
        },
        computed: {
            dataArray(){
                return this.$store.state.statistics
            },
            items () {
                return this.keyword
                    ? this.dataArray.filter(item => item.Country.includes(this.keyword) || item.Continent.includes(this.keyword))
                    : this.dataArray
                }
            },
            selectedRows() {
                return this.items.filter(item => item.selected)
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
    width: 50px;
    height: 30px;
    font-family: Arial;
    background-color: whitesmoke;
    border: 1px solid #329ae4;
    border-radius: 10%;
}
</style>