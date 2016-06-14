var Inbox = function() {
	var i = $(".inbox-content");
	var e = $(".inbox-loading");
	var f = function(o, n) {
		var m = "inbox_inbox.html";
		var p = $(".inbox-nav > li." + n + " a").attr("data-title");
		e.show();
		i.html("");
		g(o);
		$.ajax({
			type : "GET",
			cache : false,
			url : m,
			dataType : "html",
			success : function(q) {
				g(o);
				$(".inbox-nav > li.active").removeClass("active");
				$(".inbox-nav > li." + n).addClass("active");
				$(".inbox-header > h1").text(p);
				e.hide();
				i.html(q);
				App.fixContentHeight();
				App.initUniform()
			},
			error : function(s, q, r) {
				g(o)
			},
			async : false
		})
	};
	var a = function(o, n, p) {
		var m = "inbox_view.html";
		e.show();
		i.html("");
		g(o);
		$.ajax({
			type : "GET",
			cache : false,
			url : m,
			dataType : "html",
			success : function(q) {
				g(o);
				if (p) {
					$(".inbox-nav > li.active").removeClass("active")
				}
				$(".inbox-header > h1").text("View Message");
				e.hide();
				i.html(q);
				App.fixContentHeight();
				App.initUniform()
			},
			error : function(s, q, r) {
				g(o)
			},
			async : false
		})
	};
	var l = function() {
		$(".inbox-wysihtml5")
				.wysihtml5(
						{
							stylesheets : [ "assets/plugins/bootstrap-wysihtml5/wysiwyg-color.css" ]
						})
	};
	var h = function() {
		$("#fileupload").fileupload({
			url : "assets/plugins/jquery-file-upload/server/php/",
			autoUpload : true
		});
		if ($.support.cors) {
			$.ajax({
				url : "assets/plugins/jquery-file-upload/server/php/",
				type : "HEAD"
			}).fail(
					function() {
						$('<span class="alert alert-error"/>').text(
								"Upload server currently unavailable - "
										+ new Date()).appendTo("#fileupload")
					})
		}
	};
	var k = function(n) {
		var m = "inbox_compose.html";
		e.show();
		i.html("");
		g(n);
		$.ajax({
			type : "GET",
			cache : false,
			url : m,
			dataType : "html",
			success : function(o) {
				g(n);
				$(".inbox-nav > li.active").removeClass("active");
				$(".inbox-header > h1").text("Compose");
				e.hide();
				i.html(o);
				h();
				l();
				$(".inbox-wysihtml5").focus();
				App.fixContentHeight();
				App.initUniform()
			},
			error : function(q, o, p) {
				g(n)
			},
			async : false
		})
	};
	var b = function(n) {
		var m = "inbox_reply.html";
		e.show();
		i.html("");
		g(n);
		$.ajax({
			type : "GET",
			cache : false,
			url : m,
			dataType : "html",
			success : function(o) {
				g(n);
				$(".inbox-nav > li.active").removeClass("active");
				$(".inbox-header > h1").text("Reply");
				e.hide();
				i.html(o);
				$('[name="message"]')
						.val($("#reply_email_content_body").html());
				d();
				h();
				l();
				App.fixContentHeight();
				App.initUniform()
			},
			error : function(q, o, p) {
				g(n)
			},
			async : false
		})
	};
	var c = function(n) {
		var m = "inbox_search_result.html";
		e.show();
		i.html("");
		g(n);
		$.ajax({
			type : "GET",
			cache : false,
			url : m,
			dataType : "html",
			success : function(o) {
				g(n);
				$(".inbox-nav > li.active").removeClass("active");
				$(".inbox-header > h1").text("Search");
				e.hide();
				i.html(o);
				App.fixContentHeight();
				App.initUniform()
			},
			error : function(q, o, p) {
				g(n)
			},
			async : false
		})
	};
	var d = function() {
		var n = $(".inbox-compose .mail-to .inbox-cc");
		var m = $(".inbox-compose .input-cc");
		n.hide();
		m.show();
		$(".close", m).click(function() {
			m.hide();
			n.show()
		})
	};
	var j = function() {
		var n = $(".inbox-compose .mail-to .inbox-bcc");
		var m = $(".inbox-compose .input-bcc");
		n.hide();
		m.show();
		$(".close", m).click(function() {
			m.hide();
			n.show()
		})
	};
	var g = function(m) {
		if (typeof m == "undefined") {
			return
		}
		if (m.attr("disabled")) {
			m.attr("disabled", false)
		} else {
			m.attr("disabled", true)
		}
	};
	return {
		init : function() {
			$(".inbox .compose-btn a").live("click", function() {
				k($(this))
			});
			$(".inbox .reply-btn").live("click", function() {
				b($(this))
			});
			$(".inbox-content .view-message").live("click", function() {
				a($(this))
			});
			$(".inbox-nav > li.inbox > a").click(function() {
				f($(this), "inbox")
			});
			$(".inbox-nav > li.sent > a").click(function() {
				f($(this), "sent")
			});
			$(".inbox-nav > li.draft > a").click(function() {
				f($(this), "draft")
			});
			$(".inbox-nav > li.trash > a").click(function() {
				f($(this), "trash")
			});
			$(".inbox-compose .mail-to .inbox-cc").live("click", function() {
				d()
			});
			$(".inbox-compose .mail-to .inbox-bcc").live("click", function() {
				j()
			});
			if (App.getURLParameter("a") === "view") {
				a()
			} else {
				if (App.getURLParameter("a") === "compose") {
					k()
				} else {
					$(".inbox-nav > li.inbox > a").click()
				}
			}
		}
	}
}();