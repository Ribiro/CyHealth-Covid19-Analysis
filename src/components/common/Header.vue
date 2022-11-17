<template>
    <div>
        <header class="site-header">
            <nav class="navbar navbar-expand-md navbar-dark bg-steel fixed-top">
            <div class="container">
                <a class="navbar-brand mr-4" href="">
                <img src="../../assets/logo.png" height="40" width="40">CyHealth Covid19 System
                </a>
            </div>
            </nav>
        </header>
    </div>
</template>

<script>
    export default {
        name: "Header",
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