<!doctype html>
<!--[if lt IE 9]><html class="lt-ie9" itemscope itemtype="http://schema.org/Movie"><![endif]-->
<!--[if IE 9]><html class="ie" itemscope itemtype="http://schema.org/Movie"><![endif]-->
<!--[if gt IE 9]><!--><html itemscope itemtype="http://schema.org/Movie"><!--<![endif]-->

    <head>   
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="" />
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        
        <meta property="og:title" content=""/>
        <meta property="og:description" content=""/>
        <meta property="og:site_name" content=""/>
        <meta itemprop="name" content="" />
        <title>RELIGHT</title>
        
        <link rel="apple-touch-icon-precomposed" sizes="57x57" href="images/favicon/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="images/favicon/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="images/favicon/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="images/favicon/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon-precomposed" sizes="60x60" href="images/favicon/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon-precomposed" sizes="120x120" href="images/favicon/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon-precomposed" sizes="76x76" href="images/favicon/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon-precomposed" sizes="152x152" href="images/favicon/apple-touch-icon-152x152.png" />
        <link rel="icon" type="image/png" href="images/favicon/favicon-196x196.png" sizes="196x196" />
        <link rel="icon" type="image/png" href="images/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="images/favicon/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="images/favicon/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="images/favicon/favicon-128.png" sizes="128x128" />
        <meta name="application-name" content="&nbsp;"/>
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="images/favicon/mstile-144x144.png" />
        <meta name="msapplication-square70x70logo" content="images/favicon/mstile-70x70.png" />
        <meta name="msapplication-square150x150logo" content="images/favicon/mstile-150x150.png" />
        <meta name="msapplication-wide310x150logo" content="images/favicon/mstile-310x150.png" />
        <meta name="msapplication-square310x310logo" content="images/favicon/mstile-310x310.png" />

        <script>

            var env = 'dev'; // set to 'prod' to turn off console logs

            function parsePath(){
                var base = window.location.protocol+"//"+window.location.host;
                if(window.location.port && window.location.port != '')path += ':'+window.location.port;

                var path = window.location.pathname;
                if(path.indexOf('.') >= 0) path = path.substring(0, path.lastIndexOf('/')+1);
                else if (path.indexOf('?') >= 0) path = path.substring(0, path.lastIndexOf('?'));

                return base + path;
            }

            window.oblio = window.oblio || {};
            oblio.settings = oblio.settings || {};
            oblio.settings.base_path = parsePath();
            oblio.settings.base_url = '';
            oblio.settings.deeplink = '<?php echo $deeplink; ?>';

        </script>

        <link rel="stylesheet" href="css/main.css">
        
        <!-- build:js js/modernizr.js -->
        <script src="bower_components/modernizr/modernizr.js"></script>   
        <!-- /build -->
    </head>
    <!-- build:[class]:dist prod -->
    <body class="dev">
    <!-- /build -->
        <script>
        if (document.body.className.match('prod')) {
            env = 'prod';
        }
        </script>

        <div id="shell" class="cover" style="visibility:hidden">
            <div id="sections" class="cover">
                <div id="home" class="cover">
                    <div id="homeContent">
                        <div id="home_oblioLogo">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 147 147">
                              <circle cx="74.3" cy="73.3" r="69.1" fill="none" stroke="#3F3F3F" stroke-width="3" stroke-miterlimit="10"/>
                              <circle cx="74.3" cy="73.3" r="63.2" fill="none" stroke="#3F3F3F" stroke-width="3" stroke-miterlimit="10"/>
                              <circle cx="74.3" cy="73.3" r="57.4" fill="none" stroke="#3F3F3F" stroke-width="3" stroke-miterlimit="10"/>
                              <circle cx="74.3" cy="73.3" r="51.7" fill="none" stroke="#3F3F3F" stroke-width="3" stroke-miterlimit="10"/>
                              <circle cx="74.3" cy="73.3" r="45.7" fill="none" stroke="#3F3F3F" stroke-width="3" stroke-miterlimit="10"/>
                              <circle cx="74.3" cy="73.3" r="39.9" fill="none" stroke="#3F3F3F" stroke-width="3" stroke-miterlimit="10"/>
                              <circle cx="74.3" cy="73.3" r="33.8" fill="none" stroke="#3F3F3F" stroke-width="3" stroke-miterlimit="10"/>
                              <circle cx="74.3" cy="73.3" r="28.2" fill="none" stroke="#3F3F3F" stroke-width="3" stroke-miterlimit="10"/>
                            </svg>
                        </div>
                        <div id="homeTitle" class="relightTitle" >RELIGHT</div>
                        <div id="homeIntro">This is a quick tool for re-lighting still photography<br/>A companion piece to <a href="http://makezine.com/" target="_blank">this article.</a></div>
                        <a class="siteButton large" id="homeStart" href="#">GET STARTED</a>
                        <div id="homeJewel"></div>
                    </div>
                </div>
                <div id="upload" class="cover">
                    <div id="uploadContent">
                        <div id="uploadTitle" class="relightTitle" >RELIGHT</div>
                        <div id="uploadInstructions">Upload your corresponding images<br/>or use the default images.</div>
                        <ul id="uploadImages">
                            <li id="uploadLeft"><a href="#"></a></li>
                            <li id="uploadTop"><a href="#"></a></li>
                            <li id="uploadFront"><a href="#"></a></li>
                            <li id="uploadBottom"><a href="#"></a></li>
                            <li id="uploadRight"><a href="#"></a></li>
                        </ul>
                        <a class="siteButton" id="useDefault" href="#">USE DEFAULT IMAGES</a>
                        <a class="siteButton" id="uploadDone" href="#">CONTINUE</a>
                        
                        <input type="file" id="uploadInput" multiple accept="image/*" style="display:none" onchange="handleFiles(this.files)">
                    </div>
                </div>
                <div id="viewer" class="cover">
                    <div id="viewContent">
                        <canvas id="viewCanvas" class="cover"></canvas>
                        <div id="viewInstructions" class="cover"></div>
                    </div>
                    <div id="viewTop">
                        <a class="siteButton" id="viewRestart" href="#">START OVER</a>
                        <a class="siteButton" id="viewContinue" href="#">CONTINUE</a>
                    </div>
                    <div class="viewSlider" id="sliderLeft">
                        <div class="viewSliderLabel"></div>
                        <div class="viewSliderTrack"></div>
                        <div class="viewSliderHandle"></div>
                    </div>
                    <div class="viewSlider" id="sliderBottom">
                        <div class="viewSliderLabel"></div>
                        <div class="viewSliderTrack"></div>
                        <div class="viewSliderHandle"></div>
                    </div>
                    <div class="viewSlider" id="sliderRight">
                        <div class="viewSliderLabel"></div>
                        <div class="viewSliderTrack"></div>
                        <div class="viewSliderHandle"></div>
                    </div>
                </div>
            </div>
        </div>
                
        <!-- build:js js/main.js -->
        <script data-main="js/main" src="bower_components/requirejs/require.js"></script>
        <!-- /build -->
                
        <script src="https://use.typekit.net/gsg7uuu.js"></script>
        <script>try{Typekit.load({ async: true });}catch(e){}</script>
        
    </body>
</html>