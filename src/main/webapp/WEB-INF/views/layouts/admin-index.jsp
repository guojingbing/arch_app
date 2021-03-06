<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" class="no-js">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
<meta charset="utf-8" />
<title>${applicationScope.cfg.cfg_system_title}Management Platform</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1.0" name="viewport" />
<meta content="" name="description" />
<meta content="" name="author" />
<meta name="MobileOptimized" content="320">

<%@include file="/WEB-INF/views/layouts/admin-include-header.jsp"%>
<script type="text/javascript">
    var DASHBOARD_URI = "/admin/dashboard";
</script>

<sitemesh:write property='head' />
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="page-header-fixed">
	<!-- BEGIN HEADER -->
	<div class="header navbar navbar-inverse navbar-fixed-top">
		<!-- BEGIN TOP NAVIGATION BAR -->
		<div class="header-inner">
			<!-- BEGIN LOGO -->
			<a class="navbar-brand" href="${ctx}/admin" style="width: 500px; padding-top: 12px; padding-left: 10px"><font
				color="white" size="+2">${applicationScope.cfg.cfg_system_title} Management Platform</font></a>
			<!-- END LOGO -->
			<!-- BEGIN RESPONSIVE MENU TOGGLER -->
			<a href="javascript:;" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"> <img
				src="${ctx}/assets/admin/img/menu-toggler.png" alt="" />
			</a>
			<!-- END RESPONSIVE MENU TOGGLER -->
			<!-- BEGIN TOP NAVIGATION MENU -->
			<ul class="nav navbar-nav pull-right">
				<!-- BEGIN NOTIFICATION DROPDOWN -->
				<li class="dropdown hide"><a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
					data-close-others="true"> <i class="fa fa-warning"></i> <span class="badge"> 0 </span>
				</a>
					<ul class="dropdown-menu extended notification">
						<li>
							<p>You have 14 new notifications</p>
						</li>
						<li>
							<ul class="dropdown-menu-list scroller">
								<li><a href="#"> <span class="label label-sm label-icon label-success"> <i class="fa fa-plus"></i>
									</span> New user registered. <span class="time"> Just now </span>
								</a></li>
								<li><a href="#"> <span class="label label-sm label-icon label-danger"> <i class="fa fa-bolt"></i>
									</span> Server #12 overloaded. <span class="time"> 15 mins </span>
								</a></li>
								<li><a href="#"> <span class="label label-sm label-icon label-warning"> <i class="fa fa-bell-o"></i>
									</span> Server #2 not responding. <span class="time"> 22 mins </span>
								</a></li>
							</ul>
						</li>
						<li class="external"><a href="#">See all notifications <i class="m-icon-swapright"></i></a></li>
					</ul></li>
				<!-- END NOTIFICATION DROPDOWN -->

				<!-- BEGIN NOTIFICATION DROPDOWN -->
				<li class="dropdown" id="header_notification_bar">
				<a href="javascript:;" class="dropdown-toggle"
					data-toggle="dropdown" data-hover="dropdown" data-close-others="true"
					rel="address:/admin/profile/notify-message|Announcement List"> <i class="fa fa-bullhorn"></i> <span class="badge"
						style="display: none"></span>
				</a>
					<ul class="dropdown-menu extended notification">
						<li class="message-info"></li>
					</ul></li>
				<!-- END NOTIFICATION DROPDOWN -->

				<!-- BEGIN INBOX DROPDOWN -->
				<li class="dropdown" id="header_inbox_bar"><a href="javascript:;" class="dropdown-toggle"
					data-toggle="dropdown" data-hover="dropdown" data-close-others="true"
					rel="address:/admin/profile/user-message|Personal message list"> <i class="fa fa-envelope"></i> <span class="badge"
						style="display: none"></span>
				</a>
					<ul class="dropdown-menu extended inbox">
						<li class="message-info"></li>
					</ul></li>
				<!-- END INBOX DROPDOWN -->

				<!-- BEGIN USER LOGIN DROPDOWN -->
				<li class="dropdown user" style="padding-top: 5px; margin-right: 25px"><a href="javascripts:;"
					rel="address:/admin/profile/edit|Personal configuration" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
					data-close-others="true"><span class="username"><shiro:principal property="nickName" />(<shiro:principal
								property="authUid" />)</span> <i class="fa fa-angle-down"></i> </a>
					<ul class="dropdown-menu">
						<li><a href="javascript:;" id="trigger_fullscreen"><i class="fa fa-move"></i> full-screen display</a></li>
						<li><a href="${ctx}/admin/profile/password" data-toggle="modal-ajaxify" data-modal-size="600px" title="change Password"><i
								class="fa fa-key"></i> change Password</a></li>
						<li class="divider"></li>
						<li><a id="a-logout" href="javascript:;"><i class="fa fa-sign-out"></i>logout</a></li>
					</ul></li>
				<!-- END USER LOGIN DROPDOWN -->
			</ul>
			<!-- END TOP NAVIGATION MENU -->
		</div>
		<!-- END TOP NAVIGATION BAR -->

		<!-- BEGIN STYLE CUSTOMIZER -->
		<div class="theme-panel hidden-xs hidden-sm" style="margin-top: -3px; position: absolute; right: 0px">
			<div class="toggler"></div>
			<div class="toggler-close"></div>
			<div class="theme-options">
				<div class="theme-option theme-colors clearfix">
					<span>Color Style</span>
					<ul>
						<li class="color-black current color-default" data-style="default"></li>
						<li class="color-blue" data-style="blue"></li>
						<li class="color-brown" data-style="brown"></li>
						<li class="color-purple" data-style="purple"></li>
						<li class="color-grey" data-style="grey"></li>
						<li class="color-white color-light" data-style="light"></li>
					</ul>
				</div>
				<div class="theme-option">
					<span>Page Layout</span> <select class="layout-option form-control input-small"
						data-selected="${layoutAttributes['_layout_page']}">
						<option value="fluid" selected="selected">Spread</option>
						<option value="boxed">shrink</option>
					</select>
				</div>
				<div class="theme-option">
					<span>Page header</span> <select class="header-option form-control input-small"
						data-selected="${layoutAttributes['_layout_header']}">
						
						<Option value = "fixed"> Fixed </option>
						<Option value = "default" selected = "selected"> Auto </option>
					</select>
				</div>
				<div class="theme-option">
					<span>Bottom of the page</span> <select class="footer-option form-control input-small"
						data-selected="${layoutAttributes['_layout_footer']}">
						
						<Option value = "fixed"> Fixed </option>
						<Option value = "default" selected = "selected"> Auto </option>
					</select>
				</div>
				<div class="theme-option">
					<span>Right menu</span> <select class="context-menu-option form-control input-small"
						data-selected="${layoutAttributes['_layout_context_menu']}">
						
						<Option value = "enable" selected = "selected"> Enable </option>
						<Option value = "disable"> Disable </option>
					</select>
				</div>
				<div class="theme-option">
					<span>Table layout</span> <select class="grid-shrink-option form-control input-small"
						data-selected="${layoutAttributes['_layout_grid_shrink']}">
						
							<Option value = "auto"> Auto </option>
							<Option value = "true" selected = "selected"> shrink </option>
					</select>
				</div>
			</div>
		</div>
		<!-- END BEGIN STYLE CUSTOMIZER -->

	</div>
	<!-- END HEADER -->
	<div class="clearfix"></div>
	<!-- BEGIN CONTAINER -->
	<div class="page-container">
		<!-- BEGIN SIDEBAR -->
		<div class="page-sidebar-wrapper">
			<div class="page-sidebar navbar-collapse collapse collapse">
				<!-- BEGIN SIDEBAR MENU -->
				<ul class="page-sidebar-menu">
					<li>
						<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
						<div class="sidebar-toggler hidden-phone" style="margin-top: 5px; margin-bottom: 5px"></div> <!-- BEGIN SIDEBAR TOGGLER BUTTON -->
					</li>
					<li>
						<!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->
						<div class="sidebar-search">
							<div class="form-container">
								<div class="input-box">
									<a href="javascript:;" class="remove"></a> <input type="text" name="search" placeholder="Quick Search Filter menu item ..." value=""
										title="Enter the name of the menu to try first letter of alphabet" /> <input type="button" class="submit" value=" " />
								</div>
							</div>
						</div> <!-- END RESPONSIVE QUICK SEARCH FORM -->
					</li>
				</ul>
				<!-- END SIDEBAR MENU -->
			</div>
		</div>
		<!-- END SIDEBAR -->

		<!-- BEGIN CONTENT -->
		<div class="page-content-wrapper">
			<div class="page-content">
				<div class="row" style="margin-left: 0px; margin-right: 0px">
					<div class="col-md-12" style="padding-left: 0px; padding-right: 0px">
						<ul class="page-breadcrumb breadcrumb" id="layout-nav" style="margin-top: 0px; margin-bottom: 5px;">
							<li class="btn-group" style="right: 0px;">
								<button data-close-others="true" data-delay="1000" data-toggle="dropdown" class="btn default dropdown-toggle"
									type="button">
									<span><i class="fa fa-reorder"></i> Access List</span> <i class="fa fa-angle-down"></i>
								</button>
								<ul role="menu" class="dropdown-menu">
								</ul>
								<button class="btn default btn-close-active" type="button">
									<i class="fa fa-times"></i>
								</button>
							</li>
							<li><a class="btn-dashboard" href="#/dashboard"><i class="fa fa-home"></i> Home </a></li>
						</ul>
						<div class="tab-content">
							<div id="tab_content_dashboard"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- BEGIN CONTENT -->
	</div>
	<!-- END CONTAINER -->

	<!-- BEGIN FOOTER -->
	<div class="footer">
		<div class="footer-inner">
			&copy; S2JH4Net 2014
			<c:if test="${cfg.dev_mode}">
				<span>V${buildVersion} [${buildTimetamp}]</span>
			</c:if>
		</div>
		<div class="footer-tools">
			<span class="go-top"> <i class="fa fa-angle-up"></i>
			</span>
		</div>

		<div class="hide">
			<form class="form-horizontal" id="singleFileUploadForm" enctype="multipart/form-data" method="post">
				<input type="file" name="fileUpload" />
				<button type="submit" class="btn">submit</button>
			</form>
		</div>

		<!-- BEGIN FileUpload FORM -->
		<div class="modal fade" id="fileupload-dialog" tabindex="-1" role="basic" aria-hidden="true">
			<div class="modal-dialog modal-wide">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
						<h4 class="modal-title">File Upload</h4>
					</div>
					<div class="modal-body">
						<form id="fileupload" enctype="multipart/form-data" method="POST">
							<input type="hidden" name="attachmentName" value="attachments" />
							<div class="row fileupload-buttonbar">
								<div class="col-lg-7">
									<!-- The fileinput-button span is used to style the file input field as button -->
									<span class="btn green fileinput-button"> <i class="fa fa-plus"></i> <span>add files...</span> <input
										type="file" multiple="" name="files">
									</span>
									<button class="btn blue start" type="submit">
										<i class="fa fa-upload"></i> <span>Start upload</span>
									</button>
									<button class="btn yellow cancel" type="reset">
										<i class="fa fa-ban"></i> <span>Cancel upload</span>
									</button>
									<!-- The loading indicator is shown during file processing -->
									<span class="fileupload-loading"></span>
								</div>
								<!-- The global progress information -->
								<div class="col-lg-5 fileupload-progress fade">
									<!-- The global progress bar -->
									<div aria-valuemax="100" aria-valuemin="0" role="progressbar" class="progress progress-striped active">
										<div style="width: 0%;" class="progress-bar progress-bar-success"></div>
									</div>
									<!-- The extended global progress information -->
									<div class="progress-extended">&nbsp;</div>
								</div>
							</div>
							<table class="table table-striped clearfix" role="presentation">
								<tbody class="files"></tbody>
							</table>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn default" data-dismiss="modal">cancel</button>
						<button type="submit" class="btn blue btn-add">Add to</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal-dialog -->
		</div>
		<!-- END FileUpload FORM -->

		<button type="button" class="btn " id="btn-profile-param" title="Click favorite memory elements of the current form data" style="display: none">
			<i class="fa fa-heart-o"></i>
		</button>
	</div>
	<!-- END FOOTER -->


	<%@include file="/WEB-INF/views/layouts/admin-include-footer.jsp"%>
</body>
<!-- END BODY -->
</html>