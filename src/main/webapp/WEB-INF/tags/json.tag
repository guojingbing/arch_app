<%@tag pageEncoding="UTF-8"%><%@ attribute name="value"
	type="java.lang.Object" required="true"%>
<%
	out.print(lab.s2jh.core.util.JsonUtils.writeValueAsString(value));
%>