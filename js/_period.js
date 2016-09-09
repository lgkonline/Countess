var period;
function GetPeriod()
{
    if (!isSet(period))
    {
        if (isSet(getCookie("Period")))
        {
            period = getCookie("Period");
        }
        else
        {
            period = "10";
        }
    }
    return period;
}
function SetPeriod(value)
{
    period = value;
    setCookie("Period", value, 30);
}

$(document).ready(function()
{
    $("#period-switch").val(GetPeriod());
});

$("#period-switch").change(function()
{
    SetPeriod($(this).val());
    location.reload();
});