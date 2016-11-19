var stylizeFraction = function(fraction)
{
    return '<div class="fracsign inline-div">'+
           (fraction.s < 0 ? '&ndash;' : '+') +
           '</div><div class="fracnum inline-div">'+fraction.n+
           '</div><div class="fracslash inline-div">/'+
           '</div><div class="fracden inline-div">'+fraction.d+'</div>';
}

var createBlankTable = function(j, threek, polmom)
{
    $('#moment_table_area').html(
        '<table id="moment_table"><thead><tr>'+
        '<td id="moment_var_cell">j</td>'+
        '<td id="moment_var_cell">3k</td>'+
        '<td id="moment_cell">Moment</td></thead><tbody><tr>'+
        '<td id="moment_var_cell">'+j+'</td>'+
        '<td id="moment_var_cell">'+threek+'</td>'+
        '<td id="moment_cell">'+stylizeFraction(polmom)+'</td>'+
        '</tr></tbody></table>');
}

var appendToTable = function(j, threek, polmom)
{
    $('#moment_table tr:last').after(
        '<tr><td id="moment_var_cell">'+j+'</td>'+
        '<td id="moment_var_cell">'+threek+'</td>'+
        '<td id="moment_cell">'+stylizeFraction(polmom)+'</td></tr>');
}

var emptyTableArea = function()
{
    $('#moment_table_area').empty();
}

var addToTable = function(j, threek, polmom)
{
    if ($('#moment_table').length)
    {
        appendToTable(j, threek, polmom);
    }
    else
    {
        createBlankTable(j, threek, polmom);
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

    emptyTableArea();
    generateMoments(p, function(j, threek, pmom)
    {
        addToTable(j, threek, pmom);
    });
}
