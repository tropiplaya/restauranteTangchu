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

function readCSV(data) {
    let arr = $.csv.toArrays(data);
    let dishes = [];
    arr.forEach(
        function (elem, index) {
            if (index < 1) return false;
            console.log(elem);
            if (elem[0] && elem[1] && elem[2] && elem[3]) {

                let safeString = btoa(elem[0]);
                if (!dishes.hasOwnProperty(safeString)) {

                    console.log(safeString);
                    dishes[safeString] = [];
                }
                dishes[safeString].push(elem);
            }
        });
    console.log(dishes);
    buildMenu(dishes);
}

function buildMenu(dishes) {
    if (dishes.length = 0) {
        return false;
    }

    let defaultImage = "./assets/images/tangchu/tangchu-bar.JPG";
    for (const keyCategory in dishes) {
        if (dishes.hasOwnProperty(keyCategory)) {

            //CATEGORIES
            let categoryList = dishes[keyCategory];
            let rowID = "category" + keyCategory.replace(/=/g,'');

            $("#dish-category").append('<li class="nav-item"><a class="nav-link" href="#' + rowID + '">' + atob(keyCategory) + '</a></li>');

            if ($("#" + rowID).length == 0) {
                $("#dish-list").append('<div class="row" id="' + rowID + '"></div>');
                $("#" + rowID).append('<p class="text-white h3 text-center mt-3 font-weight-bold">' + atob(keyCategory) + '</p>');
            }

            for (const keyDish in categoryList) {

                //DISHES
                let dishCardID = "dish" + categoryList[keyDish][1];
                let dishCardAllergensID = dishCardID + "-allergens";
                console.log(dishCardID);
                let dishCard = '<div id="' + dishCardID + '" class="col-xs-12 col-md-6 col-xl-4 p-3"></div>';
                $("#" + rowID).append(dishCard);

                if (!categoryList[keyDish][4]) {
                    $("#" + dishCardID).append('<img src="./assets/images/tangchu/tangchu-' + categoryList[keyDish][1] + '.JPG" class="img-fluid rounded p-4 d-block opacity-75" onerror="this.onerror=null; this.class=\'img-fluid rounded p-4 d-block opacity-50\'; this.src=\'' +  defaultImage + '\'" >');
                }

                //DETAILS
                $("#" + dishCardID).append('<p class="h5 text-light text-center">' + categoryList[keyDish][1] + ". " + categoryList[keyDish][2] + '</p>');
                $("#" + dishCardID).append('<p class="h4 text-light text-center">' + categoryList[keyDish][3] + '</p>');

                $("#" + dishCardID).append('<div class="row"><div class="col-xs-12 text-center" id="' + dishCardAllergensID + '"></div></div>');
                if (categoryList[keyDish][5]) {
                    $("#" + dishCardAllergensID).append('<img src="./assets/icons/Fish.svg" class="align-top" height="50px">');
                }
                if (categoryList[keyDish][6]) {
                    $("#" + dishCardAllergensID).append('<img src="./assets/icons/Mollusks.svg" class="align-top" height="50px">');
                }
                if (categoryList[keyDish][7]) {
                    $("#" + dishCardAllergensID).append('<img src="./assets/icons/Crustaceans.svg" class="align-top" height="50px">');
                }
                if (categoryList[keyDish][8]) {
                    $("#" + dishCardAllergensID).append('<img src="./assets/icons/Peanuts.svg" class="align-top" height="50px">');
                }
                if (categoryList[keyDish][9]) {
                    $("#" + dishCardAllergensID).append('<img src="./assets/icons/Celery.svg" class="align-top" height="50px">');
                }
                if (categoryList[keyDish][10]) {
                    $("#" + dishCardAllergensID).append('<img src="./assets/icons/Lupins.svg" class="align-top" height="50px">');
                }
                if (categoryList[keyDish][11]) {
                    $("#" + dishCardAllergensID).append('<img src="./assets/icons/Mustard.svg" class="align-top" height="50px">');
                }
                if (categoryList[keyDish][12]) {
                    $("#" + dishCardAllergensID).append('<img src="./assets/icons/PeelFruits.svg" class="align-top" height="50px">');
                }
                if (categoryList[keyDish][13]) {
                    $("#" + dishCardAllergensID).append('<img src="./assets/icons/Egg.svg" class="align-top" height="50px">');
                }
                if (categoryList[keyDish][14]) {
                    $("#" + dishCardAllergensID).append('<img src="./assets/icons/DairyProducts.svg" class="align-top" height="50px">');
                }
                if (categoryList[keyDish][15]) {
                    $("#" + dishCardAllergensID).append('<img src="./assets/icons/SesameGrains.svg" class="align-top" height="50px">');
                }
                if (categoryList[keyDish][16]) {
                    $("#" + dishCardAllergensID).append('<img src="./assets/icons/Sulphites.svg" class="align-top" height="50px">');
                }
                if (categoryList[keyDish][17]) {
                    $("#" + dishCardAllergensID).append('<img src="./assets/icons/Gluten.svg" class="align-top" height="50px">');
                }
                if (categoryList[keyDish][18]) {
                    $("#" + dishCardAllergensID).append('<img src="./assets/icons/Soy.svg" class="align-top" height="50px">');
                }
            }
        }
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