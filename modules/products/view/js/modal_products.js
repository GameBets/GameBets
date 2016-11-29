//we do this so that  details_prod don't appear
$("#details_prod").hide();
$(document).ready(function () {
    $('.prod').click(function () {
        var id = this.getAttribute('id');
        $.post("../../products/idProduct/", {'idProduct': id}, function (data, status) {
            //console.log(data);
            var json = JSON.parse(data);
            var product = json.product;
            console.log(product);

            $('#results').html('');
            $('.pagination').html('');


            $("#img_prod").html('<img src="../../'+ product.avatar + '" height="75" width="75"> ');
            $("#name_prod").html(product.name);
            $("#id_prod").html("<strong>ID:</br> </strong>" + product.id);
            $("#coment_prod").html("</br><strong>Coment: </br></strong>" + product.coment);
            $("#price_prod").html("Price: " + product.price + " €");

            //we do this so that  details_prod  appear
            $("#details_prod").show();




        })
                .fail(function (xhr) {
                    ///if  we already have an error 404
                    if (xhr.status === 404) {
                        $("#results").load("../../products/view_error_false/", {'view_error': false});
                    } else {
                        $("#results").load("../../products/view_error_true/", {'view_error': true});
                    }
                    $('.pagination').html('');

                    $('#img_prod').html('');
                    $('#name_prod').html('');
                    $('#id_prod').html('');
                    $('#coment_prod').html('');
                    $('#price_prod').html('');
                    $('#keyword').val('');
                });
    });
});
