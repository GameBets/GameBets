<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0-rc.2/jquery-ui.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-rc1/jquery.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0-rc.2/jquery-ui.js"></script>
<script type="text/javascript" src="<?php echo JS_PRODUCTS_PATH ?>jquery.bootpag.min.js"></script>
<script type="text/javascript" src="<?php echo JS_PRODUCTS_PATH ?>list_products.js" ></script>
<link rel="stylesheet" href="<?php echo CSS_PRODUCTS_PATH ?>main.css" type="text/css" />
<center>
    <br />
    <br />
    <br />
    <form name="search_prod" id="search_prod" class="search_prod">
        <input type="text" value="" placeholder="Search Product ..." class="input_search" id="keyword" list="datalist">
        <!-- <div id="results_keyword"></div> -->
        <input name="Submit" id="Submit" class="button_search" type="button" />

    </form>
</center>
<br />
<br />
<br />

<div id="results"></div>

<center>
    <div class="pagination"></div>
</center>

<!-- modal window details_product -->

    <section id="product" class='container'>

        <div id="details_prod" class='row text-center pad-row'>

            <!--<ol class="breadcrumb">
                <li><a href="index.php?module=products">Products</a></li>
                <li class="active">Details Product</li>
            </ol>
            <br>
            <br>-->
            <div id="details">
                <div id="img_prod" class="prodImg"></div>

                <div id="container">

                    <h4> <strong><div id="name_prod"></div></strong> </h4>
                    <br />
                    <p>
                    <div id="id_prod"></div>
                    </p>
                    <p>
                    <div id="coment_prod"></div>
                    </p>
                    <h2> <strong><div id="price_prod"></div></strong> </h5>

                </div>

            </div>

        </div>
    </section>
