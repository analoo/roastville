

$(function () {
    const name = ["Tania", "Cori", "Jon", "Carlos", "Jim", "Tara", "Marcos", "Mark", "Poppe", "Marta", "Ana", "Tom", "Juan", "Farley", "Rori", "Carl", "Kim"];
    const item = ["Latte", "Capuccino", "Matcha Tea", "Drip Coffee"];
    const image = ["Latte", "Capuccino", "Matcha Tea", "Drip Coffee"];


    function rand(lst){
        return Math.floor(Math.random() * (lst.length-0+1)) 
    }

    var current_order;
    var earnings = 0;
    var time = 100;

    $("#time-rem").text(time);
    $("#money").text(earnings)


    
    $("#start-game").on("click", function(){
        event.preventDefault();
        $("#start").css("display","none");
        $("#mask").css("display","none");

        
        var i =0;
        

        var gametime = setInterval(() => {
            time-=1;
            $("#time-rem").text(time);

           if(time == 0){
            $("#time-rem").text(time);
               clearInterval(gametime)
               clearInterval(customers)
           }
           
       }, 1000);

       var customers = setInterval(() => {
        current_order = item[rand(item)]
        $("#cust-name").text(name[rand(name)]);
        $("#ord-name").text(current_order);
        i++;
       
   }, 8000);

    });

    $(".create-form").on("submit", function () {
        event.preventDefault();
        console.log("Current order is: "+current_order)

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

    

    $(document).on("click",".delete", function () {
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
    
    
    $(document).on("click",".add",function(){
        event.preventDefault();
        var id = $(this).data("id");
        var time = $(`#prog-${id}`).data("time");
        var comp = 100/time;
        var incr=0;
    
        console.log("This is my id:" +id)
    
    
        var progress = setInterval(() => {
             incr+= comp;
            $(`#prog-${id}`).attr("value",incr)
            time --
            if(time == 0){
                $(`#prog-${id}`).attr("value",100)
                $.ajax("/api/orders/" + id, {
                    type: "PUT",
                }).then(
                    function () {
                        // earnings+= $(`#row-${id}`).data("price");
                        // $("#money").text(earnings)
                        $(`#row-${id}`).remove();
                        
                    
                });
                clearInterval(progress)
            }
            
        }, 1000);
    });



});
