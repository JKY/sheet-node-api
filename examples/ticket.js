const util = require('util');
const sheet = require('../lib/sheet');
const colors = require('colors');
/**
 *  实际使用中可以将 TICKET 保存到数据库中
 *  注意: 每调用一次 ticket 接口都会导致之前的 ticket 作废, 用户在前端界面登录时
 *  也会调用 ticket 接口;
 */
var USER = 'foo@postio.me';
var PASSWD = '123456';
var TICKET = '';

let __ticket = module.exports = function(){
	return new Promise((resolve,reject)=>{
		if(!TICKET){
			return sheet.ticket(USER,PASSWD).then(ticket=>{
				/* 保存到全局 */
				TICKET = ticket;
				resolve(ticket);
			},failed=>{
				reject(failed);
			});
		}else{
			return TICKET;
		}
	});
};

