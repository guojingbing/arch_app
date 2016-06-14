var Util = function() {
	return {
		traverseTreeToKeyValue : function(b, a) {
			if (a == undefined) {
				a = {}
			}
			$.each(b, function(c, d) {
				a[d.id] = d.name;
				if (typeof (d.children) === "object") {
					Util.traverseTreeToKeyValue(d.children, a)
				}
			});
			return a
		},
		getCacheDatas : function(b, d, a) {
			if (d == undefined || d == null) {
				d = $("body")
			}
			if (d.data("CacheUrlDatas") == undefined) {
				d.data("CacheUrlDatas", {})
			}
			var c = d.data("CacheUrlDatas")[b];
			if (c == undefined) {
				$.ajax($.extend({
					async : false,
					type : "GET",
					url : b,
					dataType : "json",
					success : function(e) {
						c = e;
						d.data("CacheUrlDatas")[b] = c
					}
				}, a || {}))
			}
			return c
		},
		getCacheSelectOptionDatas : function(a, c) {
			if (c == undefined) {
				c = $("body")
			}
			if (c.data("CacheSelectOptionDatas") == undefined) {
				c.data("CacheSelectOptionDatas", {})
			}
			var b = c.data("CacheSelectOptionDatas")[a];
			if (b == undefined) {
				$.ajax({
					async : false,
					type : "GET",
					url : a,
					dataType : "json",
					success : function(e) {
						var d = e;
						if (e.content) {
							d = e.content
						}
						b = {
							"" : ""
						};
						for (key in d) {
							b[key] = d[key]
						}
						c.data("CacheSelectOptionDatas")[a] = b
					}
				})
			}
			return b
		},
		getCacheEnumsByType : function(a, c) {
			if (c == undefined) {
				c = $("body")
			}
			if (c.data("CacheEnumDatas") == undefined) {
				$.ajax({
					async : false,
					type : "GET",
					url : WEB_ROOT + "/pub/data!enums.json",
					dataType : "json",
					success : function(h) {
						for ( var g in h) {
							var e = h[g];
							var d = {
								"" : ""
							};
							for ( var f in e) {
								d[f] = e[f]
							}
							h[g] = d
						}
						c.data("CacheEnumDatas", h)
					}
				})
			}
			var b = c.data("CacheEnumDatas")[a];
			if (b == undefined) {
				alert("Wrong enumerated data type:" + a);
				b = {}
			}
			return b
		},
		getCacheDictDatasByType : function(b, e) {
			if (e == undefined) {
				e = $("body")
			}
			var f = e.data("CacheDictDatas");
			if (f == undefined) {
				$.ajax({
					async : false,
					type : "GET",
					url : WEB_ROOT + "/pub/data!dictDatas.json",
					dataType : "json",
					success : function(g) {
						f = g;
						e.data("CacheDictDatas", f)
					}
				})
			}
			var c = e.data("CacheDictDatas")[b];
			if (c == undefined) {
				var a = {};
				var d = true;
				$.each(f, function(g, h) {
					if (h.parentPrimaryKey == b) {
						d = false;
						a[h.primaryKey] = h.primaryValue
					}
				});
				c = a;
				e.data("CacheDictDatas")[b] = c;
				if (d) {
					alert("Wrong Data Dictionary type:" + b)
				}
			}
			return c
		},
		assert : function(b, a) {
			if (!b) {
				alert(a)
			}
		},
		assertNotBlank : function(b, a) {
			if (b == undefined || $.trim(b) == "") {
				Util.assert(false, a);
				return
			}
		},
		debug : function(a) {
			if (window.console) {
				console.debug(a)
			} else {
				alert(a)
			}
		},
		hashCode : function(c) {
			var b = 0;
			if (c.length == 0) {
				return b
			}
			for (i = 0; i < c.length; i++) {
				var a = c.charCodeAt(i);
				b = ((b << 5) - b) + a;
				b = b & b
			}
			if (b < 0) {
				b = -b
			}
			return b
		},
		AddOrReplaceUrlParameter : function(f, a, e) {
			var d = f.indexOf("?");
			if (d == -1) {
				f = f + "?" + a + "=" + e
			} else {
				var g = f.split("?");
				var h = g[1].split("&");
				var c = "";
				var b = false;
				for (i = 0; i < h.length; i++) {
					c = h[i].split("=")[0];
					if (c == a) {
						h[i] = a + "=" + e;
						b = true;
						break
					}
				}
				if (!b) {
					f = f + "&" + a + "=" + e
				} else {
					f = g[0] + "?";
					for (i = 0; i < h.length; i++) {
						if (i > 0) {
							f = f + "&"
						}
						f = f + h[i]
					}
				}
			}
			return f
		},
		getParameterFromUrl : function(c, b) {
			var d = new RegExp("(\\?|&)" + b + "=([^&?]*)", "i");
			var a = c.match(d);
			if (a) {
				return a[2]
			}
			return null
		},
		subStringBetween : function(d, f, b) {
			var e = new RegExp(f + ".*?" + b, "img");
			var c = new RegExp(f, "g");
			var a = new RegExp(b, "g");
			return d.match(e).join("=").replace(c, "").replace(a, "")
					.split("=")
		},
		split : function(a) {
			return a.split(",")
		},
		isArrayContainElement : function(c, b) {
			var a = c.length;
			while (a--) {
				if (c[a] == b) {
					return true
				}
			}
			return false
		},
		getTextWithoutChildren : function(a) {
			return $(a)[0].childNodes[0].nodeValue.trim()
		},
		findClosestFormInputByName : function(b, a) {
			return $(b).closest("form").find("[name='" + a + "']")
		},
		setInputValIfBlank : function(a, b) {
			if ($.trim($(a).val()) == "") {
				$(a).val(b)
			}
		},
		unEditable : function(b) {
			var a = $(b);
			return a.attr("readonly") || a.attr("disabled")
		},
		startWith : function(b, c) {
			var a = new RegExp("^" + c);
			return a.test(b)
		},
		endWith : function(c, a) {
			var b = new RegExp(a + "$");
			return b.test(c)
		},
		objectToString : function(a) {
			if (a == undefined) {
				return "undefined"
			}
			var b = "";
			$.each(a, function(d, c) {
				b += (d + ":" + c + ";\n")
			});
			return b
		},
		parseFloatValDefaultZero : function(b) {
			if ($.trim($(b).val()) == "") {
				return 0
			} else {
				var a = parseFloat($.trim($(b).val()));
				if (isNaN(a)) {
					return 0
				} else {
					return a
				}
			}
		},
		notSmallViewport : function() {
			var a = $(window).width();
			return a >= 768
		},
		centerModals : function() {
			$(".modal").each(
					function(a) {
						var b = $(this).clone().css("display", "block")
								.appendTo("body");
						var c = Math.round((b.height() - b.find(
								".modal-content").height()) / 2) - 100;
						c = c > 0 ? c : 0;
						b.remove();
						$(this).find(".modal-content").css("margin-top", c)
					})
		},
		init : function() {
			$.fn.cacheData = function(c, b) {
				var d = $(this);
				var a = $("body");
				if (a.data("CacheUrlDatas") == undefined) {
					a.data("CacheUrlDatas", {})
				}
				var e = a.data("CacheUrlDatas")[c];
				if (e == undefined) {
					var f = d.closest("div");
					$.ajax($.extend({
						async : false,
						type : "GET",
						url : c,
						dataType : "json",
						success : function(g) {
							e = g;
							a.data("CacheUrlDatas")[c] = e
						}
					}, b || {}))
				}
				return e
			};
					$.fn.plot = function(e) {
						var d = $(this);
						if (d.attr("chart-plot-done")) {
							return
						}
						d.attr("chart-plot-done", true);
						d.css("min-height", "100px");
						var a = $.extend({}, d.data("plotOptions") || {}, e
								|| {});
						var b = a.data;
						var c = a.options;
						$.each(b, function(g, h) {
							if (typeof h.data === "function") {
								h.data = h.data.call(d)
							}
						});
						c = $.extend(true, {
							pointhover : true,
							series : {
								lines : {
									show : true,
									lineWidth : 2,
									fill : true,
									fillColor : {
										colors : [ {
											opacity : 0.05
										}, {
											opacity : 0.01
										} ]
									}
								},
								points : {
									show : true
								},
								shadowSize : 2
							},
							grid : {
								hoverable : true,
								clickable : true,
								tickColor : "#eee",
								borderWidth : 0
							},
							colors : [ "#d12610", "#37b7f3", "#52e136" ],
							xaxis : {
								timezone : "browser",
								monthNames : [ "January " , "February " , "March " , "April " , "May " ,
                                               "June " , "July ","August", "September", "October", "November",
										       "December" ]
							}
						}, c);
						$.plot(d, b, c);
						if (a.pointhover) {
							var f = $("#plothoverTooltip");
							if (f.size() == 0) {
								f = $("<div id='plothoverTooltip'></div>").css(
										{
											position : "absolute",
											display : "none",
											border : "1px solid #333",
											padding : "4px",
											color : "#fff",
											"border-radius" : "3px",
											"background-color" : "#333",
											opacity : 0.8,
											"min-width" : "50px",
											"text-align" : "center"
										}).appendTo("body")
							}
							d.bind("plothover", function(h, k, g) {
								if (g) {
									var j = g.datapoint[1];
									f.html(j).css({
										top : g.pageY,
										left : g.pageX + 15
									}).fadeIn(200)
								} else {
									f.hide()
								}
							})
						}
					},
					$.fn.barcodeScanSupport = function(b) {
						var a = $(this);
						if (a.attr("barcode-scan-support-done")) {
							return this
						}
						a.attr("barcode-scan-support-done", true);
						var c = a.attr("id");
						if (c == undefined) {
							c = "__barcode_" + new Date().getTime();
							a.attr("id", c)
						}
						if (a.attr("placeholder") == undefined) {
							a.attr("placeholder", "Support bar code scanning input ; can be input manually press the Enter key simulation")
						}
						if (a.attr("title") == undefined) {
							a.attr("title", a.attr("placeholder"))
						}
						a.focus(function(d) {
							a.select()
						}).click(function(d) {
							if (window.wst) {
								window.wst.startupBarcodeScan(c)
							}
						}).keydown(function(d) {
							if (b && b.onEnter) {
								if (d.keyCode === 13) {
									b.onEnter.call(a)
								}
							}
						}).bind("barcode", function(d, f) {
							a.val(f);
							var g = jQuery.Event("keydown");
							g.keyCode = 13;
							a.trigger(g);
							a.select()
						})
					},
					$.fn.treeSelect = function(b) {
						var g = $(this);
						if (g.attr("tree-select-done")) {
							return this
						}
						g.attr("tree-select-done", true);
						if (Util.unEditable(g)) {
							return this
						}
						b = $.extend({
							url : g.attr("data-url"),
							position : g.attr("data-position")
						}, b);
						var f = "__treeselect_" + new Date().getTime();
						g.attr("id", f);
						var e = g.closest(".panel-content");
						if (e.size() == 0) {
							e = $("body")
						}
						var l = $('<i class="fa fa-times"></i>')
								.insertBefore(g);
						var c = $(
								'<i class="fa fa-angle-double-down btn-toggle"></i>')
								.insertBefore(g);
						var a = g.parent().children();
						a
								.wrapAll('<div class="input-group" style="width:100%"><div class="input-icon right"></div></div>');
						var h = $('<div style="z-index: 990; display: none; position: absolute; background-color: #FFFFFF; border: 1px solid #DDDDDD"></div>');
						h.appendTo(e);
						l.click(function() {
							a.val("")
						});
						var n = [];
						n
								.push('<div role="navigation" class="navbar navbar-default" style="border: 0px; margin:0px">');
						n
								.push('<div class="collapse navbar-collapse navbar-ex1-collapse" style="padding: 0">');
						n
								.push('<form role="search" class="navbar-form navbar-left">');
						n
								.push('<div class="form-group" style="border-bottom: 0px">');
						n
								.push('<input type="text" name="keyword" class="form-control input-small">');
						n.push("</div>");
						n
								.push('<button class="btn blue" type="submit">Inquire</button>');
						n.push("</form>");
						n.push('<ul class="nav navbar-nav navbar-right">');
						n
								.push('<li><a href="javascript:;" class="btn-open-all" style="padding-left: 0">Expansion</li>');
						n
								.push('<li><a href="javascript:;" class="btn-close-all" style="padding-left: 0">Collapse</a></li>');
						n.push("</ul>");
						n.push("</div>");
						n.push("</div>");
						var j = $(n.join("")).appendTo(h);
						var m = $(
								'<div style="max-height: 300px;overflow: auto"></div>')
								.appendTo(h);
						var k = $('<ul class="ztree"></ul>').appendTo(m);
						k.attr("id", "ztree_" + f);
						k.attr("id-for", f);
						k.attr("data-url", b.url);
						var d = function(u) {
							var o = g.attr("name");
							var s = o.split(".");
							var r = [];
							$.each(s, function(B, A) {
								if (B < s.length - 1) {
									r.push(A)
								}
							});
							var y = r.join(".") + ".id";
							var x = {};
							if (u) {
								x[o] = Util.startWith(u.id, "-") ? "" : u.name;
								x[y] = Util.startWith(u.id, "-") ? "" : u.id
							} else {
								x[o] = "";
								x[y] = ""
							}
							var w = g.closest(".ui-jqgrid-btable");
							if (w.size() > 0) {
								var p = false;
								var v = w.jqGrid("getGridParam", "colModel");
								for (var q = 0; q < v.length; q++) {
									var t = v[q];
									if (t.name == y || t.index == y) {
										p = true;
										break
									}
								}
								if (!p) {
									alert("Page configuration error : " + o + " Corresponding to the id attribute " + y
											+ " Undefined");
									return
								}
								w.jqGrid("setEditingRowdata", x)
							} else {
								if (g.closest(".form-group").size() > 0) {
									var z = g.closest("form");
									z.setFormDatas(x, true)
								}
							}
							g.focus()
						};
						g
								.click(
										function() {
											var t = g
													.attr("treeselect-cached-done");
											if (t == undefined) {
												g
														.attr(
																"treeselect-cached-done",
																true);
												g.attr("disabled", true);
												g.addClass("spinner");
												var v = g.cacheData(b.url);
												$.fn.zTree
														.init(
																k,
																{
																	callback : {
																		onClick : function(
																				x,
																				z,
																				y) {
																			if (b.callback
																					&& b.callback.onSingleClick) {
																				var w = b.callback.onSingleClick
																						.call(
																								this,
																								x,
																								z,
																								y);
																				if (w == undefined
																						|| w == true) {
																					h
																							.hide();
																					c
																							.removeClass("fa-angle-double-up");
																					c
																							.addClass("fa-angle-double-down")
																				}
																			} else {
																				d(y);
																				h
																						.hide();
																				c
																						.removeClass("fa-angle-double-up");
																				c
																						.addClass("fa-angle-double-down")
																			}
																			g
																					.trigger(
																							"treeselect.nodeSelect",
																							[ y ]);
																			x
																					.stopPropagation();
																			x
																					.preventDefault();
																			return false
																		}
																	}
																}, v);
												g.removeAttr("disabled");
												g.removeClass("spinner")
											}
											var q = $.fn.zTree.getZTreeObj(k
													.attr("id"));
											q.cancelSelectedNode();
											if ($.trim(g.val()) != "") {
												var p = q.getNodesByParamFuzzy(
														"name", g.val());
												for (var r = 0, o = p.length; r < o; r++) {
													var u = p[r];
													q.selectNode(u)
												}
											}
											h.children(".ztree").hide();
											k.show();
											var s = g.outerWidth();
											if (s < 330) {
												s = 330
											}
											h.css({
												width : s + "px"
											}).slideDown("fast");
											h.position($.extend(true, {
												my : "right top",
												at : "right bottom",
												of : g.parent("div")
											}, b.position));
											c
													.removeClass("fa-angle-double-down");
											c.addClass("fa-angle-double-up")
										}).keydown(function(o) {
									if (o.keyCode === 13) {
										return true
									}
									return false
								});
						c.click(function(o) {
							if ($(this).hasClass("fa-angle-double-down")) {
								g.click()
							} else {
								c.removeClass("fa-angle-double-up");
								c.addClass("fa-angle-double-down");
								h.hide()
							}
							o.stopPropagation();
							o.preventDefault()
						});
						j.find("form").submit(function(t) {
							var u = j.find("input[name='keyword']").val();
							var q = $.fn.zTree.getZTreeObj(k.attr("id"));
							q.cancelSelectedNode();
							var p = q.getNodesByParamFuzzy("name", u);
							for (var r = 0, o = p.length; r < o; r++) {
								var s = p[r];
								q.selectNode(s, true)
							}
							t.stopPropagation();
							t.preventDefault();
							return false
						});
						j.find(".btn-open-all").click(function(p) {
							var o = $.fn.zTree.getZTreeObj(k.attr("id"));
							o.expandAll(true);
							p.stopPropagation();
							p.preventDefault();
							return false
						});
						j.find(".btn-close-all").click(function(p) {
							var o = $.fn.zTree.getZTreeObj(k.attr("id"));
							o.expandAll(false);
							p.stopPropagation();
							p.preventDefault();
							return false
						});
						$(document).on(
								"mousedown",
								function(q) {
									var r = h;
									var p = g;
									var o = q.target.tagName;
									if (o == "HTML") {
										return
									}
									if (!(p.is(q.target)
											|| p.find(q.target).length
											|| r.is(q.target) || r
											.find(q.target).length)) {
										r.hide()
									}
								})
					}, $.fn.ajaxGetUrl = function(b, d, c) {
						Util.assertNotBlank(b, "url parameter ajaxGetUrl call can not be empty");
						$("#btn-profile-param").hide();
						var a = $(this);
						a.addClass("ajax-get-container");
						a.attr("data-url", b);
						App.blockUI(a);
						$.ajax({
							type : "GET",
							cache : false,
							url : b,
							data : c,
							dataType : "html",
							headers : {
								decorator : "body"
							},
							success : function(f) {
								var g = a.height();
								if (g < 100) {
									g = 100
								}
								a.css({
									"min-height" : g
								});
								a.empty();
								var e = null;
								if (a.is("tbody")) {
									e = a
								} else {
									e = $("<div class='ajax-page-inner'/>")
											.appendTo(a)
								}
								e.hide();
								e.html(f);
								if (d) {
									d.call(a, f)
								}
								Page.initAjaxBeforeShow(e);
								if (typeof (AdminPage) != "undefined") {
									AdminPage.initAjaxBeforeShow(e)
								}
								e.show();
								FormValidation.initAjax(e);
								Page.initAjaxAfterShow(e);
								if (typeof (AdminPage) != "undefined") {
									AdminPage.initAjaxAfterShow(e)
								}
								if (typeof (Grid) != "undefined") {
									Grid.initAjax(e)
								}
								a.css({
									"min-height" : 100
								});
								App.unblockUI(a)
							},
							error : function(g, e, f) {
								if (g.status == 400) {
									a.html(g.responseText)
								} else {
									a
											.html("<h4>Failed to load page content</h4>"
													+ g.responseText)
								}
								App.unblockUI(a)
							}
						});
						return a
					};
			$.fn.ajaxJsonUrl = function(b, d, c) {
				Util.assertNotBlank(b, "url parameter ajaxJsonUrl call can not be empty");
				var a = $(this);
				App.blockUI(a);
				$.ajax({
					traditional : true,
					type : "GET",
					cache : false,
					url : b,
					dataType : "json",
					data : c,
					success : function(e) {
						if (e.type == "error" || e.type == "warning"
								|| e.type == "failure") {
							Global.notify("error", e.message)
						} else {
							if (d) {
								d.call(a, e)
							}
							json = e
						}
						App.unblockUI(a)
					},
					error : function(g, e, f) {
						if (g.status == 403) {
							Global.notify("error", "URL: " + b, "Unauthorized access")
						} else {
							if (g.status == 404) {
								Global.notify("error",
										"Please try to refresh the page to try, if the problem persists please contact the administrator "," requested resource was not found")
							} else {
								Global.notify("error", 
										"Data exception request , please contact the administrator " , "System Error")
							}
						}
						App.unblockUI(a)
					}
				})
			};
			$.fn.ajaxJsonSync = function(b, d, e) {
				Util.assertNotBlank(b, "ajaxJsonSync url parameters of the call can not be empty");
				var a = $(this);
				App.blockUI(a);
				var c = null;
				$.ajax({
					traditional : true,
					type : "GET",
					cache : false,
					async : false,
					url : b,
					data : d,
					contentType : "application/json",
					dataType : "json",
					success : function(f) {
						if (f.type == "error" || f.type == "warning"
								|| f.type == "failure") {
							Global.notify("error", f.message)
						} else {
							if (e) {
								e.call(a, f)
							}
							c = f
						}
						App.unblockUI(a)
					},
					error : function(h, f, g) {
						if (h.status == 403) {
							Global.notify("error", "URL: " + b, "Unauthorized access")
						} else {
							if (h.status == 404) {
								Global.notify("error",
										"Please try to refresh the page to try, if the problem persists please contact the administrator ", " requested resource was not found .")
							} else {
								Global.notify("error", "Data exception request , please contact the administrator " , "System Error ")
							}
						}
						App.unblockUI(a)
					}
				});
				return c
			};
			$.fn.ajaxPostURL = function(b) {
				var a = b.url;
				Util.assertNotBlank(a);
				var e = b.success;
				var d = b.confirmMsg;
				if (d == undefined) {
					d = "Sure to submit data ?"
				}
				if (d && d != "false") {
					if (!confirm(d)) {
						return false
					}
				}
				var b = $.extend({
					data : {}
				}, b);
				var c = $(this);
				App.blockUI(c);
				a = encodeURI(a);
				$
						.ajax({
							type : "POST",
							url : a,
							contentType : "application/x-www-form-urlencoded",
							dataType : "json",
							data : b.data,
							success : function(f) {
								App.unblockUI(c);
								if (!f.type) {
									Global.notify("error", f, "Exception handling system");
									return
								}
								if (f.type == "confirm") {
									bootbox
											.dialog({
												closeButton : false,
												title : "Action confirmation",
												message : f.message
														+ " Make sure to continue to submit the form ?",
												buttons : {
													danger : {
														label : "cancel",
														callback : function() {
														}
													},
													main : {
														label : "confirm",
														className : "blue",
														callback : function() {
															$(this)
																	.ajaxPostURL(
																			{
																				url : Util
																						.AddOrReplaceUrlParameter(
																								a,
																								"_serverValidationConfirmed_",
																								true),
																				confirmMsg : false,
																				success : b.success,
																				data : b.data
																			})
														}
													}
												}
											});
									return
								}
								if (f.type == "success" || f.type == "warning") {
									Global.notify(f.type, f.message);
									if (e) {
										e.call(c, f)
									}
								} else {
									if (f.data) {
										var h = [];
										for ( var g in f.data) {
											h.push(f.data[g])
										}
										Global.notify("error", h.join("<br>"),
												f.message)
									} else {
										Global.notify("error", f.message)
									}
									if (b.failure) {
										b.failure.call(c, f)
									}
								}
							},
							error : function(h, f, g) {
								App.unblockUI(c);
								if (h.status == 403) {
									Global
											.notify("error", "URL: " + a,
													"Unauthorized access")
								} else {
									if (h.status == 404) {
										Global.notify("error",
												"Please try to refresh the page to try, if the problem persists please contact the administrator ",
												" Requested resource was not found .")
									} else {
										Global.notify("error", "Data exception request , please contact the administrator","system error")
									}
								}
							}
						})
			};
			$.fn.ajaxPostForm = function(b) {
				var e = b.success;
				var a = b.failure;
				var d = b.confirmMsg;
				if (d) {
					if (!confirm(d)) {
						return false
					}
				}
				var b = $.extend({
					data : {}
				}, b);
				var c = $(this);
				App.blockUI(c);
				c
						.ajaxSubmit({
							dataType : "json",
							method : "post",
							success : function(f) {
								App.unblockUI(c);
								if (f.type == "success") {
									if (e) {
										e.call(c, f)
									}
								} else {
									if (f.type == "failure"
											|| f.type == "error") {
										Global.notify("error", f.message);
										if (a) {
											a.call(c, f)
										}
									} else {
										Global.notify("error", f,
												"E01: Abnormal form processing , please contact the administrator . ");
										if (a) {
											a.call(c, f)
										}
									}
								}
							},
							error : function(j, h, f) {
								App.unblockUI(c);
								var g = jQuery.parseJSON(j.responseText);
								if (g.type == "error") {
									bootbox.alert(g.message)
								} else {
									Global.notify("error", g,
											"E02: Abnormal form processing , please contact the administrator . ")
								}
								if (a) {
									a.call(c, g)
								}
							}
						})
			};
			$.fn.popupDialog = function(n) {
				var g = $(this);
				var b = g.attr("href");
				if (b == undefined) {
					b = g.attr("data-url")
				}
				var h = g.attr("title");
				if (h == undefined) {
					h = "Dialog"
				}
				var m = g.attr("data-modal-size");
				if (m == undefined) {
					m = "modal-wide"
				}
				var n = $.extend({
					url : b,
					postData : {},
					title : h,
					size : m
				}, n);
				var a = g.attr("data-force-reload");
				if (n.url && (a == undefined || a == "true")) {
					n.url = Util.AddOrReplaceUrlParameter(n.url, "_",
							new Date().getTime())
				}
				Util.assertNotBlank(n.url);
				var l = "dialog_level_" + $(".modal:visible").size();
				var c = $("#" + l);
				if (c.length == 0) {
					var e = [];
					e
							.push('<div id="'
									+ l
									+ '" class="modal fade" tabindex="-1" role="basic" aria-hidden="true" >');
					if (Util.startWith(n.size, "modal")) {
						e.push('<div class="modal-dialog ' + n.size + '">')
					} else {
						e.push('<div class="modal-dialog" style="width:'
								+ n.size + '">')
					}
					e.push('<div class="modal-content">');
					e.push('<div class="modal-header">');
					e
							.push('<button type="button" class="close"  data-dismiss="modal" aria-hidden="true"></button>');
					e
							.push('<button type="button" class="close btn-reload"></button>');
					e.push('<h4 class="modal-title">' + n.title + "</h4>");
					e.push("</div>");
					e.push('<div class="modal-body">');
					e.push("</div>");
					e.push('<div class="modal-footer hide">');
					e
							.push('<button type="button" class="btn default" data-dismiss="modal">close the window</button>');
					e.push("</div>");
					e.push("</div>");
					e.push("</div>");
					e.push("</div>");
					var k = g.closest(".panel-content");
					if (k == undefined) {
						k = $(".page-container:first")
					}
					var c = $(e.join("")).appendTo($("body"));
					c.find(" > .modal-dialog > .modal-content > .modal-body")
							.ajaxGetUrl(n.url, false, n.postData);
					c.modal();
					c.data("options", n);
					c
							.find(
									" > .modal-dialog > .modal-content > .modal-header > .btn-reload")
							.click(
									function() {
										var p = c
												.find(" > .modal-dialog > .modal-content > .modal-body");
										var o = c.data("options");
										p.ajaxGetUrl(o.url, false, o.postData)
									});
					c.draggable({
						handle : ".modal-header",
						cancel : ".modal-header > button",
						scroll : false
					})
				} else {
					c.data("options", n);
					var d = c
							.find(" > .modal-dialog > .modal-content > .modal-body");
					var f = d.attr("data-url");
					if (f != n.url) {
						d.attr("data-url", n.url);
						var j = c.find(" > .modal-dialog");
						j.removeAttr("class").removeAttr("style");
						j.addClass("modal-dialog");
						if (Util.startWith(n.size, "modal")) {
							j.addClass(n.size)
						} else {
							j.css({
								width : n.size
							})
						}
						c
								.find(
										" > .modal-dialog > .modal-content > .modal-header > .modal-title")
								.html(n.title);
						d.ajaxGetUrl(n.url, false, n.postData)
					}
					c.modal("show")
				}
				c.on("shown.bs.modal", function(o) {
					c.attr("dismiss-confirmed", false)
				});
				c
						.on(
								"hide.bs.modal",
								function(p) {
									var o = p.srcElement ? p.srcElement
											: p.target;
									if ($(o).is("[data-picker]")) {
										return
									}
									if (c.attr("dismiss-confirmed") == undefined
											|| c.attr("dismiss-confirmed") == "false") {
										c
												.find(
														"form[method='post']:not(.form-track-disabled)[form-data-modified='true']")
												.each(
														function() {
															var q = $(this);
															if (confirm("Edit the current form data is not saved , confirm to leave the current forms?")) {
																c
																		.attr(
																				"dismiss-confirmed",
																				true);
																q
																		.attr(
																				"form-data-modified",
																				false)
															} else {
																c
																		.attr(
																				"dismiss-confirmed",
																				false);
																p
																		.stopPropagation();
																p
																		.preventDefault();
																return false
															}
														})
									}
								});
				if (n.callback) {
					c.data("callback", n.callback)
				}
			}
		}
	}
}();
var BooleanUtil = function() {
	return {
		toBoolean : function(b) {
			if (b) {
				var a = $.type(b);
				if (a === "string"
						&& (b == "true" || b == "1" || b == "y" || b == "yes"
								|| b == "readonly" || b == "checked"
								|| b == "enabled" || b == "enable" || b == "selected")) {
					return true
				} else {
					if (a === "number" && (b == 1)) {
						return true
					}
				}
			}
			return false
		}
	}
}();
var MathUtil = function() {
	return {
		mul : function(arg1, arg2) {
			if (arg1 == undefined) {
				arg1 = 0
			}
			var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
			try {
				m += s1.split(".")[1].length
			} catch (e) {
			}
			try {
				m += s2.split(".")[1].length
			} catch (e) {
			}
			return Number(s1.replace(".", "")) * Number(s2.replace(".", ""))
					/ Math.pow(10, m)
		},
		div : function(arg1, arg2, fix) {
			if (fix == undefined) {
				fix = 2
			}
			var t1 = 0, t2 = 0, r1, r2;
			try {
				t1 = arg1.toString().split(".")[1].length
			} catch (e) {
			}
			try {
				t2 = arg2.toString().split(".")[1].length
			} catch (e) {
			}
			with (Math) {
				r1 = Number(arg1.toString().replace(".", ""));
				r2 = Number(arg2.toString().replace(".", ""));
				return MathUtil.mul((r1 / r2), pow(10, t2 - t1)).toFixed(fix)
			}
		},
		add : function(arg1, arg2) {
			if (arg1 == undefined) {
				arg1 = 0
			}
			if (arg2 == undefined) {
				arg2 = 0
			}
			var r1, r2, m, c;
			try {
				r1 = arg1.toString().split(".")[1].length
			} catch (e) {
				r1 = 0
			}
			try {
				r2 = arg2.toString().split(".")[1].length
			} catch (e) {
				r2 = 0
			}
			c = Math.abs(r1 - r2);
			m = Math.pow(10, Math.max(r1, r2));
			if (c > 0) {
				var cm = Math.pow(10, c);
				if (r1 > r2) {
					arg1 = Number(arg1.toString().replace(".", ""));
					arg2 = Number(arg2.toString().replace(".", "")) * cm
				} else {
					arg1 = Number(arg1.toString().replace(".", "")) * cm;
					arg2 = Number(arg2.toString().replace(".", ""))
				}
			} else {
				arg1 = Number(arg1.toString().replace(".", ""));
				arg2 = Number(arg2.toString().replace(".", ""))
			}
			return MathUtil.div((arg1 + arg2), m)
		},
		sub : function(arg1, arg2) {
			return MathUtil.add(arg1, -Number(arg2))
		}
	}
}();
function scanBarcodeCallback(b, a) {
	$("#" + b).trigger("barcode", [ a ])
};