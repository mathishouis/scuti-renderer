<?php
require("global.php");
?>
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="main.css">
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet">
        <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu+Condensed&display=swap" rel="stylesheet">
    </head>
    <body>
        <div class="frame s3" style="width: 570px; height: 635px;">
            <div class="header">
                <div class="left"></div>
                <div class="center">Boutique</div>
                <div class="right"></div>
                <div class="buttons">
                    <div class="close"></div>
                    <div class="help"></div>
                </div>
            </div>
            <div class="content">
                <div class="left"></div>
                <div class="center">


                    <div class="tab-container" style=" top: 0px; width: 100%;">
                        <div class="center" style="width: 550px;">
                            <?php
                            $catalog_pages_tab = $bdd->query("SELECT * FROM catalog_pages WHERE parent_id = '-1' AND visible = '1' ORDER BY LENGTH(order_num) DESC LIMIT 0,25");
                            while($catalog_pages_tabf = $catalog_pages_tab->fetch()) :
                            ?>
                            <div class="tab" onclick="loadPage('<?= $catalog_pages_tabf->id; ?>')" name="<?= $catalog_pages_tabf->id; ?>" style="">
                                <div class="tleft"></div>
                                <div class="tcenter"><?= $catalog_pages_tabf->caption; ?></div>
                                <div class="tright"></div>
                                <script>
                                    $('.tab').click(function() {
                                        $('.tab').removeClass("active");
                                        $(this).addClass("active");

                                    });
                                </script>
                            </div>
                            <?php endwhile; ?>
                        </div>
                    </div>
                    <script>
                        
                    </script>
                    <div id="page_headline" class="catalog-header" style="top: 35px;left: -2px; background-image: url(./catalog/catalog_frontpage_headline_shop_FR.png);">
                        <div id="page_icon" class="icon" style="background-image: url(./catalog/icon_213.png); top: 28px; left: 25px;"></div>
                        <div class="text" style="color: white; font-weight: 600; font-size: 19px; top: 11.5px; left: 80px;" id="page_caption">%caption%</div>
                        <div class="text" style="color: white; font-weight: 400; font-size: 13px; top: 34.5px; left: 80px;" id="page_text1">%page_text1%</div>
                    </div>
                    <div class="front-page" id="frontpage">
                        <?php
                            $featured_pages = $bdd->query("SELECT * FROM catalog_featured_pages WHERE slot_id = '1'");
                            while($featured_pagesf = $featured_pages->fetch()) :
                        ?>
                        <div class="featured_page" style="top: 0px; left: 0px; width: 184px; height: 460px; background-image: url(https://images.habbo.com/c_images/catalogue/<?= $featured_pagesf->image; ?>);">
                            <div class="featured_title">
                                <?= $featured_pagesf->caption; ?>
                            </div>
                        </div>
                        <?php endwhile; ?>
                        <?php
                            $featured_pages = $bdd->query("SELECT * FROM catalog_featured_pages WHERE slot_id = '2'");
                            while($featured_pagesf = $featured_pages->fetch()) :
                        ?>
                        <div class="featured_page" style="top: 0px; right: 0px; width: 356px; height: 126px; background-image: url(https://images.habbo.com/c_images/catalogue/<?= $featured_pagesf->image; ?>);">
                            <div class="featured_title">
                                <?= $featured_pagesf->caption; ?>
                            </div>
                        </div>
                        <?php endwhile; ?>
                        <?php
                            $featured_pages = $bdd->query("SELECT * FROM catalog_featured_pages WHERE slot_id = '3'");
                            while($featured_pagesf = $featured_pages->fetch()) :
                        ?>
                        <div class="featured_page" style="top: 133px; right: 0px; width: 356px; height: 126px; background-image: url(https://images.habbo.com/c_images/catalogue/<?= $featured_pagesf->image; ?>);">
                            <div class="featured_title">
                                <?= $featured_pagesf->caption; ?>
                            </div>
                        </div>
                        <?php endwhile; ?>
                        <?php
                            $featured_pages = $bdd->query("SELECT * FROM catalog_featured_pages WHERE slot_id = '4'");
                            while($featured_pagesf = $featured_pages->fetch()) :
                        ?>
                        <div class="featured_page" style="top: 266px; right: 0px; width: 356px; height: 126px; background-image: url(https://images.habbo.com/c_images/catalogue/<?= $featured_pagesf->image; ?>);">
                            <div class="featured_title">
                                <?= $featured_pagesf->caption; ?>
                            </div>
                        </div>
                        <?php endwhile; ?>
                    </div>
                </div>
                <div class="right"></div>
                <div class="bottom">
                    <div class="left"></div>
                    <div class="center"></div>
                    <div class="right"></div>
                </div>
            </div>
        </div>
        <script src="core.js"></script>
    </body>
</html>