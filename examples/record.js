const util = require('util');
const Sheet = require('../lib/sheet');
const colors = require('colors');

/**
 *  实际使用中可以将 TICKET 保存到数据库中
 *  注意: 每调用一次 ticket 接口都会导致之前的 ticket 作废, 用户在前端界面登录时
 *  也会调用 ticket 接口;
 */
let __ticket = require('./ticket');


/**
 * 插入记录,参数:
 *	  sheet: 表格 id,
 *	  data: 插入数据 { A: 1, B: 2 ... }
 */
let insertRecord = function(sheet,data){
	__ticket().then(ticket=>{
		Sheet.record.insert(ticket,sheet,null,null,data).then(result=>{
			util.log(JSON.stringify(result,null,4).green);
		},fail=>{
			util.log(fail.red);
		})
	});
};


/**
 * 读取记录,参数:
 *	  sheet: 表格id,
 *	  n: 从  0 开始的行数
 */
let getRecord = function(sheet,n){
	__ticket().then(ticket=>{
		Sheet.record.get(ticket,sheet,n).then(result=>{
			util.log(JSON.stringify(result,null,4).green);
		},fail=>{
			util.log(fail.red);
		})
	});
};
