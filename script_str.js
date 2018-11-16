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
$('.carousel').append('<div class="Carouimgdiv" id="img_div_2"><img class="Carouimg" src="https://daanvr.github.io/de_straat_op_maat/img/Str1/imgs/2.JPG"><div>');
$('.carousel').append('<div class="Carouimgdiv" id="img_div_3"><img class="Carouimg" src="https://daanvr.github.io/de_straat_op_maat/img/Str1/imgs/3.JPG"><div>');
$('.carousel').append('<div class="Carouimgdiv" id="img_div_4"><img class="Carouimg" src="https://daanvr.github.io/de_straat_op_maat/img/Str1/imgs/4.JPG"><div>');
$('.carousel').append('<div class="Carouimgdiv" id="img_div_5"><img class="Carouimg" src="https://daanvr.github.io/de_straat_op_maat/img/Str1/imgs/5.JPG"><div>');



$(document).ready(function () {
    $('.carousel').slick({
        slidesToShow: 3,
        infinite: true,
        dots: true,
        variableWidth: true,
        slidesToScroll: 1
        // centerMode: true,

        //   setting-name: setting-value
    });
});