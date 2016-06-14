var AdminPage = function() {
	return {
		initDataProfileParam : function(b) {
			var a = $("#btn-profile-param");
			a.hide();
			$(
					"input[data-profile-param],radio[data-profile-param],select[data-profile-param]",
					b)
					.each(
							function() {
								var f = $(this);
								if (f.attr("data-profile-param-done")) {
									return this
								}
								f.attr("data-profile-param-done", true);
								var g = f.attr("data-profile-param");
								var c = f.closest(".controls");
								var j = "data-profile-param-done" + g;
								if (c.attr(j)) {
									return
								}
								c.attr(j, true);
								var i = f.closest("form").find(
										"input[name='id']").val();
								var h = f.val();
								if (i.length == 0
										&& (h == undefined || h == "")) {
									var e = AdminGlobal
											.findUserProfileParams(g);
									if (e) {
										if (f.is('[type="radio"]')) {
											c.find(
													'[type="radio"][value="'
															+ e + '"]').attr(
													"checked", true)
										} else {
											f.val(e);
											if (f.is("select")) {
												f.select2()
											}
										}
									}
								}
								var d = $(
										'<span class="glyphicon glyphicon-tag tooltipster" title="Click Show the data collection operation buttons"></span>')
										.appendTo(
												f
														.closest(".form-group")
														.children(
																".control-label"));
								d
										.on(
												"click",
												function() {
													a.show();
													a.position({
														my : "right center",
														at : "left center",
														of : c
													});
													a.off();
													a
															.click(function() {
																var l = [];
																var k = {};
																c
																		.find(
																				"[data-profile-param]")
																		.each(
																				function() {
																					var o;
																					var n = $(this);
																					if (n
																							.is('[type="radio"]')) {
																						o = c
																								.find(
																										":checked")
																								.val()
																					} else {
																						o = n
																								.val()
																					}
																					var m = n
																							.attr("data-profile-param");
																					l
																							.push(m);
																					k[m] = o
																				});
																k.codes = l
																		.join(",");
																a
																		.ajaxPostURL({
																			url : WEB_ROOT
																					+ "/admin/sys/user-profile-data/edit",
																			success : function() {
																				$
																						.each(
																								l,
																								function(
																										m,
																										n) {
																									Global
																											.setUserProfileParams(
																													n,
																													k[n])
																								});
																				a
																						.hide()
																			},
																			confirmMsg : false,
																			data : k
																		})
															})
												})
							})
		},
		initTreeSelect : function(a) {
			$('input[data-toggle="tree-select"]', a).each(function() {
				var b = $(this);
				b.treeSelect()
			})
		},
		initUploadBigFile : function(a) {
			$('input[data-upload="single-big-file"]', a)
					.each(
							function() {
								var b = $(this);
								if (b.attr("data-upload-done")) {
									return this
								}
								b.attr("data-upload-done", true);
								var f = "__single-big-file_id_"
										+ new Date().getTime();
								b.attr("id", f);
								var e = f + "_file";
								var d = $("<a href=''>" + b.val() + "</a>")
										.insertAfter(b);
								var c = $('<input type="file" id="' + e + '"/>')
										.insertAfter(b);
								$("#" + e)
										.uploadify(
												{
													fileObjName : "fileUpload",
													buttonText : "Select File Upload",
													multi : false,
													swf : WEB_ROOT
															+ "/assets/plugins/uploadify/uploadify.swf",
													uploader : WEB_ROOT
															+ "/w/file/upload/single.json",
													onUploadSuccess : function(
															h, i, g) {
														alert(g)
													},
													onUploadError : function(g,
															j, i, h) {
														alert("The file "
																+ g.name
																+ " could not be uploaded: "
																+ h)
													}
												})
							})
		},
		initUploadSingleImage : function(a) {
			$('input[data-upload="single-image"]', a)
					.each(
							function() {
								var l = $(this);
								if (l.attr("data-upload-done")) {
									return this
								}
								l.attr("data-upload-done", true);
								if (l.attr("id") == undefined) {
									l.attr("id", "single_image_id_"
											+ new Date().getTime())
								}
								var m = {
									width : "150px",
									height : "150px"
								};
								if (l.attr("data-image-width")) {
									m.width = l.attr("data-image-width");
									if (!Util.endWith(m.width, "px")) {
										m.width = m.width + "px"
									}
								}
								if (l.attr("data-image-height")) {
									m.height = l.attr("data-image-height");
									if (!Util.endWith(m.height, "px")) {
										m.height = m.height + "px"
									}
								}
								var i = l.parent("td");
								if (i.size() == 0) {
									i = l.closest("div.form-group").children(
											"div")
								}
								i.addClass("clearfix");
								var c = $(
										'<div class="thumbnail" style="float:left; width: '
												+ m.width + '"/>').appendTo(i);
								var d = $('<div class="div-add-img" style="line-height: '
										+ m.height
										+ '; background-color: #EEEEEE; text-align: center;"/>');
								d
										.append('<p style="margin-bottom:4px"><button class="btn btn-large" type="button"><i class="fa fa-arrow-circle-o-up"></i></button></p>');
								var k = $('<div class="caption" style="height: 15px;padding-top:0px">');
								var e = $('<a class="btn-add pull-right" style="cursor: pointer;" title="Click Upload Photos"><i class="fa fa-plus"></i></a>');
								var j = $('<a class="btn-edit" style="cursor: pointer;"  title="Click Edit Picture"><i class="fa fa-edit"></i></a>');
								var f = $('<a class="btn-remove pull-right"  style="cursor: pointer;" title="Click Remove image"><i class="fa fa-minus"></i></a>');
								var g = l.val();
								if (g == undefined || g == "") {
									d.appendTo(c);
									k.appendTo(c);
									k.append(e)
								} else {
									var b = g;
									if (READ_FILE_URL_PREFIX) {
										b = READ_FILE_URL_PREFIX + g
									}
									c
											.append('<img data-toggle="preview" src="'
													+ b
													+ '" style="width: '
													+ m.width
													+ "; height: "
													+ m.height + ';" />');
									Page.initImagePreivew(c);
									k.appendTo(c);
									k.append(j);
									k.append(f)
								}
								var h = KindEditor.editor({
									allowFileManager : false
								});
								c
										.delegate(
												"div.div-add-img, a.btn-add , a.btn-edit",
												"click",
												function() {
													h
															.loadPlugin(
																	"image",
																	function() {
																		h.plugin
																				.imageDialog({
																					showRemote : false,
																					clickFn : function(
																							p,
																							s,
																							q,
																							n,
																							o,
																							t) {
																						var r = p;
																						if (Util
																								.startWith(
																										p,
																										"http")) {
																							r = p
																									.split(READ_FILE_URL_PREFIX)[1]
																						} else {
																							if (Util
																									.startWith(
																											p,
																											WEB_ROOT)) {
																								r = p
																										.split(WEB_ROOT)[1]
																							} else {
																								r = p
																							}
																							p = READ_FILE_URL_PREFIX
																									+ r
																						}
																						l
																								.val(r);
																						if (c
																								.find("img").length == 0) {
																							d
																									.hide();
																							c
																									.prepend('<img data-toggle="preview" src="'
																											+ p
																											+ '" style="cursor: pointer; width: '
																											+ m.width
																											+ "; height: "
																											+ m.height
																											+ ';" />');
																							Page
																									.initImagePreivew(c);
																							k
																									.empty();
																							k
																									.append(j);
																							k
																									.append(f)
																						} else {
																							c
																									.find(
																											"img")
																									.attr(
																											{
																												src : p
																											})
																						}
																						h
																								.hideDialog()
																					}
																				})
																	})
												});
								c.delegate("a.btn-remove", "click", function() {
									l.val("");
									c.find("img").remove();
									if (c.find("div.div-add-img").length == 0) {
										c.prepend(d)
									} else {
										d.show()
									}
									k.empty();
									k.append(e)
								})
							})
		},
		initUploadMultiImage : function(a) {
			$("input[data-multiimage]", a)
					.each(
							function() {
								var u = $(this);
								if (u.attr("data-multiimage-done")) {
									return this
								}
								u.attr("data-multiimage-done", true);
								if (u.attr("multiimage-done") != undefined) {
									return
								}
								if (u.attr("id") == undefined) {
									u.attr("id", "multiimage_id_"
											+ new Date().getTime())
								}
								var v = u.attr("name");
								var c = {
									width : "150px",
									height : "150px"
								};
								if (u.attr("data-image-width")) {
									c.width = u.attr("data-image-width");
									if (!Util.endWith(c.width, "px")) {
										c.width = c.width + "px"
									}
								}
								if (u.attr("data-image-height")) {
									c.height = u.attr("data-image-height");
									if (!Util.endWith(c.height, "px")) {
										c.height = c.height + "px"
									}
								}
								var e = u.attr("data-index-prop");
								var k = u.closest("div.controls");
								var w = $(
										'<div class="thumbnail thumbnail-'
												+ u.attr("data-multiimage")
												+ '" style="float:left; margin-right: 5px; width: '
												+ c.width + '"/>').appendTo(k);
								w.append(u);
								if (e) {
									var o = u.attr("data-pk");
									if (o) {
										var n = $('<input type="hidden" name="'
												+ v
														.substring(0, v
																.indexOf("]"))
												+ '].id" />');
										n.val(o);
										w.append(n);
										var i = $('<input type="hidden" name="'
												+ v
														.substring(0, v
																.indexOf("]"))
												+ '].extraAttributes.operation" />');
										i.val("update");
										w.append(i);
										var r = $('<input type="hidden" name="'
												+ v
														.substring(0, v
																.indexOf("]"))
												+ "]." + e + '" />');
										var h = Number(u.attr("data-index-val"));
										r.val(h);
										var d = k.attr("min-index");
										if (d == undefined) {
											d = 1000
										}
										d = Number(d);
										if (h < d) {
											k.attr("min-index", h)
										}
										var l = k.attr("pk-count");
										if (l == undefined) {
											l = 0
										}
										k.attr("pk-count", Number(l) + 1);
										w.append(r)
									} else {
										var r = $('<input type="hidden"  name="'
												+ v
														.substring(0, v
																.indexOf("]"))
												+ "]." + e + '" />');
										var d = k.attr("min-index");
										if (d == undefined) {
											d = 1000
										}
										d = Number(d) - 100;
										k.attr("min-index", d);
										r.val(d);
										w.append(r);
										if (u.attr("data-multiimage") == "btn") {
											u.attr("disabled", true);
											r.attr("disabled", true)
										}
									}
								}
								var j = function() {
									var x = k.attr("pk-count");
									if (x == undefined) {
										x = 0
									}
									k
											.find("> .thumbnail-edit")
											.each(
													function() {
														var y = $(this);
														if (y
																.find(
																		"input[name$='.id']")
																.size() == 0) {
															y
																	.find(
																			"input")
																	.each(
																			function() {
																				var A = $(this);
																				var z = A
																						.attr("name");
																				if (z) {
																					A
																							.attr(
																									"name",
																									z
																											.substring(
																													0,
																													z
																															.indexOf("[") + 1)
																											+ x
																											+ z
																													.substring(
																															z
																																	.indexOf("]"),
																															z.length))
																				}
																			});
															x++
														}
													})
								};
								var f = $('<div class="div-add-img" style="line-height: '
										+ c.height
										+ '; background-color: #EEEEEE; text-align: center;"/>');
								f
										.append('<p style="margin-bottom:4px"><button class="btn btn-large" type="button">Click Upload Photos</button></p>');
								var p = $('<div class="caption" style="height: 15px;padding-top:0px;cursor: crosshair">');
								var m = $('<a class="btn-add pull-right" style="cursor: pointer;" title="Click Upload Photos"><i class="fa fa-plus"></i></a>');
								var b = $('<a class="btn-edit" style="cursor: pointer;"  title="Edit Edit Picture"><i class="fa fa-edit"></i></a>');
								var q = $('<a class="btn-remove pull-right"  style="cursor: pointer;" title="Click Remove image"><i class="fa fa-minus"></i></a>');
								var s = u.val();
								if (s == undefined || s == "") {
									f.appendTo(w);
									p.appendTo(w);
									p.append(m);
									u.attr("disabled", true)
								} else {
									var g = s;
									if (READ_FILE_URL_PREFIX) {
										g = READ_FILE_URL_PREFIX + s
									}
									w
											.append('<img data-toggle="preview" src="'
													+ g
													+ '" style="width: '
													+ c.width
													+ "; height: "
													+ c.height + ';" />');
									Page.initImagePreivew(w);
									p.appendTo(w);
									p.append(b);
									p.append(q)
								}
								k.append(k.find(".thumbnail-btn"));
								var t = KindEditor.editor({
									allowFileManager : false
								});
								k
										.sortable({
											items : ".thumbnail",
											stop : function(z, A) {
												var y = $(A.item);
												if (e) {
													var x = 1000;
													y
															.parent()
															.find(
																	"input[name$='"
																			+ e
																			+ "']")
															.each(
																	function(B,
																			C) {
																		$(this)
																				.val(
																						x);
																		x -= 100
																	})
												} else {
													var x = 0;
													y
															.parent()
															.find(
																	"input[data-multiimage='edit']")
															.each(
																	function(B,
																			D) {
																		var E = $(this);
																		var C = E
																				.attr("name");
																		E
																				.attr(
																						"name",
																						C
																								.substring(
																										0,
																										C
																												.indexOf("[") + 1)
																								+ x
																								+ C
																										.substring(
																												C
																														.indexOf("]"),
																												C.length));
																		x++
																	})
												}
												y.attr("sorted", true)
											}
										});
								w
										.delegate(
												"div.div-add-img, a.btn-add",
												"click",
												function() {
													t
															.loadPlugin(
																	"multiimage",
																	function() {
																		t.plugin
																				.multiImageDialog({
																					showRemote : false,
																					clickFn : function(
																							x) {
																						KindEditor
																								.each(
																										x,
																										function(
																												y,
																												A) {
																											var z = $('<input type="hidden" data-multiimage="edit" name="'
																													+ v
																													+ '"/>');
																											if (e) {
																												z
																														.attr(
																																"data-index-prop",
																																e)
																											}
																											z
																													.val(A.path);
																											w
																													.before(z);
																											AdminPage
																													.initUploadMultiImage(a)
																										});
																						j();
																						t
																								.hideDialog()
																					}
																				})
																	})
												});
								w
										.delegate(
												"a.btn-edit",
												"click",
												function() {
													if (w.attr("sorted")) {
														w.removeAttr("sorted");
														return
													}
													t
															.loadPlugin(
																	"image",
																	function() {
																		t.plugin
																				.imageDialog({
																					showRemote : false,
																					clickFn : function(
																							z,
																							C,
																							A,
																							x,
																							y,
																							D) {
																						var B = z;
																						if (READ_FILE_URL_PREFIX) {
																							B = z
																									.split(READ_FILE_URL_PREFIX)[1]
																						}
																						u
																								.val(B);
																						if (w
																								.find("img").length == 0) {
																							f
																									.hide();
																							w
																									.prepend('<img data-toggle="preview" src="'
																											+ z
																											+ '" style="width: '
																											+ c.width
																											+ "; height: "
																											+ c.height
																											+ ';" />');
																							Page
																									.initImagePreivew(w);
																							p
																									.empty();
																							p
																									.append(b);
																							p
																									.append(q)
																						} else {
																							w
																									.find(
																											"img")
																									.attr(
																											{
																												src : z
																											})
																						}
																						t
																								.hideDialog()
																					}
																				})
																	})
												});
								w
										.delegate(
												"a.btn-remove",
												"click",
												function() {
													var x = $(this).closest(
															".thumbnail");
													if (x
															.find(
																	"input[name$='.id']")
															.size() > 0) {
														x
																.find(
																		"input[name$='.extraAttributes.operation']")
																.val("remove");
														x.hide()
													} else {
														x.remove();
														j()
													}
												});
								u.attr("multiimage-done", true)
							})
		},
		initUploadMultiSplitImage : function(a) {
			$("input[data-multisplitimage]", a)
					.each(
							function() {
								var n = $(this);
								if (n.attr("id") == undefined) {
									n.attr("id", "multisplitimage_id_"
											+ new Date().getTime())
								}
								var b = n.attr("name");
								var o = {
									width : "150px",
									height : "150px"
								};
								if (n.attr("data-image-width")) {
									o.width = n.attr("data-image-width");
									if (!Util.endWith(o.width, "px")) {
										o.width = o.width + "px"
									}
								}
								if (n.attr("data-image-height")) {
									o.height = n.attr("data-image-height");
									if (!Util.endWith(o.height, "px")) {
										o.height = o.height + "px"
									}
								}
								var d = $('<a class="btn-add pull-right" style="cursor: pointer;" title="Click Upload Photos"><i class="fa fa-plus"></i></a>');
								var l = $('<a class="btn-edit" style="cursor: pointer;"  title="Edit Picture"><i class="fa fa-edit"></i></a>');
								var e = $('<a class="btn-remove pull-right"  style="cursor: pointer;" title="Click Remove image"><i class="fa fa-minus"></i></a>');
								var i = n.closest("div.controls");
								var f = function() {
									var p = n.val();
									if (p != undefined && p != "") {
										var s = p.split(",");
										for (var r = 0; r < s.length; r++) {
											var t = s[r];
											if (t.length > 0) {
												if (READ_FILE_URL_PREFIX) {
													t = READ_FILE_URL_PREFIX
															+ t
												}
												var u = $('<div class="thumbnail thumbnail-'
														+ n
																.attr("data-multisplitimage")
														+ '" style="float:left; margin-right: 5px; width: '
														+ o.width + '"/>');
												u.attr("data-src", s[r]);
												u
														.append('<img data-toggle="preview" src="'
																+ t
																+ '" style="width: '
																+ o.width
																+ "; height: "
																+ o.height
																+ ';" />');
												Page.initImagePreivew(u);
												var q = $('<div class="caption" style="height: 15px;padding-top:0px;cursor: crosshair">');
												q.appendTo(u);
												q.append(l.clone());
												q.append(e.clone());
												n.after(u)
											}
										}
									}
								};
								f();
								var h = function() {
									var r = i.find(".thumbnail-edit");
									var q = [];
									for (var p = 0; p < r.size(); p++) {
										q.push($(r[p]).attr("data-src"))
									}
									n.val(q.join(","))
								};
								var m = $('<div class="thumbnail thumbnail-btn" style="float:left; margin-right: 5px; width: '
										+ o.width + '"/>');
								var k = $('<div class="caption" style="height: 15px;padding-top:0px;cursor: crosshair">');
								var c = $('<div class="div-add-img" style="line-height: '
										+ o.height
										+ '; background-color: #EEEEEE; text-align: center;"/>');
								c
										.append('<p style="margin-bottom:4px"><button class="btn btn-large" type="button">Click Upload Photos</button></p>');
								c.appendTo(m);
								k.appendTo(m);
								k.append(d);
								if (i.find(".thumbnail").size() > 0) {
									var g = i.find(".thumbnail").last();
									g.after(m)
								} else {
									n.after(m)
								}
								i.sortable({
									items : ".thumbnail",
									stop : function(p, q) {
										h()
									}
								});
								var j = KindEditor.editor({
									allowFileManager : false
								});
								i
										.delegate(
												"div.div-add-img, a.btn-add",
												"click",
												function() {
													j
															.loadPlugin(
																	"multiimage",
																	function() {
																		j.plugin
																				.multiImageDialog({
																					showRemote : false,
																					clickFn : function(
																							p) {
																						KindEditor
																								.each(
																										p,
																										function(
																												r,
																												s) {
																											console
																													.log(s.path);
																											var t = s.path;
																											if (READ_FILE_URL_PREFIX) {
																												t = READ_FILE_URL_PREFIX
																														+ s.path
																											}
																											var u = $('<div class="thumbnail thumbnail-'
																													+ n
																															.attr("data-multisplitimage")
																													+ '" style="float:left; margin-right: 5px; width: '
																													+ o.width
																													+ '"/>');
																											u
																													.attr(
																															"data-src",
																															s.path);
																											u
																													.append('<img data-toggle="preview" src="'
																															+ t
																															+ '" style="width: '
																															+ o.width
																															+ "; height: "
																															+ o.height
																															+ ';" />');
																											Page
																													.initImagePreivew(u);
																											var q = $('<div class="caption" style="height: 15px;padding-top:0px;cursor: crosshair">');
																											q
																													.appendTo(u);
																											q
																													.append(l
																															.clone());
																											q
																													.append(e
																															.clone());
																											m
																													.before(u)
																										});
																						h();
																						j
																								.hideDialog()
																					}
																				})
																	})
												});
								i
										.delegate(
												"a.btn-edit",
												"click",
												function() {
													var q = $(this).closest(
															".thumbnail");
													var p = q.find("img");
													j
															.loadPlugin(
																	"image",
																	function() {
																		j.plugin
																				.imageDialog({
																					showRemote : false,
																					clickFn : function(
																							t,
																							w,
																							u,
																							r,
																							s,
																							x) {
																						var v = t;
																						if (READ_FILE_URL_PREFIX) {
																							v = t
																									.split(READ_FILE_URL_PREFIX)[1]
																						}
																						q
																								.attr(
																										"data-src",
																										v);
																						p
																								.attr(
																										"src",
																										t);
																						h();
																						j
																								.hideDialog()
																					}
																				})
																	})
												});
								i.delegate("a.btn-remove", "click", function() {
									var p = $(this).closest(".thumbnail");
									p.remove();
									h()
								})
							})
		},
		initUploadSingleFile : function(a) {
			$('input[data-upload="single-file"]', a)
					.each(
							function() {
								var b = $(this);
								if (b.attr("single-file-done")) {
									return this
								}
								b.attr("single-file-done", true);
								var c = $(
										'<span class="input-group-btn"><button type="button" class="btn default"><i class="fa fa-arrow-circle-o-up"></i></button></span>')
										.insertAfter(b);
								var e = $(
										'<span class="input-group-btn"><button type="button" class="btn default"><i class="fa fa-arrow-circle-o-down"></i></button></span>')
										.insertAfter(b);
								var d = b.parent()
										.children(":not(.help-block)");
								d.wrapAll('<div class="input-group"></div>');
								c.click(function() {
									Global.triggerSingleFileUpload(b)
								});
								e.click(function() {
									var f = b.val();
									if (f != "") {
										window.open(READ_FILE_URL_PREFIX
												+ b.val())
									}
								})
							})
		},
		initXEditable : function(a) {
			$("a.x-editable", a).each(
					function() {
						var b = $(this);
						var c = b.attr("data-url");
						if (c == undefined) {
							c = b.closest("form").attr("action")
						}
						var e = b.attr("data-pk");
						if (e == undefined) {
							e = b.closest("form").find("input[name='id']")
									.val()
						}
						var f = b.attr("data-original-title");
						if (f == undefined) {
							f = "Data Modification"
						}
						var d = b.attr("data-placement");
						if (d == undefined) {
							d = "top"
						}
						Util.assertNotBlank(c);
						Util.assertNotBlank(e);
						b.editable({
							url : c,
							pk : e,
							title : f,
							source : [ {
								value : 1,
								text : "Male"
							}, {
								value : 2,
								text : "Female"
							} ],
							placement : d,
							params : function(g) {
								g.id = e;
								g[g.name] = g.value;
								return g
							},
							validate : function(g) {
								var h = b.attr("data-required");
								if (h == "true") {
									if ($.trim(g) == "") {
										return "Data can not be empty"
									}
								}
							},
							success : function() {
								if (b.hasClass("editable-bpm-task-transfer")) {
									$("#layout-nav .btn-close-active").click();
									$(".ajaxify-tasks").ajaxGetUrl(
											$(".ajaxify-tasks")
													.attr("data-url"))
								}
							}
						})
					})
		},
		initGmapsBaidu : function(a) {
			$(".gmaps.gmaps-baidu", a).each(
					function() {
						var d = $(this);
						var h = d.attr("id");
						if (h == undefined) {
							h = "__map_baidu_id_" + new Date().getTime();
							d.attr("id", h)
						}
						var f = new BMap.Map(h);
						var g = new BMap.Geocoder();
						var e = function(i) {
							if (i) {
								f.clearOverlays();
								f.panTo(i);
								var j = new BMap.Marker(i);
								f.addOverlay(j);
								return i
							}
						};
						f.centerAndZoom("北京市", 12);
						f.enableScrollWheelZoom();
						f.enableContinuousZoom();
						f.addControl(new BMap.NavigationControl());
						d.bind("mapLocate", function(j, i) {
							g.getPoint(i, function(k) {
								e(k)
							}, "北京市")
						});
						var c = d.attr("data-location");
						if (c && c != "") {
							setTimeout(function() {
								d.trigger("mapLocate", c)
							}, 1000)
						}
						d.bind("mapPoint", function(j, k, l) {
							var i = new BMap.Point(k, l);
							e(i)
						});
						var b = d.attr("data-point-longitude");
						if (b && b != "") {
							setTimeout(function() {
								d.trigger("mapPoint", [ b,
										d.attr("data-point-latitude") ])
							}, 1000)
						}
						f.addEventListener("click", function(j) {
							var i = j.point;
							e(i);
							g.getLocation(i, function(l) {
								var k = l.addressComponents;
								l.fullAddress = k.province + k.city
										+ k.district + k.street
										+ k.streetNumber;
								d.trigger("clickMapPoint", l)
							})
						})
					})
		},
		initQrCode : function(a) {
			$("div[data-qrcode]", a).each(
					function() {
						var d = $(this);
						if (d.attr("data-qrcode-done")) {
							return this
						}
						d.attr("data-qrcode-done", true);
						var c = null;
						var g = d.attr("data-qrcode-icon")
								|| Config.getData().qrcode.iconSrc;
						if (g) {
							var c = new Image();
							c.src = g
						}
						var f = d.attr("data-qrcode");
						var e = {
							render : "canvas",
							text : f,
							height : 210,
							width : 210,
							background : "#ffffff",
							foreground : "red"
						};
						d.css({
							height : e.height,
							width : e.width
						});
						d.wrap("<div class='qrcode-wrap' style='width:"
								+ (e.width + 16 + 30 + 30) + "px;'></div>");
						var i = d.attr("data-qrcode-header")
								|| Config.getData().qrcode.header;
						if (i && i != "") {
							d.before("<div class='qrcode-header' style='width:"
									+ e.width + "px;'>" + i + "</div>")
						}
						var h = d.attr("data-qrcode-footer")
								|| Config.getData().qrcode.footer;
						if (h && h != "") {
							d.after("<div class='qrcode-footer' style='width:"
									+ e.width + "px;'>" + h + "</div>")
						}
						d.wrap("<div class='qrcode-wrap-inner' style='width:"
								+ (e.width + 16) + "px;'></div>");
						if (c) {
							c.onload = function() {
								if (c.width > 5) {
									e.imgWidth = c.width;
									e.imgHeight = c.height;
									e.src = g
								}
								d.qrcode(e)
							}
						} else {
							d.qrcode(e)
						}
						var b = d.parent().parent();
						b.attr("title", "Click on the current two-dimensional code can be converted to image download");
						b.click(function() {
							var j = $(this);
							html2canvas(j, {
								onrendered : function(k) {
									j.after(k);
									j.hide();
									Canvas2Image.saveAsPNG(k)
								}
							})
						})
					})
		},
		initAjaxBeforeShow : function(a) {
			if (a == undefined) {
				a = $("body")
			}
			AdminPage.initDataProfileParam(a);
			AdminPage.initTreeSelect(a);
			AdminPage.initUploadBigFile(a);
			AdminPage.initUploadSingleImage(a);
			AdminPage.initUploadMultiImage(a);
			AdminPage.initUploadMultiSplitImage(a);
			AdminPage.initUploadSingleFile(a);
			AdminPage.initXEditable(a);
			AdminPage.initQrCode(a);
			$(".nav[data-active-index]", a).each(function() {
				var c = $(this);
				var b = c.attr("data-active-index");
				if (b == undefined || b == "") {
					return
				}
				var d = c.find("li:not(.tools)").index(c.find("li.active"));
				if (b != d) {
					c.find("li:not(.tools):eq(" + b + ") > a").click()
				}
			});
			if ($.fn.dropdownHover) {
				$('[data-hover="dropdown"]', a).dropdownHover()
			}
		},
		initAjaxAfterShow : function(b) {
			if (b == undefined) {
				b = $("body")
			}
			$('.form-body .row[data-equal-height!="false"]', b)
					.each(
							function() {
								var c = 0;
								var d = $(this)
										.find(
												" > div > .form-group > div, > .form-group > div");
								d.each(function() {
									var e = 10;
									if ($(this).is(".ui-sortable")) {
										e = $(this).find("div:first")
												.innerHeight() + 12
									} else {
										e = $(this).innerHeight()
									}
									if (e > c) {
										c = e
									}
									var f = $(this).prev(".control-label")
											.innerHeight();
									if (f > c) {
										c = f + 2
									}
								});
								d.css("min-height", c)
							});
			var a = [ "#C1232B", "#B5C334", "#FCCE10", "#E87C25", "#27727B",
					"#FE8463", "#9BCA63", "#FAD860", "#F3A43B", "#60C0DD",
					"#D7504B", "#C6E579", "#F4E001", "#F0805A", "#26C0C0" ];
			$("div[data-chart]", b).each(function() {
				var d = $(this);
				var g = d.attr("id");
				if (g == undefined) {
					g = "__chart_" + new Date().getTime();
					d.attr("id", g)
				}
				var f = d.attr("data-chart");
				if (f == "plot") {
					$.plot(d, d.data("plotData"), d.data("plotOptions"))
				} else {
					if (f == "echarts") {
						var c = echarts.init(document.getElementById(g));
						var e = d.data("echartsOptions");
						if (e) {
							e.title = $.extend(true, {
								x : "left",
								y : "top"
							}, e.title || {});
							$.each(e.series, function(h, j) {
								if (j.type == "bar") {
									e.series[h] = $.extend(true, {
										itemStyle : {
											normal : {
												color : function(i) {
													return a[i.dataIndex]
												}
											}
										}
									}, j)
								}
							});
							c.setOption(e);
							d.data("echart", c)
						} else {
							alert("Undefined Echarts Options")
						}
					}
				}
			});
			$(".full-calendar", b).each(function() {
				$(this).fullCalendar($(this).data("fullCalendarOptions"))
			});
			AdminPage.initGmapsBaidu(b);
			$("div.scroller", b)
					.each(
							function() {
								var d = $(this);
								var c;
								if (d.attr("data-height")) {
									c = d.attr("data-height");
									if ("stretch" == c) {
										c = $(window).height() - d.offset().top
												- $("div.footer").outerHeight()
												- 18;
										d.css({
											height : c + "px"
										})
									}
								} else {
									c = d.css("height")
								}
								d.parent(".slimScrollDiv").css({
									height : c + "px"
								});
								d
										.slimScroll({
											size : "7px",
											color : (d
													.attr("data-handle-color") ? d
													.attr("data-handle-color")
													: "#a1b2bd"),
											railColor : (d
													.attr("data-rail-color") ? d
													.attr("data-rail-color")
													: "#333"),
											position : "right",
											height : c,
											alwaysVisible : (d
													.attr("data-always-visible") == "true" ? true
													: false),
											railVisible : (d
													.attr("data-rail-visible") == "true" ? true
													: false),
											wheelStep : 5,
											disableFadeOut : true
										})
							})
		},
		doSomeStuff : function() {
			myFunc()
		}
	}
}();