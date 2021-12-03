$(document).ready(function () {
    if ($(window).width() < 922) {
        $('#sidebar').collapse({
            toggle: false
        });
    } else {
        $('#sidebar').collapse({
            toggle: true
        });
    }

    let url = "./assets/data/carta-tangchu.csv";
    $.ajax({
        type: "GET",
        url: url,
        dataType: "text"
    }).done(function (data) {
        readCSV(data);
    });

});

$(document).scroll(function() {
    if (isScrolledIntoView("#logo")) {
        if ($("#menu-navbar").hasClass("fixed-top")) {
            $("#menu-navbar").removeClass("fixed-top");
            $("#menu-navbar").removeClass("custom-bg");
            $("#menu-navbar").removeClass("px-5");
        }
    } else {
        if (!$("#menu-navbar").hasClass("fixed-top")) {
            $("#menu-navbar").addClass("fixed-top");
            $("#menu-navbar").addClass("custom-bg");
            $("#menu-navbar").addClass("px-5");
        }
    }
})
var listDish = null;
function readCSV(data) {
    let arr = $.csv.toArrays(data);
    let dishes = [];
    arr.forEach(
        function (elem, index) {
            if (index < 1) return false;

            if (elem[0] && elem[1] && elem[2] && elem[3] && elem[4]) {

                let safeStringSection = btoa(elem[0]);
                if (!dishes.hasOwnProperty(safeStringSection)) {
                    dishes[safeStringSection] = [];
                }

                let safeStringCategory = btoa(elem[1]);
                if (!dishes[safeStringSection].hasOwnProperty(safeStringCategory)) {
                    dishes[safeStringSection][safeStringCategory] = [];
                }
                dishes[safeStringSection][safeStringCategory].push(elem);
            }
        });
    console.log(dishes);
    listDish = dishes;
    buildNavbar(dishes);
}

const defaultImage = "./assets/images/tangchu/tangchu-bar.JPG";
function buildNavbar(dishes) {
    if (dishes.length = 0) {
        return false;
    }


    let sectionList = Object.keys(dishes);
    for (let i = 0; i < sectionList.length; i++) {
        let categoryList = Object.keys(dishes[sectionList[i]]);
        for (let j = 0; j < categoryList.length; j++) {

            $("#section-navbar").append('<li class="nav-item"><a class="nav-link" href="#section' + i + '">' + dishes[sectionList[i]][0][0][0] + '</a></li>');

            $("#category-navbar").append('<li class="nav-item"><a class="nav-link" href="#section' + i + '">' + dishes[i][j][0][1] + '</a></li>');

            let rowID = "category" + categoryList[j].replace(/=/g,'');
            if ($("#" + rowID).length == 0) {
                $("#dish-list").append('<div class="row" id="' + rowID + '"></div>');
                $("#" + rowID).append('<p class="text-white h3 text-center mt-3 font-weight-bold">' + atob(keyCategory) + '</p>');
            }

            let dishList = dishes[i][j];
            for(let k = 0; k < dishList.length; k++) {
                buildDishes(rowID, dishes[i][j][k]);
            }
        }
    }
}

function buildDishes(rowID, dishElem) {
    //DISHES
    let dishCardID = "dish" + dishElem[2];
    let dishCardAllergensID = dishCardID + "-allergens";
    console.log(dishCardID);
    let dishCard = '<div id="' + dishCardID + '" class="col-xs-12 col-md-6 col-xl-4 p-3"></div>';
    $("#" + rowID).append(dishCard);

    if (!dishElem[5]) {
        $("#" + dishCardID).append('<img src="./assets/images/tangchu/tangchu-' + dishElem[2] + '.JPG" class="img-fluid rounded p-4 d-block opacity-75" onerror="this.onerror=null; this.class=\'img-fluid rounded p-4 d-block opacity-50\'; this.src=\'' +  defaultImage + '\'" >');
    }

    //DETAILS
    $("#" + dishCardID).append('<p class="h6 text-light text-center">' + dishElem[2] + ". " + dishElem[3] + '</p>');
    $("#" + dishCardID).append('<p class="h5 text-light text-center">' + dishElem[4] + '</p>');

    $("#" + dishCardID).append('<div class="row"><div class="col-xs-12 text-center" id="' + dishCardAllergensID + '"></div></div>');
    if (dishElem[6]) {
        $("#" + dishCardAllergensID).append('<img src="./assets/icons/Fish.svg" class="align-top" height="50px">');
    }
    if (dishElem[7]) {
        $("#" + dishCardAllergensID).append('<img src="./assets/icons/Mollusks.svg" class="align-top" height="50px">');
    }
    if (dishElem[8]) {
        $("#" + dishCardAllergensID).append('<img src="./assets/icons/Crustaceans.svg" class="align-top" height="50px">');
    }
    if (dishElem[9]) {
        $("#" + dishCardAllergensID).append('<img src="./assets/icons/Peanuts.svg" class="align-top" height="50px">');
    }
    if (dishElem[10]) {
        $("#" + dishCardAllergensID).append('<img src="./assets/icons/Celery.svg" class="align-top" height="50px">');
    }
    if (dishElem[11]) {
        $("#" + dishCardAllergensID).append('<img src="./assets/icons/Lupins.svg" class="align-top" height="50px">');
    }
    if (dishElem[12]) {
        $("#" + dishCardAllergensID).append('<img src="./assets/icons/Mustard.svg" class="align-top" height="50px">');
    }
    if (dishElem[13]) {
        $("#" + dishCardAllergensID).append('<img src="./assets/icons/PeelFruits.svg" class="align-top" height="50px">');
    }
    if (dishElem[14]) {
        $("#" + dishCardAllergensID).append('<img src="./assets/icons/Egg.svg" class="align-top" height="50px">');
    }
    if (dishElem[15]) {
        $("#" + dishCardAllergensID).append('<img src="./assets/icons/DairyProducts.svg" class="align-top" height="50px">');
    }
    if (dishElem[16]) {
        $("#" + dishCardAllergensID).append('<img src="./assets/icons/SesameGrains.svg" class="align-top" height="50px">');
    }
    if (dishElem[17]) {
        $("#" + dishCardAllergensID).append('<img src="./assets/icons/Sulphites.svg" class="align-top" height="50px">');
    }
    if (dishElem[18]) {
        $("#" + dishCardAllergensID).append('<img src="./assets/icons/Gluten.svg" class="align-top" height="50px">');
    }
    if (dishElem[19]) {
        $("#" + dishCardAllergensID).append('<img src="./assets/icons/Soy.svg" class="align-top" height="50px">');
    }
}

function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}