$(".NavBtnHome").click(function () {
    window.location = "https://daanvr.github.io/de_straat_op_maat/index.html";
    return false;
});

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


$('.carousel').append('<div class="Carouimgdiv" id="img_div_1"><img class="Carouimg" src="https://daanvr.github.io/de_straat_op_maat/img/Str1/imgs/1.jpg"><div>');
$('.carousel').append('<div class="Carouimgdiv" id="img_div_2"><img class="Carouimg" src="https://daanvr.github.io/de_straat_op_maat/img/Str1/imgs/2.JPG">Autoparkeren aan rechterzijde en overige voorzieningen aan linkerzijde<div>');
// $('.carousel').append('<div class="Carouimgdiv" id="img_div_3"><img class="Carouimg" src="https://daanvr.github.io/de_straat_op_maat/img/Str1/imgs/3.JPG"><div>');
$('.carousel').append('<div class="Carouimgdiv" id="img_div_4"><img class="Carouimg" src="https://daanvr.github.io/de_straat_op_maat/img/Str1/imgs/4.JPG">Fietsen staan op veel plekken geplaatst waar het niet hoort<div>');
$('.carousel').append('<div class="Carouimgdiv" id="img_div_5"><img class="Carouimg" src="https://daanvr.github.io/de_straat_op_maat/img/Str1/imgs/5.JPG">Hangende verlichting<div>');

$('.VoorenNa').append('<div class="Carouimgdiv" id="img_div_6"><img class="Carouimg" src="https://daanvr.github.io/de_straat_op_maat/img/Str1/imgs/OUD.JPG">Fietsen staan op veel plekken geplaatst waar het niet hoort<div>');
$('.VoorenNa').append('<div class="Carouimgdiv" id="img_div_7"><img class="Carouimg" src="https://daanvr.github.io/de_straat_op_maat/img/Str1/imgs/2.JPG">Hangende verlichting<div>');



$(document).ready(function () {
    $('.carousel').slick({
        slidesToShow: 2,
        infinite: true,
        dots: true,
        variableWidth: true,
        arrows: false,
        centerMode: true,
        // centerPadding: '60px',
        speed: 100,

        // fade: true,
        // slidesToScroll: 1
    });

    $('.VoorenNa').slick({
        slidesToShow: 1,
        infinite: true,
        dots: false,
        variableWidth: false,
        arrows: false,
        centerMode: true,
        // centerPadding: '60px',
        speed: 300,
        fade: true,
        // slidesToScroll: 1
    });
});