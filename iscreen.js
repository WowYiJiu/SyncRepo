/*************************************
@@Zoo
iscreen小组件恢复订阅
日期:2022.11.1
[rewrite_local]
^https?:\/\/*buy\.itunes\.apple\.com\/verifyReceipt url script-response-body https://raw.githubusercontent.com/Crazy-Z7/Scrip/main/iscreen.js
hostname = *buy.itunes.apple.com
**************************************/
var body = $response.body.replace(/.+/g, '"{\n  \"environment\": \"Production\",\n  \"receipt\": {\n    \"receipt_type\": \"Production\",\n    \"adam_id\": 1534704608,\n    \"app_item_id\": 1534704608,\n    \"bundle_id\": \"com.zerone.hidesktop\",\n    \"application_version\": \"5\",\n    \"download_id\": 501875636726913278,\n    \"version_external_identifier\": 853035509,\n    \"receipt_creation_date\": \"2022-11-01 04:00:31 Etc\/GMT\",\n    \"receipt_creation_date_ms\": \"1667275231000\",\n    \"receipt_creation_date_pst\": \"2022-10-31 21:00:31 America\/Los_Angeles\",\n    \"request_date\": \"2022-11-01 04:00:32 Etc\/GMT\",\n    \"request_date_ms\": \"1667275232847\",\n    \"request_date_pst\": \"2022-10-31 21:00:32 America\/Los_Angeles\",\n    \"original_purchase_date\": \"2022-10-29 16:59:07 Etc\/GMT\",\n    \"original_purchase_date_ms\": \"1667062747000\",\n    \"original_purchase_date_pst\": \"2022-10-29 09:59:07 America\/Los_Angeles\",\n    \"original_application_version\": \"5\",\n    \"in_app\": [{\n      \"quantity\": \"1\",\n      \"product_id\": \"com.zerone.hidesktop.year\",\n      \"transaction_id\": \"270001225986323\",\n      \"original_transaction_id\": \"270001225986323\",\n      \"purchase_date\": \"2022-10-31 14:31:02 Etc\/GMT\",\n      \"purchase_date_ms\": \"1667226662000\",\n      \"purchase_date_pst\": \"2022-10-31 07:31:02 America\/Los_Angeles\",\n      \"original_purchase_date\": \"2022-10-31 14:31:05 Etc\/GMT\",\n      \"original_purchase_date_ms\": \"1667226665000\",\n      \"original_purchase_date_pst\": \"2022-10-31 07:31:05 America\/Los_Angeles\",\n      \"expires_date\": \"2023-10-31 14:31:02 Etc\/GMT\",\n      \"expires_date_ms\": \"1698762662000\",\n      \"expires_date_pst\": \"2023-10-31 07:31:02 America\/Los_Angeles\",\n      \"web_order_line_item_id\": \"270000542620153\",\n      \"is_trial_period\": \"false\",\n      \"is_in_intro_offer_period\": \"false\",\n      \"in_app_ownership_type\": \"PURCHASED\"\n    }]\n  },\n  \"latest_receipt_info\": [{\n    \"quantity\": \"1\",\n    \"product_id\": \"com.zerone.hidesktop.year\",\n    \"transaction_id\": \"270001225986323\",\n    \"original_transaction_id\": \"270001225986323\",\n    \"purchase_date\": \"2022-10-31 14:31:02 Etc\/GMT\",\n    \"purchase_date_ms\": \"1667226662000\",\n    \"purchase_date_pst\": \"2022-10-31 07:31:02 America\/Los_Angeles\",\n    \"original_purchase_date\": \"2022-10-31 14:31:05 Etc\/GMT\",\n    \"original_purchase_date_ms\": \"1667226665000\",\n    \"original_purchase_date_pst\": \"2022-10-31 07:31:05 America\/Los_Angeles\",\n    \"expires_date\": \"2023-10-31 14:31:02 Etc\/GMT\",\n    \"expires_date_ms\": \"1698762662000\",\n    \"expires_date_pst\": \"2023-10-31 07:31:02 America\/Los_Angeles\",\n    \"web_order_line_item_id\": \"270000542620153\",\n    \"is_trial_period\": \"false\",\n    \"is_in_intro_offer_period\": \"false\",\n    \"in_app_ownership_type\": \"PURCHASED\",\n    \"subscription_group_identifier\": \"20830854\"\n  }],\n  \"latest_receipt\": \"MIIUNQYJKoZIhvcNAQcCoIIUJjCCFCICAQExCzAJBgUrDgMCGgUAMIID1gYJKoZIhvcNAQcBoIIDxwSCA8MxggO\/MAoCARQCAQEEAgwAMAsCAQMCAQEEAwwBNTALAgETAgEBBAMMATUwCwIBGQIBAQQDAgEDMAwCAQoCAQEEBBYCNCswDAIBDgIBAQQEAgIBADANAgENAgEBBAUCAwJMSTAOAgEBAgEBBAYCBFt5u+AwDgIBCQIBAQQGAgRQMjU2MA4CAQsCAQEEBgIEB0a3BDAOAgEQAgEBBAYCBDLYSfUwEgIBDwIBAQQKAggG9wU7iIfY\/jAUAgEAAgEBBAwMClByb2R1Y3Rpb24wGAIBBAIBAgQQdeTZ4LUHYesm1NCP6nxkgjAcAgEFAgEBBBSp\/\/zEd+XQt0En2t0sUgqvP7XnLDAeAgECAgEBBBYMFGNvbS56ZXJvbmUuaGlkZXNrdG9wMB4CAQgCAQEEFhYUMjAyMi0xMS0wMVQwNDowMDozMVowHgIBDAIBAQQWFhQyMDIyLTExLTAxVDA0OjAwOjMyWjAeAgESAgEBBBYWFDIwMjItMTAtMjlUMTY6NTk6MDdaMEACAQcCAQEEOIXlJbJ3fvy086RfIdBzRglM9UaxobCBNdS3C9SnkJo1dsUgkmgAcJ6c+jKPIZAe1zOUkLGwZ52SMGICAQYCAQEEWtrWYFKO14TGWE\/fJj+7udT\/QO6+88RbFFbxC5J\/c2MrMIDSkwI\/F9vM+BnlwTYQX\/tWbzO0yWIDmmY90CqSbhA0ylXQvc2i96Ps2Giy6axPc1IG8syknZwCXDCCAZUCARECAQEEggGLMYIBhzALAgIGrQIBAQQCDAAwCwICBrACAQEEAhYAMAsCAgayAgEBBAIMADALAgIGswIBAQQCDAAwCwICBrQCAQEEAgwAMAsCAga1AgEBBAIMADALAgIGtgIBAQQCDAAwDAICBqUCAQEEAwIBATAMAgIGqwIBAQQDAgEDMAwCAgaxAgEBBAMCAQAwDAICBrcCAQEEAwIBADAMAgIGugIBAQQDAgEAMA8CAgauAgEBBAYCBF3FWEowEgICBq8CAQEECQIHAPWQZm6Z+TAaAgIGpwIBAQQRDA8yNzAwMDEyMjU5ODYzMjMwGgICBqkCAQEEEQwPMjcwMDAxMjI1OTg2MzIzMB8CAgaoAgEBBBYWFDIwMjItMTAtMzFUMTQ6MzE6MDJaMB8CAgaqAgEBBBYWFDIwMjItMTAtMzFUMTQ6MzE6MDVaMB8CAgasAgEBBBYWFDIwMjMtMTAtMzFUMTQ6MzE6MDJaMCQCAgamAgEBBBsMGWNvbS56ZXJvbmUuaGlkZXNrdG9wLnllYXKggg5lMIIFfDCCBGSgAwIBAgIIDutXh+eeCY0wDQYJKoZIhvcNAQEFBQAwgZYxCzAJBgNVBAYTAlVTMRMwEQYDVQQKDApBcHBsZSBJbmMuMSwwKgYDVQQLDCNBcHBsZSBXb3JsZHdpZGUgRGV2ZWxvcGVyIFJlbGF0aW9uczFEMEIGA1UEAww7QXBwbGUgV29ybGR3aWRlIERldmVsb3BlciBSZWxhdGlvbnMgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkwHhcNMTUxMTEzMDIxNTA5WhcNMjMwMjA3MjE0ODQ3WjCBiTE3MDUGA1UEAwwuTWFjIEFwcCBTdG9yZSBhbmQgaVR1bmVzIFN0b3JlIFJlY2VpcHQgU2lnbmluZzEsMCoGA1UECwwjQXBwbGUgV29ybGR3aWRlIERldmVsb3BlciBSZWxhdGlvbnMxEzARBgNVBAoMCkFwcGxlIEluYy4xCzAJBgNVBAYTAlVTMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApc+B\/SWigVvWh+0j2jMcjuIjwKXEJss9xp\/sSg1Vhv+kAteXyjlUbX1\/slQYncQsUnGOZHuCzom6SdYI5bSIcc8\/W0YuxsQduAOpWKIEPiF41du30I4SjYNMWypoN5PC8r0exNKhDEpYUqsS4+3dH5gVkDUtwswSyo1IgfdYeFRr6IwxNh9KBgxHVPM3kLiykol9X6SFSuHAnOC6pLuCl2P0K5PB\/T5vysH1PKmPUhrAJQp2Dt7+mf7\/wmv1W16sc1FJCFaJzEOQzI6BAtCgl7ZcsaFpaYeQEGgmJjm4HRBzsApdxXPQ33Y72C3ZiB7j7AfP4o7Q0\/omVYHv4gNJIwIDAQABo4IB1zCCAdMwPwYIKwYBBQUHAQEEMzAxMC8GCCsGAQUFBzABhiNodHRwOi8vb2NzcC5hcHBsZS5jb20vb2NzcDAzLXd3ZHIwNDAdBgNVHQ4EFgQUkaSc\/MR2t5+givRN9Y82Xe0rBIUwDAYDVR0TAQH\/BAIwADAfBgNVHSMEGDAWgBSIJxcJqbYYYIvs67r2R1nFUlSjtzCCAR4GA1UdIASCARUwggERMIIBDQYKKoZIhvdjZAUGATCB\/jCBwwYIKwYBBQUHAgIwgbYMgbNSZWxpYW5jZSBvbiB0aGlzIGNlcnRpZmljYXRlIGJ5IGFueSBwYXJ0eSBhc3N1bWVzIGFjY2VwdGFuY2Ugb2YgdGhlIHRoZW4gYXBwbGljYWJsZSBzdGFuZGFyZCB0ZXJtcyBhbmQgY29uZGl0aW9ucyBvZiB1c2UsIGNlcnRpZmljYXRlIHBvbGljeSBhbmQgY2VydGlmaWNhdGlvbiBwcmFjdGljZSBzdGF0ZW1lbnRzLjA2BggrBgEFBQcCARYqaHR0cDovL3d3dy5hcHBsZS5jb20vY2VydGlmaWNhdGVhdXRob3JpdHkvMA4GA1UdDwEB\/wQEAwIHgDAQBgoqhkiG92NkBgsBBAIFADANBgkqhkiG9w0BAQUFAAOCAQEADaYb0y4941srB25ClmzT6IxDMIJf4FzRjb69D70a\/CWS24yFw4BZ3+Pi1y4FFKwN27a4\/vw1LnzLrRdrjn8f5He5sWeVtBNephmGdvhaIJXnY4wPc\/zo7cYfrpn4ZUhcoOAoOsAQNy25oAQ5H3O5yAX98t5\/GioqbisB\/KAgXNnrfSemM\/j1mOC+RNuxTGf8bgpPyeIGqNKX86eOa1GiWoR1ZdEWBGLjwV\/1CKnPaNmSAMnBjLP4jQBkulhgwHyvj3XKablbKtYdaG6YQvVMpzcZm8w7HHoZQ\/Ojbb9IYAYMNpIr7N4YtRHaLSPQjvygaZwXG56AezlHRTBhL8cTqDCCBCIwggMKoAMCAQICCAHevMQ5baAQMA0GCSqGSIb3DQEBBQUAMGIxCzAJBgNVBAYTAlVTMRMwEQYDVQQKEwpBcHBsZSBJbmMuMSYwJAYDVQQLEx1BcHBsZSBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eTEWMBQGA1UEAxMNQXBwbGUgUm9vdCBDQTAeFw0xMzAyMDcyMTQ4NDdaFw0yMzAyMDcyMTQ4NDdaMIGWMQswCQYDVQQGEwJVUzETMBEGA1UECgwKQXBwbGUgSW5jLjEsMCoGA1UECwwjQXBwbGUgV29ybGR3aWRlIERldmVsb3BlciBSZWxhdGlvbnMxRDBCBgNVBAMMO0FwcGxlIFdvcmxkd2lkZSBEZXZlbG9wZXIgUmVsYXRpb25zIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyjhUpstWqsgkOUjpjO7sX7h\/JpG8NFN6znxjgGF3ZF6lByO2Of5QLRVWWHAtfsRuwUqFPi\/w3oQaoVfJr3sY\/2r6FRJJFQgZrKrbKjLtlmNoUhU9jIrsv2sYleADrAF9lwVnzg6FlTdq7Qm2rmfNUWSfxlzRvFduZzWAdjakh4FuOI\/YKxVOeyXYWr9Og8GN0pPVGnG1YJydM05V+RJYDIa4Fg3B5XdFjVBIuist5JSF4ejEncZopbCj\/Gd+cLoCWUt3QpE5ufXN4UzvwDtIjKblIV39amq7pxY1YNLmrfNGKcnow4vpecBqYWcVsvD95Wi8Yl9uz5nd7xtj\/pJlqwIDAQABo4GmMIGjMB0GA1UdDgQWBBSIJxcJqbYYYIvs67r2R1nFUlSjtzAPBgNVHRMBAf8EBTADAQH\/MB8GA1UdIwQYMBaAFCvQaUeUdgn+9GuNLkCm90dNfwheMC4GA1UdHwQnMCUwI6AhoB+GHWh0dHA6Ly9jcmwuYXBwbGUuY29tL3Jvb3QuY3JsMA4GA1UdDwEB\/wQEAwIBhjAQBgoqhkiG92NkBgIBBAIFADANBgkqhkiG9w0BAQUFAAOCAQEAT8\/vWb4s9bJsL4\/uE4cy6AU1qG6LfclpDLnZF7x3LNRn4v2abTpZXN+DAb2yriphcrGvzcNFMI+jgw3OHUe08ZOKo3SbpMOYcoc7Pq9FC5JUuTK7kBhTawpOELbZHVBsIYAKiU5XjGtbPD2m\/d73DSMdC0omhz+6kZJMpBkSGW1X9XpYh3toiuSGjErr4kkUqqXdVQCprrtLMK7hoLG8KYDmCXflvjSiAcp\/3OIK5ju4u+y6YpXzBWNBgs0POx1MlaTbq\/nJlelP5E3nJpmB6bz5tCnSAXpm4S6M9iGKxfh44YGuv9OQnamt86\/9OBqWZzAcUaVc7HGKgrRsDwwVHzCCBLswggOjoAMCAQICAQIwDQYJKoZIhvcNAQEFBQAwYjELMAkGA1UEBhMCVVMxEzARBgNVBAoTCkFwcGxlIEluYy4xJjAkBgNVBAsTHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRYwFAYDVQQDEw1BcHBsZSBSb290IENBMB4XDTA2MDQyNTIxNDAzNloXDTM1MDIwOTIxNDAzNlowYjELMAkGA1UEBhMCVVMxEzARBgNVBAoTCkFwcGxlIEluYy4xJjAkBgNVBAsTHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRYwFAYDVQQDEw1BcHBsZSBSb290IENBMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5JGpCR+R2x5HUOsF7V55hC3rNqJXTFXsixmJ3vlLbPUHqyIwAugYPvhQCdN\/QaiY+dHKZpwkaxHQo7vkGyrDH5WeegykR4tb1BY3M8vED03OFGnRyRly9V0O1X9fm\/IlA7pVj01dDfFkNSMVSxVZHbOU9\/acns9QusFYUGePCLQg98usLCBvcLY\/ATCMt0PPD5098ytJKBrI\/s61uQ7ZXhzWyz21Oq30Dw4AkguxIRYudNU8DdtiFqujcZJHU1XBry9Bs\/j743DN5qNMRX4fTGtQlkGJxHRiCxCDQYczioGxMFjsWgQyjGizjx3eZXP\/Z15lvEnYdp8zFGWhd5TJLQIDAQABo4IBejCCAXYwDgYDVR0PAQH\/BAQDAgEGMA8GA1UdEwEB\/wQFMAMBAf8wHQYDVR0OBBYEFCvQaUeUdgn+9GuNLkCm90dNfwheMB8GA1UdIwQYMBaAFCvQaUeUdgn+9GuNLkCm90dNfwheMIIBEQYDVR0gBIIBCDCCAQQwggEABgkqhkiG92NkBQEwgfIwKgYIKwYBBQUHAgEWHmh0dHBzOi8vd3d3LmFwcGxlLmNvbS9hcHBsZWNhLzCBwwYIKwYBBQUHAgIwgbYagbNSZWxpYW5jZSBvbiB0aGlzIGNlcnRpZmljYXRlIGJ5IGFueSBwYXJ0eSBhc3N1bWVzIGFjY2VwdGFuY2Ugb2YgdGhlIHRoZW4gYXBwbGljYWJsZSBzdGFuZGFyZCB0ZXJtcyBhbmQgY29uZGl0aW9ucyBvZiB1c2UsIGNlcnRpZmljYXRlIHBvbGljeSBhbmQgY2VydGlmaWNhdGlvbiBwcmFjdGljZSBzdGF0ZW1lbnRzLjANBgkqhkiG9w0BAQUFAAOCAQEAXDaZTC14t+2Mm9zzd5vydtJ3ME\/BH4WDhRuZPUc38qmbQI4s1LGQEti+9HOb7tJkD8t5TzTYoj75eP9ryAfsfTmDi1Mg0zjEsb+aTwpr\/yv8WacFCXwXQFYRHnTTt4sjO0ej1W8k4uvRt3DfD0XhJ8rxbXjt57UXF6jcfiI1yiXV2Q\/Wa9SiJCMR96Gsj3OBYMYbWwkvkrL4REjwYDieFfU9JmcgijNq9w2Cz97roy\/5U2pbZMBjM3f3OgcsVuvaDyEO2rpzGU+12TZ\/wYdV2aeZuTJC+9jVcZ5+oVK3G72TQiQSKscPHbZNnF5jyEuAF1CqitXa5PzQCQc3sHV1ITGCAcswggHHAgEBMIGjMIGWMQswCQYDVQQGEwJVUzETMBEGA1UECgwKQXBwbGUgSW5jLjEsMCoGA1UECwwjQXBwbGUgV29ybGR3aWRlIERldmVsb3BlciBSZWxhdGlvbnMxRDBCBgNVBAMMO0FwcGxlIFdvcmxkd2lkZSBEZXZlbG9wZXIgUmVsYXRpb25zIENlcnRpZmljYXRpb24gQXV0aG9yaXR5AggO61eH554JjTAJBgUrDgMCGgUAMA0GCSqGSIb3DQEBAQUABIIBAIQ06TmsSCEwXNLVfBIW8hemOWnHaLl6HDyO\/wO3sWbyCENLLOt1w3byPzAvzX\/oi9rfzDmjqSIuolDnFcXlBdDAv3wXLIRY8AdiOXRcYq6gnYwKhAsWPcO+UB\/Oxv+lgcXmax0dp5Uv8uJjQswoRilDRs1anwVZARxj7Hi5izimlgZRGXlBzJBdVttjRoV16jeDMPERPDGaJtkmq4DPWAiPMajbq9CnefJQ0eWieoawwjw1M0Qrh0yDnl6GOJYw6A6SSHRFGlTFaQX+48nqOnB68sR9CNTgzPa4e93WwOiy3kRy3ZscD0lXmimkUrKD\/lKJmNI2dTPxyiK9h6cPGlo=\",\n  \"pending_renewal_info\": [{\n    \"auto_renew_product_id\": \"com.zerone.hidesktop.year\",\n    \"product_id\": \"com.zerone.hidesktop.year\",\n    \"original_transaction_id\": \"270001225986323\",\n    \"auto_renew_status\": \"1\"\n  }],\n  \"status\": 0\n}"'); $done({body});
