// Flattr
(function() { 
  var s = document.createElement('script'), t = document.getElementsByTagName('script')[0];
	s.type = 'text/javascript';
	s.async = true;
	s.src = 'https://api.flattr.com/js/0.6/load.js?mode=auto';
  t.parentNode.insertBefore(s, t);
})();

// Styler
jQuery(function ($) {
  $('input.color').minicolors();

  var validateVal = function(elem, val, type) {
    var validates = false;

    switch (type) {
      case 'color':
        validates = /^#([0-9a-f]{3}|[0-9a-f]{6})$/.test(val);
        break;
      case 'size':
        validates = /^(?:-)?\d+(?:\.\d+)?(?:(?:px)?|(?:em)|(?:%))$/.test(val);
        break;
      case 'bool':
        validates = (val == "true" || val == "false");
        break;
      default:
        validates = false;
    }
    
    if (validates) $(elem).removeClass('error');
    else $(elem).addClass('error');
    
    return validates;
  }
  
  var autoTryTimeout;
  
  var autoSubmit = function () {
    var data = {
		  baseColor: $('#baseColor').val(),
			textColor: $('#textColor').val(),
			iconColor: $('#iconColor').val(),
			iconColorHover: $('#iconColorHover').val(),
			borderRadius: $('#borderRadius').val(),
			progressbarColor: $('#progressbarColor').val(),
			showContribs: $('#showContribs').val(),
			compactHeader: $('#compact').val()
		};
				
		$.post("/c", data, function(r) {
		  if (!r.css) {
			  alert("Something went wrong. Please check your inputs");
		  } else {
			  $("#generated").val(r.css);
				$("#generatedWithWrapper").val('<style rel="stylesheet">' + r.css + '</style>');
				$("#podstyle").html(r.css);
				$(".demoBg").css("background", $('#bodyBg').val());
		  }			
		});
  }
  
  $('input, select').change(function() {
    
    if (validateVal($(this), $(this).val(), $(this).data('val'))) {
      window.clearTimeout(autoTryTimeout);
      autoTryTimeout = window.setTimeout(autoSubmit, 250)
    } else {
      window.clearTimeout(autoTryTimeout);
    }
    
  });
  
  $('input[data-val="size"]').keydown(function() {
    $(this).trigger('change');
  });
  
});