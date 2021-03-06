var Page = function() {
	return {
		initDynamicTable : function($container) {
			$("table[data-dynamic-table]", $container).each(function() {
				var $dynamicTable = $(this);
				var options = $dynamicTable.data("dynamicTableOptions");
				$(this).dynamictable(options)
			})
		},
		initDropdownSelect : function($container) {
			$('input[data-toggle="dropdown-select"]', $container)
					.each(
							function() {
								var $el = $(this);
								if ($el.attr("dropdown-select-done")) {
									return this
								}
								$el.attr("dropdown-select-done", true);
								var $toggle = $(
										'<i class="fa fa-angle-double-down btn-toggle"></i>')
										.insertBefore($el);
								var $clear = $('<i class="fa fa-times"></i>')
										.insertBefore($el);
								var $elems = $el.parent().children();
								$elems
										.wrapAll('<div class="input-group" style="width:100%"><div class="input-icon right"></div></div>');
								$clear.click(function() {
									$elems.val("")
								});
								$el.attr("autocomplete", "off");
								var $parent = $el.closest(".panel-content");
								var $dropdown = $('<div class="container-dropdownselect" style="display : none;background-color: white;border: 1px solid #CCCCCC;"></div>');
								if ($parent.size() > 0) {
									$dropdown.appendTo($parent)
								} else {
									$dropdown.appendTo($("body"))
								}
								if ($el.attr("data-min-width")) {
									$dropdown.css("min-width", $el
											.attr("data-min-width"))
								}
								$el
										.add($el.parent().find("i.btn-toggle"))
										.click(
												function() {
													var parentOffsetLeft = 0;
													var parentOffsetTop = 0;
													if ($parent.size() > 0) {
														parentOffsetLeft = $parent
																.offset().left;
														parentOffsetTop = $parent
																.offset().top
													}
													var offset = $el.offset();
													$dropdown
															.css({
																width : $el
																		.outerWidth(),
																position : "absolute",
																left : (offset.left - parentOffsetLeft)
																		+ "px",
																top : (offset.top - parentOffsetTop)
																		+ $el
																				.outerHeight()
																		+ "px"
															});
													$dropdown.on("");
													$dropdown
															.data(
																	"callback",
																	$el
																			.data("data-dropdownselect-callback"));
													$dropdown
															.slideToggle("fast");
													var $btnToggle = $el
															.parent()
															.find(
																	"i.btn-toggle");
													if ($btnToggle
															.hasClass("fa-angle-double-down")) {
														$btnToggle
																.removeClass("fa-angle-double-down");
														$btnToggle
																.addClass("fa-angle-double-up")
													} else {
														$btnToggle
																.addClass("fa-angle-double-down");
														$btnToggle
																.removeClass("fa-angle-double-up")
													}
													if ($dropdown.is(":empty")) {
														var url = $el
																.attr("data-url");
														if ($el
																.attr("data-selected")) {
															if (url
																	.indexOf("?") > -1) {
																url = url
																		+ "&selected="
																		+ $el
																				.attr("data-selected")
															} else {
																url = url
																		+ "?selected="
																		+ $el
																				.attr("data-selected")
															}
														}
														$dropdown
																.ajaxGetUrl(url)
													}
												});
								$(document)
										.on(
												"mousedown",
												function(e) {
													var $p = $el.parent("div");
													if (!($p.is(e.target)
															|| $p
																	.find(e.target).length
															|| $dropdown
																	.is(e.target) || $dropdown
															.find(e.target).length)) {
														$dropdown.hide()
													}
												})
							})
		},
		initMultiSelectDouble : function($container) {
			if ($.fn.multiSelect) {
				$('select[data-toggle="double-multi-select"]', $container)
						.each(
								function() {
									var $select = $(this);
									if ($select
											.attr("double-multi-select-done")) {
										return this
									}
									$select.attr("double-multi-select-done",
											true);
									$select
											.multiSelect({
												selectableHeader : "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Quick Filter...'>",
												selectionHeader : "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Quick Filter...'>",
												afterInit : function(ms) {
													var that = this;
													var $selectableSearch = that.$selectableUl
															.prev();
													var $selectionSearch = that.$selectionUl
															.prev();
													var selectableSearchString = "#"
															+ that.$container
																	.attr("id")
															+ " .ms-elem-selectable:not(.ms-selected)";
													var selectionSearchString = "#"
															+ that.$container
																	.attr("id")
															+ " .ms-elem-selection.ms-selected";
													that.qs1 = $selectableSearch
															.quicksearch(
																	selectableSearchString)
															.on(
																	"keydown",
																	function(e) {
																		if (e.which === 40) {
																			that.$selectableUl
																					.focus();
																			return false
																		}
																	});
													that.qs2 = $selectionSearch
															.quicksearch(
																	selectionSearchString)
															.on(
																	"keydown",
																	function(e) {
																		if (e.which == 40) {
																			that.$selectionUl
																					.focus();
																			return false
																		}
																	});
													var height = $select
															.attr("data-height");
													if (height) {
														that.$container
																.find(
																		".ms-list")
																.css(
																		{
																			height : height
																		})
													}
												},
												afterSelect : function() {
													this.qs1.cache();
													this.qs2.cache()
												},
												afterDeselect : function() {
													this.qs1.cache();
													this.qs2.cache()
												}
											})
								})
			}
		},
		initSelect2 : function($container) {
			if (jQuery().select2) {
				$("select", $container)
						.each(
								function() {
									var $select2 = $(this);
									if ($select2.attr("select2-done")) {
										return this
									}
									if ($select2
											.is('[data-toggle="double-multi-select"]')) {
										return this
									}
									if ($select2.is(".select2-ignore")) {
										return this
									}
									$select2.attr("select2-done", true);
									if ($select2
											.closest(
													".ui-search-input,.ui-pager-control")
											.size() > 0) {
										return
									}
									if ($select2.find(' > option[value=""]')
											.size() == 0) {
										var $empty = $('<option value="">please choose...</option>');
										$select2.prepend($empty)
									}
									if ($select2.find(" > option[selected]")
											.size() == 0) {
										$select2.find(' > option[value=""]')
												.attr("selected", true)
									}
									var allowClear = true;
									if ($select2.attr("data-allow-clear")) {
										if ($select2.attr("data-allow-clear") == "false") {
											allowClear = false
										}
									}
									var placeholder = $select2
											.attr("placeholder");
									if (placeholder == undefined) {
										placeholder = "请选择..."
									}
									var options = {
										allowClear : false,
										matcher : function(term, text) {
											var mod = Pinyin
													.getCamelChars(text)
													+ "";
											var tf1 = mod
													.toUpperCase()
													.indexOf(term.toUpperCase()) == 0;
											var tf2 = text
													.toUpperCase()
													.indexOf(term.toUpperCase()) == 0;
											return (tf1 || tf2)
										}
									};
									var cascadeParent = $select2
											.attr("data-cascade-parent");
									if (cascadeParent) {
										var $cascadeParent = $select2.closest(
												"form").find(
												"select[name='" + cascadeParent
														+ "']");
										$select2.data("cachedOptions", $select2
												.children("option").clone());
										var cascadeParentVal = $cascadeParent
												.val();
										if (cascadeParentVal
												&& cascadeParentVal != "") {
											$select2
													.children("option")
													.each(
															function(i, option) {
																var $option = $(this);
																var parentValue = $option
																		.attr("data-cascade-parent");
																if (parentValue
																		&& parentValue != cascadeParentVal) {
																	$option
																			.remove()
																}
															})
										} else {
											$select2.empty()
										}
									}
									if ($select2.attr("data-select2-type") == "combobox") {
										var $input = $(
												'<input type="text" name="'
														+ $(this).attr("name")
														+ '"/>').insertAfter(
												$select2);
										if ($select2.attr("class") != undefined) {
											$input.attr("class", $select2
													.attr("class"))
										}
										var selected = $select2.val();
										options = $
												.extend(
														{},
														options,
														{
															placeholder : "请选择或输入...",
															allowClear : true,
															query : function(
																	query) {
																var data = {
																	results : []
																};
																$select2
																		.find(
																				"option")
																		.each(
																				function() {
																					data.results
																							.push({
																								id : $(
																										this)
																										.val(),
																								text : $(
																										this)
																										.text()
																							})
																				});
																query
																		.callback(data)
															},
															initSelection : function(
																	element,
																	callback) {
																if (selected != undefined) {
																	var data = {
																		id : selected,
																		text : selected
																	};
																	callback(data)
																}
															},
															createSearchChoice : function(
																	term, data) {
																if ($(data)
																		.filter(
																				function() {
																					return this.text
																							.localeCompare(term) === 0
																				}).length === 0) {
																	return {
																		id : term,
																		text : term
																	}
																}
															}
														});
										if (!Global.isMobile()) {
											$input.select2(options)
										}
										if (selected != undefined) {
											$input.select2("val", [ selected ])
										}
										$select2.remove()
									} else {
										var dataCache = $select2
												.attr("data-cache");
										if (dataCache) {
											var dataCache = eval(dataCache);
											for ( var i in dataCache) {
												$select2
														.append("<option value='"
																+ i
																+ "'>"
																+ dataCache[i]
																+ "</option>")
											}
										}
										var dataUrl = $select2.attr("data-url");
										if (dataUrl) {
											var val = $select2.val();
											var dataCache = Util
													.getCacheSelectOptionDatas(WEB_ROOT
															+ dataUrl);
											for ( var i in dataCache) {
												if (val && val == i) {
													continue
												}
												$select2
														.append("<option value='"
																+ i
																+ "'>"
																+ dataCache[i]
																+ "</option>")
											}
										}
										if (!Global.isMobile()) {
											$select2.select2(options)
										}
										$select2
												.on(
														"change",
														function(e) {
															var val = $(this)
																	.children(
																			"option:selected")
																	.val();
															var cascadeName = $select2
																	.attr("data-cascade-name");
															if (cascadeName) {
																var $cascadeTarget = $select2
																		.closest(
																				"form")
																		.find(
																				"select[name='"
																						+ cascadeName
																						+ "']");
																$cascadeTarget
																		.empty();
																if (val
																		&& val != "") {
																	var parent = $cascadeTarget
																			.attr("data-cascade-parent");
																	if (parent) {
																		$cascadeTarget
																				.data(
																						"cachedOptions")
																				.each(
																						function() {
																							var $option = $(this);
																							var parentValue = $option
																									.attr("data-cascade-parent");
																							if (parentValue == undefined
																									|| parentValue == val) {
																								$cascadeTarget
																										.append($option);
																								$cascadeTarget
																										.select2(options)
																							}
																						})
																	} else {
																		var cachedData = $cascadeTarget
																				.data(val);
																		if (cachedData) {
																			$cascadeTarget
																					.append(cachedData);
																			$cascadeTarget
																					.select2(options)
																		} else {
																			var url = $select2
																					.attr("data-cascade-url");
																			var pvalue = val;
																			var pname = $select2
																					.attr("name");
																			var property = $select2
																					.attr("data-cascade-property");
																			if (property) {
																				var $selectoption = $select2
																						.find("option[value='"
																								+ val
																								+ "']");
																				pname = property;
																				pvalue = $selectoption
																						.attr("data-"
																								+ property)
																			}
																			url = Util
																					.AddOrReplaceUrlParameter(
																							url,
																							pname,
																							pvalue);
																			$cascadeTarget
																					.ajaxJsonUrl(
																							url,
																							function(
																									response) {
																								var arr = [];
																								arr
																										.push("<option value=''></option>");
																								for ( var key in response) {
																									arr
																											.push("<option value='"
																													+ key
																													+ "'>"
																													+ response[key]
																													+ "</option>")
																								}
																								cachedData = arr
																										.join("");
																								$cascadeTarget
																										.append(cachedData);
																								$cascadeTarget
																										.select2(options);
																								$cascadeTarget
																										.data(
																												val,
																												cachedData)
																							})
																		}
																	}
																}
															}
														})
									}
									var $container = $select2.parent(
											".controls").children(
											".select2-container");
									if (!$container.hasClass("form-control")) {
										$container.addClass("form-control")
									}
									if ($select2.attr("required") == "required"
											|| $select2.attr("required") == "true"
											|| $select2
													.attr("data-rule-required") == "true") {
										$select2.on("select2-close",
												function(e) {
													$select2.valid()
												})
									}
								})
			}
		},
		initSelect2Remote : function($container) {
			if (jQuery().select2) {
				$('input[data-select2-type="remote"]', $container)
						.each(
								function() {
									var $select2 = $(this);
									if ($select2.attr("select2-done")) {
										return this
									}
									$select2.attr("select2-done", true);
									var options = {
										placeholder : $select2
												.attr("data-display"),
										minimumInputLength : 1,
										ajax : {
											url : $select2.attr("data-url"),
											dataType : "json",
											data : function(term, page) {
												var data = {};
												data[$select2
														.attr("data-query")] = term;
												return data
											},
											results : function(data, page) {
												return {
													results : data.content
												}
											}
										},
										formatResult : function(item) {
											return item.display
										},
										formatSelection : function(item) {
											var val = item.id;
											var valTmpl = $select2
													.attr("data-val-tmpl");
											if (valTmpl) {
												val = $.tmpl(valTmpl, item)[0].data
											}
											$select2.val(val);
											var display = item.display;
											var displayTmpl = $select2
													.attr("data-display-tmpl");
											if (displayTmpl) {
												display = $.tmpl(displayTmpl,
														item)
											}
											return display
										}
									};
									$select2.select2(options)
								})
			}
		},
		initSelect2Tags : function($container) {
			if (jQuery().select2) {
				function splitVal(string, separator) {
					var val, i, l;
					if (string === null || string.length < 1) {
						return []
					}
					val = string.split(separator);
					for (i = 0, l = val.length; i < l; i = i + 1) {
						val[i] = $.trim(val[i])
					}
					return val
				}
				$('input[data-select2-type="tags"]', $container).each(
						function() {
							var $select2 = $(this);
							if ($select2.attr("select2-done")) {
								return this
							}
							$select2.attr("select2-done", true);
							var options = {
								tags : true,
								tokenSeparators : [ "," ],
								initSelection : function(element, callback) {
									var data = [];
									$(splitVal(element.val(), ",")).each(
											function() {
												data.push({
													id : this,
													text : this
												})
											});
									callback(data)
								},
								formatSelectionTooBig : function(limit) {
									return "最大允许个数：" + limit
								}
							};
							var tags = $select2.attr("data-tags");
							if (tags) {
								var data = [];
								$(splitVal(tags, ",")).each(function() {
									data.push(this)
								});
								options.tags = data
							} else {
								var url = $select2.attr("data-url");
								if (url) {
									options.ajax = {
										url : url,
										dataType : "json",
										data : function(term, page) {
											return {
												q : term
											}
										},
										results : function(data, page) {
											return {
												results : data
											}
										}
									};
									options.minimumInputLength = 1
								} else {
									options.tags = []
								}
							}
							var limit = $select2.attr("data-number-limit");
							if (limit) {
								options.maximumSelectionSize = limit
							}
							$select2.select2(options)
						})
			}
		},
		initDatePicker : function($container) {
			$('input[data-picker="date"]', $container)
					.each(
							function() {
								var $datapicker = $(this);
								if ($datapicker.attr("data-picker-done")) {
									return this
								}
								$datapicker.attr("data-picker-done", true);
								if ($datapicker.attr("readonly")
										|| $datapicker.attr("disabled")) {
									return
								}
								$datapicker
										.wrap('<div class="input-group"><div class="input-icon right"></div></div>');
								$datapicker
										.before('<i class="fa fa-calendar"></i>');
								var format = $datapicker.attr("data-format");
								var minViewMode = "days";
								if (format) {
									if (format == "yyyy-mm") {
										minViewMode = "months"
									} else {
										if (format == "yyyy") {
											minViewMode = "years"
										}
									}
								}
								var todayBtn = true;
								var dataTodayBtn = $datapicker
										.attr("data-today-btn");
								if (dataTodayBtn && dataTodayBtn == "false") {
									todayBtn = false
								}
								$datapicker.datepicker({
									clearBtn : true,
									autoclose : true,
									todayBtn : todayBtn,
									language : "zh-CN",
									format : format ? format : "yyyy-mm-dd",
									minViewMode : minViewMode
								}).on("hide", function(e) {
									$datapicker.valid()
								});
								$("body").removeClass("modal-open")
							})
		},
		initDateTimePicker : function($container) {
			$('input[data-picker="date-time"]', $container)
					.each(
							function() {
								var $datapicker = $(this);
								if ($datapicker.attr("data-picker-done")) {
									return this
								}
								$datapicker.attr("data-picker-done", true);
								if ($datapicker.attr("readonly")
										|| $datapicker.attr("disabled")) {
									return
								}
								var timeInput = $datapicker.attr("data-toggle");
								$datapicker
										.wrap('<div class="input-group"><div class="input-icon right"></div><div>');
								$datapicker
										.before('<i class="fa fa-calendar"></i>');
								var format = $datapicker.attr("data-format");
								$datapicker.datetimepicker({
									clearBtn : true,
									autoclose : true,
									todayBtn : true,
									language : "zh-CN",
									format : format ? format
											: "yyyy-mm-dd hh:ii",
									minuteStep : 10
								});
								$("body").removeClass("modal-open")
							})
		},
		initDateRangePicker : function($container) {
			$('input[data-picker="date-range"]', $container)
					.each(
							function() {
								var $datapicker = $(this);
								if ($datapicker.attr("data-picker-done")) {
									return this
								}
								$datapicker.attr("data-picker-done", true);
								var val = $datapicker.val();
								if (val == "") {
									var initVal = $datapicker
											.attr("data-date-init");
									if (initVal && "today" == initVal) {
										var today = moment().format(
												"YYYY-MM-DD");
										$datapicker.val(today + " ~ " + today)
									}
								}
								if ($datapicker.attr("readonly")
										|| $datapicker.attr("disabled")) {
									return
								}
								$datapicker
										.wrap('<div class="input-group" style="width:100%"><div class="input-icon right"></div><div>');
								$datapicker
										.before('<i class="fa fa-calendar"></i>');
								var options = $.fn.daterangepicker.defaults;
								var dateScope = $datapicker
										.attr("data-date-scope");
								if (dateScope) {
									if (dateScope == "afterNow") {
										options.minDate = moment();
										options.ranges = {
											"Nowadays" : [ moment(), moment() ],
											"Next week" : [ moment(),
													moment().add("days", 6) ],
											"Next month" : [ moment(),
													moment().add("days", 29) ],
											"The next quarter" : [
													moment().subtract("days",
															89), moment() ],
											"Next six months" : [ moment(),
													moment().add("days", 179) ],
											"Next year" : [ moment(),
													moment().add("days", 364) ]
										}
									} else {
										if (dateScope == "beforeNow") {
											options.maxDate = moment();
											options.ranges = {
												"Nowadays" : [ moment(), moment() ],
												"yesterday" : [
														moment().subtract(
																"days", 1),
														moment().subtract(
																"days", 1) ],
												"this month" : [
														moment().startOf(
																"month"),
														moment().endOf("month") ],
												"Kozuki" : [
														moment()
																.subtract(
																		"month",
																		1)
																.startOf(
																		"month"),
														moment().subtract(
																"month", 1)
																.endOf("month") ],
												"Last week" : [
														moment().subtract(
																"days", 6),
														moment() ],
												"Latest one month" : [
														moment().subtract(
																"days", 29),
														moment() ],
												"Most recent quarter" : [
														moment().subtract(
																"days", 89),
														moment() ],
												"Past six months" : [
														moment().subtract(
																"days", 179),
														moment() ],
												"The most recent year" : [
														moment().subtract(
																"days", 364),
														moment() ]
											}
										} else {
											alert("Undefined data-date-scope="
													+ dateScope)
										}
									}
								} else {
									options.ranges = {
										"Nowadays" : [ moment(), moment() ],
										"yesterday" : [ moment().subtract("days", 1),
												moment().subtract("days", 1) ],
										"Last week" : [
												moment().subtract("days", 6),
												moment() ],
										"Next week" : [ moment(),
												moment().add("days", 6) ],
										"Latest one month" : [
												moment().subtract("days", 29),
												moment() ],
										"Next January" : [ moment(),
												moment().add("days", 29) ],
										"Most recent quarter" : [
												moment().subtract("days", 89),
												moment() ],
										"this month" : [ moment().startOf("month"),
												moment().endOf("month") ],
										"Kozuki" : [
												moment().subtract("month", 1)
														.startOf("month"),
												moment().subtract("month", 1)
														.endOf("month") ]
									}
								}
								$datapicker.daterangepicker(options, function(
										start, end) {
									$datapicker.focus();
									var $form = $datapicker
											.closest("form.form-search-auto");
									if ($form.size() > 0) {
										$form.submit()
									}
								});
								$datapicker.off("focus");
								$("body").removeClass("modal-open")
							})
		},
		initControlLabelTooltips : function($container) {
			$(".control-label[data-tooltips]", $container).each(
					function() {
						var $el = $(this);
						if ($el.attr("data-tooltips-done")) {
							return this
						}
						$el.attr("data-tooltips-done", true);
						var $tips = $(
								'<span class="glyphicon glyphicon-exclamation-sign tooltipster" title="'
										+ $el.attr("data-tooltips")
										+ '"></span>').appendTo($el);
						var position = "top";
						if ($el.find("[data-rule-date]").length > 0) {
							position = "right"
						}
						if ($el.attr("data-tooltipster-position")) {
							position = $el.attr("data-tooltipster-position")
						}
						$tips.tooltipster({
							contentAsHTML : true,
							offsetY : 15,
							theme : "tooltipster-punk",
							position : position
						})
					})
		},
		initTextareaMaxlength : function($container) {
			$("textarea[maxlength]", $container).each(function() {
				var $el = $(this);
				if ($el.attr("data-maxlength-done")) {
					return this
				}
				$el.attr("data-maxlength-done", true);
				$el.maxlength({
					limitReachedClass : "label label-danger",
					alwaysShow : true
				})
			})
		},
		initTextareaHtmleditor : function($container) {
			$("textarea[data-htmleditor='kindeditor']", $container).each(
					function() {
						var $kindeditor = $(this);
						if ($kindeditor.attr("data-htmleditor-done")) {
							return this
						}
						$kindeditor.attr("data-htmleditor-done", true);
						var height = $kindeditor.attr("data-height");
						if (height == undefined) {
							height = "500px"
						}
						KindEditor.create($kindeditor, {
							allowFileManager : false,
							width : "100%",
							height : height,
							minWidth : "200px",
							minHeight : "60px",
							afterBlur : function() {
								this.sync()
							}
						})
					})
		},
		initUploadImage : function($container) {
			$('input[data-upload="image"]', $container)
					.each(
							function() {
								var $el = $(this);
								if ($el.attr("data-upload-done")) {
									return this
								}
								$el.attr("data-upload-done", true);
								if ($el.attr("id") == undefined) {
									$el.attr("id", "image_id_"
											+ new Date().getTime())
								}
								var options = {
									"vertical-align" : "top",
									"max-width" : "200px",
									"max-height" : "200px"
								};
								if ($el.attr("data-max-width")) {
									options["max-width"] = $el
											.attr("data-max-width");
									if (!Util.endWith(options["max-width"],
											"px")
											&& !Util.endWith(
													options["max-width"], "%")) {
										options["max-width"] = options["max-width"]
												+ "px"
									}
								}
								if ($el.attr("data-max-height")) {
									options["max-height"] = $el
											.attr("data-max-height");
									if (!Util.endWith(options["max-height"],
											"px")
											&& !Util.endWith(
													options["max-height"], "%")) {
										options["max-height"] = options["max-height"]
												+ "px"
									}
								}
								if (Global.isIELowerVersion()) {
									var $trigger = $(
											'<a  href="javascript:;"></a>')
											.insertAfter($el);
									var src = $el.val();
									if (src != "") {
										if (READ_FILE_URL_PREFIX) {
											src = READ_FILE_URL_PREFIX + src
										}
										$img = $(
												'<img class="image-display" data-to="'
														+ $el.attr("name")
														+ '"  src="' + src
														+ '">').appendTo(
												$trigger);
										$img.css(options);
										$img.css({
											"margin-left" : "90px"
										})
									}
									$trigger.children("img").css(options);
									var $file = $('<input  type="file" name="fileUpload"  />');
									$file
											.attr("style",
													"position:absolute;left:0;top:0;width:85px;height:34px;z-index:999;");
									$file.appendTo($trigger);
									var url = $el.attr("data-url");
									if (url == undefined) {
										url = WEB_ROOT
												+ "/w/file/upload/single"
									}
									var dataZoomoutTo = $el
											.attr("data-zoomout-to");
									if (dataZoomoutTo > 0) {
										url += "?data-zoomout-to="
												+ dataZoomoutTo
									}
									$file
											.on(
													"change",
													function() {
														$file
																.wrap('<form  enctype="multipart/form-data" method="post"></form>');
														var $form = $file
																.parent("form");
														$form.attr("action",
																url);
														var $b = $el.parent();
														App.blockUI($b);
														$form
																.ajaxSubmit({
																	dataType : "html",
																	method : "post",
																	success : function(
																			response) {
																		$file
																				.unwrap();
																		response = jQuery
																				.parseJSON(response);
																		if (response.type == "success") {
																			var src = response.data;
																			$el
																					.val(src);
																			var $form = $el
																					.closest("form");
																			$form
																					.data(
																							"validator")
																					.element(
																							$el);
																			var $img = $el
																					.closest(
																							".form-group")
																					.find(
																							"img.image-display");
																			if ($img
																					.size() == 0) {
																				$img = $(
																						'<img class="image-display" >')
																						.appendTo(
																								$trigger);
																				$img
																						.css(options);
																				$img
																						.css({
																							"margin-left" : "90px"
																						})
																			}
																			if (READ_FILE_URL_PREFIX) {
																				src = READ_FILE_URL_PREFIX
																						+ src
																			}
																			$img
																					.attr(
																							"src",
																							src);
																			var dataGridReload = $el
																					.attr("data-grid-reload");
																			if (dataGridReload) {
																				$(
																						dataGridReload)
																						.jqGrid(
																								"setGridParam",
																								{
																									datatype : "json"
																								})
																						.trigger(
																								"reloadGrid")
																			}
																			App
																					.unblockUI($b)
																		} else {
																			Global
																					.notify(
																							"error",
																							response.message);
																			App
																					.unblockUI($b)
																		}
																	},
																	error : function(
																			xhr,
																			e,
																			status) {
																		Global
																				.notify(
																						"error",
																						"File upload handling exceptions , please contact your administrator");
																		App
																				.unblockUI($b)
																	}
																});
														return false
													})
								} else {
									var src = $el.val();
									if (src == "") {
										src = WEB_ROOT
												+ "/assets/w/app/images/upload.jpg"
									} else {
										if (READ_FILE_URL_PREFIX) {
											src = READ_FILE_URL_PREFIX + src
										}
									}
									var $trigger = $(
											'<a  href="javascript:;"><img class="image-display" data-to="'
													+ $el.attr("name")
													+ '" src="' + src
													+ '"></a>')
											.insertAfter($el);
									$trigger.children("img").css(options);
									$trigger.click(function() {
										Global.triggerSingleFileUpload($el)
									})
								}
							})
		},
		initImagePreivew : function($container) {
			$("img[data-toggle='preview']", $container).each(
					function() {
						var $el = $(this);
						$el.mouseenter(function(e) {
							this.t = this.title;
							this.title = "";
							var c = (this.t != "") ? "<br/>" + this.t : "";
							var $preview = $("#image-preview");
							if ($preview.size() == 0) {
								var maxWidth = $(window).width() - 200;
								$preview = $(
										"<p id='image-preview'><img src='"
												+ this.src
												+ "' alt='Image preview'/>" + c
												+ "</p>").appendTo($("body"));
								$preview.css("top", "10px").css("left", "10px")
							} else {
								$preview.children("img").attr("src", this.src)
							}
							$preview.fadeIn("fast")
						})
					})
		},
		initSlimscroll : function($container) {
			$("[data-toggle='slimscroll']", $container).each(function() {
				var $el = $(this);
				var options = $.extend({
					alwaysVisible : true,
					height : "500px"
				}, $el.data());
				if (!options.height.match(/\%|px/gi)) {
					options.height += "px"
				}
				$el.slimScroll(options)
			})
		},
		initNavbar : function($container) {
			$(".navigator", $container).each(
					function() {
						var $el = $(this);
						var navs = {
							"Application" : [ "Application Agent ", " verification ", " part-time signing of the agreement ", " fill in the information ", " Submit Success " ],
							"Check" : [ "Query review progress ", " audit results " , "Sign crayon staging " , "contract ",
							            " Download Promotion APP", " attention crayon staging " ]
						};
						var htm = '<span class="active">Home</span>';var steps=("Check"!==$el.data("path"))?navs["Application"]:navs["Check"];var current=$el.data("location")||steps[0];var css=' class="active"';for(var i in steps){htm+='<span class="divider">&gt;</span><span'+css+">"+steps[i]+"</span>";if(current==steps[i]){css=""}if(current=="Query review progress"||current=="Audit results"){break}}$el.html(htm)})},initAjaxBeforeShow:function($container){if($container==undefined){$container=$("body")}if($.fn.bootstrapSwitch){$(".make-switch:not(.has-switch)")["bootstrapSwitch"]()}Page.initDynamicTable($container);Page.initDropdownSelect($container);Page.initMultiSelectDouble($container);Page.initSelect2Remote($container);Page.initSelect2Tags($container);Page.initSelect2($container);Page.initDatePicker($container);Page.initDateTimePicker($container);Page.initDateRangePicker($container);Page.initControlLabelTooltips($container);Page.initTextareaMaxlength($container);Page.initTextareaHtmleditor($container);Page.initUploadImage($container);Page.initImagePreivew($container);Page.initSlimscroll($container);Page.initNavbar($container);$("form.form-search-auto label.btn",$container).on("click",function(){var $form=$(this).closest("form.form-search-auto");setTimeout(function(){$form.submit()},100)});$("form.form-search-auto select",$container).on("change",function(){var $form=$(this).closest("form.form-search-auto");setTimeout(function(){$form.submit()},100)});$("table.table-sorting",$container).each(function(){var $sortingTable=$(this);var $container=$sortingTable.closest(".ajax-get-container");var url=$container.attr("data-url");var sortName=Util.getParameterFromUrl(url,"sidx");if(sortName&&sortName!=""){var $highlightTh=$sortingTable.find("th[data-sorting-name='"+sortName+"']");var sortDirection=Util.getParameterFromUrl(url,"sord");if(sortDirection=="asc"){$highlightTh.removeClass("sorting");$highlightTh.addClass("sorting_asc")}else{if(sortDirection=="desc"){$highlightTh.removeClass("sorting");$highlightTh.addClass("sorting_desc")}else{}}}$sortingTable.on("click","th[data-sorting-name]",function(){var $th=$(this);var $container=$sortingTable.find("> tbody.ajax-get-container");if($container.size()==0){$container=$sortingTable.closest(".ajax-get-container")}var url=$container.attr("data-url");var desc=false;if($th.hasClass("sorting")){$th.removeClass("sorting");$th.addClass("sorting_asc");desc="asc"}else{if($th.hasClass("sorting_asc")){$th.removeClass("sorting_asc");$th.addClass("sorting_desc");desc="desc"}else{$th.removeClass("sorting_desc");$th.addClass("sorting")}}url=Util.AddOrReplaceUrlParameter(url,"sidx",desc?$th.attr("data-sorting-name"):"");url=Util.AddOrReplaceUrlParameter(url,"sord",desc);$sortingTable.removeAttr("data-scroll-loading").removeAttr("data-scroll-page");$container.ajaxGetUrl(url)})});$('.nav > li > a[href="#tab-auto"]',$container).each(function(){var $link=$(this);var $nav=$link.closest(".nav");var idx=$nav.find("li:not(.tools)").index($link.parent("li"));var $tabPane=$nav.parent().children(".tab-content").find("div.tab-pane").eq(idx);var tabid="__tab-"+new Date().getTime()+idx;$tabPane.attr("id",tabid);$link.attr("href","#"+tabid)});$(".page-container .nav",$container).each(function(){var $nav=$(this);$nav.find("> li.active:first > a").click()});$("input.knob",$container).each(function(){$(this).knob({dynamicDraw:true,thickness:0.2,tickColorizeValues:true,skin:"tron",readOnly:true})})},initAjaxAfterShow:function($container){if($container==undefined){$container=$("body")}var $navTabs=$(".nav-tabs",$container);if($navTabs.size()>0){var active=null;var $lis=$navTabs.children("li:not(.tools):not(.dropdown)");var $actived=$lis.filter(".active");if($actived.size()>0){active=$lis.index($actived)}if(active==null||active==-1){var active=$navTabs.attr("data-active");if(active&&active!=""){active=Number(active)}else{active=0}}$lis.filter(":eq("+active+")").find("> a").click()}$("button:not([type])",$container).each(function(){$(this).attr("type","button")});$('div[data-toggle="ajaxify"]',$container).each(function(){$(this).ajaxGetUrl($(this).attr("data-url"))})},doSomeStuff:function(){myFunc()}}}();