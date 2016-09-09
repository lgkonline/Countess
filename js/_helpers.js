function isSet(value)
{
    return typeof(value) != "undefined" && value != null;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return null;
}

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function timestampToDate(unix_timestamp, format)
{
    if (!isSet(format))
    {
        format = "dateAndTime";
    }

    var a = new Date(unix_timestamp);
    var year = a.getFullYear();
    var month = ("0" + (a.getMonth() + 1)).slice(-2);
    var date = ("0" + a.getDate()).slice(-2);
    var hour = ("0" + a.getHours()).slice(-2);
    var min = ("0" + a.getMinutes()).slice(-2);

    if (format == "dateAndTime")
    {
        return date + '.' + month + '.' + year + ' ' + hour + ':' + min;
    }
    else if (format == "time")
    {
        return hour + ':' + min;
    }
}