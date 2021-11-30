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

function readCSV(data) {
    let arr = $.csv.toArrays(data);
    let dishes = {};
    arr.forEach(
        function (elem, index) {
            if (index < 1) return false;
            //console.log(elem);
            if (elem[0] && elem[1] && elem[2] && elem[3]) {
                let safeString = btoa(elem[0]);
                if (!dishes.hasOwnProperty(safeString)) {
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

    for (const keyCategory in dishes) {
        if (dishes.hasOwnProperty(keyCategory)) {
            let categoryList = dishes[keyCategory];
            let rowID = "category" + keyCategory.slice(0, -2);
            console.info(rowID);
            $("#dish-category").append('<li class="nav-item"><a class="nav-link" href="#' + rowID + '">' + atob(keyCategory) + '</a></li>');

            if ($("#" + rowID).length == 0) {
                $("#dish-list").append('<div class="row" id="' + rowID + '"></div>');
            }
            console.log(categoryList);
            for (const keyDish in categoryList) {
                let dishCardID = "dish" + categoryList[keyDish][1];
                console.log(dishCardID);
                let dishCard = '<div id="' + dishCardID + '" class="col-xs-12 col-md-6 col-xl-4 p-5"></div>';
                $("#" + rowID).append(dishCard);

                $("#" + dishCardID).append('<img src="./assets/images/dishes/dish' + categoryList[keyDish][1] + '.JPG" class="img-fluid rounded p-4 d-block" onerror="this.onerror=null; this.src=\'./assets/images/tangchu-logo.png\'" >');
                $("#" + dishCardID).append('<p class="h5 text-light text-center">' + categoryList[keyDish][2] + '</p>');
                $("#" + dishCardID).append('<p class="h4 text-light text-center">' + categoryList[keyDish][3] + '</p>');

            }
        }
    }
}