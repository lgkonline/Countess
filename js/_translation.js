var translations =
{
    "APP_TITLE": ["Agent Service Monitoring", "Vermittler-Service Monitoring"],
    "LANGUAGE": ["Language", "Sprache"],
    "ENGLISH": ["English", "Englisch"],
    "GERMAN": ["German", "Deutsch"],
    "PERIOD_OF_TIME": ["Viewed period of time", "Betrachteter Zeitraum"],
    "MINUTES": ["minutes", "Minuten"],
    "HOUR": ["hour", "Stunde"],
    "HOURS": ["hours", "Stunden"],
    "SERVICE_INSTANCE": ["Service instance", "Service-Instanz"],
    "FREQUENCY_OF_PACKET_SIZES": ["Frequency of packet sizes", "Häufigkeit von Paketgrößen"],
    "OBJECTS": ["objects", "Objekte"],
    "RUNNING_TIME_OF_PROCESSES": ["Running time of processes", "Laufzeit der Prozesse"],
    "LAST_CONNECTION": ["Last connection", "Letzte Verbindung"],
    "DURATION_OF_CONNECTIONS": ["Duration of connections", "Dauer der Verbindungen"],
    "AVERAGE": ["Average", "Durchschnittlich"],
    "MAXIMUM": ["Maximum", "Maximal"],
    "AVERAGE_DURATION_OF_CONNECTIONS": ["Average duration of connections", "Durchschnittliche Verbindungsdauer"],
    "DURATION_OF_FREQUENCY": ["Duration of frequency", "Dauer der Größe"],
    "FREQUENCY_OF_PROCESSING_CHAINS": ["Frequency of processing chains", "Häufigkeit von Processing Chains"],
    "DURATION_OF_PROCESSING": ["Duration of processing", "Dauer der Verarbeitungen"],
    "AVERAGE_DURATION_OF_PROCESSING": ["Average duration of processing", "Durchschnittliche Verarbeitungsdauer"],
    "ACTIONS_OF": ["Actions of", "Aktionen vom"],
    "NO_ERROR": ["No error", "Kein Fehler"],
    "THROUGHPUT": ["Throughput", "Durchsatz"],
};

var language;
function GetLanguage()
{
    if (!isSet(language))
    {
        if (isSet(getCookie("Language")))
        {
            language = getCookie("Language");
        }
        else
        {
            language = "ENG";
        }
    }
    return language;
}
function SetLanguage(value)
{
    language = value;
    setCookie("Language", value, 30);
}

function GetTranslation(key)
{
    var language = GetLanguage();
    if (language == "GER")
    {
        return translations[key][1];
    }
    else
    {
        return translations[key][0];
    }
}

$(document).ready(function()
{
    $("#language-switch").val(GetLanguage());

    $(".translate").each(function()
    {
        $(this).text(GetTranslation($(this).text()));
    });
});

$("#language-switch").change(function()
{
    SetLanguage($(this).val());
    location.reload();
});