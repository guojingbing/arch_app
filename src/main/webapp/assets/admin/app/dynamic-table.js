(function(a) {
	a
			.widget(
					"ui.dynamictable",
					{
						options : {
							temp : ".dynamic-table-row-template",
							minRows : 1,
							maxRows : 50,
							initAdd : true,
							afterAdd : false
						},
						_create : function() {
							var c = this;
							var d = this.element;
							options = this.options;
							var g = d.find(options.temp);
							this.tempHtml = g.html();
							g.remove();
							var f = a(
									'<th style="width: 70px; text-align:center;"/>')
									.prependTo(d.find(" thead tr "));
							var e = a(
									'<span class="dynamic-table-num">序号</span>')
									.appendTo(f);
							var h = a(
									'<a class="btn btn-sm yellow btn-table-add-line" href="javascript:;" style="display:none;margin-bottom: 4px"><i class="fa fa-plus"></i> 添加</a>')
									.appendTo(f);
							d.mouseover(function(i) {
								f.css("padding", "0px");
								e.hide();
								h.show()
							}).mouseout(function(i) {
								f.css("padding", "8px");
								e.show();
								h.hide()
							});
							d.on("mouseover", " tbody > tr", function(j) {
								var i = a(this);
								i.find(".span-row-seq").hide();
								i.find(".fa-times").parent("a").show()
							}).on("mouseout", " tbody > tr", function(j) {
								var i = a(this);
								i.find(".span-row-seq").show();
								i.find(".fa-times").parent("a").hide()
							});
							d.on("click", "a.btn-table-add-line", function(i) {
								i.preventDefault();
								c.addLine(d.find(" tbody tr:first "), "before")
							});
							d
									.on(
											"click",
											"a.btn-table-remove-line",
											function(k) {
												k.preventDefault();
												if (d.find("tbody tr:visible").length == options.minRows) {
													alert("最少要有"
															+ options.minRows
															+ "行！");
													return false
												}
												var j = a(this).closest("tr");
												var i = j
														.find(
																"input[name$=\"extraAttributes['operation']\"]")
														.val();
												if (i == "update") {
													j
															.find(
																	"input[name$=\"extraAttributes['operation']\"]")
															.val("remove");
													j.hide();
													j
															.find(
																	":text,select")
															.not(":hidden")
															.each(
																	function() {
																		a(this)
																				.attr(
																						"disabled",
																						true)
																	})
												} else {
													j.remove()
												}
												c.resetIndex()
											});
							var b = d
									.find("tbody > tr:not(.dynamic-table-row-template)");
							if (b.length > 0) {
								b
										.each(function(k) {
											var l = a(this);
											l.attr("row-index-fixed", k);
											l
													.find(
															"input,select,textarea")
													.each(
															function() {
																var i = a(this);
																var n = i
																		.attr("id");
																if (n
																		&& !Util
																				.startWith("__")) {
																	i
																			.removeAttr("id")
																}
															});
											var m = a(
													'<td style="text-align: center;" class="row-seq"><span class="span-row-seq"></span></td>')
													.prependTo(l);
											var j = a(
													'<a class="btn btn-sm default btn-table-remove-line" href="javascript:;" style="display:none"><i class="fa fa-times"></i></a>')
													.appendTo(m);
											if (a.isFunction(options.afterAdd)) {
												options.afterAdd.call(d, l)
											}
										});
								setTimeout(function() {
									c.resetIndex()
								}, 500)
							} else {
								if (options.initAdd) {
									c.addLine()
								}
							}
							return a(this)
						},
						addLine : function(b, d) {
							$con = this.element;
							if ($con.find("tbody tr:visible").length == options.maxRows) {
								alert("最多只能添加" + options.maxRows + "行！");
								return false
							}
							var e = a("<tr>" + this.tempHtml + "</tr>");
							if (b) {
								if (d == "before") {
									b.before(e)
								} else {
									b.after(e)
								}
							} else {
								$con.find("tbody").append(e)
							}
							e.find("input,select,textarea").each(function() {
								var g = a(this);
								var h = g.attr("id");
								if (h && !Util.startWith("__")) {
									g.removeAttr("id")
								}
								if (g.attr("class") == undefined) {
									g.attr("class", "form-control")
								}
							});
							var f = a(
									'<td style="text-align: center;" class="row-seq"><span class="span-row-seq">1</span></td>')
									.prependTo(e);
							var c = a(
									'<a class="btn btn-sm default btn-table-remove-line" href="javascript:;" style="display:none"><i class="fa fa-times"></i></a>')
									.appendTo(f);
							this.resetIndex();
							if (a.isFunction(options.afterAdd)) {
								options.afterAdd.call($con, e)
							}
							Page.initAjaxBeforeShow(e);
							if (typeof (AdminPage) != "undefined") {
								AdminPage.initAjaxBeforeShow(e)
							}
							Page.initAjaxAfterShow(e);
							if (typeof (AdminPage) != "undefined") {
								AdminPage.initAjaxAfterShow(e)
							}
						},
						resetIndex : function() {
							$con = this.element;
							idx = 0;
							$con.find("tbody tr[row-index-fixed]").each(
									function() {
										idx++
									});
							$con
									.find("tbody tr")
									.not("[row-index-fixed]")
									.each(
											function() {
												a(this)
														.find(
																"input,select,textarea")
														.each(
																function() {
																	var b = a(this);
																	if (b
																			.attr("name")) {
																		var c = b
																				.attr("name");
																		if (c) {
																			b
																					.attr(
																							"name",
																							c
																									.substring(
																											0,
																											c
																													.indexOf("[") + 1)
																									+ idx
																									+ c
																											.substring(
																													c
																															.indexOf("]"),
																													c.length))
																		}
																		var e = b
																				.attr("data-cascade-name");
																		if (e) {
																			b
																					.attr(
																							"data-cascade-name",
																							e
																									.substring(
																											0,
																											e
																													.indexOf("[") + 1)
																									+ idx
																									+ e
																											.substring(
																													e
																															.indexOf("]"),
																													e.length))
																		}
																		var f = b
																				.attr("data-cascade-parent");
																		if (f) {
																			var d = f
																					.substring(
																							0,
																							f
																									.indexOf("[") + 1)
																					+ idx
																					+ f
																							.substring(
																									f
																											.indexOf("]"),
																									f.length);
																			b
																					.attr(
																							"data-cascade-parent",
																							d)
																		}
																	}
																	var g = b
																			.attr("id");
																	if (g
																			&& !Util
																					.startWith("__")) {
																		b
																				.removeAttr("id")
																	}
																});
												idx++
											});
							idx = 0;
							$con.find("tbody tr:visible").each(
									function() {
										a(this).find(
												"td.row-seq > .span-row-seq")
												.html(idx + 1);
										idx++
									});
							a(this).closest("form").attr("form-data-modified",
									"true")
						},
						getVisiableRow : function() {
							return this.element.find("tr:visible")
						},
						destroy : function() {
						}
					})
})(jQuery);