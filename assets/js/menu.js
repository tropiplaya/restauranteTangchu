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
        if ($("#menu-navbar").hasClass("sticky-top")) {
            $("#menu-navbar").removeClass("sticky-top");
            $("#menu-navbar").removeClass("custom-bg");
            $("#menu-navbar").removeClass("px-1");
            if($("#nav-bar-logo").length != 0) {
                $("#nav-bar-logo").remove();
            }
        }
    } else {
        if (!$("#menu-navbar").hasClass("sticky-top")) {
            $("#menu-navbar").addClass("sticky-top");
            $("#menu-navbar").addClass("custom-bg");
            $("#menu-navbar").addClass("px-1");
            if($("#nav-bar-logo").length == 0) {
                $("#section-navbar").prepend('<li id="nav-bar-logo" class="nav-item"><a class="nav-link"><img class="" src="./assets/images/tangchu-logo.png" height="25px"/></a></li>');
            }
        }
    }
})

function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function readCSV(data) {
    let arr = $.csv.toArrays(data);
    let navList = [];
    let dishList = [];
    arr.forEach(
        function (elem, index) {
            if (index < 1) return false;

            if (elem[0] && elem[1] && elem[2] && elem[3] && elem[4]) {

                let safeStringSection = btoa(elem[0]);
                let sectionID = "section" +safeStringSection.replace(/=/g,'');
                if (!navList.hasOwnProperty(safeStringSection)) {
                    navList[safeStringSection] = [];

                    $("#section-navbar").append('<li class="nav-item"><a class="nav-link text-gold" id="pill-' + sectionID + '-tab" data-bs-toggle="pill" data-bs-target="#pill-' + sectionID + '" type="button" role="tab" aria-controls="pills-home" aria-selected="true">' + elem[0] + '</a></li>');

                    if ($(sectionID).length == 0) {
                        $("#pills-tabContent").append('<div class="tab-pane fade" id="pill-' + sectionID + '" role="tabpanel" aria-labelledby="pills-home-tab"><ul id="' + sectionID + '" class="nav nav-pills example"></ul></div>');
                    }
                }

                let safeStringCategory = btoa(elem[1]);
                let categoryID = "category" + safeStringCategory.replace(/=/g,'');
                if (!navList[safeStringSection].hasOwnProperty(safeStringCategory)) {
                    navList[safeStringSection][safeStringCategory] = [];

                    $("#" + sectionID).append('<li class="nav-item"><a class="nav-link text-gold font-italic" href="#' + categoryID + '">' + elem[1] + '</a></li>');

                    if ($(categoryID).length == 0) {
                        $("#dish-list").append('<div class="row border-bottom border-warning mb-2" id="' + categoryID + '"></div>');
                        $("#" + categoryID).append('<p class="h5 text-center text-gold mt-3 font-weight-bold">' + elem[1] + '</p>');
                    }
                    dishList[safeStringCategory] = [];
                }
                dishList[safeStringCategory].push(elem);
            }
        });

    buildDishesContent(dishList);

    reorderMenu();
}

function reorderMenu() {
    $("#section-navbar li:first").insertAfter($("#section-navbar li:last"));
}

const defaultImage = "./assets/images/tangchu/tangchu-bar.JPG";
function buildDishesContent(dishes) {
    if (dishes.length = 0) {
        return false;
    }

    for (const category in dishes) {
        if (!dishes.hasOwnProperty(category)) return false;

        let categoryID = "category" + category.replace(/=/g,'');

        let $categoryList = dishes[category];
        for(let i = 0; i < $categoryList.length; i++) {
            buildDishes(categoryID,$categoryList[i]);
        }
    }
}

function buildDishes(rowID, dishElem) {
    //DISHES
    let dishCardID = "dish" + dishElem[2];
    let dishCardAllergensID = dishCardID + "-allergens";
    console.log(rowID);
    console.log(dishCardID);
    let dishCard = '<div id="' + dishCardID + '" class="col-xs-12 col-md-6 col-xl-4 p-3"></div>';
    $("#" + rowID).append(dishCard);

    if (!dishElem[5]) {
        $("#" + dishCardID).append('<img src="./assets/images/tangchu/tangchu-' + dishElem[2] + '.JPG" class="img-fluid rounded p-4 d-block opacity-75" onerror="this.onerror=null; this.class=\'img-fluid rounded p-4 d-block opacity-50\'; this.src=\'' +  defaultImage + '\'" >');
    }

    //DETAILS
    $("#" + dishCardID).append('<p class="h6 text-light text-center">' + dishElem[2] + ". " + dishElem[3] + '</p>');
    $("#" + dishCardID).append('<p class="h5 text-light text-center">' + parseFloat(dishElem[4]).toLocaleString("es", {minimumFractionDigits: 2}) + '€</p>');

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
