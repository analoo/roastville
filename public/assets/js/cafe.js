$(function(){
    $(".create-form").on("submit", function(){
        event.preventDefault();

        var newOrder = {
            item_id : $("#item-id").val().trim(),
            customer_name : $("#customer-name").val().trim()
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