const settings = require('../settings');
const colors = require('colors');
const fs = require('fs');
const request = require('request');
const url = require('url');
/**
 * 测试请求
 */
let __rq = function(data, desc) {
    return new Promise((resolve, reject) => {
        request({
            url: settings.service.endpoint,
            method: 'POST',
            body: JSON.stringify(data)
        }, (err, resp, body) => {
            if (err || resp.statusCode != 200) {
                reject(`测试失败:${desc}`);
            } else {
                var result = JSON.parse(body);
                if (!result['err']) {
                    resolve()
                } else {
                    reject(result['err']);
                }
            }
        })
    });
};

/**
 * 测试接口是否正常
 */
let __ping = function() {
    /** 安装事件 **/
    return __rq({
        event: 'installed',
        data: {
            user: {
                uid: '__mocked_uid',
                sheet: '__mocked_sheet'
            },
            authorize: {
                uid: '__mocked_uid',
                ticket: '__mocked_ticket'
            }
        }
    }, '安装事件').then(_ => {
        return __rq({
            event: 'conf',
            data: {
                authorize: {
                    uid: '__mocked_uid'
                },
                conf: {
                    foo: 1
                }
            }
        }, '用户配置更新事件')
    }).then(_ => {
        return __rq({
            event: 'trigger',
            data: {
                authorize: { uid: '__mocked_uid' },
                context: { foo: 1 },
                data: { a: 1 },
                record: { A: 1, B: 2, C: 3 }
            }
        }, '服务触发')
    }).then(_=>{
    	return __rq({
            event: 'removed',
            data: {
                authorize: { uid: '__mocked_uid' }
            }
        }, '用户移除服务事件')
    })
};

/**
 * 提交服务
 */
const commitPackage = function(ticket) {
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + '/../service/manifest.json', { encoding: 'utf8' }, function(err, str) {
            if (err) {
                util.log(err)
            } else {
                var conf = JSON.parse(str);
                conf['name'] = settings.service.name;
                conf['trigger'] = settings.service.trigger;
                conf['label'] = settings.service.label;
                conf['uri'] = settings.service.endpoint;
                conf['desc'] = settings.service.desc;
                conf['keywords'] = settings.service.keywords;
                conf['public'] = settings.service.public;
                conf['conf'] = settings.service.user.conf;
                request({
                    url: `https://sheet.postio.me/api/service`,
                    method: 'POST',
                    headers: {
                        ticket: ticket
                    },
                    body: JSON.stringify(conf)
                }, (err, resp, body) => {
                    if (err || resp.statusCode != 200) {
                        reject(`网络错误`);
                    } else {
                        var result = JSON.parse(body);
                        if (!result['err']) {
                            resolve()
                        } else {
                            reject(result['err']);
                        }
                    }
                })
            }
        })
    });
};


module.exports = {
    commit: function(ticket){
        var _url = url.parse(settings.service.endpoint);
        if(_url.hostname == 'localhost' ||
           _url.hostname == '127.0.0.1' || 
           _url.hostname.indexOf('192.168') == 0){
           return Promise.reject(`系统无法访问您本地的服务`);
        };
        return __ping().then(_=>{
            return commitPackage(ticket)
        });
    }
}

