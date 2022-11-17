<template>
    <footer class="site-footer">
      <div class="container" style="margin-top: 20px;">
        <div style="text-align: center;">
          <h6>About Site</h6>
        </div>
        <div style="margin: auto;">
          <p class="text-justify">Analysis Made Simple. <i>CyHealth Covid19 System </i> is an application developed purposely to visualize the Covid19 Statistics for research purposes. 
            The visualization is done using a table and an hourly graph (as displayed above).
            The statistics and history are as fetched from 
              <a target="_blank" href="https://rapidapi.com/api-sports/api/covid-193/">Rapid API</a>.
          </p>
          <hr>
        </div>
      </div>
      <div>
        <div  style="text-align: center;">
          <div>
            <p class="copyright-text">Copyright &copy; 2022 All Rights Reserved by 
         <a target="_blank" href="https://ribiro.netlify.app">Denis Ribiro</a>.
            </p>
          </div>

        </div>
      </div>
</footer>
</template>

<script>
    export default {
        name: "Footer",    
    };
</script>

<style>
.site-footer
{
  background-color:#26272b;
  font-size:15px;
  line-height:24px;
  color:#737373;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
}
.site-footer hr
{
  border-top-color:#bbb;
  opacity:0.5
}
.site-footer hr.small
{
  margin:20px 0
}
.site-footer h6
{
  color:#fff;
  font-size:16px;
  text-transform:uppercase;
  margin-top:5px;
  letter-spacing:2px
}
.site-footer a
{
  color:#737373;
}

.copyright-text
{
  margin:0
}
</style>