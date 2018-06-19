//Set "click-zone" div height
$("#click-zone").height($(window).height() - $("nav").height());

//Check if local storage exists and set the cps and score values
if (localStorage.getItem("dNumber") == null && localStorage.getItem("cps") == null) {
    var dNumber = 0;
    var cps = 0;
    var shopItemsCount = [0, 0, 0, 0];
} else {
    var dNumber = parseInt(localStorage.getItem("dNumber"));
    $("#score").text(dNumber + " D");
    $("#xd-text").append(document.createTextNode("D".repeat(dNumber)));
    var cps = parseInt(localStorage.getItem("cps"));
    var shopItemsCount = [0, 0, 0, 0];
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).startsWith("item")) {
            var arrayIndex = localStorage.key(i).slice(5)
            shopItemsCount[arrayIndex] = localStorage.getItem(localStorage.key(i))
            $("#info-item-" + arrayIndex).text("En votre possession: " + shopItemsCount[arrayIndex])
        }
    }
    
    if (cps != 0) {
        var clickInterval = setInterval(function() {
            click(cps);
        }, 1000);
    }
}

function startInterval() {
    clickInterval = setInterval(function() {
        click(cps);
    }, 1000);
}

function buyInShop(cpsAdded, cost, itemIndex) {
    if (cost <= dNumber) {
        dNumber -= cost;
        $("#score").text(dNumber + " D");
        $("#xd-text").text(function(){
            return $(this).text().substring(0, dNumber + 1);
        });
        cps = cps += cpsAdded;
        $("#cps").text(cps + " clics / s")
        if (clickInterval != undefined) {
            clearInterval(clickInterval);
        }
        startInterval();
        shopItemsCount[itemIndex]++
        $("#info-item-" + itemIndex).text("En votre possession: " + shopItemsCount[itemIndex])
    }
}

function click(number) {
    dNumber += number;
    $("#score").text(dNumber + " D");
    $("#xd-text").append(document.createTextNode("D"));
}

$("main").click(function() {
    click(1);
});

$("#shop-button,#close-shop").click(function() {
    $("#shop").fadeToggle("fast")
});

$("#save-button").click(function() {
    localStorage.setItem("dNumber", dNumber);
    localStorage.setItem("cps", cps);
    shopItemsCount.forEach(function(element, index) {
        localStorage.setItem("item-" + index, element);
    });
});

