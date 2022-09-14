$('.always-one-open .btn').on('click', function(e) {
    if (!$(this).hasClass('collapsed')) {
        e.stopPropagation();
    } else {
        $(this).toggleClass("active");
        $(this).siblings().toggleClass("active");
    }
});

$('.carousel-with-smaller-images').on('slide.bs.carousel', function(e) {
    $('.open-high-quality-version').attr('href', $(e.relatedTarget).data('href-to-high-quality-version'));
});