<template>
    <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-9">
            <h6>About Site</h6>
            <p class="text-justify">Analysis Made Simple. <i>CyHealth Covid19 System </i> is an application developed purposely to visualize the Covid19 Statistics for research purposes. The statistics are 
                as fetched from 
                <a href="https://rapidapi.com/api-sports/api/covid-193/">Rapid API</a>.
            </p>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Views</h6>
            <ul class="footer-links">
                <li><a href="#">Table View</a></li>
                <li><a href="#">Graph View</a></li>
            </ul>
          </div>
        </div>
        <hr>
      </div>
      <div class="container">
        <div class="row">
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
  padding:45px 0 20px;
  font-size:15px;
  line-height:24px;
  color:#737373;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
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
.site-footer a:hover
{
  color:#3366cc;
  text-decoration:none;
}
.footer-links
{
  padding-left:0;
  list-style:none
}
.footer-links li
{
  display:block
}
.footer-links a
{
  color:#737373
}
.footer-links a:active,.footer-links a:focus,.footer-links a:hover
{
  color:#3366cc;
  text-decoration:none;
}
.footer-links.inline li
{
  display:inline-block
}
.site-footer .social-icons
{
  text-align:right
}
.site-footer .social-icons a
{
  width:40px;
  height:40px;
  line-height:40px;
  margin-left:6px;
  margin-right:0;
  border-radius:100%;
  background-color:#33353d
}
.copyright-text
{
  margin:0
}
@media (max-width:991px)
{
  .site-footer [class^=col-]
  {
    margin-bottom:0px
  }
}
@media (max-width:767px)
{
  .site-footer
  {
    padding-bottom:0
  }
  .site-footer .copyright-text,.site-footer .social-icons
  {
    text-align:center
  }
}
</style>