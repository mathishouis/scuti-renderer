function loadPage(int) {
                            var xhttp;
                            xhttp = new XMLHttpRequest();
                            xhttp.onreadystatechange = function() {
                                if (this.readyState == 4 && this.status == 200) {
                                    var parts = xhttp.responseText.split('|')
                                    document.getElementById("page_caption").innerHTML = parts[0]
                                    document.getElementById("page_text1").innerHTML = parts[2]
                                    $('#page_icon').css("background-image", "url(./c_images/catalogue/icon_" + parts[3] + ".png");
                                    $('#page_headline').css("background-image", "url(./c_images/catalogue/" + parts[4] + ".png");
                                    $('#frontpage').css("display", parts[5]);
                                }
                            };
                            xhttp.open("GET", "getpages.php?pageid="+int, true);
                            xhttp.send();   
                        }