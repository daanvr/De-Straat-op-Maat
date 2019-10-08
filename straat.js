var allStreetData;
var streetData;
const verkeersintensiteitMax = 32000;
const ruimteMax = 75;

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

var urlStreetId = getUrlParameter('straat');
console.log("selected street: "+urlStreetId);

$(document).ready(function () {
    $.getJSON("street-data.json", function () { }).done(function (loadedData) {
        allStreetData = loadedData; // save all streets for search and comaprison.
        // streetData = loadedData[0]; //default street when no street was found in url
        for (s in allStreetData) {
            if (allStreetData[s].streetId == urlStreetId) {
                streetData = loadedData[s]; //select street based on url
            }
        }
        if (streetData === undefined) {
            console.log("No street was selected fomr url. Bij default the first street was shown")
            streetData = loadedData[0];
        }
        initiateStreetContent();
        initiatingMaps();
    });
    initiatingEvents();
});

function initiatingEvents() {
    $(".NavBtnHome").click(function () {
        window.location = "https://daanvr.github.io/de_straat_op_maat/index.html";
        return false;
    });
}

function initiatingMaps() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ291ZGFwcGVsIiwiYSI6ImNqeXprc3phbjAybTEzZGxqZzR1OHZqOWEifQ.jRzPHdAKKUmyL72_8-2glw';

    var mapCity = new mapboxgl.Map({
        container: 'map-city',
        style: 'mapbox://styles/goudappel/ck16iczib11qr1cnt69dcj7fq',
        center: streetData.mapCity.center,
        pitch: streetData.mapCity.pitch,
        bearing: streetData.mapCity.bearing,
        zoom: streetData.mapCity.zoom
    });

    var mapStreet = new mapboxgl.Map({
        container: 'map-street',
        style: 'mapbox://styles/goudappel/ck1antj3s07tg1cpiqdmocp57',
        center: streetData.mapStreet.center,
        pitch: streetData.mapStreet.pitch,
        bearing: streetData.mapStreet.bearing,
        zoom: streetData.mapStreet.zoom
    });

    mapCity.addControl(new mapboxgl.NavigationControl(), 'top-left');
    mapStreet.addControl(new mapboxgl.NavigationControl(), 'top-right');
    mapCity.scrollZoom.disable();
    mapStreet.scrollZoom.disable();

    setTimeout(function () {
        mapCity.addSource("street", {
            type: 'geojson',
            data: streetData.geojsonLine
        })
        mapStreet.addSource("street", {
            type: 'geojson',
            data: streetData.geojsonFog
        })
        mapCity.addLayer({
            "id": "streetLine",
            "source": "street",
            "type": "line",
            "layout": {
                "line-cap": "round",
                "line-miter-limit": 2
            },
            "paint": {
                "line-width": 5,
                "line-offset": 0,
                "line-opacity": 0.9,
                "line-color": "#97b03b"
            }
        }, "building-number-label");
        mapStreet.addLayer({
            "id": "fog",
            "source": "street",
            "type": "heatmap",
            "paint": {
                "heatmap-color": [
                    "interpolate",
                    ["linear"],
                    ["heatmap-density"],
                    0,
                    "hsla(240, 0%, 100%, 0.72)",
                    0.2,
                    "hsla(180, 0%, 100%, 0)"
                ],
                "heatmap-radius": { "base": 2, "stops": [[4, 1], [22, 4096]] },
                "heatmap-weight": 10,
                "heatmap-intensity": 1
            }
        });
    }, 1000);
}

function initiateStreetContent() {
    $('.header-img-container').css('background-image', 'url("' + streetData.headerPhoto.photoLocation + '")');
    var headerPhotoHeight = $(window).width() / streetData.headerPhoto.ratio;
    $('.header-img-container').css('height', headerPhotoHeight + 'px');
    // $('.header-img-container').css('background-position-y:', '50px;');

    $('.StrTitle').text(streetData.streetName + ", " + streetData.cityName);

    var valueInt = (streetData.verkeersintensiteit / verkeersintensiteitMax) * 100;
    $("#int-progress").css("width", valueInt + "%");
    $("#int-progress-nbr").text(streetData.verkeersintensiteit + " motorvoertuigen/etmaal");

    var valueRui = (streetData.ruimte / ruimteMax) * 100;
    $("#ruim-progress").css("width", valueRui + "%");
    $("#ruim-progress-nbr").text(streetData.ruimte + " meter");

    $(".ident-svg").css('background-image', 'url("' + streetData.identiteit + '")');

    var crossSectionimg = '<img class="largeImage" src="' + streetData.streetCrossSectionPng + '" alt="Profiel">';
    $(".crossSectionContianer").append(crossSectionimg);

    $("#expertContainer").append(expertImg());
    var judgement = "<p>" + streetData.expertJudgement.judgementText + "</p>" + streetData.expertJudgement.expertName + "<br>" + streetData.expertJudgement.expertDescription;
    $(".textBuble").html(judgement);

    var FAImg = '<img class="largeImage" src="' + streetData.functionalAmbiance + '" alt="Functional Ambiance">';
    $(".functionalAmbianceContainer").append(FAImg);

    for (i in streetData.photos) {
        var html = '<div class="photoContainer"><img class="photo" src="';
        html += streetData.photos[i].fileLocation;
        html += '" alt="Foto ';
        html += i;
        html += '"><div class="photoTextContainer"><p class="photoText">';
        html += streetData.photos[i].textDescription;
        html += '</p></div></div>';
        $(".photosContainer").append(html);
    }


    function expertImg() {
        var expertImg = "";
        switch (streetData.expertJudgement.gender) {
            case "Female":
            case "female":
            case "F":
                expertImg = '<img class="expertImg" src="img/str2/woman.svg" alt="expert">';
                break;
            case "Male":
            case "male":
            case "M":
                expertImg = '<img class="expertImg" src="img/str2/man.svg" alt="expert">';
                break;
            default:
                break;
        }
        switch (streetData.expertJudgement.photoLocation) {
            case "":
            case " ":
            case undefined:
                expertImg = '<img class="expertImg" src="img/str2/woman.svg" alt="expert">';
                break;
            default:
                expertImg = '<img class="expertImg" src="' + streetData.expertJudgement.photoLocation + '" alt="expert">';
                break;
        }

        return expertImg;
    }
}

function unusedCodeForNow() {
    // $('.carousel').append('<div class="Carouimgdiv" id="img_div_1"><img class="Carouimg" src="https://daanvr.github.io/de_straat_op_maat/img/Str1/imgs/1.jpg"><div>');
    // $('.carousel').append('<div class="Carouimgdiv" id="img_div_2"><img class="Carouimg" src="https://daanvr.github.io/de_straat_op_maat/img/Str1/imgs/2.JPG">Autoparkeren aan rechterzijde en overige voorzieningen aan linkerzijde<div>');
    // $('.carousel').append('<div class="Carouimgdiv" id="img_div_3"><img class="Carouimg" src="https://daanvr.github.io/de_straat_op_maat/img/Str1/imgs/3.JPG"><div>');
    // $('.carousel').append('<div class="Carouimgdiv" id="img_div_4"><img class="Carouimg" src="https://daanvr.github.io/de_straat_op_maat/img/Str1/imgs/4.JPG">Fietsen staan op veel plekken geplaatst waar het niet hoort<div>');
    // $('.carousel').append('<div class="Carouimgdiv" id="img_div_5"><img class="Carouimg" src="https://daanvr.github.io/de_straat_op_maat/img/Str1/imgs/5.JPG">Hangende verlichting<div>');

    // $('.carousel').slick({
    //     slidesToShow: 2,
    //     infinite: true,
    //     dots: true,
    //     variableWidth: true,
    //     arrows: false,
    //     centerMode: true,
    //     // centerPadding: '60px',
    //     speed: 100,

    //     // fade: true,
    //     // slidesToScroll: 1
    // });

    // $('.VoorenNa').slick({
    //     slidesToShow: 1,
    //     infinite: true,
    //     dots: false,
    //     variableWidth: false,
    //     arrows: false,
    //     centerMode: true,
    //     // centerPadding: '60px',
    //     speed: 300,
    //     fade: true,
    //     // slidesToScroll: 1
    // });

    // count = 0;
    // for (var i = 0; i <= 10; i++) {
    //     $.ajax({
    //         url: 'https://daanvr.github.io/de_straat_op_maat/img/Str1/imgs/' + i + '.jpg',
    //         type: 'HEAD',
    //         error: function () {
    //             console.log(i + ".jpg not found");
    //             // alert('EMPTY FOLDER');
    //         },
    //         success: function () {
    //             count++;
    //             $('.carousel').append('<div id="img_div_' + i + '"><img src=" https://daanvr.github.io/de_straat_op_maat/img/Str1/imgs/' + i + '.jpg"><div>');
    //         }
    //     });
    // }
}

function goToHomePage() {
    window.location.href = "index.html";
}