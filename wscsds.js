/*************************************
@@Zoo
网速测试大师恢复永久订阅
日期:2022.10.3
[rewrite_local]
^https:\/\/iap\.etm\.tech\/receipts url script-echo-response https://raw.githubusercontent.com/Crazy-Z7/Scrip/main/wscsds.js
hostname = iap.etm.tech
**************************************/

var head = $request.headers;
var ua = head['User-Agent'];

if (ua.indexOf('网速测试大师') != -1) {
    Body = {"{\n  \"entitlements\": [{\n    \"expires_date_ms\": 4739583083000,\n    \"purchase_date_ms\": 1655289297000,\n    \"product_identifier\": \"SpeedTest_RemoveAd_1_Year_20181015\",\n    \"is_in_trial_period\": false,\n    \"is_in_intro_offer_period\": false,\n    \"environment\": \"Production\",\n    \"redeem\": {},\n    \"auto_renew\": true,\n    \"entitlement_id\": \"premium\"\n  }],\n  \"is_valid\": true\n}"}};
}

Status = 'HTTP/1.1 200 OK';
Headers = {"Content-Type": "application/json"};

const Response = {
    status: Status,
    headers: Headers,
    body: JSON.stringify(Body)
};

$done(Response);
