

$(function () {
    const name = ["Tania", "Cori", "Jon", "Carlos", "Jim", "Tara", "Marcos", "Mark", "Poppe", "Marta", "Ana", "Tom", "Juan", "Farley", "Rori", "Carl", "Kim"];
    const item = ["Latte", "Capuccino", "Matcha Tea", "Drip Coffee"];
    const image = ["/assets/images_icons/tech_bro.png", "/assets/images_icons/music_listener.png", "/assets/images_icons/cyclist.png"];
    var active = 0;


    function rand(lst) {
        return Math.floor(Math.random() * (lst.length - 0 + 1))
    }

    var current_order=item[1];
    var current_img=image[2];
    var current_name=name[5]
    var earnings = 0;
    var time = 100;
    $("#cust-name").text(current_name);
    $("#ord-name").text(current_order);
    $("#customer").attr("src", current_img);

    $("#time-rem").text(time);
    $("#money").text(earnings)



    $("#start-game").on("click", function () {
        event.preventDefault();
        $("#start").css("display", "none");
        $("#mask").css("display", "none");

        var customers = setInterval(() => {
            current_order = item[rand(item)]
            current_name= name[rand(name)]
            current_img = image[rand(image)]
            $("#cust-name").text(current_name);
            $("#ord-name").text(current_order);
            $("#customer").attr("src", current_img);

        }, 8000);
        var gametime = setInterval(() => {
            time -= 1;
            $("#time-rem").text(time);

            if (time == 0) {
                $("#time-rem").text(time);
                clearInterval(gametime)
                clearInterval(customers)
            }

        }, 1000);



    });

    $(".create-form").on("submit", function () {
        event.preventDefault();
        console.log("Current order is: " + current_order)

        var newOrder = {
            item_id: $("#item-id").val().trim(),
            customer_name: $("#customer-name").val().trim()
        };

        $("#item-id").val("")
        $("#customer-name").val("")

        $.ajax("/api/orders", {
            type: "POST",
            data: newOrder
        }).then(
            function (data) {
                $("#orders-table").append(data)
            }
        );
    });



    $(document).on("click", ".delete", function () {
        event.preventDefault();
        var id = $(this).data("id");

        $.ajax("/api/orders/" + id, {
            type: "DELETE",
        }).then(
            function () {
                $(`#row-${id}`).remove()
                active --
            });
    });


    $(document).on("click", ".add", function () {
        event.preventDefault();
        var id = $(this).data("id");
        var time = $(`#prog-${id}`).data("time");
        var comp = 100 / time;
        var incr = 0;

        if(active < 2){
            active++
            var progress = setInterval(() => {
                incr += comp;
                $(`#prog-${id}`).attr("value", incr)
                time--
                if (time == 0) {
                    $(`#prog-${id}`).attr("value", 100)
                    $.ajax("/api/orders/" + id, {
                        type: "PUT",
                    }).then(
                        function () {
                            $(`#row-${id}`).remove();
                            active--
                            if(active < 2){
                                $("#too-many").text("")
                            }
                            
    
                        });
                    clearInterval(progress)
                }
            }, 1000);
        }

        else{
            $("#too-many").text("You can only work on two orders at once!")

        }


        
    });



});
