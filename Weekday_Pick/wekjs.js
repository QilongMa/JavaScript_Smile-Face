$(document).ready(function () {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    $("#datebox1").attr('min', inputDateFormat(new Date()));

    var pattern = new Array();
    $("tr td").click(function () {
        var index = pattern.indexOf($(this).html());
        if (index == -1) {
            pattern.push($(this).html());
            $(this).css('background-color', 'blue');
        }
        else {
            pattern.splice(index, 1);
            $(this).css('background-color', 'white');
        }
    });

    var start;
    $("#datebox1").on("change", function () {
        start = JSformat($(this).val());
        $("#datebox2").attr('disabled', false);
        $("#datebox2").attr('min', new String($(this).val()));

        if ($("#ccbox").is(':checked')) {
            var year = start.getFullYear();
            var mon = start.getMonth();
            end = new Date(year, mon + 1, 0);
            $("#datebox2").val(inputDateFormat(endDate));
        }
    });

    var end;
    $("#datebox2").on('change', function () {
        end = JSformat($(this).val());
        $("#ccbox").prop("checked", false);
    });

    $("#ccbox").on('change', function () {
        if (this.checked && start != null) {
            var year = start.getFullYear();
            var mon = start.getMonth();
            end = new Date(year, mon + 1, 0);
            $("#datebox2").val(inputDateFormat(end));
        }
    });

    $("#submit").on('click', function () {
        if (pattern.length > 0) {
            for (var i = start; i <= end; i.setDate(i.getDate() + 1)) {
                var len = pattern.length;
                for (var j = 0; j < len; j++) {
                    if (weekday[i.getDay()] == pattern[j])
                        $("#lblshow").append(pattern[j] + " " + inputDateFormat(i) + "<br/>");
                }
            }
        }
    });

    function JSformat(input) {
        var dash1 = input.indexOf('-');
        var dash2 = input.lastIndexOf('-');
        var year = parseInt(input.substring(0, dash1), 10);
        var mon = parseInt(input.substring(dash1 + 1, dash2), 10);
        var day = parseInt(input.substring(dash2 + 1), 10);

        return new Date(year, mon - 1, day);
    }

    function inputDateFormat(input) {
        var day = input.getDate();
        var mon = input.getMonth() + 1;
        var year = input.getFullYear();
        if (day.toString().length < 2) day = '0' + day;
        if (mon.toString().length < 2) mon = '0' + mon;
        return new String(year + '-' + mon + '-' + day);
    }
})