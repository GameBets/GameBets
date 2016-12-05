<?php
function paint_template_error($message) {
    $log = log::getInstance();
    $log->add_log_general("error paint_template_error", "products", "response" . http_response_code()); //$text, $controller, $function

    $arrData = response_code(http_response_code());


    print ("<div id='page'>");
    print ("<br><br>");
    print ("<div id='header' class='status4xx'>");
    print("<h1>" . $message . "</h1>");
    print("</div>");
    print ("<div id='content'>");
    print ("<h2>The following error occurred:</h2>");
    print ("<p>The requested URL was not found on this server.</p>");
    print ("<P>Please check the URL or contact the <!--WEBMASTER//-->webmaster<!--WEBMASTER//-->.</p>");
    print ("</div>");
    print ("<div id='footer'>");
    print ("<p>Powered by <a href='http://www.ispconfig.org'>ISPConfig</a></p>");
    print ("</div>");
    print("</div>");

}

function paint_template_products($arrData) {
    print ("<script type='text/javascript' src='".JS_PRODUCTS_PATH."modal_products.js' ></script>");
    print ("<section >");
    print ("<div class='container'>");
    print ("<div id='list_prod' class='row text-center pad-row'>");
    if (isset($arrData) && !empty($arrData)) {

        foreach ($arrData as $product) {
            print ("<div class='prod' id='".$product['id']."'>");
            print ("<img class='prodImg' src='" .SITE_PATH. $product['avatar'] . "'alt='product' >");
            print ("<p>" . $product['name'] . "</p>");
            print ("<p id='p2'>" . $product['price'] . "€</p>");
            print ("</div>");
        }
    }
    print ("</div>");
    print ("</div>");
    print ("</section>");
}

function paint_template_search($message){
    	$log = log::getInstance();
		$log->add_log_general("error paint_template_search", "products", "response ".http_response_code()); //$text, $controller, $function

		print ("<section> \n");
	      	print ("<div class='container'> \n");
	      	print ("<div class='row text-center pad-row'> \n");

	      		print ("<h2>". $message ."</h2> \n");
	        	print ("<br><br><br><br> \n");

			print ("</div> \n");
			print ("</div> \n");
		print ("</section> \n");
	}
