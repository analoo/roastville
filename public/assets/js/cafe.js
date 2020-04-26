

$(function () {
    // created initial variables to generate customers and their orders
    const name = ["Tania", "Cori", "Jon", "Carlos", "Jim", "Tara", "Marcos", "Mark", "Poppe", "Marta", "Ana", "Tom", "Juan", "Farley", "Rori", "Carl", "Kim"];
    const item = ["Latte", "Capuccino", "Matcha Tea", "Drip Coffee"];
    const image = ["/assets/images_icons/tech_bro.png", "/assets/images_icons/music_listener.png", "/assets/images_icons/cyclist.png"];

    // created fuction to help randomly generate name, item and image
    function rand(lst) {
        return Math.floor(Math.random() * (lst.length))
    }

  

    // Initial values at page load

    var active = 0;
    const ordered = []

    var earnings = 0;
    var time = 100;
    var current_order = item[1];
    var current_img = image[2];
    var current_name = name[5]
    ordered.push(current_order)

    $("#cust-name").text(current_name);
    $("#ord-name").text(current_order);
    $("#customer").attr("src", current_img);
    $("#time-rem").text(time);
    $("#money").text(earnings)


    $("#invalid").hide();
    $("#wrong-order").hide();
    $("#too-many").hide();

    $("#start-game").on("click", function () {
        event.preventDefault();

        // hide modal when game starts
        $("#start").css("display", "none");
        $("#mask").css("display", "none");

        // creates interval that changes customer and order with frequency
        var customers = setInterval(() => {
            current_order = item[rand(item)]
            current_name = name[rand(name)]
            current_img = image[rand(image)]
            ordered.push(current_order)
            $("#cust-name").text(current_name);
            $("#ord-name").text(current_order);
            $("#customer").attr("src", current_img);

            // error messages are reset with every new order
            $("#invalid").text("")

        }, 7000);


        // another interval that sets the time for the game and stops the customer generator and gametime interval when time is 0
        var gametime = setInterval(() => {
            time -= 1;
            $("#time-rem").text(time);

            if (time == 0) {
                $("#time-rem").text(time);
                clearInterval(gametime)
                clearInterval(customers)
                $("#start").html("<h1> GAME OVER <h1>").css("text-align", "center").css("vertical-align", "middle");
                $("#start").css("display", "inline");
                $("#mask").css("display", "inline");
            }

        }, 1000);



    });

    // allows users to create client orders

    $(".create-form").on("submit", function () {
        event.preventDefault();

        $("#item-id").focus();
        var item_id = $("#item-id").val().trim()

        var newOrder = {
            item_id: item_id,
            customer_name: $("#customer-name").val().trim()
        };

        // added data validation to keep the invalid API calls from going to mySql

        if (item_id > 0 && item_id <= 4) {
            $.ajax("/api/orders", {
                type: "POST",
                data: newOrder
            }).then(
                function (data) {
                    $("#orders-table").append(data)
                }
            );
        }

        // When user inputs an invalid number, an error message appears for 3 seconds
        else {
            $("#invalid").show();
            setTimeout(function () { $("#invalid").hide(); }, 3000);
        }

        // clears the values on the submit form
        $("#item-id").val("")
        $("#customer-name").val("")
    });


    // sets the event listener at the document level
    $(document).on("click", ".delete", function () {
        event.preventDefault();
        var id = $(this).data("id");

        $.ajax("/api/orders/" + id, {
            type: "DELETE",
        }).then(
            function () {
                $(`#row-${id}`).remove()
                active--
            });
    });


    $(document).on("click", ".add", function () {
        event.preventDefault();

        // first checks that there are less than two active orders
        if (active < 2) {
            active++
            

            var id = $(this).data("id");
            $(".delete").data("id", id).hide();
            var time = $(`#prog-${id}`).data("time");
            var item = $(`#item-${id}`).text()
            var order_price = $(`#item-${id}`).data("price")

            // Based on item's time to complete, progress bar is updated
            var comp = 100 / time;
            var incr = 0;
            var progress = setInterval(() => {
                incr += comp;
                $(`#prog-${id}`).attr("value", incr);
                time--

                // once time reaches 0, the interval is cleared and an order is considered completed

                if (time == 0) {
                    clearInterval(progress)
                    $(`#prog-${id}`).attr("value", 100)
                    active--

                    $.ajax("/api/orders/" + id, {
                        type: "PUT",
                    }).then(function () {
                        $(`#row-${id}`).remove();
                        if (ordered.indexOf(item) === -1) {
                            $("#wrong-order").show();
                            setTimeout(function () { $("#wrong-order").hide(); }, 3000);
                        }

                        else {
                            let val = ordered.indexOf(item)
                            ordered.splice(val, 1)
                            earnings += order_price;
                            $("#money").text(earnings);
                        }
                    })
                };
            }, 1000);
        }

        else {
            $("#too-many").show();
            setTimeout(function () { $("#too-many").hide(); }, 3000);

        }


    });



});
