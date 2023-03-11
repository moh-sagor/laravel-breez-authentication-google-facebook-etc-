jQuery(document).ready(function () {
    jQuery(document).on("click", '.cat-add', function () {
        var name = jQuery(".cat-name").val();
        var des = jQuery(".cat-des").val();
        var status = jQuery(".cat-status").val();
        jQuery.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
            }
        });

        jQuery.ajax({
            url: '/addcategory',
            type: 'POST',
            data: {
                name: name,
                des: des,
                status: status
            },
            success: function (res) {
                jQuery("#add").modal("hide");
                show();
            }
        });

    });
    show();
    function show() {
        jQuery.ajax({
            url: "/showcategory",
            type: "GET",
            dataType: "JSON",
            success: function (res) {
                if (res.status == '200') {
                    var allData = " ";
                    jQuery.each(res.allData, function (key, val) {
                        var status;
                        if (val.status == '1') {
                            status = '<button value="' + val.id + '"  class="btn-cat-active btn btn-sm btn-info" > Active</button>';
                        }
                        else {
                            status = '<button value="' + val.id + '"  class="btn-cat-inactive btn btn-sm btn-warning" > Inactive</button>';
                        }
                        allData += '<tr>\
                            <td> ' + key + '</td >\
                        <td>' + val.name + '</td>\
                        <td>' + val.des + '</td>\
                        <td>' + status + '</td>\
                        <td>\
                         <button value="'+ val.id + '"  class="btn-cat-edit btn btn-sm btn-info" > Edit</button>\
                         <button value="'+ val.id + '"  class="btn-cat-delete btn btn-sm btn-danger" > Delete</button>\
                         </td>\
                        </tr > ';
                    });
                    jQuery(".allData").html(allData);
                }
            }
        });
    }
    jQuery(document).on("click", ".btn-cat-delete", function () {
        var id = jQuery(this).val();
        jQuery("#delete").modal('show');
        jQuery(".modal-cat-delete").val(id);
    });
    jQuery(document).on("click", ".modal-cat-delete", function () {
        var id = jQuery(this).val();
        jQuery.ajax({
            url: "/deletecategory/" + id,
            type: "GET",
            success: function (res) {
                alert(res.msg);
                show();
                jQuery("#delete").modal('hide');
            }
        })
    });

    jQuery(document).on("click", ".btn-cat-active", function () {
        var id = jQuery(this).val();
        jQuery.ajax({
            url: "/activecategory/" + id,
            type: "GET",
            success: function (res) {
                alert(res.msg);
                show();

            }
        });
    });
    jQuery(document).on("click", ".btn-cat-inactive", function () {
        var id = jQuery(this).val();
        jQuery.ajax({
            url: "/inactivecategory/" + id,
            type: "GET",
            success: function (res) {
                alert(res.msg);
                show();
            }
        });
    });

    jQuery(document).on("click", ".btn-cat-edit", function () {
        jQuery("#add").modal("show");
        jQuery(".cat-add").hide();
        jQuery(".cat-update").show();
        var id = jQuery(this).val();

        jQuery.ajax({
            url: "/editcategory/" + id,
            type: "GET",
            success: function (res) {

                jQuery(".cat-name").val(res.allData.name);
                jQuery(".cat-des").val(res.allData.des);
                jQuery(".cat-status").val(res.allData.status);
                jQuery(".cat-update").val(res.allData.id);

            }
        });
    });
    jQuery(document).on("click", ".cat-update", function () {
        var id = jQuery(this).val();
        var name = jQuery(".cat-name").val();
        var des = jQuery(".cat-des").val();
        var status = jQuery(".cat-status").val();
        jQuery.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
            }
        });

        jQuery.ajax({
            url: "/updatecategory/" + id,
            type: 'POST',
            data: {
                name: name,
                des: des,
                status: status
            },
            success: function (res) {
                jQuery("#add").modal("hide");
                show();
            }

        });

    });

    // image handling with ajax 

    jQuery(document).on('submit', '#brandData', function (e) {
        e.preventDefault();
        let allData = new FormData(jQuery("#brandData")[0]);

        jQuery.ajax({
            url: "/insertbrand",
            type: 'POST',
            typeType: "JSON",
            data: allData,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status == 'failed') {
                    jQuery(".spn-name").text(res.errors.name);
                    jQuery(".spn-cat").text(res.errors.cat_id);
                    jQuery(".spn-image").text(res.errors.image);
                    jQuery(".spn-images").text(res.errors.images);
                }
                else {
                    alert(res.msg);
                }
            }
        });

    });


});