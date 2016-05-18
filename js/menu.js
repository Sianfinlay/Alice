// menu functions
function openNav() {
    $("#myNav").css("width", "100%");
    $(".game").css("display", "none");
}

function closeNav() {
    $("#myNav").css("width", "0%");
    setTimeout(function() { // timeout to deal with menu and canvas overlap issue
    	// z-index doesn't seem to fix it
    	$(".game").css("display", "table");
    }, 500);
    
}
