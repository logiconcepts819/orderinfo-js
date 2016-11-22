var stylizeFraction = function(fraction, idx)
{
    var s = 1;
    var n = fraction.numerator;
    var d = fraction.denominator;
    if (d < 0)
    {
        n = -n;
        d = -d;
    }
    if (n < 0)
    {
        n = -n;
        s = -s;
    }
    return '<div class="fracsign inline-div">'+(s<0?'&ndash;':'+')+'&nbsp;'+
           '</div><div class="fracnum inline-div" id="num'+idx+'">'+n+
           '</div><div class="fracslash inline-div">&nbsp;/&nbsp;'+
           '</div><div class="fracden inline-div" id="den'+idx+'">'+d+'</div>';
}

var createBlankTable = function(j, threek, polmom)
{
    $('#moment_table_area').html(
        '<table id="moment_table"><thead><tr>'+
        '<td class="moment_var_cell">j</td>'+
        '<td class="moment_var_cell">3k</td>'+
        '<td class="moment_cell">Moment</td></thead><tbody><tr>'+
        '<td class="moment_var_cell">'+j+'</td>'+
        '<td class="moment_var_cell">'+threek+'</td>'+
        '<td class="moment_cell">'+stylizeFraction(polmom, 0)+'</td>'+
        '</tr></tbody></table>');
    return {numWidth: $('#num0').width(), denWidth: $('#den0').width()};
}

var appendToTable = function(j, threek, polmom, idx)
{
    var idx = $('.fracnum').length;
    $('#moment_table tr:last').after(
        '<tr><td class="moment_var_cell">'+j+'</td>'+
        '<td class="moment_var_cell">'+threek+'</td>'+
        '<td class="moment_cell">'+stylizeFraction(polmom, idx)+'</td></tr>');
    return {numWidth: $('#num'+idx).width(), denWidth: $('#den'+idx).width()};
}

var emptyTableArea = function()
{
    $('#moment_table_area').empty();
}

var Tracker = function()
{
    this.maxNumWidth = 0;
    this.maxDenWidth = 0;
}

Tracker.prototype.addToTable = function(j, threek, polmom, maxwidths)
{
    var maxWidths;
    if ($('#moment_table').length)
    {
        widths = appendToTable(j, threek, polmom);
    }
    else
    {
        widths = createBlankTable(j, threek, polmom);
    }
    if (this.maxNumWidth < widths.numWidth)
    {
        this.maxNumWidth = widths.numWidth;
    }
    if (this.maxDenWidth < widths.denWidth)
    {
        this.maxDenWidth = widths.denWidth;
    }
}

var generateMoments = function(p, updateFunc)
{
    for (var j = 0; j <= p; j++)
    {
        for (var threek = 3 * (j & 1); threek <= j; threek += 6)
        {
            pmom = polmom(j, threek);
            updateFunc(j, threek, pmom);
        }
    }
}

var generateMomentTable = function()
{
    var p = parseInt($('#maxJInput').val());
    var t = new Tracker();

    $('.fracnum').width('auto');
    $('.fracden').width('auto');

    emptyTableArea();
    generateMoments(p, function(j, threek, pmom)
    {
        t.addToTable(j, threek, pmom);
    });

    $('.fracnum').width(t.maxNumWidth+'px');
    $('.fracden').width(t.maxDenWidth+'px');
}
