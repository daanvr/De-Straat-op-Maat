$(".NavBtnHome").click(function () {
    window.location = "https://daanvr.github.io/de_straat_op_maat/index.html";
    return false;
});

count = 0;
for (var i = 0; i <= 10; i++) {
    $.ajax({
        url: 'https://daanvr.github.io/de_straat_op_maat/img/Str1/imgs/' + i + '.jpg',
        type: 'HEAD',
        error: function () {
            alert('EMPTY FOLDER');
        },
        success: function () {
            count++;
            $('#target').append('<div id="img_div_' + i + '"><img src=" https://daanvr.github.io/de_straat_op_maat/img/Str1/imgs/' + i + '.jpg"><div>');
        }
    });
}

$(document).ready(function () {
    $('.carousel').slick({
        slidesToShow: 3,
        dots: true,
        slidesToScroll: 1

        //   setting-name: setting-value
    });
});