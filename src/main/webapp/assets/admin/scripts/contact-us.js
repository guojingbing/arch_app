var ContactUs=function(){return{init:function(){var a;$(document).ready(function(){a=new GMaps({div:"#map",lat:-13.004333,lng:-38.494333});var b=a.addMarker({lat:-13.004333,lng:-38.494333,title:"Loop, Inc.",infoWindow:{content:"<b>Loop, Inc.</b> 795 Park Ave, Suite 120<br>San Francisco, CA 94107"}});b.infoWindow.open(a,b)})}}}();