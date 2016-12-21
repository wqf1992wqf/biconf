/* 单图配置列表组件 */

define(['jquery'], function ($) {
	$(function () {
		$('.list-modal .head-main').click(function () {
			$(this).parents('.list-modal').find('.content').slideToggle('fast');
		})
		$('.sc-cmain .silde-icon').click(function () {
			if ($(this).parents('.sc-cmain').hasClass('out')) {
				$(this).parents('.sc-cmain').removeClass('out').addClass('in');
			} else if ($(this).parents('.sc-cmain').hasClass('in')) {
				$(this).parents('.sc-cmain').removeClass('in').addClass('out');
			}
		})
		$('.menu-item-list').on('click','li',function () {
			$(this).parents('.sc-cmain').removeClass('out').addClass('in');
		})
	})
})