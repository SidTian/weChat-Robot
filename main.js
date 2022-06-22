const axios = require("axios")
const headers = {
    'Content-Type': 'application/json',
    Authorization: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzg1Nzc3OTAzMyJ9.8jnk97GnRmqtQZmruWl6RptnCKMD8v5EWCMqhQ-ydMQl98KLVFhNICp01QgkojEIKRayEpxYDCsBNPZS9w4DrQ"
}
const {
    readLine,
    close
} = require('./read')
let wId = "bd23ec7b-ca52-44af-b4bd-a9eb22889b63"
async function interval() {
    let i = await readLine();
    while (+i !== 0) {
        if (i)
            break
    }
    close();
}

async function iPadLogin() {
    axios({
        method: "post",
        headers: headers,
        url: "http://122.237.103.224:9899/iPadLogin",
        data: JSON.stringify({
            "proxy": "2"
        })
    }).then(async (res) => {
        console.log(res.data);
        axios.get(res.data.data.qrCodeUrl)
        wId = res.data.data.wId
        await interval()
        simpleIPadLoginInfo()
    })
}

function simpleIPadLoginInfo() {
    axios({
        method: "post",
        headers: headers,
        url: "http://122.237.103.224:9899/simpleIPadLoginInfo",
        data: JSON.stringify({
            "wId": wId
        }),
    }).then(function (res) {
        console.log(res.data);
    })
}

function initAddressList() {
    axios({
        method: "post",
        headers: headers,
        url: "http://122.237.103.224:9899/initAddressList",
        data: JSON.stringify({
            "wId": wId
        }),
    }).then(function (res) {
        console.log(res.data);
        getAddressList()
    })
}

function getAddressList() {
    axios({
        method: "post",
        headers: headers,
        url: "http://122.237.103.224:9899/getAddressList",
        data: JSON.stringify({
            "wId": wId
        }),
    }).then(function (res) {
        console.log(res.data.data.friends);
    })
}

function getContact(wcId) {
    axios({
        method: "post",
        headers: headers,
        url: "http://122.237.103.224:9899/getAddressList",
        data: JSON.stringify({
            "wId": wId,
            wcId
        }),
    }).then(function (res) {
        console.log(res.data.data.friends);
    })
}

function sendText(text, target) {
    axios({
        method: "post",
        headers: headers,
        url: "http://122.237.103.224:9899/sendText",
        data: JSON.stringify({
            "wId": wId,
            "wcId": target,
            "content": text
        }),
    }).then(function (res) {
        console.log(res.data.data.friends);
    })
}

function weather() {
    axios({
        method: 'get',
        url: "https://devapi.qweather.com/v7/weather/now?location=120.65,28.02&key=5cfcc48c94204ca8963d4e8e3bed5d86",
    }).then((res) => {
        // console.log();
        sendText(JSON.stringify(res.data.now), "wxid_4992bnmtcoho12")
    })
}
weather()