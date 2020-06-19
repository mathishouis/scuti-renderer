<?php

require("global.php");

$page_id = $_REQUEST["pageid"];

$get_page = $bdd->query("SELECT * FROM catalog_pages WHERE id = $page_id");
while($get_pagef = $get_page->fetch()) {
    $page_layout = $get_pagef->page_layout;
    $caption = $get_pagef->caption;
    $page_text1 = $get_pagef->page_text1;
    $icon_image = $get_pagef->icon_image;
    $page_headline = $get_pagef->page_headline;
    if($get_pagef->page_layout == "frontpage") {
        $frontpage = "block";
    } else {
        $frontpage = "none";
    }
}


echo "$caption|$page_layout|$page_text1|$icon_image|$page_headline|$frontpage";
?>