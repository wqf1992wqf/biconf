/* 配置页面 */
define(['jquery'], function ($) {
	return function () {
		$(".navigator-bar-top .navigator-bar-btn").click(function () {
			$(".navigator-bar-top .navigator-bar-btn").removeClass("active");
			$(this).addClass('active');
		})
	}
})