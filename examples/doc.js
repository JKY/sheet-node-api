const util = require('util');
const sheet = require('../lib/sheet');
const colors = require('colors');

/**
 *  实际使用中可以将 TICKET 保存到数据库中
 *  注意: 每调用一次 ticket 接口都会导致之前的 ticket 作废, 用户在前端界面登录时
 *  也会调用 ticket 接口;
 */
let __ticket = require('./ticket');


/**
 * 创建文档一个名称为 foo 的文档, 并将 A 列命名为 "标题"
 */
let createSheet = function(){
	__ticket().then(ticket=>{
		sheet.create(ticket,'foo',{
			A:'标题'
		}).then(sheetid=>{
			util.log(`sheet created:${sheetid}`.green);
		})
	});
};


/**
 * 获取账号下所有的文档列表
 */
let getAllSheets = function(){
	__ticket().then(ticket=>{
		sheet.all(ticket).then(docs=>{
			console.log(JSON.stringify(docs,null,4).green);
		})
	});
};


/**
 * 修改表格列的属性, 将指定表格的 A 列名称修改为 foo
 */
let setColumnAttr = function(){
	__ticket().then(ticket=>{
		sheet.attr(ticket,'aaa','A','label','foo').then(_=>{
			util.log(`设置成功`.green);
		},failed=>{
			util.log(`${failed}`.red);
		})
	});
};


/**
 * 删除文档
 */
let deleteSheet = function(sheetid){
	__ticket().then(ticket=>{
		sheet.delete(ticket,sheetid).then(_=>{
			util.log(`删除成功`.green);
		},failed=>{
			util.log(`${failed}`.red);
		})
	});
};

