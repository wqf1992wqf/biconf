define(['jquery'], function ($) {
	var id;  // 弹出框id
	var state;  // 状态
	var callback;  //确定按钮回调
	// 延迟
	var wait = function(callback){
　　　　var tasks = function(){
			callback();
　　　　};
　　　　setTimeout(tasks,200);
　　};
	// 显示窗口
	var openWindow = function (id) {
		$('body').addClass('modal-open');
		$("<div class='modal-backdrop fade'></div>").appendTo('body');
		$('#'+id).css('display','block');
		wait(function () {
			$('.modal-backdrop').addClass("in");
			$('#'+id).addClass('in');
		});
	}
	// 取消关闭窗口
	var closeWindow = function (id) {
		$("#"+id+" .cancel").click(function () {
			$('.modal-backdrop').removeClass('in');
			$('body').removeClass('modal-open');
			$('#'+id).removeClass('in');
			wait(function () {
				$('#'+id).css('display','none');
				$('.modal-backdrop').remove();
			});
		})
	}
	// 点击确定动画效果
	var confirmInit = function (id) {
		$("#"+id+" .confirm").click(function () {
			$('.modal-backdrop').removeClass('in');
			$('body').removeClass('modal-open');
			$('#'+id).removeClass('in');
			wait(function () {
				$('#'+id).css('display','none');
				$('.modal-backdrop').remove();
			});
			console.log(confirmCallback1)
			console.log(state)
			confirmCallback1(state);
		})
	}
	// 点击确定回调
	var confirmCallback = function (callback) {
		state = state1;
		callback = callback;
	}
	// 初始化
	var init = function (id) {
		id = id;
		closeWindow(id);
		confirmInit(id);
	}
	// return {
	// 	init: init,
	// 	openWindow:openWindow,
	// 	confirm: confirmCallback
	// }


	var WrapWinow = function (id) {
		this.id = id;  // 弹出框id
		this.callback = null;  //确定按钮回调
		this.init();
	}
	WrapWinow.prototype = {
		wait: function(callback) {
	　　　　var tasks = function(){
				callback();
	　　　　};
	　　　　setTimeout(tasks,200);
	　　},
		openWindow: function () {
			var id = this.id;
			$('body').addClass('modal-open');
			$("<div class='modal-backdrop fade'></div>").appendTo('body');
			$('#'+id).css('display','block');
			wait(function () {
				$('.modal-backdrop').addClass("in");
				$('#'+id).addClass('in');
			});
		},
		closeWindow: function () {
			var id = this.id;
			var _this = this;
			$("#"+id+" .cancel").click(function () {
				$('.modal-backdrop').removeClass('in');
				$('body').removeClass('modal-open');
				$('#'+id).removeClass('in');
				_this.wait(function () {
					$('#'+id).css('display','none');
					$('.modal-backdrop').remove();
				});
			})
		},
		confirmInit: function () {
			var id = this.id;
			var _this = this;
			$("#"+id+" .confirm").click(function () {
				$('.modal-backdrop').removeClass('in');
				$('body').removeClass('modal-open');
				$('#'+id).removeClass('in');
				wait(function () {
					$('#'+id).css('display','none');
					$('.modal-backdrop').remove();
				});
				_this.callback();
			})
		},
		confirmCallback: function (callback) {
			this.callback = callback;
		},
		init: function (id) {
			this.closeWindow();
			this.confirmInit();
		}
	}
	return WrapWinow;
})
