const settings = require('../settings');
const colors = require('colors');
const fs = require('fs');
const sheet = require('../lib/sheet');
const util = require('./util');

if(process.argv.length == 4){
   	var email = process.argv[2];
   	var passwd = process.argv[3];
   	/** 登录到自己账号 **/
   	sheet.ticket(email,passwd).then(ticket=>{
   		util.commit(ticket).then(_=>{
   			console.log('提交成功'.green);
   		},failed=>{
   			console.log(`提交失败:${failed}`.red);
   		})
   	},failed=>{
   		console.log(`账号无效`.red);
   	})
}else{
	console.log(`参数不正确: npm run commit username passwd`.red);
}