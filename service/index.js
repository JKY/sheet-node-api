const express = require('express');
const router = express.Router();
const colors = require('colors');
const util = require('util');
const Sheet = require('../lib/sheet');

/**
 * 服务模版
 * 接收系统通知，处理
 *     1. 安装通知
 *     2. 配置信息
 *     3. 触发事件
 *     4. 卸载通知
 *
 */
router.post('/', function(req, resp, next) {
    let body = '';
    req.on('data', function(data) {
        body += data;
        if (body.length > 1e6) {
            req.connection.destroy();
        }
    });
    req.on('end', function() {
        try{
            util.log('==== service notification ===='.yellow);
            util.log(body);
            var payload = JSON.parse(body);
        }catch(e){
            return resp.json({err:'数据解析异常'})
        };
        switch(payload['event']){
            case 'installed':
                /*    { 
                 *        event:'installed', 
                 *        data:{ 
                 *            user: { 
                 *                uid: uid, 
                 *                sheet: doc['_id'] 
                 *            }, 
                 *            authorize: { 
                 *                uid: ..., 
                 *                ticket: .... 
                 *            } 
                 *        } 
                 *    } 
                 */
                var data = payload['data'];
                resp.json({
                    err:null
                });
                break;
            case 'conf':
                /* {
                 *     event:'conf',
                 *     data:{
                 *         authorize:{
                 *             uid: ....
                 *         },
                 *         conf: conf
                 *     }
                 * }
                 */
                var data = payload['data'];
                resp.json({
                    err:null
                });
                break;
            case 'removed':
                /*  {
                 *      event:'removed',
                 *      data:{
                 *          authorize:{
                 *              uid: ....
                 *          }
                 *      }
                 *  }  
                 */
                var data = payload['data'];
                resp.json({
                    err:null
                });
                break;
            case 'trigger':
                /* {
                 *    event:'trigger',
                 *    data:{
                 *         authorize: {
                 *             uid: ....
                 *         },
                 *        context:context,
                 *        data: ... ,
                 *        record: ... 
                 *    }
                 *  }
                 */
                resp.json({
                    err:null
                });
                break;
            case 'trigger':
                /* {
                 *    event:'cell.updated',
                 *    data:{
                 *         authorize: {
                 *             uid: ....
                 *         },
                 *        context:context,
                 *        data: ... ,
                 *        record: ... 
                 *    }
                 *  }
                 */
                var data = payload['data'];
                resp.json({
                    err:null
                });
                break;
        }
    });  
});

module.exports = router;