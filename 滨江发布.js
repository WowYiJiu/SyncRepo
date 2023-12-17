/**
 * new Env("滨江发布")
 * cron 09 18 * * *  test_v2.js
 * Show:多账号分隔符@    多变量分隔符&
 * 变量名:binjiangfabu
 * 变量值:账号&密码
 * scriptVersionNow = "0.0.1";
 */

const $ = new Env("滨江发布", { dataFile: "binzhou.json" });
const ckName = "binjiangfabu";
const Notify = 1; //0为关闭通知,1为打开通知,默认为1
let envSplitor = ["@", "\n"]; //多账号分隔符
let strSplitor = '&'; //多变量分隔符
let scriptVersionNow = "0.0.1";
const JSConfig = {
    jsUrl: "https://originfastly.jsdelivr.net/gh/smallfawn/Note@main/JavaScript/test_v2.js",
    noticeUrl: `https://originfastly.jsdelivr.net/gh/smallfawn/Note@main/Notice.json`,
}


class UserInfo {
    constructor(str) {
        this.index = ++$.userIdx;
        this.username = str.split(strSplitor)[0];
        this.password = str.split(strSplitor)[1];
        this.ckStatus = true;
        this.articleIdList = []
        this.user_name = ``
        this.user_point = ``
        this.appSecret = ""
        this.appKey = ""
        this.authToken = ""
        this.member = ""
        //this.member = str.split(strSplitor)[0];
        //this.token = ""
        //this.uid = ""
        //this.phone = ""

    }

    /*async login() {
        try {
            let options = {
                url: `http://login.smallfawn.top?project=binjiangfabu`,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({ username: "", password: "" }),
            },
                result = await httpRequest(options);
            console.log(options);
            console.log(result);
            if (result.status == true) {
                $.DoubleLog(`✅账号[${this.index}] 获取COOKIE成功🎉`);
                this.authToken = result.data.authToken;
                this.member = result.data.member;//id
                this.uid = result.data.uid;//APP UID
                this.user_point = result.data.score;//积分
                this.token = result.data.token;//
                this.user_name = result.data.username;//昵称
                this.phone = result.data.phone;//手机号

            } else {
                $.DoubleLog(`❌账号[${this.index}] 获取COOKIE失败`);
            }
        } catch (e) {
            console.log(e);
        }
    }*/
    async main() {
        await this.geAppSecret()
        if (this.appKey !== null && this.appSecret !== null) {
            await this.login()
            await this.getAuthToken()
            await this.user_score()
            await this.articleList()
            if (this.articleIdList.length > 0) {
                for (let i = 0; i < 10; i++) {
                    await $.wait(10000)

                    await this.event_start(0)
                }
                for (let i = 0; i < 15; i++) {
                    await $.wait(5000)

                    await this.event_start(1)
                }
                for (let i = 0; i < 10; i++) {
                    await $.wait(5000)

                    await this.event_start(2)
                }
            }
            await this.user_score()
        }
        //$.msg(`[昵称] ${this.phone}`, `积分${this.user_point} ID -- ${this.member}`, `正常`)
        $.msg(``, `积分${this.user_point} ID -- ${this.member}`, `正常`)
    }
    getRandom() {
        let randomNumber = '';
        for (let i = 0; i < 9; i++) {
            randomNumber += Math.floor(Math.random() * 10);
        }
        return randomNumber;
    }



    async login() {
        let timestamp = this.getTimeStamp()
        let random = this.getRandom()
        let buffer = `devid=61ee00beee2d9280&random=${random}&timestamp=${timestamp}&token=&version=1.0.0`
        //console.log(buffer)
        var sBuffer = `phone=${this.username}&password=${this.getSign(this.password)}&devid=61ee00beee2d9280&siteid=6`;
        //console.log(sBuffer)
        //console.log(sBuffer + "&secret=" + this.getSign(buffer))
        let sign = this.getSign(sBuffer + "&secret=" + this.getSign(buffer))
        try {
            let options = {
                url: `https://sso-app-bjq.hzyun.com.cn/v1/api/login`,
                headers: {
                    "user-agent": "Dart/2.18 (dart:io)",
                    "program-sign": sign,
                    "accept-encoding": "gzip",
                    random: random,
                    "content-type": "application/json; charset=utf-8",
                    timestamp: timestamp,
                    token: "",
                    devid: "61ee00beee2d9280",
                    version: "1.0.0",
                    "program-params": "phone,password,devid,siteid",
                    //content-length: 107
                    host: "sso-app-bjq.hzyun.com.cn"
                },
                body: JSON.stringify({ "phone": this.username, "password": this.getSign(this.password), "devid": "61ee00beee2d9280", "siteid": 6 }),
            },
                result = await httpRequest(options);
            //console.log(options);
            // console.log(result);
            if (result.status == 0) {
                $.DoubleLog(`✅账号[${this.index}] 获取COOKIE成功🎉`);
                this.member = result.data.id
                this.phone = result.data.phone

            } else {
                $.DoubleLog(`❌账号[${this.index}] 获取COOKIE失败`);
            }
        } catch (e) {
            console.log(e);
        }
    }
    creat_headers_post() {
        let timestamp = this.getTimeStamp();
        return {
            "user-agent": "Dart/2.18 (dart:io)",
            "time": timestamp,
            "accept-encoding": "gzip",
            //"content-length": 0
            "host": "wan-bjq.hzyun.com.cn",
            "content-type": "application/json; charset=utf-8",
            "authtoken": this.authToken,
            "sign": this.getSign(this.authToken + this.appSecret + timestamp),
        }

    };
    creat_headers_get() {
        let timestamp = this.getTimeStamp();
        return {
            "user-agent": "Dart/2.18 (dart:io)",
            "time": timestamp,
            "accept-encoding": "gzip",
            //"content-length": 0
            "host": "wan-bjq.hzyun.com.cn",
            "authtoken": this.authToken,
            "sign": this.getSign(this.authToken + this.appSecret + timestamp),
        }

    }
    getDate() {
        var date = new Date(); // 获取当前本地时间
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2); // 月份从0开始，所以要加1
        var day = ("0" + date.getDate()).slice(-2);
        var hours = ("0" + date.getHours()).slice(-2);
        var minutes = ("0" + date.getMinutes()).slice(-2);
        var seconds = ("0" + date.getSeconds()).slice(-2);
        var formattedDate = year + "/" + month + "/" + day + " " + hours + ":" + minutes + ":" + seconds;
        return formattedDate.toString();
    }
    getTimeStamp() {
        return new Date().getTime();
    }

    async getAuthToken() {
        let result = await this.getAuth()
        if (result.status == 0) {
            const a = result.data.apiData
            const i =
                a.substring(40, 45) +
                a.substring(5, 21) +
                a.substring(33, 36)
            this.authToken = this.Decrypt3Des(result.data.authToken, i);
        }
    }
    async getAuthInfo() {
        let options = { url: "https://wan-bjq.hzyun.com.cn/v1/authInfo" }
        let result = await httpRequest(options)
        return result
    }
    async getAuth() {
        let timestamp = this.getTimeStamp()
        let appSecret = this.appSecret
        let options = { url: "https://wan-bjq.hzyun.com.cn/v1/auth", headers: { "content-type": "application/json; charset=utf-8" }, body: JSON.stringify({ "appKey": this.appKey, "time": timestamp, "sign": this.getSign(appSecret + timestamp + appSecret.substring(2, 7)) }) }
        let result = await httpRequest(options)
        return result
    }
    async geAppSecret() {
        let authInfo = await this.getAuthInfo()
        if (authInfo.status == 0) {
            const a = authInfo.data.apiData
            const i =
                a.substring(38, 42) +
                a.substring(2, 16) +
                a.substring(31, 33) +
                a.substring(21, 25)
            this.appKey = this.Decrypt3Des(authInfo.data.appKey, i)
            this.appSecret = this.Decrypt3Des(authInfo.data.appSecret, i);
        } else {
        }
    }
    //
    Decrypt3Des(t, e) {
        const CryptoJS = require("crypto-js");
        var a = CryptoJS.enc.Utf8.parse(e),
            s = CryptoJS.enc.Base64.parse(t).toString(CryptoJS.enc.Utf8),
            n = CryptoJS.enc.Hex.parse(s),
            r = CryptoJS.enc.Base64.stringify(n);
        return CryptoJS.TripleDES.decrypt(r, a, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
        }).toString(CryptoJS.enc.Utf8);
    }

    getSign(data) {
        const crypto = require('crypto');
        const md5 = crypto.createHash('md5');
        const sign = md5.update(data).digest('hex');
        return sign
    }

    async user_score() {
        try {
            let options = {
                url: `https://wan-bjq.hzyun.com.cn/v1/amuc/api/member/score?id=${this.member}&appVersion=android3.4.4&curVersions=1&appID=2&siteId=6&longitude=0.0&latitude=0.0&location=`,
                headers: this.creat_headers_get(),
            },
                result = await httpRequest(options);
            //console.log(options);
            //console.log(result);
            if (result.status == 0) {

                $.DoubleLog(`✅账号[${this.index}] 【积分】[${result.data.score}]🎉`);
                this.user_point = result.data.score
            } else {
                $.DoubleLog(`❌账号[${this.index}]  [${result.message}]`);
                console.log(result);
            }
        } catch (e) {
            console.log(e);
        }
    }
    async event_start(eventType) {
        //2分享 0阅读 1点赞
        try {
            let options = {
                url: `https://wan-bjq.hzyun.com.cn/v1/event?appVersion=android3.4.4&curVersions=1&appID=2&siteId=6&longitude=0.0&latitude=0.0&location=`,
                headers: this.creat_headers_post(),
                body: JSON.stringify({ "id": 120350, "type": 0, "eventType": eventType, "userID": this.member, "userOtherID": 0, "channel": 2, "siteID": 6 })
            },
                result = await httpRequest(options);
            //console.log(options);
            //console.log(result);
            if (result.status == 0) {
                if (eventType == 0) {
                    await this.event_end(3)
                } else if (eventType == 1) {
                    await this.event_end(10)
                } else if (eventType == 2) {
                    await this.event_end(6)
                }
            } else {
                console.log(JSON.stringify(result));
            }
        } catch (e) {
            console.log(e);
        }
    }
    getUrlSign(paramsList) {
        let currentSign = null;
        try {
            const md = require('crypto').createHash('sha1');
            md.update(paramsList);
            currentSign = md.digest('hex');
        } catch (error) {
            console.error(error);
        }
        return currentSign;

    }
    async event_end(eType) {
        let time = this.getTimeStamp()
        let eStartTime = this.getDate()
        let paramsList = `{info={"eChannel":2,"eStartTime":"${eStartTime}","eType":${eType}}, member=${this.member}, time=${time}}`
        let sign = this.getUrlSign(paramsList)
        const eTypeList = {
            3: "阅读",
            10: "点赞",
            6: "分享",
            11: "直播",
        }
        //3阅读 10点赞  6分享 11直播
        try {
            let options = {
                url: `https://wan-bjq.hzyun.com.cn/v1/amuc/api/event/event?info=${encodeURIComponent(JSON.stringify({ "eChannel": 2, "eStartTime": eStartTime, "eType": eType }))}&member=${this.member}&time=${time}&sign=${sign}&siteID=6&appVersion=android3.4.4&curVersions=1&appID=2&siteId=6&longitude=0.0&latitude=0.0&location=`,
                headers: this.creat_headers_post(),
                body: "{}"
            },
                result = await httpRequest(options);
            //console.log(options);
            //console.log(result);
            if (result.status == 0) {
                $.DoubleLog(`✅账号[${this.index}]  完成${eTypeList[eType]}成功 获取积分${result.data.score}🎉`);
            } else {
                $.DoubleLog(`❌账号[${this.index}]  完成${eTypeList[eType]}失败`);
                console.log(JSON.stringify(result));
            }
        } catch (e) {
            console.log(e);
        }
    }
    /*async read(articleId) {
        try {
            let options = {
                url: `https://wan-bjq.hzyun.com.cn/v1/getArticleContent?articleId=${articleId}&siteId=6&userId=${this.member}&appVersion=android3.4.4&curVersions=1&appID=2&longitude=0.0&latitude=0.0&location=`,
                headers: this.creat_headers_get(),
            },
                result = await httpRequest(options);
            //console.log(options);
            //console.log(result);
            if (result.status == 0) {
                $.DoubleLog(`✅账号[${this.index}]  阅读文章成功🎉`);

            } else {
                $.DoubleLog(`❌账号[${this.index}]  阅读文章失败`);

                console.log(JSON.stringify(result));

            }
        } catch (e) {
            console.log(e);
        }
    }*/
    async articleList() {
        try {
            let options = {
                url: `https://wan-bjq.hzyun.com.cn/v1.6/getArticles?columnId=17&lastFileId=0&page=0&siteId=6&userId=${this.member}&appVersion=android3.4.4&curVersions=1&appID=2&longitude=0.0&latitude=0.0&location=`,
                headers: this.creat_headers_get(),
            },
                result = await httpRequest(options);
            //console.log(options);
            //console.log(result);
            if (result.status == 0) {
                for (let i = 0; i < result.data.list.length; i++) {
                    this.articleIdList.push(result.data.list[i].fileId)
                }
            } else {
                console.log(JSON.stringify(result));

            }
        } catch (e) {
            console.log(e);
        }
    }


}

async function start() {
    //await _getVersion();
    //await _getNotice();
    let taskall = [];
    for (let user of $.userList) {
        if (user.ckStatus) {
            taskall.push(await user.main());
        }
    }
    await Promise.all(taskall);
}

!(async () => {
    if (!(await checkEnv())) return;
    if ($.userList.length > 0) {
        await start();
    } await $.SendMsg($.message);
})().catch((e) => console.log(e)).finally(() => $.done());

//********************************************************
/**
 * 变量检查与处理
 * @returns
 */
async function checkEnv() {
    let userCookie = ($.isNode() ? process.env[ckName] : $.getdata(ckName)) || "";
    //let userCount = 0;
    if (userCookie) {
        // console.log(userCookie);
        let e = envSplitor[0];
        for (let o of envSplitor)
            if (userCookie.indexOf(o) > -1) {
                e = o;
                break;
            }
        for (let n of userCookie.split(e)) n && $.userList.push(new UserInfo(n));
        //userCount = $.userList.length;
    } else {
        console.log("未找到CK");
        return;
    }
    return console.log(`共找到${$.userList.length}个账号`), true; //true == !0
}

/////////////////////////////////////////////////////////////////////////////////////
function httpRequest(options, timeout = 1 * 1000) {
    method = options.method ? options.method.toLowerCase() : options.body ? "post" : "get";
    return new Promise(resolve => {
        setTimeout(() => {
            $[method](options, (err, resp, data) => {
                try {
                    if (err) {
                        console.log(JSON.stringify(err));
                        $.logErr(err);
                    } else {
                        try { data = JSON.parse(data); } catch (error) { }
                    }
                } catch (e) {
                    console.log(e);
                    $.logErr(e, resp);
                } finally {
                    resolve(data);
                }
            })
        }, timeout)
    })
}
/**
 * 获取远程版本
 */
async function _getVersion() {
    const options = { url: JSConfig.jsUrl };
    let httpResult = await httpRequest(options)
    const regex = /scriptVersionNow\s*=\s*(["'`])([\d.]+)\1/;
    const match = httpResult.match(regex);
    const scriptVersionLatest = match ? match[2] : "";
    $.DoubleLog(`\n====== 当前版本：${scriptVersionNow} 📌 最新版本：${scriptVersionLatest} ======`);
}
/**
 * 获取远程通知
 */
async function _getNotice() {
    const options = { url: JSConfig.noticeUrl };
    let httpResult = await httpRequest(options)
    const notice = httpResult.notice.replace(/\\n/g, "\n");
    $.DoubleLog(notice);
}
// ==================== API ==================== //
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, a) => { s.call(this, t, (t, s, r) => { t ? a(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.userList = []; this.userIdx = 0; this.message = ""; this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.encoding = "utf-8", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name},开始!`) } getEnv() { return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : void 0 } isNode() { return "Node.js" === this.getEnv() } isQuanX() { return "Quantumult X" === this.getEnv() } isSurge() { return "Surge" === this.getEnv() } isLoon() { return "Loon" === this.getEnv() } isShadowrocket() { return "Shadowrocket" === this.getEnv() } isStash() { return "Stash" === this.getEnv() } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const a = this.getdata(t); if (a) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, a) => e(a)) }) } runScript(t, e) { return new Promise(s => { let a = this.getdata("@chavy_boxjs_userCfgs.httpapi"); a = a ? a.replace(/\n/g, "").trim() : a; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [i, o] = a.split("@"), n = { url: `http://${o}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": i, Accept: "*/*" }, timeout: r }; this.post(n, (t, e, a) => s(a)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), a = !s && this.fs.existsSync(e); if (!s && !a) return {}; { const a = s ? t : e; try { return JSON.parse(this.fs.readFileSync(a)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), a = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : a ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const a = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of a) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, a) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[a + 1]) >> 0 == +e[a + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, a] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, a, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, a, r] = /^@(.*?)\.(.*?)$/.exec(e), i = this.getval(a), o = a ? "null" === i ? null : i || "{}" : "{}"; try { const e = JSON.parse(o); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), a) } catch (e) { const i = {}; this.lodash_set(i, r, t), s = this.setval(JSON.stringify(i), a) } } else s = this.setval(t, e); return s } getval(t) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.read(t); case "Quantumult X": return $prefs.valueForKey(t); case "Node.js": return this.data = this.loaddata(), this.data[t]; default: return this.data && this.data[t] || null } } setval(t, e) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.write(t, e); case "Quantumult X": return $prefs.setValueForKey(t, e); case "Node.js": return this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0; default: return this.data && this.data[e] || null } } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { switch (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"], delete t.headers["content-type"], delete t.headers["content-length"]), t.params && (t.url += "?" + this.queryStr(t.params)), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, a) => { !t && s && (s.body = a, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, a) }); break; case "Quantumult X": this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: a, headers: r, body: i, bodyBytes: o } = t; e(null, { status: s, statusCode: a, headers: r, body: i, bodyBytes: o }, i, o) }, t => e(t && t.error || "UndefinedError")); break; case "Node.js": let s = require("iconv-lite"); this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: a, statusCode: r, headers: i, rawBody: o } = t, n = s.decode(o, this.encoding); e(null, { status: a, statusCode: r, headers: i, rawBody: o, body: n }, n) }, t => { const { message: a, response: r } = t; e(a, r, r && s.decode(r.rawBody, this.encoding)) }) } } post(t, e = (() => { })) { const s = t.method ? t.method.toLocaleLowerCase() : "post"; switch (t.body && t.headers && !t.headers["Content-Type"] && !t.headers["content-type"] && (t.headers["content-type"] = "application/x-www-form-urlencoded"), t.headers && (delete t.headers["Content-Length"], delete t.headers["content-length"]), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient[s](t, (t, s, a) => { !t && s && (s.body = a, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, a) }); break; case "Quantumult X": t.method = s, this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: a, headers: r, body: i, bodyBytes: o } = t; e(null, { status: s, statusCode: a, headers: r, body: i, bodyBytes: o }, i, o) }, t => e(t && t.error || "UndefinedError")); break; case "Node.js": let a = require("iconv-lite"); this.initGotEnv(t); const { url: r, ...i } = t; this.got[s](r, i).then(t => { const { statusCode: s, statusCode: r, headers: i, rawBody: o } = t, n = a.decode(o, this.encoding); e(null, { status: s, statusCode: r, headers: i, rawBody: o, body: n }, n) }, t => { const { message: s, response: r } = t; e(s, r, r && a.decode(r.rawBody, this.encoding)) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let a = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in a) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? a[e] : ("00" + a[e]).substr(("" + a[e]).length))); return t } queryStr(t) { let e = ""; for (const s in t) { let a = t[s]; null != a && "" !== a && ("object" == typeof a && (a = JSON.stringify(a)), e += `${s}=${a}&`) } return e = e.substring(0, e.length - 1), e } msg(e = t, s = "", a = "", r) { const i = t => { switch (typeof t) { case void 0: return t; case "string": switch (this.getEnv()) { case "Surge": case "Stash": default: return { url: t }; case "Loon": case "Shadowrocket": return t; case "Quantumult X": return { "open-url": t }; case "Node.js": return }case "object": switch (this.getEnv()) { case "Surge": case "Stash": case "Shadowrocket": default: { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } case "Loon": { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } case "Quantumult X": { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl, a = t["update-pasteboard"] || t.updatePasteboard; return { "open-url": e, "media-url": s, "update-pasteboard": a } } case "Node.js": return }default: return } }; if (!this.isMute) switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: $notification.post(e, s, a, i(r)); break; case "Quantumult X": $notify(e, s, a, i(r)); break; case "Node.js": }if (!this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), a && t.push(a), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: this.log("", `❗️${this.name},错误!`, t); break; case "Node.js": this.log("", `❗️${this.name},错误!`, t.stack) } } wait(t) { return new Promise(e => setTimeout(e, t)) } DoubleLog(d) { if (this.isNode()) { if (d) { console.log(`${d}`); this.message += `\n ${d}` } } else { console.log(`${d}`); this.message += `\n ${d}` } } async SendMsg(m) { if (!m) return; if (Notify > 0) { if (this.isNode()) { var notify = require("./sendNotify"); await notify.sendNotify(this.name, m) } else { this.msg(this.name, "", m) } } else { console.log(m) } } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; switch (this.log("", `🔔${this.name},结束!🕛${s}秒`), this.log(), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: $done(t); break; case "Node.js": process.exit(1) } } }(t, e) }
//Env rewrite:smallfawn Update-time:23-07-26 newAdd:DoubleLog & SendMsg & ChangeMessage