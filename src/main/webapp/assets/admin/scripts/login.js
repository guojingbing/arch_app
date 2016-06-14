var Login = function() {
	var c = function() {
		$(".login-form").validate({
			errorElement : "span",
			errorClass : "help-block",
			focusInvalid : false,
			rules : {
				username : {
					required : true
				},
				password : {
					required : true
				},
				remember : {
					required : false
				}
			},
			messages : {
				username : {
					required : "Username is required."
				},
				password : {
					required : "Password is required."
				}
			},
			invalidHandler : function(e, d) {
				$(".alert-danger", $(".login-form")).show()
			},
			highlight : function(d) {
				$(d).closest(".form-group").addClass("has-error")
			},
			success : function(d) {
				d.closest(".form-group").removeClass("has-error");
				d.remove()
			},
			errorPlacement : function(d, e) {
				d.insertAfter(e.closest(".input-icon"))
			},
			submitHandler : function(d) {
				d.submit()
			}
		});
		$(".login-form input").keypress(function(d) {
			if (d.which == 13) {
				if ($(".login-form").validate().form()) {
					$(".login-form").submit()
				}
				return false
			}
		})
	};
	var a = function() {
		$(".forget-form").validate({
			errorElement : "span",
			errorClass : "help-block",
			focusInvalid : false,
			ignore : "",
			rules : {
				email : {
					required : true,
					email : true
				}
			},
			messages : {
				email : {
					required : "Email is required."
				}
			},
			invalidHandler : function(e, d) {
			},
			highlight : function(d) {
				$(d).closest(".form-group").addClass("has-error")
			},
			success : function(d) {
				d.closest(".form-group").removeClass("has-error");
				d.remove()
			},
			errorPlacement : function(d, e) {
				d.insertAfter(e.closest(".input-icon"))
			},
			submitHandler : function(d) {
				d.submit()
			}
		});
		$(".forget-form input").keypress(function(d) {
			if (d.which == 13) {
				if ($(".forget-form").validate().form()) {
					$(".forget-form").submit()
				}
				return false
			}
		});
		jQuery("#forget-password").click(function() {
			jQuery(".login-form").hide();
			jQuery(".forget-form").show()
		});
		jQuery("#back-btn").click(function() {
			jQuery(".login-form").show();
			jQuery(".forget-form").hide()
		})
	};
	var b = function() {
		function d(e) {
			if (!e.id) {
				return e.text
			}
			return "<img class='flag' src='assets/img/flags/"
					+ e.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + e.text
		}
		$("#select2_sample4")
				.select2(
						{
							placeholder : '<i class="fa fa-map-marker"></i>&nbsp;Select a Country',
							allowClear : true,
							formatResult : d,
							formatSelection : d,
							escapeMarkup : function(e) {
								return e
							}
						});
		$("#select2_sample4").change(function() {
			$(".register-form").validate().element($(this))
		});
		$(".register-form").validate({
			errorElement : "span",
			errorClass : "help-block",
			focusInvalid : false,
			ignore : "",
			rules : {
				fullname : {
					required : true
				},
				email : {
					required : true,
					email : true
				},
				address : {
					required : true
				},
				city : {
					required : true
				},
				country : {
					required : true
				},
				username : {
					required : true
				},
				password : {
					required : true
				},
				rpassword : {
					equalTo : "#register_password"
				},
				tnc : {
					required : true
				}
			},
			messages : {
				tnc : {
					required : "Please accept TNC first."
				}
			},
			invalidHandler : function(f, e) {
			},
			highlight : function(e) {
				$(e).closest(".form-group").addClass("has-error")
			},
			success : function(e) {
				e.closest(".form-group").removeClass("has-error");
				e.remove()
			},
			errorPlacement : function(e, f) {
				if (f.attr("name") == "tnc") {
					e.insertAfter($("#register_tnc_error"))
				} else {
					if (f.closest(".input-icon").size() === 1) {
						e.insertAfter(f.closest(".input-icon"))
					} else {
						e.insertAfter(f)
					}
				}
			},
			submitHandler : function(e) {
				e.submit()
			}
		});
		$(".register-form input").keypress(function(f) {
			if (f.which == 13) {
				if ($(".register-form").validate().form()) {
					$(".register-form").submit()
				}
				return false
			}
		});
		jQuery("#register-btn").click(function() {
			jQuery(".login-form").hide();
			jQuery(".register-form").show()
		});
		jQuery("#register-back-btn").click(function() {
			jQuery(".login-form").show();
			jQuery(".register-form").hide()
		})
	};
	return {
		init : function() {
			c();
			a();
			b()
		}
	}
}();