<template>
    <div class="banner">
        <div class="btn-group btn-toggle gender">
            <div v-if="show"><input @click="switch_buttons()" type="button" name="view" class="btn btn-default" value="Table View"></div> 
            <div v-if="!show"><input @click="switch_buttons()" type="button" name="view" class="btn btn-primary" value="Table View"></div>
            <div v-if="!show"><input @click="switch_buttons()" type="button" name="view" class="btn btn-default" value="Graphical View"></div>
            <div v-if="show"><input @click="switch_buttons()" type="button" name="view" class="btn btn-primary" value="Graphical View"></div>
        </div>  
        <div id="message">
            <h3>{{message}}</h3>
        </div>

        <!-- The table logic starts here -->
        <div v-if="!show" id="app">
            <b-container>
                <b-form-input v-model="keyword" placeholder="Search Country/Continent..."></b-form-input>
                <b-table 
                    label-sort-asc="" 
                    label-sort-desc="" 
                    label-sort-clear="" 
                    :items="items" 
                    :fields="fields" 
                    :per-page="perPage" 
                    :current-page="currentPage"
                    striped hover responsive
                    >
                    
                </b-table>
                <div>
                    <div class="pag" style="display:inline-block">
                        <b-pagination :per-page="perPage" v-model="currentPage" :total-rows="items.length"></b-pagination>
                    </div>
                    <div class="per_page" style="display:inline-block">
                        &nbsp; &nbsp; Rows per page: 
                    </div>
                    <div class="dropdown" style="display:inline-block">
                        <b-dropdown size="sm" text="5" class="m-2">
                        <b-dropdown-item-button>5</b-dropdown-item-button>
                        <b-dropdown-item-button>10</b-dropdown-item-button>
                        <b-dropdown-item-button>25</b-dropdown-item-button>
                        <b-dropdown-item-button>50</b-dropdown-item-button>
                        </b-dropdown>
                    </div>
                </div>
                
                
            </b-container>
        </div>
        <!-- The table logic ends here -->

        <!-- The graph logic starts here -->
        <div v-if="show">
        </div>
        <!-- The graph logic starts here -->
    </div>
</template>

<script>
    export default {
        name: "Body",
        data () {
            return {
                show: false,
                message: 'Covid19 Statistics',
                keyword: '',
                perPage: 4,
                currentPage: 1,
                dataArray: [
                    {Country: 'Kenya', Continent: 'Africa', Total_Cases: '456', Total_Recovered: '100', Total_Deaths: '50', Total_Tests: '5000', Population: '1000', Day: '2022-17-12'},
                    {Country: 'England', Continent: 'Europe', Total_Cases: '456', Total_Recovered: '100', Total_Deaths: '50', Total_Tests: '5000', Population: '1000', Day: '2022-17-12'},
                    {Country: 'Singapore', Continent: 'Asia', Total_Cases: '456', Total_Recovered: '100', Total_Deaths: '50', Total_Tests: '5000', Population: '1000', Day: '2022-17-12'},
                    {Country: 'USA', Continent: 'North America', Total_Cases: '456', Total_Recovered: '100', Total_Deaths: '50', Total_Tests: '5000', Population: '1000', Day: '2022-17-12'},
                    {Country: 'Argentina', Continent: 'South America', Total_Cases: '456', Total_Recovered: '100', Total_Deaths: '50', Total_Tests: '5000', Population: '1000', Day: '2022-17-12'},
                ],
                fields: [
                    {key: 'Country', label: 'Country', sortable: true},
                    {key: 'Continent', label: 'Continent', sortable: true},
                    {key: 'Total_Cases', label: 'Total_Cases', sortable: true},
                    {key: 'Total_Recovered', label: 'Total_Cases', sortable: true},
                    {key: 'Total_Deaths', label: 'Total_Cases', sortable: true},
                    {key: 'Total_Tests', label: 'Total_Cases', sortable: true},
                    {key: 'Population', label: 'Population', sortable: true},
                    {key: 'Day', label: 'Day', sortable: true}

                ]
                
            }
        },
        mounted(){
            this.$store.dispatch('getStatistics');
            this.$store.dispatch('getHistory', 'usa', '2022-11-17');
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

.cursor-pointer{
  cursor: pointer;
}
</style>