$('.always-one-open .btn').on('click', function(e) {
    if (!$(this).hasClass('collapsed')) {
        e.stopPropagation();
    } else {
        $(this).toggleClass("active");
        $(this).siblings().toggleClass("active");
    }
});