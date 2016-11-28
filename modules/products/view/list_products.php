<!-- JQUERY CDN -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0-rc.2/jquery-ui.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-rc1/jquery.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0-rc.2/jquery-ui.js"></script>
<script type="text/javascript" src="<?php echo JS_PRODUCTS_PATH ?>jquery.bootpag.min.js"></script>
<script type="text/javascript" src="<?php echo JS_PRODUCTS_PATH ?>list_products.js"></script>
<link rel="stylesheet" href="<?php echo CSS_PRODUCTS_PATH ?>main.css" type="text/css" />
<br><br>

<center>
    <form name="search_prod" id="search_prod" class="search_prod">
        <input type="text" value="" placeholder="Search Product ..." class="input_search" id="keyword" list="datalist">
        <!-- <div id="results_keyword"></div> -->
        <input name="Submit" id="Submit" class="button_search" type="button" />

    </form>
</center>


<div id="results"></div>

<center>
    <div class="pagination_prods"></div>
</center>

<!-- modal window  -->


<section>
    <div class="container" id="product">


        <div class="media">
            <div class="pull-left">
                <div id="img_product" class="img_product"></div>
            </div>
            <h3 class="media-heading title-product" id="prod_name" />
        </div>
        <div id="info_prods">
            <p class="text-product" id="dis_date_prod" />
            <p class="text-product" id="exp_date_prod" />
            <p class="text-product" id="country" />
            <p class="text-product" id="province" />
            <p class="text-product" id="population" />
            <p class="text-product" id="status" />
            <div class="text-product"> <strong id="price"></strong></div>
        </div>
    </div>
</section>
