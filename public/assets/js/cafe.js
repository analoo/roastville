$(function(){
    $(".create-form").on("submit", function(){
        event.preventDefault();

        var newOrder = {
            order_id = $("#order_id").val().trim(),
            item_id = $("#item_id").val().trim(),
            customer_id = $("#customer_id").val().trim()
        };

        $.ajax("/api/orders", {
            type: "POST",
            data: newOrder
        }).then(
            function(){
                console.log("Your order is in the queue");
                location.reload();
            }
        );
    });
})