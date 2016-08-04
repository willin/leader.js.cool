(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-33096931-4', 'auto');
ga('send', 'pageview');
window.onload = function() {
    setTimeout(function() {
      var ad = document.querySelector("ins.adsbygoogle");
      if (ad && ad.innerHTML.replace(/\s/g, "").length == 0) {
        if (typeof ga !== 'undefined') {
            ga('send', 'event', 'Adblock', 'Yes');
        } else if (typeof _gaq !== 'undefined') {
            _gaq.push(['_trackEvent', 'Adblock', 'Yes']);
        }
      }
    }, 2000); 
  };
