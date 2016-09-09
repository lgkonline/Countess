// @koala-prepend "_helpers.js"
// @koala-prepend "_translation.js"
// @koala-prepend "_period.js"

var R = $("html").data("root");

var apiUri = R + "DEMO/";

function processBuffer(bufferData, idPkey)
{
    var barData = [], barLabels = [];
    for (var i = 0; i < bufferData.length; i++)
    {
        barData.push(bufferData[i].durationSec / 60);
        barLabels.push(bufferData[i].size + " " + GetTranslation("OBJECTS"));
    }                
    var barChart = new Chart($("#" + idPkey + "-durationOfFrequency"), {
        type: "bar",
        data: 
        {
            datasets: [{
                data: barData,
                backgroundColor: [
                    "#FF6384",
                    "#4BC0C0",
                    "#FFCE56",
                    "#E7E9ED",
                    "#36A2EB"
                ],
                label: 'My dataset' // for legend
            }],
            labels: barLabels
        },
        options:
        {
            legend:
            {
                display: false
            }
        }
    });      
}

function processConnectionHandler(connectionHandlerData, idPkey)
{
    $("#" + idPkey + "-lastConnection").text(timestampToDate(connectionHandlerData.lastConnection));

    // packetSizeAttributes
    var pieData = [], pieLabels = [];
    for (var i = 0; i < connectionHandlerData.packetSizeAttributes.length; i++)
    {
        pieData.push(connectionHandlerData.packetSizeAttributes[i].freq);
        pieLabels.push(connectionHandlerData.packetSizeAttributes[i].size + " " + GetTranslation("OBJECTS"));
    }
    var pieChart = new Chart($("#" + idPkey + "-packetSizeAttributes"), 
    {
        type: "pie",
        data: 
        {
            datasets: [{
                data: pieData,
                backgroundColor: [
                    "#FF6384",
                    "#4BC0C0",
                    "#FFCE56",
                    "#E7E9ED",
                    "#36A2EB"
                ],
                label: 'My dataset' // for legend
            }],
            labels: pieLabels
        }
    });                

    // connDuration
    $("#" + idPkey + "-minConnDuration").text(connectionHandlerData.minConnDuration.durationMs + " ms");
    $("#" + idPkey + "-avgConnDuration").text(connectionHandlerData.avgConnDuration.durationMs + " ms");
    $("#" + idPkey + "-maxConnDuration").text(connectionHandlerData.maxConnDuration.durationMs + " ms");

    // avgConnDurations
    var barData = [], barLabels = [];
    for (var i = 0; i < connectionHandlerData.packetSizeAttributes.length; i++)
    {
        barData.push(connectionHandlerData.packetSizeAttributes[i].durationMs);
        barLabels.push(connectionHandlerData.packetSizeAttributes[i].size + " " + GetTranslation("OBJECTS"));
    }                
    var barChart = new Chart($("#" + idPkey + "-avgConnDurations"), {
        type: "bar",
        data: 
        {
            datasets: [{
                data: barData,
                backgroundColor: [
                    "#FF6384",
                    "#4BC0C0",
                    "#FFCE56",
                    "#E7E9ED",
                    "#36A2EB"
                ]
            }],
            labels: barLabels
        },
        options:
        {
            legend:
            {
                display: false
            }
        }
    });         
}

function initMetaData()
{
    $.ajax(
        {
            url: apiUri + "metadata",
            dataType: "json",
            type: "GET",
            success: function(metadata)
            {
                $("#metadata-instanceName").text(metadata.instanceName);
                
                var processUptimeHoursText = [];
                $.each(metadata.processUptimeHours, function(key, value)
                {
                    processUptimeHoursText.push(key.capitalizeFirstLetter() + " " + value + " " + GetTranslation("HOURS"));
                });
                $("#metadata-processUptimeHours").text(processUptimeHoursText.join(", "));
            },
            error: function(response)
            {
                console.error(response);
            }
        }
    );
}

function initInputConnectionHandler()
{
    $.ajax(
        {
            url: apiUri + "connHandler?x=in&y=" + GetPeriod(),
            dataType: "json",
            type: "GET",
            success: function(connHandler)
            {
                processConnectionHandler(connHandler, "inputConnHandler");
            },
            error: function(response)
            {
                console.error(response);
            }
        }
    );
}

function initInputBuffer()
{
    $.ajax(
        {
            url: apiUri + "buffer?x=in&y=" + GetPeriod(),
            dataType: "json",
            type: "GET",
            success: function(inputBuffer)
            {
                processBuffer(inputBuffer, "inputBuffer");                    
            },
            error: function(response)
            {
                console.error(response);
            }
        }
    );
}

function initProcessing()
{
    $.ajax(
        {
            url: apiUri + "processing?x=" + GetPeriod(),
            dataType: "json",
            type: "GET",
            success: function(processing)
            {
                // procChainAttributes
                var pieData = [], pieLabels = [];
                for (var i = 0; i < processing.procChainAttributes.length; i++)
                {
                    pieData.push(processing.procChainAttributes[i].freq);
                    pieLabels.push(processing.procChainAttributes[i].chain);
                }
                var pieChart = new Chart($("#processing-procChainAttributes"), 
                {
                    type: "pie",
                    data: 
                    {
                        datasets: [{
                            data: pieData,
                            backgroundColor: [
                                "#FF6384",
                                "#4BC0C0",
                                "#FFCE56",
                                "#E7E9ED",
                                "#36A2EB"
                            ],
                            label: 'My dataset' // for legend
                        }],
                        labels: pieLabels
                    }
                });  

                // ProcDuration
                $("#processing-minProcDuration").text(processing.minProcDuration.durationMs + " ms");
                $("#processing-avgProcDuration").text(processing.avgProcDuration.durationMs + " ms");
                $("#processing-maxProcDuration").text(processing.maxProcDuration.durationMs + " ms");   

                // avgProcDurations
                var barData = [], barLabels = [];
                for (var i = 0; i < processing.procChainAttributes.length; i++)
                {
                    barData.push(processing.procChainAttributes[i].durationMs);
                    barLabels.push(processing.procChainAttributes[i].chain);
                }                
                var barChart = new Chart($("#processing-avgProcDurations"), {
                    type: "bar",
                    data: 
                    {
                        datasets: [{
                            data: barData,
                            backgroundColor: [
                                "#FF6384",
                                "#4BC0C0",
                                "#FFCE56",
                                "#E7E9ED",
                                "#36A2EB"
                            ]
                        }],
                        labels: barLabels
                    },
                    options:
                    {
                        legend:
                        {
                            display: false
                        }
                    }
                });                                                               
            },
            error: function(response)
            {
                console.error(response);
            }
        }
    );
}

function initOutputBuffer()
{
    $.ajax(
        {
            url: apiUri + "buffer?x=out&y=" + GetPeriod(),
            dataType: "json",
            type: "GET",
            success: function(outputBuffer)
            {
                processBuffer(outputBuffer, "outputBuffer");                
            },
            error: function(response)
            {
                console.error(response);
            }
        }
    );
}

function initOutputConnectionHandler()
{
    $.ajax(
        {
            url: apiUri + "connHandler?x=out&y=" + GetPeriod(),
            dataType: "json",
            type: "GET",
            success: function(connHandler)
            {
                processConnectionHandler(connHandler, "outputConnHandler");
            },
            error: function(response)
            {
                console.error(response);
            }
        }
    );
}

function initOutErrorHandler()
{
    $.ajax(
        {
            url: apiUri + "outErrHandler?x=out&y=" + GetPeriod(),
            dataType: "json",
            type: "GET",
            success: function(outErrHandler)
            {
                // outErrHandler-pie
                var pieData = [], pieLabels = [];
                for (var i = 0; i < outErrHandler.length; i++)
                {
                    pieData.push(outErrHandler[i].freq);
                    if (isSet(outErrHandler[i].chain))
                    {
                        pieLabels.push(outErrHandler[i].chain);
                    }
                    else
                    {
                        pieLabels.push(GetTranslation("NO_ERROR"));
                    }
                }
                var pieChart = new Chart($("#outErrHandler-pie"), 
                {
                    type: "pie",
                    data: 
                    {
                        datasets: [{
                            data: pieData,
                            backgroundColor: [
                                "#FF6384",
                                "#4BC0C0",
                                "#FFCE56",
                                "#E7E9ED",
                                "#36A2EB"
                            ],
                            label: 'My dataset' // for legend
                        }],
                        labels: pieLabels
                    }
                });      

                // outErrHandler-bar       
                var barData = [], barLabels = [];
                for (var i = 0; i < outErrHandler.length; i++)
                {
                    if (isSet(outErrHandler[i].durationMs) && isSet(outErrHandler[i].chain))
                    {
                        barData.push(outErrHandler[i].durationMs);
                        barLabels.push(outErrHandler[i].chain);
                    }
                }                
                var barChart = new Chart($("#outErrHandler-bar"), {
                    type: "bar",
                    data: 
                    {
                        datasets: [{
                            data: barData,
                            backgroundColor: [
                                "#FF6384",
                                "#4BC0C0",
                                "#FFCE56",
                                "#E7E9ED",
                                "#36A2EB"
                            ]
                        }],
                        labels: barLabels
                    },
                    options:
                    {
                        legend:
                        {
                            display: false
                        }
                    }
                });                        
            },
            error: function(response)
            {
                console.error(response);
            }
        }
    );
}

function initThroughput()
{
    $.ajax(
        {
            url: apiUri + "throughput?x=" + GetPeriod(),
            dataType: "json",
            type: "GET",
            success: function(throughput)
            {
                console.log(throughput);

                var lineData = [], lineLabels = [];

                for (var i = 0; i < throughput.length; i++)
                {
                    lineData.push(throughput[i].objsPerMin);
                    lineLabels.push(timestampToDate(throughput[i].intervalStart, "time"));
                }

                console.log(lineLabels);

                var lineChart = new Chart($("#throughput-line"), {
                    type: "line",
                    data: 
                    {
                        datasets: [{
                            label: GetTranslation("THROUGHPUT"),
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: lineData,
                            spanGaps: false,
                        }],
                        labels: lineLabels
                    },
                    options:
                    {
                        legend:
                        {
                            display: false
                        }
                    }
                });
            },
            error: function(response)
            {
                console.error(response);
            }
        }
    );
}

$(document).ready(function()
{
    initMetaData();
    setInterval(initMetaData, 2100000);

    initInputConnectionHandler();
    setInterval(initInputConnectionHandler, 20000);

    initInputBuffer();
    setInterval(initInputBuffer, 20000);

    initProcessing();
    setInterval(initProcessing, 20000);

    initOutputBuffer();
    setInterval(initOutputBuffer, 20000);

    initOutputConnectionHandler();
    setInterval(initOutputConnectionHandler, 20000);

    initOutErrorHandler();
    setInterval(initOutErrorHandler, 20000);

    initThroughput();
    setInterval(initThroughput, 20000);
});