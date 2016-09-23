<?php

header("Content-Type: text/json");

$action = filter_input(INPUT_GET, "action");


if ($action == "metadata")
{
    echo json_encode(
        [
            "instanceName" => "Ich heisse Bob!",
            "processUptimeHours" =>
            [
                "watchdog" => 40,
                "mediation" => 30,
                "monitoring" => 40
            ]
        ]
    );
}

if ($action == "buffer")
{
    $x = filter_input(INPUT_GET, "x"); // in/out
    $y = filter_input(INPUT_GET, "y"); // Zeitraum

    echo json_encode(
        [
            [
                "size" => 0,
                "durationSec" => 4800
            ],
            [
                "size" => 1,
                "durationSec" => 60
            ],
            [
                "size" => 10,
                "durationSec" => 60
            ]
        ]
    );
}

if ($action == "connHandler")
{
    $x = filter_input(INPUT_GET, "x"); // in/out
    $y = filter_input(INPUT_GET, "y"); // Zeitraum

    echo json_encode(
        [
            "lastConnection" => 1471533554025,
            "packetSizeAttributes" =>
            [
                [
                    "size" => 0,
                    "freq" => 25,
                    "durationMs" => 2
                ],
                [
                    "size" => 1,
                    "freq" => 10,
                    "durationMs" => 5
                ],
                [
                    "size" => 4,
                    "freq" => 10,
                    "durationMs" => 12
                ]
            ],
            "minConnDuration" =>
            [
                "durationMs" => 5,
                "timestamp" => 1471534662742
            ],
            "avgConnDuration" =>
            [
                "durationMs" => 10.4
            ],
            "maxConnDuration" =>
            [
                "durationMs" => 20,
                "timestamp" => 1471534662742
            ]                        
        ]
    );
}

if ($action == "processing")
{
    $x = filter_input(INPUT_GET, "x"); // Zeitraum

    echo json_encode(
        [
            "procChainAttributes" =>
            [
                [
                    "chain" => "none",
                    "freq" => 1,
                    "durationMs" => 1.2                    
                ],
                [
                    "chain" => "transformDsaFlags",
                    "freq" => 9,
                    "durationMs" => 0.1                    
                ]                
            ],
            "minProcDuration" =>
            [
                "durationMs" => 5,
                "timestamp" => 1471534662742
            ],
            "avgProcDuration" =>
            [
                "durationMs" => 10.4
            ],
            "maxProcDuration" =>
            [
                "durationMs" => 20,
                "timestamp" => 1471534662742
            ]    
        ]
    );
}

if ($action == "outErrHandler")
{
    $x = filter_input(INPUT_GET, "x"); // Zeitraum

    echo json_encode(
        [
            [
                "handling" => "TryAgainLater_DefaultConfig",
                "freq" => 33,
                "durationMs" => 8.696969696969697
            ], 
            [
                "handling" => "NoError",
                "freq" => 603,
                "durationMs" => 3.5024875621890548
            ], 
            [
                "handling" => "PutBackToOutputBuffer_DefaultConfig",
                "freq" => 2,
                "durationMs" => 0.5
            ]
        ]
    );
}

if ($action == "throughput")
{
    $x = filter_input(INPUT_GET, "x"); // Zeitraum

    echo json_encode(
        [
            [
                "intervalStart" => 1471534662742,
                "intervalEnd" => 1471534662742,
                "objsPerMin" => 2.0
            ],
            [
                "intervalStart" => 1471534662742,
                "intervalEnd" => 1471534662742,
                "objsPerMin" => 1.5
            ],
            [
                "intervalStart" => 1471534662742,
                "intervalEnd" => 1471534662742,
                "objsPerMin" => 1.8
            ]                            
        ]
    );
}