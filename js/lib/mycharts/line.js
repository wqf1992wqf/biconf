define(['jquery','echarts'], function ($, echarts) {
	function LineChart(id) {
		this.myCharts = echarts.init(document.getElementById(id));
		this.option = {
			title: {show:false},
			legend: {data:[],left: 'center',top: 10},
			grid: {containLabel: true,left:10,right:10,top:10,bottom:10},
			xAxis: [],
			yAxis: [],
			series: [],
			dataZoom: []
		}
	}
	LineChart.prototype = {
		/* 通用组件判断 */
		popularCheck: function (option) {
			var _this = this;
			this.option.legend.data = option.legend || '';
		},
		/* 提示框组件配置 */
		tooltipFunc: function (params, ticket, callback,optionIndex) {
	        var dateVal = this.formatShowDate(params[0].name);
	        var curOption = option_day;
	        var index_current=getIndexByName(curOption.xAxis[0].data,params[0].name);

	        var result='<table class="table-center">';
	        result+='<tr><td>'+dateVal+'</td><td>';
	        var isStatDay = isDay();
	        if(isStatDay)
	            result += getWeekDay(dateVal);
	        result += '</td><td>占比</td>';
	        if(isStatDay)
	            result +="<td>日环比</td><td>周同比</td>";
	        else if(isWeek())
	            result += "<td>周环比</td>";
	         else if(isMonth())
	            result += "<td>月环比</td>";
	        result += '</tr>';

	        var total=0;

	        $(params).each(function(index,para){
	            total += parseFloat(para.data);
	        });

	        $(params).each(function(index,para){
	            var s=((para.data/total)*100).toFixed(2);
	            result+='<tr><td>'+para.seriesName+'</td><td>'+zrnumber.addCommas(para.data)+'</td><td>'+s+'%</td>';

	            var seriesIndex = para.seriesIndex;
	            var day_td="<td>--</td>";
	            //日周月 环比(前一日周月)
	            if(index_current-1>=0){
	                var data_yesday = null;

	                data_yesday= curOption.series[seriesIndex].data[index_current-1];

	                if(data_yesday != null){
	                    var s=(((para.data/data_yesday)-1)*100).toFixed(2);
	                    if(s>0){
	                        day_td='<td style="color: orangered;">'+s+'%&#8593</td>';
	                    }else{
	                        day_td='<td style="color: greenyellow;">'+s+'%&#8595</td>';
	                    }
	                }
	            }
	            result += day_td;
	            //周同比(日)
	            if(isStatDay){
	                var week_td='<td>--</td>';
	                if(index_current-7>=0){
	                    data_week= curOption.series[seriesIndex].data[index_current-7];
	                    var s=(((para.data/data_week)-1)*100).toFixed(2);
	                    if(s>0){
	                        week_td='<td style="color: orangered;">'+s+'%&#8593</td>';
	                    }else{
	                        week_td='<td style="color: greenyellow;">'+s+'%&#8595</td>';
	                    }
	                }
	                result += week_td;
	            }
	            result += '</tr>';
	        });
	        result+='</table>';
	        return result;
	    },
	    formatShowDate: function (yyyymmdd) {
	        var dateGrp = $('#cityProOption').attr('dateGrp');
	        if('stat_date'==dateGrp){
	            return yyyymmdd;
	        }else if('week_begin'==dateGrp){
	            return yyyymmdd;
	        }else if('month_num'==dateGrp){
	            return yyyymmdd.substr(0,4)+"年"+yyyymmdd.substr(4,2)+"月";
	        }
	    },
	    isDay: function () {
	        var dateGrp = $('#cityProOption').attr('dateGrp');
	        if('stat_date'==dateGrp){
	            return true;
	        }
	        return false;
	    },
	    isWeek: function () {
	        var dateGrp = $('#cityProOption').attr('dateGrp');
	        if('week_begin'==dateGrp){
	            return true;
	        }
	        return false;
	    },
	    isMonth: function () {
	        var dateGrp = $('#cityProOption').attr('dateGrp');
	        if('month_num'==dateGrp){
	            return true;
	        }
	        return false;
	    },
		randerLineChart: function (option) {
			var _this = this;
			this.option = {  // 清空初始化
				title: {show:false},
				legend: {data:[],left: 'center',top: 10},
				grid: {containLabel: true,left:10,right:10},
				xAxis: [],
				yAxis: [],
				series: [],
				dataZoom: []
			}
			this.popularCheck(option)  // 通用组件配置
			// 配置x轴
			for (var i = 0; i < option.xAxis.length; i++) {
				var xobj = {};
				xobj.type = option.xAxis[i].type || 'category';
				xobj.data = option.xAxis[i].data;
				xobj.boundaryGap = false;
				this.option.xAxis.push(xobj);
			}
			// 配置y轴
			for (var i = 0; i < option.yAxis.length; i++) {
				var yobj = {};
				yobj.type = option.yAxis[i].type || 'value';
				if (option.yAxis[i].type == 'category') {
					yobj.data = option.yAxis[i].data;
				}
				this.option.yAxis.push(yobj);
			}
			// 配置series轴
			for (var i = 0; i < option.series.length; i++) {
				var sobj = {};
				sobj.type = 'line';
				sobj.data = option.series[i].data;
				if (option.legend) {
					sobj.name = option.legend[i];
				}
				if (option.series[i].smooth) {  // 是否显示曲线
					sobj.smooth = option.series[i].smooth;
				}
				if (option.series[i].areaStyle) {
					sobj.areaStyle = {normal:{}};  // 是否显示面积图
				}
				if (option.series[i].stack==true) { // 是否堆积显示
					sobj.stack = '堆积';
				}
				this.option.series.push(sobj);
			}
			// 配置dataZoom组件
			if (option.dataZoom) {
				_this.option.dataZoom=[{
					type: 'slider',
					show: true,
		            realtime: true,
		            start: 0,
		            end: 40,
				}]
			}
			// console.log(_this.option)
			this.myCharts.clear();
			this.myCharts.setOption(_this.option);
		},
		chartResize: function () {
			this.myCharts.resize();
		}
	}
	return LineChart;
})