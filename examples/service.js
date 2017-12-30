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
 *  设置单元格样式
 *  参数:
 *		sheet: 表格 id
 */
let getServiceInstalled = function(){
	__ticket().then(ticket=>{
		Sheet.service.installed(ticket).then(result=>{
			util.log(JSON.stringify(result,null,4).green);
		},fail=>{
			util.log(fail.red);
		})
	});
};


/**
 *  触发服务
 *  参数:
 *	  sheet: 文档id
 *    row: 从 0 开始的行号, 此行记录会被发送给服务进行处理
 *    name: 服务名称
 *    context: 传送给服务的上下文对象, 具体内容见相关服务文档
 *    data: 发送给服务的数据对象
 */
let triggerService = function(sheet,row,name,context,data){
	__ticket().then(ticket=>{
		Sheet.service.trigger(ticket,sheet,row,name,context,data).then(result=>{
			util.log(JSON.stringify(result,null,4).green);
		},fail=>{
			util.log(fail.red);
		})
	});
};



