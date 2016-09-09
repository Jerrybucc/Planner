$(function() {
	var fontSize;
	$("#small_btn").click(function() {
		fontSize = 10;
	});
	$("#middle_btn").click(function() {
		fontSize = 15;
	});
	$("#large_btn").click(function() {
		fontSize = 20;
	});
	$("#startDate").val(new Date().toJSON().slice(0, 10));
	$("#create").click(function create() {
		var tagName = $("#tagName").val();
		var startDate = $("#startDate").val();
		var listPerDay = $("#listPerDay").val() - 0;
		var total = $("#total").val() - 0;
		var weekday = new Date(startDate).getDay();
		var firstLineSunday = new Date(new Date(startDate) - weekday * 86400000);
		var table = $("#table").empty();
		var isNum = new RegExp("^(0|[1-9][0-9]*)$");
		$("#startPage").val(1);

		$("#output").css("font-size", fontSize);
		$("#week tr").empty();
		$("#week tr").append("<td>Sun</td><td>Mon</td><td>Tue</td><td>Wed</td><td>Thr</td><td>Fri</td><td>Sat</td>");
		$("h1").text($("#planName").val())
		//exceptions

		if (listPerDay <= 0) {
			alert("You need learn at least 1 section of your book!");
			return false;
		}
		if (listPerDay > total) {
			alert("You can't learn sections out of the range of your book!");
			return false;
		}
		if (parseInt(listPerDay) != listPerDay || parseInt(total) != total) {
			alert("Your Sections should be Integer");
			return false;
		}
		if (isNum.test(tagName)) {
			if (confirm("To make the table neat and clean, You probably don\'t use number as your tag name.\nAre you sure You still want to use " + tagName + " as your tag name?")) {
				tagName = $("#tagName").val();
			} else {
				return false;
			}
		}

		//exceptions
		for (var i = 0; i < 7; i++) {
			currentDay = new Date(firstLineSunday - 0 + i * 86400000);
			if (i == 0) $("#table").append("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
			$("table tr td").slice(i, i + 1).append("<br/>" + (currentDay.getMonth() - 0 + 1) + "/" + currentDay.getDate());
			if (i == 6) break;
		};

		for (var i = 7, x = 0, l = total / listPerDay + 25 + weekday; i < l; i++) {
			currentDay = new Date(firstLineSunday - 0 + i * 86400000);
			if (i % 7 == 0) $("#table").append("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
			$("#table tr td").slice(x, x + 1).append((currentDay.getMonth() - 0 + 1) + "/" + currentDay.getDate());
			x++;
		};


		var planName = [];
		for (var i = 0, l = total / listPerDay; i < l; i++) {
			tmp = [];
			for (var j = 1; j <= listPerDay; j++) {
				k = i * listPerDay + j;
				if (k > total) break;
				tmp.push(k);
			};
			if (tmp.length == 1) {
				str = tmp[0] + parseInt($("#startPage").val()) - 1;
			} else {
				str = (tmp.shift() + parseInt($("#startPage").val()) - 1) + "~" + (tmp.pop() + parseInt($("#startPage").val()) - 1);
			}
			planName.push(str);
		};
		for (var i = 0, l = planName.length; i < l; i++) {
			// alert("list1");
			$("table tr").children().eq(weekday + i).append("<br>&nbsp;&nbsp;" + tagName + " " + planName[i]);
		};
		var planName = [];
		for (var i = 0, l = total / listPerDay; i < l; i++) {
			tmp = [];
			for (var j = 1; j <= listPerDay; j++) {
				k = i * listPerDay + j;
				if (k > total) break;
				tmp.push(k);
			};
			if (tmp.length == 1) {
				str = tmp[0] + parseInt($("#startPage").val()) - 1;
			} else {
				str = (tmp.shift() + parseInt($("#startPage").val()) - 1) + "~" + (tmp.pop() + parseInt($("#startPage").val()) - 1);
			}

			planName.push(str);
		};
		for (var i = 0, l = planName.length; i < l; i++) {
			// alert("list2+");
			$('table tr').children().eq(weekday + i).append("<br>*" + tagName + " " + planName[i]);
			$('table tr').children().eq(weekday + i + 1).append("<br>*" + tagName + " " + planName[i]);
			$('table tr').children().eq(weekday + i + 3).append("<br>*" + tagName + " " + planName[i]);
			$('table tr').children().eq(weekday + i + 7).append("<br>*" + tagName + " " + planName[i]);
			$('table tr').children().eq(weekday + i + 14).append("<br>*" + tagName + " " + planName[i]);
			$('table tr').children().eq(weekday + i + 25).append("<br>*" + tagName + " " + planName[i]);

		};
	});
});