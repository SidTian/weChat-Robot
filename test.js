const axios = require("axios")
const mysql = require("mysql")
const headers = {
    'Content-Type': 'application/json',
    Authorization: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzg1Nzc3OTAzMyJ9.8jnk97GnRmqtQZmruWl6RptnCKMD8v5EWCMqhQ-ydMQl98KLVFhNICp01QgkojEIKRayEpxYDCsBNPZS9w4DrQ"
}
let wId = "bd23ec7b-ca52-44af-b4bd-a9eb22889b63"
const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'weChat'
});

function getContact(wcId) {
    axios({
        method: "post",
        headers: headers,
        url: "http://122.237.103.224:9899/getContact",
        data: JSON.stringify({
            "wId": wId,
            wcId
        }),
    }).then(function (res) {
        let info = res.data.data[0];
        let value = [];
        for (let key in info) {
            if (!info[key])
                value.push(" ")
            else
                value.push(info[key])
        }
        database.query("INSERT INTO `info` ( `userName`, `nickName`, `remark`, `signature`, `sex`, `aliasName`, `country`, `bigHead`, `smallHead`, `labelList`, `v1`, `province`, `city`, `desc`, `cardImgUrl`, `phoneNumList`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", value, err => {
            if (err) return console.log(err);
            console.log("写入成功");
        })
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
        getAddressList()
    })
}

function getAddressList() {
    let i = 0
    axios({
        method: "post",
        headers: headers,
        url: "http://122.237.103.224:9899/getAddressList",
        data: JSON.stringify({
            "wId": wId
        }),
    }).then(function (res) {
        console.log(res.data.data.friends);
        let friends = res.data.data.friends
        setInterval(() => {
            getContact(friends[i])
            i++
        }, 3000);
    })
}

initAddressList()