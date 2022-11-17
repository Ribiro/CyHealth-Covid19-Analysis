<template>
    <header class="site-header">
    <nav class="navbar navbar-expand-md navbar-dark bg-steel fixed-top">
      <div class="container">
        <a class="navbar-brand mr-4" href="#">
          <img src="../../assets/logo.png" height="40" width="40">CyHealth Covid19 System
        </a>
        
        <!-- Navbar Right Side -->
        <div v-if="!show" class="navbar-nav">
            <a class="nav-item nav-link" href="#">Table View</a>
            <a class="nav-item nav-link" href="#">Graph View</a>
        </div>
    </div>
    </nav>
  </header>
</template>

<script>
    export default {
        name: "Header",
        data () {
            return {
                show: ''
            }
        },
        created() {
            window.addEventListener('resize', this.handleResize);
            this.handleResize();
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize);
        },
        methods: {
            handleResize(){
                if (window.innerWidth >= 960){
                    this.show = false
                }
                else {
                    this.show = true
                }
            }
        }
    }
</script>

<style>
    .site-header .navbar-nav .nav-link {
        color: #cbd5db;
    }
    .site-header .navbar-nav .nav-link:hover {
        color: #ffffff;
    }
  
    .site-header .navbar-nav .nav-link.active {
        font-weight: 500;
    }
    .bg-steel {
        background-color: #329ae4;
    }
</style>