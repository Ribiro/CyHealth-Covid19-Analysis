<template>
    <b-footer class="site-footer">
      <div style="background-color:#26272b">
        <b-container>
        <div style="margin-top: 20px;">
        <div style="text-align: center;">
          <h6>About Site</h6>
        </div>
        <div style="margin: auto;">
          <p class="text-justify">Analysis Made Simple. <i>CyHealth Covid19 System </i> is an application developed purposely to visualize the Covid19 Statistics for research purposes. 
            The visualization is done using a table and an hourly graph (as displayed above).
            The statistics and history are as fetched from 
              <a target="_blank" href="https://rapidapi.com/api-sports/api/covid-193/">Rapid API</a>.
          </p>
        </div>
        <hr>
      </div>
      <div>
        
        <div  style="text-align: center;">
          <div>
            <p class="copyright-text">Copyright &copy; 2022 All Rights Reserved by 
              <a target="_blank" href="https://ribiro.netlify.app">Denis Ribiro</a>.
            </p>
          </div>
          <div>
            &nbsp; &nbsp;
          </div>
        </div>
      </div>
      </b-container>
      </div>
</b-footer>
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
  color:#737373;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.5rem;
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