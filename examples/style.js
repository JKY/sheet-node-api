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
 *		column: A ~ K 的键值, 指定哪一列
 *		row: 从 0 开始的行号, 指定哪一行
 *		value: 值
 */
let setCellStyle = function(sheet,column,row,name,value){
	__ticket().then(ticket=>{
		Sheet.cell.style.set(ticket,sheet,column,row,name,value).then(_=>{
			util.log('设置成功'.green);
		},fail=>{
			util.log(fail.red);
		})
	});
};


