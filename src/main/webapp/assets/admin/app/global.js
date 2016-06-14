var AdminGlobal = function() {
	var a;
	return {
		updateMessageCount : function() {
			var b = $("#header_notification_bar");
			if (b.size() > 0) {
				$
						.ajax({
							dataType : "json",
							method : "get",
							url : WEB_ROOT + "/notify-message/count",
							success : function(d) {
								var e = d.data;
								if (e > 0) {
									var f = "<a href='javascripts:;' rel='address:/admin/profile/notify-message?readed=no|未读公告信息列表'>您有 "
											+ e + " 条未读公告信息</a>";
									$(".message-info", b).html(f);
									$(".badge", b).html(e).show()
								} else {
									var f = "<a href='javascripts:;' rel='address:/admin/profile/notify-message|公告信息列表'>暂无未读，点击查看公告信息列表</a>";
									$(".message-info", b).html(f);
									$(".badge", b).html(0).hide()
								}
								$(".number-notify-message-count").html(e)
							}
						})
			}
			var c = $("#header_inbox_bar");
			if (c.size() > 0) {
				$
						.ajax({
							dataType : "json",
							method : "get",
							url : WEB_ROOT + "/user-message/count",
							success : function(d) {
								var e = d.data;
								if (e > 0) {
									var f = "<a href='javascripts:;' rel='address:/admin/profile/user-message?readed=no|未读个人消息列表'>您有 "
											+ e + " 条未读个人消息</a>";
									$(".message-info", c).html(f);
									$(".badge", c).html(e).show()
								} else {
									var f = "<a href='javascripts:;' rel='address:/admin/profile/user-message|个人消息列表'>暂无未读，点击查看个人消息列表</a>";
									$(".message-info", c).html(f);
									$(".badge", c).html(0).hide()
								}
								$(".number-user-message-count").html(e)
							}
						})
			}
		},
		init : function() {
			var e = $("div.page-content");
			if (e.size() > 0) {
				var f = $(window).height() - e.offset().top
						- $("div.footer").outerHeight() - 8;
				e.css({
					"min-height" : f
				})
			}
			if ($.fn.editable) {
				$.fn.editable.defaults.inputclass = "form-control"
			}
			$(".theme-panel .theme-options").find("select").each(function() {
				$(this).val($(this).attr("data-selected")).change()
			});
			var c = $(window).height() - $("body > .header").height()
					- $("body > .footer").height() - 15;
			$(".page-container > .page-content").css({
				"min-height" : c + "px"
			});
			$(window).resize(function() {
				if ($.fn.jqGrid) {
					Grid.refreshWidth()
				}
				$("div[data-chart='echarts']").each(function() {
					var i = $(this).data("echart");
					if (i != undefined) {
						i.resize()
					}
				})
			});
			$("#a-logout").click(function() {
				bootbox.confirm("确认注销登录吗？", function(i) {
					if (i) {
						window.location.href = WEB_ROOT + "/admin/logout"
					}
				})
			});
			$("div#portlet-layout > .portlet-title-layout > .tools > .reload")
					.click(
							function(m) {
								var i = $("div#portlet-layout").find(
										" > .portlet-body > .portlet-tabs");
								var l = i.find("> .nav > li.active > a");
								var k = i.find(l.attr("href"));
								var j = l.attr("data-url");
								k.ajaxGetUrl(j)
							});
			var b = $(".page-sidebar-menu");
			if (b.size() > 0) {
				var h = function(m, o) {
					var l = m.initOpen ? "open" : "";
					var n = m.active ? "active" : "";
					var j = m.url ? WEB_ROOT + "/admin" : "javascript:;";
					var p = o[o.length - 1];
					var k = false;
					if (m.url) {
						k = (Pinyin.getCamelChars(p) + "").toLowerCase()
					}
					var i = '<li class="menu ' + n + " " + l + '" data-path="'
							+ m.path + '">';
					i += '<a href="javascript:;" '
							+ (k ? ' data-py="' + k + '"' : "")
							+ (m.url ? ' rel="address:' + m.url + "|" + m.path
									+ '"' : "") + ">";
					if (m.style) {
						i += '<i class="fa ' + m.style + '"></i>'
					} else {
						if (o.length == 1) {
							i += '<i class="fa fa-cogs"></i>'
						} else {
							if (m.url) {
								i += '<i class="fa fa-dot-circle-o"></i>'
							} else {
								i += '<i class="fa fa-ellipsis-vertical"></i>'
							}
						}
					}
					if (o.length == 1) {
						i += '<span class="title">' + p + "</span>";
						i += '<span class="selected"></span>'
					} else {
						i += p
					}
					if (!m.url) {
						i += '<span class="arrow  ' + l + '"></span></a></li>'
					}
					i += "</a></li>";
					return i
				};
				b.ajaxJsonUrl(WEB_ROOT + "/admin/menus", function(k) {
					var i = undefined;
					var j = window.location.hash;
					if (j && j != "") {
						j = j.replace("#", "").split("|")[0];
						$.each(k, function(l, m) {
							if (j == m.url) {
								i = m.path;
								return false
							}
						})
					}
					$.each(k, function(o, p) {
						if (Util.startWith(i, p.path)) {
							p.initOpen = true;
							p.active = true
						}
						var q = p.path.split(":");
						if (q.length == 1) {
							b.append(h(p, q))
						} else {
							var n = [];
							$.each(q, function(t, s) {
								if (t < q.length - 1) {
									n.push(s)
								}
							});
							var m = n.join(":");
							var r = b.find("li[data-path='" + m + "']");
							var l = r.find("> ul.sub-menu");
							if (l.size() == 0) {
								l = $(
										'<ul class="sub-menu" style="display: '
												+ (r.is(".open") ? "block"
														: "none") + ';">')
										.appendTo(r)
							}
							l.append(h(p, q))
						}
					})
				});
				$.address
						.change(function(l) {
							if (l.value == "/dashboard") {
								AdminGlobal.addOrActivePanel(DASHBOARD_URI
										+ "|Dashboard")
							} else {
								if (l.value == "/") {
									var j = window.location.href.replace(
											/.*\/admin/g, "");
									if (j == "" || j == "/" || j == "#") {
										AdminGlobal
												.addOrActivePanel(DASHBOARD_URI
														+ "|Dashboard")
									} else {
										AdminGlobal.addOrActivePanel("/admin/"
												+ j + "|Dashboard")
									}
								} else {
									if (l.value == "/lock") {
										$.backstretch([ "assets/img/bg/1.jpg",
												"assets/img/bg/2.jpg",
												"assets/img/bg/3.jpg",
												"assets/img/bg/4.jpg" ], {
											fade : 1000,
											duration : 8000
										});
										$(".page-container,.header,.footer")
												.hide();
										$("#form-unlock").find(":text").focus()
												.val("");
										$("#page-lock").show();
										$("#form-unlock").find("input").first()
												.focus();
										$("body").ajaxPostURL({
											url : WEB_ROOT + "/layout!lock",
											confirmMsg : false
										})
									} else {
										var m = $('.page-sidebar li.menu > a[rel^="address:'
												+ l.value + '"]');
										if (m.size() > 0) {
											AdminGlobal.addOrActivePanel(m
													.attr("rel").replace(
															"address:", ""));
											var p = $(".page-sidebar-menu")
													.find("li");
											p.removeClass("active")
													.removeClass("open");
											var o = m.parent("li");
											o.addClass("active");
											var i = o.closest("ul.sub-menu");
											while (i.size() > 0) {
												i.show();
												var k = i.parent("li");
												k.addClass("open");
												k.addClass("active");
												k.find(" > a > span.arrow")
														.addClass("open");
												i = k.closest("ul.sub-menu")
											}
										} else {
											var n = window.location.hash;
											if (n != ""
													&& !Util.startWith(n, "#/")) {
												return false
											}
											AdminGlobal
													.addOrActivePanel(l.value)
										}
									}
								}
							}
						});
				$('.sidebar-search input[name="search"]').autocomplete({
					autoFocus : true,
					source : function(k, i) {
						var j = b.find("a[data-py]");
						return i(j.map(function() {
							var o = k.term.toLowerCase();
							var l = $(this);
							var n = l.text();
							var m = l.attr("data-py");
							if (m.indexOf(o) > -1 || n.indexOf(o) > -1) {
								return {
									label : $.trim(n),
									link : l,
									href : l.attr("href")
								}
							}
						}))
					},
					minLength : 1,
					select : function(j, k) {
						var i = k.item;
						$(this).parent().find(".submit").data("link", i.link);
						i.link.click();
						return true
					}
				}).focus(function() {
					$(this).select()
				}).val("").focus();
				$('.sidebar-search input[name="search"]').parent().find(
						".submit").click(function() {
					var i = $(this).data("link");
					if (i) {
						i.click()
					}
					return false
				})
			}
			$("div#portlet-layout > .portlet-title-layout > .tools > .reload")
					.click(
							function(m) {
								var i = $("div#portlet-layout").find(
										" > .portlet-body > .portlet-tabs");
								var l = i.find("> .nav > li.active > a");
								var k = i.find(l.attr("href"));
								var j = l.attr("data-url");
								k.ajaxGetUrl(j)
							});
			jQuery("body").on(
					"click",
					"#layout-nav >  li > .btn-close-active",
					function(l) {
						var k = $("#layout-nav");
						var j = k.next(".tab-content").find(
								".panel-content:visible").attr("data-url");
						var i = k.find(" > .btn-group > ul.dropdown-menu");
						i.find("a[href='" + j + "']").find(".badge").click()
					});
			jQuery("body")
					.on(
							"click",
							"ul.nav > li.tools > .reload",
							function(m) {
								m.preventDefault();
								var i = $(this).closest(".nav");
								var l = i.find("li.active > a");
								var k = i.closest(".tabbable").find(
										l.attr("href"));
								if (l.attr("data-url")) {
									var j = l.attr("data-url");
									k
											.ajaxGetUrl(
													j,
													function() {
														k
																.find(
																		".tabbable:first > .nav > li.active > a")
																.click()
													})
								} else {
									if (jQuery().jqGrid) {
										k.find("table.ui-jqgrid-btable").each(
												function() {
													var n = $(this);
													n.trigger("clearToolbar");
													var o = n.attr("data-url");
													n.jqGrid("setGridParam", {
														datatype : "json",
														url : o
													}).trigger("reloadGrid")
												})
									}
								}
							});
			$(".page-sidebar, .header").on("click", ".sidebar-toggler",
					function(i) {
						Grid.refreshWidth()
					});
			if ($.fn.fileupload) {
				$("#fileupload").fileupload({
					autoUpload : false,
					dataType : "json",
					url : WEB_ROOT + "/sys/attachment-file!uploadMulti"
				});
				var g = $("#fileupload");
				var d = null;
				jQuery("body").on(
						"click",
						"a.btn-fileinput-trigger",
						function(j) {
							d = $(this);
							var i = d.attr("data-category");
							if (i) {
								g.find("input[name='attachmentName']").val(
										"_attachment_" + i)
							}
							g.find("tbody.files").empty()
						});
				jQuery("#fileupload-dialog")
						.on(
								"click",
								".modal-footer .btn-add",
								function(k) {
									var j = d.parent().find(
											"table.table-filelist");
									if (j.size() == 0) {
										j = $(
												'<table role="presentation" class="table table-striped table-filelist clearfix"><tbody class="files"></tbody></table>')
												.insertAfter(d)
									}
									var i = j.find("tbody.files");
									$("#fileupload").find(
											"tbody.files tr.template-download")
											.each(function() {
												i.append($(this).clone(true))
											});
									$("#fileupload-dialog")
											.find(
													'.modal-footer [data-dismiss="modal"]')
											.click()
								})
			}
			jQuery("body").on("click",
					'a[data-toggle="panel"],button[data-toggle="panel"]',
					function(j) {
						j.preventDefault();
						var i = $(this);
						AdminGlobal.addOrActivePanel(i)
					});
			jQuery("body")
					.on(
							"click",
							'a[data-upload="btn-single-file"],button[data-upload="btn-single-file"]',
							function(j) {
								j.preventDefault();
								var i = $(this);
								Global.triggerSingleFileUpload(i)
							});
			jQuery("body").on("click", "tbody.select-table-checkbox",
					function(j) {
						var i = $(this).find(".table-checkbox :checkbox");
						if (!(i.is(j.target) || i.find(j.target).length)) {
							i.attr("checked", !i.is(":checked"))
						}
					});
			setTimeout(function() {
				AdminGlobal.updateMessageCount()
			}, 10 * 60 * 1000)
		},
		findUserProfileParams : function(b) {
			if (a == undefined || a == null) {
				a = $("body").cacheData(
						WEB_ROOT + "/admin/sys/user-profile-data/params.json")
			}
			return a[b]
		},
		setUserProfileParams : function(b, c) {
			if (a == undefined || a == null) {
				a = $("body").cacheData(
						WEB_ROOT + "/admin/sys/user-profile-data/params.json")
			}
			a[b] = c
		},
		addOrActivePanel : function(l, m) {
			l = decodeURI(l);
			var b = l;
			var j = l.split("|");
			if (j.length > 1) {
				b = j[0];
				if (m == undefined) {
					m = j[1]
				}
			}
			b = WEB_ROOT + b;
			var h = m.split(":");
			var d = h[h.length - 1];
			var m = '<li><a href="#/dashboard" class="btn-dashboard"><i class="fa fa-home"></i> 首页 </a></li> ';
			var f = $("#layout-nav");
			f.find("> li:not(.btn-group)").remove();
			$
					.each(
							h,
							function(o, n) {
								n = n;
								if (o < h.length - 1) {
									m += '<li class="hidden-inline-xs"><i class="fa fa-angle-right"></i> '
											+ n + " </li>"
								} else {
									m += '<li class="hidden-inline-xs"><i class="fa fa-angle-right"></i> <a class="reload" href="javascript:;">'
											+ n + "</a> </li>"
								}
							});
			f.append(m);
			var e = f.next(".tab-content");
			var k = e.find("> div[data-url='" + b + "']");
			if (k.length == 0) {
				k = $('<div data-url="' + b + '" class="panel-content"></div>')
						.appendTo(e);
				k.ajaxGetUrl(b)
			} else {
				k.show()
			}
			e.find("> div").not(k).hide();
			var c = f.find(" > .btn-group > ul.dropdown-menu");
			var g = c.find("> li > a[rel='address:" + l + "']");
			if (g.length == 0) {
				g = $(
						'<a href="javascripts:;" rel="address:'
								+ l
								+ '">'
								+ d
								+ '<span class="badge badge-default">X</span></a>')
						.appendTo(c).wrap("<li/>");
				g
						.find(".badge")
						.click(
								function(p) {
									p.preventDefault();
									p.stopPropagation();
									var o = false;
									k
											.find(
													"form[method='post']:not(.form-track-disabled)[form-data-modified='true']")
											.each(
													function() {
														var r = $(this);
														if (!confirm("当前表单有修改数据未保存，确认离开当前表单吗？")) {
															o = true;
															return false
														}
													});
									if (!o) {
										g.parent("li").remove();
										k.remove();
										var n = 1;
										c.find("> li").not(g).each(function() {
											var r = $(this).attr("count");
											if (r) {
												if (Number(r) > n) {
													n = Number(r)
												}
											}
										});
										var q = c.find("> li[count='" + n
												+ "'] > a");
										if (q.length > 0) {
											q.click()
										} else {
											$(
													"#layout-nav >  li > .btn-dashboard")
													.click()
										}
									}
								})
			}
			var i = 1;
			c.find("> li").each(function() {
				$(this).removeClass("active");
				var n = $(this).attr("count");
				if (n) {
					if (Number(n) > i) {
						i = Number(n)
					}
				}
			});
			g.parent("li").addClass("active");
			g.parent("li").attr("count", i + 1);
			f.find("> li:not(.btn-group) > a.reload").click(function(n) {
				n.preventDefault();
				k.ajaxGetUrl(b)
			})
		}
	}
}();