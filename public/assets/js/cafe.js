

$(function () {
    const name = ["Tania", "Cori", "Jon", "Carlos", "Jim", "Tara", "Marcos", "Mark", "Poppe", "Marta", "Ana", "Tom", "Juan", "Farley", "Rori", "Carl", "Kim"];
    const item = ["Latte", "Capuccino", "Matcha Tea", "Drip Coffee"];
    
    $("#start-game").on("click", function(){
        event.preventDefault();
        $("#start").css("display","none");
        $("#mask").css("display","none");
    });

    $(".create-form").on("submit", function () {
        event.preventDefault();

        var newOrder = {
            item_id: $("#item-id").val().trim(),
            customer_name: $("#customer-name").val().trim()
        };

        $.ajax("/api/orders", {
            type: "POST",
            data: newOrder
        }).then(
            function (data) {
                console.log(data)
            }
        );
    });

    $(".delete").on("click", function () {
        event.preventDefault();
        console.log("you clicked me!")
        var id = $(this).data("id");

        console.log(id)

        $.ajax("/api/orders/" + id, {
            type: "DELETE",
        }).then(
            function () {
            console.log("You deleted this order");
            $(`#row-${id}`).remove()
        });
    });

    $(".add").on("click",function(){
        event.preventDefault();
        var id = $(this).data("id");
        var time = $(`#prog-${id}`).data("time");
        var comp = 100/time;
        var incr=0;


        var progress = setInterval(() => {
             incr+= comp;
            $(`#prog-${id}`).attr("value",incr)
            time --
            if(time == 0){
                $(`#prog-${id}`).attr("value",100)
                $.ajax("/api/orders/" + id, {
                    type: "PUT",
                }).then(
                    function () {console.log("You deleted this order");
                    $(`#row-${id}`).remove()
                });
                clearInterval(progress)
            }
            
        }, 1000);
    });




});