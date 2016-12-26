function validate_search(search_value) {
    if (search_value.length > 0) {
        var regexp = /^[a-zA-Z0-9 .]*$/;
        return regexp.test(search_value);
    }
    return false;
}

function search_not_empty(keyword) {
    $.post(amigable("?module=products&function=num_pages_products"), {'num_pages': true, 'keyword': keyword}, function (data, status) {
        var json = JSON.parse(data);
        var pages = json.pages;
        var count = 0;

        $("#results").load(amigable("?module=products&function=obtain_products"), {'keyword': keyword});

        if (pages !== 0) {
            $('.pagination').val('');

            $(".pagination").bootpag({
                total: pages,
                page: 1,
                maxVisible: 3,
                leaps: false,
                next: 'Next',
                prev: 'Prev'
            }).on("page", function (e, num) {
                e.preventDefault();
                $("#results").load(amigable("?module=products&function=obtain_products"), {'page_num': num, 'keyword': keyword});
                reset();


            });
        } else {
            $("#results").load(amigable("?module=products&function=view_error_false"), {'view_error': false}); //view_error=false

            $('.pagination').html('');
            reset();
        }

        reset();




    }).fail(function (xhr) {
        //"index.php?module=products&function=view_error_true&view_error=true"
        $("#results").load(amigable("?module=products&function=view_error_true"), {'view_error': true});
        $('.pagination').html('');
        reset();
    });
}

function search_empty() {
    $.post(amigable("?module=products&function=num_pages_products"), {'num_pages': true}, function (data, status) {
        var json = JSON.parse(data);

        var pages = json.pages;
        $("#results").load(amigable("?module=products&function=obtain_products")); //load initial records

        $(".pagination").bootpag({
            total: pages,
            page: 1,
            maxVisible: 3,
            next: 'Next',
            prev: 'Preview'
        }).on("page", function (e, num) {
            //console.log(num);
            e.preventDefault();
            $("#results").load(amigable("?module=products&function=obtain_products"), {'page_num': num});
            reset();
        });

        reset();




    }).fail(function (xhr) {
        $("#results").load(amigable("?module=products&function=view_error_true"), {'view_error': true});
        $('.pagination').html('');
        reset();
    });
}

function search_product(keyword) {
    $.post(amigable("?module=products&function=nom_products"), {'nom_product': keyword}, function (data, status) {
        var json = JSON.parse(data);
        var product = json.product_autocomplete;
        //alert(product.name);

        $('#results').html('');
        $('.pagination').html('');

        $("#img_prod").html('<img src="../../' + product.avatar + '" height="75" width="75"> ');
        $("#name_prod").html(product.name);
        $("#id_prod").html("<strong>ID: <br/></strong>" + product.id);
        $("#coment_prod").html("<br/><strong>Coment:<br/></strong>" + product.coment);
        $("#price_prod").html("Price: " + product.price + " €");
        $("#details_prod").show();





    }).fail(function (xhr) {
        $("#results").load(amigable("?module=products&function=view_error_false"), {'view_error': false});
        $('.pagination').html('');
        reset();
    });
}

function count_product(keyword) {
    $.post(amigable("?module=products&function=count_products"), {'count_product': keyword}, function (data, status) {
        var json = JSON.parse(data);
        var num_products = json.num_products;
        if (num_products == 0) {
            $("#results").load(amigable("?module=products&function=view_error_false"), {'view_error': false});
            $('.pagination').html('');
            reset();
        }
        if (num_products == 1) {
            search_product(keyword);
        }
        if (num_products > 1) {
            search_not_empty(keyword);
        }


    }).fail(function () {
        $("#results").load(amigable("?module=products&function=view_error_false"), {'view_error': false});  //view_error=false
        $('.pagination').html('');
        reset();
    });
}

function reset() {
    $('#img_prod').html('');
    $('#name_prod').html('');
    $('#id_prod').html('');
    $('#coment_prod').html('');
    $('#price_prod').html('');
    $("#details_prod").hide();
}

$(document).ready(function () {

    ////////////////////////// inici carregar pàgina /////////////////////////
    if (!getCookie('keyword')) {
        //console.log("good");
        search_empty();
    } else {
        //console.log("hola");
        $('#keyword').val((getCookie('keyword')));
        count_product(getCookie('keyword'));
        setCookie('keyword', '', 1);
    }


    $("#search_prod").submit(function (e) {
        var keyword = '';
        keyword = $('#keyword').val();
        var v_keyword = validate_search(keyword);

        if (!v_keyword) {
            search_empty();
        } else {
            setCookie('keyword', keyword, 1);
        }
        location.reload(true);

        e.preventDefault(); //STOP default action
    });

    $('#Submit').click(function () {
        //$('.pagination').val('');
        var keyword = '';
        keyword = $('#keyword').val();
        //console.log(keyword);
        var v_keyword = validate_search(keyword);

        if (!v_keyword) {
            search_empty();
        } else {
            //save cookie
            setCookie('keyword', keyword, 1);

        }

        location.reload(true);

    });
    $.post(amigable("?module=products&function=autocomplete_products"), {'autocomplete': true}, function (data, status) {
        //console.log(data);
        var json = JSON.parse(data);
        var nom_productos = json.nom_productos;
        //console.log(nom_productos);
        var suggestions = new Array();
        for (var i = 0; i < nom_productos.length; i++) {
            suggestions.push(nom_productos[i].name);
        }

        $("#keyword").autocomplete({
            source: suggestions,
            minLength: 1,
            select: function (event, ui) {
                //alert(ui.item.label);
                var keyword = '';
                keyword = ui.item.label;
                count_product(keyword);
            }
        });


    }).fail(function (xhr) {
        //if  we already have an error 404
        if (xhr.status === 404) {
            $("#results").load(amigable("?module=products&function=view_error_false"), {'view_error': false});
        } else {
            $("#results").load(amigable("?module=products&function=view_error_true"), {'view_error': true});
        }

    });
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1);
        if (c.indexOf(name) == 0)
            return c.substring(name.length, c.length);
    }
    return "";
}
