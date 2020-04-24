$(function () {
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
            function () {
                console.log("Your order is in the queue");
                location.reload();
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
            location.reload();
        });
    });
});