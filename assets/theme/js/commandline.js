$(function() {
    
    return;
    
    /*alert('commands in HTML comment section')*/
    console.log("commands in HTML comment section");

    function command() {

        var d = new Date();

        this.date = [d.getUTCMonth() + 1, d.getDate(), d.getFullYear()].join('/');
        this.time = [d.getHours(), d.getUTCMinutes(), d.getUTCSeconds()].join(":");
        this.url = [location.host].join().toLocaleUpperCase();
        this.agent = [navigator.userAgent].join().toLocaleUpperCase();
        this.cookie = [navigator.cookieEnabled].join().toLocaleUpperCase();
        this.lw = [window.innerHeight, window.innerWidth].join(" × ");

    }

    function Display(display) {

        var elem = $('<p></p>').text(display);
        $('div').append(elem);
        var c = $("<span>wEb:></span>");
        $('div').append(c);
        c.focus();

    }

    function firebase(display) {
        var elem = $("<br><br><p style='color:orange;font-size:200%;text-align:center' > <span class='	glyphicon glyphicon-tint' ></span></p>").text(display);
        $('div').append(elem);
        var c = $("<span style='color:orange' > ?</span> Are you ready to proceed ? (y/n)<input class='firebase' type='text' maxlength='1'>");
        $('div').append(c);
        c.focus();
    }

    function fire(display) {
        Display(display)
    }

    function cls() {

        $('div').empty();
        Display("");

    }

    function calc(ans) {

        try {

            Display(eval(ans));
        } catch(e) {
            Display('SYNTAX ERROR');
        }
    }


    window.onload = function() {

        $('input').focus();

    };

    $(document).keypress(function(e) {

        var v = new command();
        function showPosition(position) {
            Display("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
        }

        if (e.which == 13) {

            var fval = $(".firebase:last-child").val();

            switch(fval) {
            case 'y':
                fire('hosting');
                break;
            case 'cls':
                cls();
                break;
            case 'n':
                Display('');
                break;
            }

            if ($(".cmd:last-child").length > 0) {

                var val = $(".cmd:last-child").val().trim().toLocaleUpperCase();

                if (val !== '' && val !== undefined) {

                    if (val.charAt(0) == 'W' && val.charAt(1) == 'W' && val.charAt(2) == 'W') {

                        var page = $(".cmd:last-child").val();
                        window.open('https://' + page);
                        Display('');
                    } else if (val.startsWith('CALC:')) {

                        var a = val.slice(0, 5);
                        calc(val);
                    } else {

                        var s = $(".cmd:last-child").val();
                        switch(s.trim().toLocaleLowerCase()) {
                        case "":
                            Display("");
                            break;

                        case 'time':

                            Display(v.time);
                            break;

                        case "date":
                            Display(v.date);
                            break;
                        case "url":
                            Display(v.url);
                            break;
                        case "agent":
                            Display(v.agent);
                            break;
                        case "cookie":
                            Display(v.cookie);
                            break;
                        case "new_window":
                            window.open("http://www.google.com/");
                            Display('');
                            break;
                        case "lw" :
                            Display(v.lw);
                            break;
                        case "pi":
                            Display(Math.PI);
                            break;
                        case "dir":
                            Display("NO directories Found");
                            break;
                        case "creator":
                            Display("Name: Baraka Mulungula");
                            break;
                        case "color fc":
                            document.body.style = 'background:white;color:red';
                            Display('');
                            break;
                        case "color 02":
                            document.body.style = 'background:black;color:green';
                            Display('');
                            break;

                        case "cls":

                            cls();

                            break;

                        case "firebase":

                            firebase('FIREBASE');
                            break;

                        case "locate":

                            if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(showPosition);
                            } else {
                                Display('Geolocation is not supported by this browser.');
                            }

                            break;

                        case "ip":

                            function findIP(onNewIP) {//  onNewIp - your listener function for new IPs
                                var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
                                //compatibility for firefox and chrome
                                var pc = new myPeerConnection({
                                    iceServers : []
                                }),
                                    noop = function() {
                                },
                                    localIPs = {},
                                    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
                                    key;

                                function ipIterate(ip) {
                                    if (!localIPs[ip])
                                        onNewIP(ip);
                                    localIPs[ip] = true;
                                }


                                pc.createDataChannel("");
                                //create a bogus data channel
                                pc.createOffer(function(sdp) {
                                    sdp.sdp.split('\n').forEach(function(line) {
                                        if (line.indexOf('candidate') < 0)
                                            return;
                                        line.match(ipRegex).forEach(ipIterate);
                                    });
                                    pc.setLocalDescription(sdp, noop, noop);
                                }, noop);
                                // create offer and set local description
                                pc.onicecandidate = function(ice) {//listen for candidate events
                                    if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex))
                                        return;
                                    ice.candidate.candidate.match(ipRegex).forEach(ipIterate);
                                };
                            }

                            function addIP(ip) {

                                Display("IPv4 Address:  \t" + ip);

                            }

                            findIP(addIP);

                            break;
                        default:
                            var v = $("input:last-child").val();
                            var d = v + " is not recognized as an internal or external command,operable program or batch file.";
                            Display(d);

                            break;

                        }

                    }
                }
            }
        }

    });

});