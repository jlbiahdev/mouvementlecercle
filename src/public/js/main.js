jQuery(window).on('load', function() {
});

jQuery(document).ready(function($) {
    
    // OPEN POPUP SEQUENCE
    $(".open-popup").click(function(){
        
        $(".popup").addClass("show");
        $(".popup").append('<div class="close-popup backface"></div>');
        
    });

    $(document).on('click', '.close-popup', function(){ 
        $(".popup").removeClass("show");
        $(".popup .backface").remove();
    });    
});