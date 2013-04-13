(function($){
	$.fn.CanvasToPhp = function(){
		$.fn.CanvasToPhp.upload = function(options){
			var
			defaults = {
				canvasId: "",
				image: ""
			},
			settings = $.extend({}, defaults, options);
			var canvas = document.getElementById(settings.canvasId);
			var context = canvas.getContext("2d");
			var imageObj = new Image();
			imageObj.onload = function() {
				context.drawImage(imageObj,0,0);
			};
			imageObj.src = settings.image;
		}

		$.fn.CanvasToPhp.download = function(options){
			var
			defaults = {
				canvasId: "",
			},
			settings = $.extend({}, defaults, options);
			var canvas = document.getElementById(settings.canvasId);
			var img = canvas.toDataURL("image/png");
			var postData = "canvasData="+img;
			$.ajax({
				beforeSend: function(request) {
					request.setRequestHeader('Content-Type', 'canvas/upload');
			 	},
				type: "POST",
				url: 'export.php',
				data: postData,
				success: function(response){
					window.location = 'export.php?img=' + response;
				}
			});
		}
	}
})(jQuery);
