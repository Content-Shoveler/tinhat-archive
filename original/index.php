<!DOCTYPE html>

<html>

  <head>
    <?php include 'php/head.php';?>
  </head>

  <body>

    <div id="tinhatapp" :class="viewData.bodyclass">

      <div class="normal" v-if="viewData.ssview !== true">
        <?php include 'php/header.php';?>
        <?php include 'php/viewport.php';?>
        <?php include 'php/interface.php';?>
      </div>

      <div class="solview" v-if="viewData.ssview === true">
        <div class="tempstars">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
        </div>
        <button v-on:click="solarFlip"><i class="fas fa-satellite"></i>Play With Satellites</button>
        <iframe src="https://solarsystem.nz/"></iframe>
      </div>

    </div>

    <!-- JS -->
    <script src="/js/script.js"></script>
    
    <script>
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:1513375,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    </script>

  </body>

</html>
