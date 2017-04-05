var vListFormula = [];
var vId = 0;
var vListEmployees = [];

$(document).ready(function () {
    $("#Emplyee-Detail").load("38-1Details.html");
    $("#Formula-Bonus").load("38-2FormulaBonus.html").ready(function () {
        LoadFormulaBonus();
    });
});

function LoadFormulaBonus() {
    $.getJSON("Data/formula-bonus.json", function (data) {
        $.each(data, function (key, val) {
            vListFormula.push(val);
        });
    });
    setTimeout(function () {
        WriteBonus();
    }, 1000);
}

function WriteBonus() {
    var tblListFormula = [];
    var intId = 0;
    $.each(vListFormula, function (key, val) {
        var str = '<tr>' +
                    '<td><span class="glyphicon glyphicon-star grade-' + val.Grade.toLowerCase() + '"></span> ' + val.Grade + '</td>' +
                    '<td><input type="number" class="formula-item" name="formula-from" value="' + val.From + '" hidden="hidden"/><span class="formula-item">' + val.From + '</span></td>' +
                    '<td><input type="number" class="formula-item" name="formula-to" value="' + val.To + '" hidden="hidden"/><span class="formula-item">' + val.To + '</span></td>' +
                    '<td><input type="number" class="formula-item" name="formula-multiply" value="' + (val.Multiply).toFixed(2) + '" hidden="hidden"/><span class="formula-item">' + (val.Multiply).toFixed(2) + '</span></td>' +
                    '</tr>';

        tblListFormula.push(str);
    });

    $(".formula-body").append(tblListFormula);
}

$(".btn-create").click(function () {
    $("#FirstName").val("");
    $("#LastName").val("");
    $("#Salary").val("0");
    $("#Score").val("0.00");
    vId == 0;
});

$(".btn-save").click(function () {
    if (vId == 0) {
        vId = vListEmployees.lenght() + 1;
        var employee = { Id: vId, FirstName: $("#FirstName").val(), LastName: $("#LastName").val(), Salary: $("#Salary").val(), Score: $("#Score").val(), Bonus: 0 };
        vListEmployees.push(employee);
    }
    else {
        var employee = vListEmployees[vId];
        employee.FirstName = $("#FirstName").val();
        employee.LastName = $("#LastName").val();
        employee.Salary = $("#Salary").val();
        employee.Score = $("#Score").val();
        employee.Bonus = 0;
    }
});

$(".btn-edit-save").click(function () {
    if ($(this).val() == 'Edit') {
        $('input.formula-item').removeAttr("hidden");
        $('span.formula-item').attr('hidden', 'hidden');
        $(this).val("Save");
    }
    else {
        $('input.formula-item').attr('hidden', 'hidden');
        $('span.formula-item').removeAttr("hidden");

        $('.formula-body tr').each(function (index) {
            vFormula = vListFormula[index];
            vFormula.From = $(this).find("input[name='formula-from']").val();
            vFormula.To = $(this).find("input[name='formula-to']").val();
            vFormula.Multiply = $(this).find("input[name='formula-multiply']").val();
            vListFormula[index] = vFormula;
            ($(this).find("input[name='formula-from']")).siblings("span").html(vFormula.From);
            ($(this).find("input[name='formula-to']")).siblings("span").html(vFormula.To);
            ($(this).find("input[name='formula-multiply']")).siblings("span").html(vFormula.Multiply);

        });
        $(this).val("Edit");
    }
    $(this).html($(this).val());
});