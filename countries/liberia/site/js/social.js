$(function () {
    $(".tweet").click(function () {
        window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent("Liberia Ebola Report: " + window.location), '', 'height=375,width=600');
    }); 

    $(".fb").click(function () {
        window.open('https://www.facebook.com/sharer/sharer.php?t='+ encodeURIComponent("Liberia Ebola Report") +'&u=' + encodeURIComponent(window.location), '', 'height=375,width=600');
    });    
});