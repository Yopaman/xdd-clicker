//Set "click-zone" div height
$("#click-zone").height($(window).height() - $("nav").height());

//Check if local storage exists and set the cps and score values
if (localStorage.getItem("dNumber") == null && localStorage.getItem("cps") == null) {
    var dNumber = 0;
    var cps = 0;
    var shopItemsCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
} else {
    var dNumber = parseInt(localStorage.getItem("dNumber"));
    $("#score").text(dNumber + " D");
    appendD(dNumber);
    var cps = parseInt(localStorage.getItem("cps"));
    $("#cps").text(cps + " clics / s")
    var shopItemsCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
        var ones = Math.floor(cost % 10),
            tens = Math.floor(cost/10 % 10),
            hundreds = Math.floor(cost/100 % 10),
            thousands = Math.floor(cost % 10000 /1000),
            tenThousands = Math.floor(cost / 10000 % 10),
            hundredThousands = Math.floor(cost / 100000 % 10),
            millions = Math.floor(cost / 1000000 % 10),
            tenMillions = Math.floor(cost / 10000000 % 10),
            hundredMillions = Math.floor(cost / 100000000 % 10);
        $("#ones").text("");
        $("#tens").text("");
        $("#hundreds").text("");
        $("#thousands").text("");
        $("#ten-thousands").text("");
        $("#hundred-thousands");
        $("#millions").text("");
        appendD(dNumber);
        cps = cps += cpsAdded;
        $("#cps").text(cps + " clics / s");
        if (clickInterval != undefined) {
            clearInterval(clickInterval);
        }
        startInterval();
        shopItemsCount[itemIndex]++;
        $(".shop-item-" + itemIndex).removeClass("white");
        $(".shop-item-" + itemIndex).addClass("green lighten-3");
        setTimeout(function() {
            $(".shop-item-" + itemIndex).removeClass("green lighten-3");
            $(".shop-item-" + itemIndex).addClass("white");
        }, 500);
        $("#info-item-" + itemIndex).text("En votre possession: " + shopItemsCount[itemIndex])
    } else {
        $(".shop-item-" + itemIndex).removeClass("white");
        $(".shop-item-" + itemIndex).addClass("red lighten-3");
        setTimeout(function() {
            $(".shop-item-" + itemIndex).removeClass("red lighten-3");
            $(".shop-item-" + itemIndex).addClass("white");
        }, 500);
    }
}

function click(number) {
    dNumber += number;
    $("#score").text(dNumber + " D");
    $("#ones").text("");
    $("#tens").text("");
    $("#hundreds").text("");
    $("#thousands").text("");
    $("#ten-thousands").text("");
    $("#hundred-thousands");
    $("#millions").text("");
    appendD(dNumber);
}

function appendD(number) {
    var ones = Math.floor(number % 10),
        tens = Math.floor(number/10 % 10),
        hundreds = Math.floor(number/100 % 10),
        thousands = Math.floor(number % 10000 /1000),
        tenThousands = Math.floor(number / 10000 % 10),
        hundredThousands = Math.floor(number / 100000 % 10),
        millions = Math.floor(number / 1000000 % 10),
        tenMillions = Math.floor(number / 10000000 % 10),
        hundredMillions = Math.floor(number / 100000000 % 10);

    $("#ones").append(document.createTextNode("D".repeat(ones)));
    $("#tens").append(document.createTextNode("D".repeat(tens)));
    $("#hundreds").append(document.createTextNode("D".repeat(hundreds)));
    $("#thousands").append(document.createTextNode("D".repeat(thousands)));
    $("#ten-thousands").append(document.createTextNode("D".repeat(tenThousands)));
    $("#hundred-thousands").append(document.createTextNode("D".repeat(hundredThousands)));
    $("#millions").append(document.createTextNode("D".repeat(millions)));

    if ($("#ones").text().length >= 10) {
        $("#ones").text("");
        $("#tens").append(document.createTextNode("D"));
    } else if ($("#tens").text().length >= 10) {
        $("#tens").text("");
        $("#hundreds").append(document.createTextNode("D"));
    } else if ($("#tens").text().length >= 10) {
        $("#tens").text("");
        $("#hundreds").append(document.createTextNode("D"));
    } else if ($("#hundreds").text().length >= 10) {
        $("#hundreds").text("");
        $("#thousands").append(document.createTextNode("D"));
    } else if ($("#thousands").text().length >= 10) {
        $("#thousands").text("");
        $("#ten-thousands").append(document.createTextNode("D"));
    } else if ($("#ten-thousands").text().length >= 10) {
        $("#ten-thousands").text("");
        $("#hundred-thousands").append(document.createTextNode("D"));
    } else if ($("#hundred-thousands").text().length >= 10) {
        $("#hundred-thousands").text("");
        $("#millions").append(document.createTextNode("D"));
    }
}

$("main").click(function() {
    click(1);
});

$("#shop-button,#close-shop").click(function() {
    $("#shop").fadeToggle("fast");
    $(".toast").hide();
    $("#infos").hide();
});

$("#save-button").click(function() {
    localStorage.setItem("dNumber", dNumber);
    localStorage.setItem("cps", cps);
    shopItemsCount.forEach(function(element, index) {
        localStorage.setItem("item-" + index, element);
    });
    $("#shop").hide();
    $("#infos").hide();
});

$("#infos-button,#close-infos").click(function() {
    $("#infos").fadeToggle("fast");
    $(".toast").hide();
    $("#shop").hide();
});

$("#reset-button").click(function() {
    localStorage.clear();
    location.reload();
});

