const request = require('request');

let CONF = {
	DOMAIN:'http://localhost:9010'
};

module.exports = {
	/**
	 * 获取接口凭证
	 */
	ticket: function(email,passwd){
		return new Promise((resolve,reject)=>{
			request({
				url:`${CONF.DOMAIN}/api/usr`,
				method:'POST',
				body: JSON.stringify({
					action:'login',
					email:email,
					passwd:passwd
				})
			},(err,resp,body)=>{
				if(err || resp.statusCode != 200){
					reject(`暂时无法获取凭证`);
				}else{
					var result = JSON.parse(body);
					if(!result['err']){
						resolve(result['result']['ticket'])
					}else{
						reject(result['err']);
					}
				}
			})	
		});
	},


	/**
	 * 文档管理
	 */
	sheet: {
		/**
		 * 创建表格
		 * return sheetid
		 */
		create:function(ticket,name,columns){
			return new Promise((resolve,reject)=>{
				request({
					url:`${CONF.DOMAIN}/api/sheet`,
					method:'PUT',
					headers:{
						ticket:ticket
					},
					body: JSON.stringify({
						name:name,
						columns:columns
					})
				},(err,resp,body)=>{
					if(err || resp.statusCode != 200){
						reject(`网络错误`);
					}else{
						var result = JSON.parse(body);
						if(!result['err']){
							resolve(result['result']['id'])
						}else{
							reject(result['err']);
						}
					}
				})	
			});
		},

		/**
		 * 获取文档列表
		 */
		all: function(ticket){
			return new Promise((resolve,reject)=>{
				request({
					url:`${CONF.DOMAIN}/api/sheet`,
					method:'GET',
					headers:{
						ticket:ticket
					}
				},(err,resp,body)=>{
					if(err || resp.statusCode != 200){
						reject(`网络错误`);
					}else{
						var result = JSON.parse(body);
						if(!result['err']){
							resolve(result['result'])
						}else{
							reject(result['err']);
						}
					}
				})	
			});
		},

		/**
		 * 设置表格属性
		 */
		attr: function(ticket,sheet,key,attr,value){
			return new Promise((resolve,reject)=>{
				request({
					url:`${CONF.DOMAIN}/api/sheet/${sheet}/column`,
					method:'POST',
					headers:{
						ticket:ticket
					},
					body:JSON.stringify(
						{ 'key':key, 'attr':attr, 'value':value }
					)
				},(err,resp,body)=>{
					if(err || resp.statusCode != 200){
						reject(`网络错误`);
					}else{
						try{
							var result = JSON.parse(body);
						}catch(ex){
							return reject('文档未找到或服务器错误');	
						};
						if(!result['err']){
							resolve()
						}else{
							reject(result['err']);
						}
					}
				})	
			});
		},

		/**
		 * 删除文档
		 */
		delete:function(ticket,sheetid){
			return new Promise((resolve,reject)=>{
				request({
					url:`${CONF.DOMAIN}/api/sheet/${sheetid}`,
					method:'DELETE',
					headers:{
						ticket:ticket
					}
				},(err,resp,body)=>{
					if(err || resp.statusCode != 200){
						reject(`无法删除表格`);
					}else{
						var result = JSON.parse(body);
						if(!result['err']){
							resolve()
						}else{
							reject(result['err']);
						}
					}
				})	
			});
		},


		/**
		 * 授权给其他人
		 */
		grant:function(ticket,sheetid,to){
			return new Promise((resolve,reject)=>{
				request({
					url:`${CONF.DOMAIN}/api/sheet/${sheetid}/grant/${to}`,
					method:'PUT',
					headers:{
						ticket:ticket
					}
				},(err,resp,body)=>{
					if(err || resp.statusCode != 200){
						reject(`无法授权表格`);
					}else{
						var result = JSON.parse(body);
						if(!result['err']){
							resolve()
						}else{
							reject(result['err']);
						}
					}
				})	
			});
		},

		/**
		 * 取消授权
		 */
		degrant:function(ticket,sheetid,to){
			return new Promise((resolve,reject)=>{
				request({
					url:`${CONF.DOMAIN}/api/sheet/${sheetid}/grant/${to}`,
					method:'DELETE',
					headers:{
						ticket:ticket
					}
				},(err,resp,body)=>{
					if(err || resp.statusCode != 200){
						reject(`无法授权表格`);
					}else{
						var result = JSON.parse(body);
						if(!result['err']){
							resolve()
						}else{
							reject(result['err']);
						}
					}
				})	
			});
		},

		/**
		 * 记录管理
		 */
		record: {
			/**
			 * 添加一条记录
			 * 参数:
			 *	  ticket: 接口凭证
			 *	  sheet: 文档id
			 *    context: 上下文对象, 供被触发的服务会使用
			 *	  data: 附带的数据, 供被触发的服务会使用
			 *    record: 记录值 { A: 1, B: 2 ... } 
			 */
			insert:function(ticket,sheet,context,data,record){
				return new Promise((resolve,reject)=>{
					request({
						url:`${CONF.DOMAIN}/api/sheet/${sheet}/record`,
						method:'PUT',
						headers:{
							ticket:ticket
						},
						body:JSON.stringify({
							context:context,
							data:data,
							record:record
						})
					},(err,resp,body)=>{
						if(err || resp.statusCode != 200){
							reject(`网络错误`)
						}else{
							try{
								var data = JSON.parse(body);
							}catch(ex){
								return reject('文档未找到或服务器错误');	
							};
							if(data['err']){
								reject(data['err'])
							}else{
								resolve(data['result'])
							}
						}
					})
				})
			},

			/**
			 * 读取指定行的记录 
			 * 参数:
			 *	  ticket: 接口凭证
			 *	  sheet: 表格 id
			 *    n: 从 0 开始的行数 
			 */
			get: function(ticket,sheet,n){
				return new Promise((resolve,reject)=>{
					request({
						url:`${CONF.DOMAIN}/api/sheet/${sheet}/record/${n}`,
						method:'GET',
						headers:{
							ticket:ticket
						}
					},(err,resp,body)=>{
						if(err || resp.statusCode != 200){
							reject(`网络错误`)
						}else{
							try{
								var data = JSON.parse(body);
							}catch(ex){
								return reject('文档未找到或服务器错误');	
							};
							if(data['err']){
								reject(data['err'])
							}else{
								resolve(data['result'])
							}
						}
					})
				})
			}
		},

		/**
		 * 单元格
		 */
		cell: {
			/**
			 * 设置指定单元格内容
			 * 参数:
			 *	  ticket: 接口凭证
			 *	  sheet: 文档id
			 *    key: A ~ K 的键值
			 *	  row: 从 0 开始的行号
			 *    value: 单元格内容
			 */
			value:function(ticket,sheet,key,row,value){
				return new Promise((resolve,reject)=>{
					request({
						url:`${CONF.DOMAIN}/api/sheet/${sheet}/cell`,
						method:'POST',
						headers:{
							ticket:ticket
						},
						body:JSON.stringify({
							position:{
								key:key,
								row:row
							},
							value:value
						})
					},(err,resp,body)=>{
						if(err || resp.statusCode != 200){
							reject(`网络错误`)
						}else{
							try{
								var data = JSON.parse(body);
							}catch(ex){
								return reject('文档未找到或服务器错误');	
							};
							if(data['err']){
								reject(data['err'])
							}else{
								resolve()
							}
						}
					})
				})
			},

			/**
			 * 清空单元格内容
			 * 参数:
			 *	  ticket: 接口凭证
			 *	  sheet: 文档id
			 *    key: A ~ K 的键值
			 *	  row: 从 0 开始的行号
			 */
			clear: function(ticket,sheet,key,row){
				return new Promise((resolve,reject)=>{
					request({
						url:`${CONF.DOMAIN}/api/sheet/${sheet}/cell`,
						method:'DELETE',
						headers:{
							ticket:ticket
						},
						body:JSON.stringify({
								key:key,
								row:row
						})
					},(err,resp,body)=>{
						if(err || resp.statusCode != 200){
							reject(`网络错误`)
						}else{
							try{
								var data = JSON.parse(body);
							}catch(ex){
								return reject('文档未找到或服务器错误');	
							};
							if(data['err']){
								reject(data['err'])
							}else{
								resolve(data['result'])
							}
						}
					})
				})
			},

			style: {
				/**
				 * 设置指定单元格样式
				 * 参数:
				 *	  ticket: 接口凭证
				 *	  sheet: 文档id
				 *    key: A ~ K 的键值
				 *	  row: 从 0 开始的行号
				 *    name: 样式名称, 可选值: 具体参见文档
				 *	  value: 样式值,  可选值: 具体参见文档
				 */
				set:function(ticket,sheet,key,row,name,value){
					return new Promise((resolve,reject)=>{
						var style = {};
						/**
						 * 可以同时设置多个属性
						 */
						style[name] = value;
						request({
							url:`${CONF.DOMAIN}/api/sheet/${sheet}/style`,
							method:'POST',
							headers:{
								ticket:ticket
							},
							body:JSON.stringify({
								position:{
									key:key,
									row:row
								},
								style:style
							})
						},(err,resp,body)=>{
							if(err || resp.statusCode != 200){
								reject(`网络错误`)
							}else{
								try{
									var data = JSON.parse(body);
								}catch(ex){
									return reject('文档未找到或服务器错误');	
								};
								if(data['err']){
									reject(data['err'])
								}else{
									resolve()
								}
							}
						})
					})
				},

				/**
				 * 清空单元格内容
				 * 参数:
				 *	  ticket: 接口凭证
				 *	  sheet: 文档id
				 *    key: A ~ K 的键值
				 *	  row: 从 0 开始的行号
				 */
				clear: function(ticket,sheet,key,row){
					return new Promise((resolve,reject)=>{
						request({
							url:`${CONF.DOMAIN}/api/sheet/${sheet}/cell`,
							method:'DELETE',
							headers:{
								ticket:ticket
							},
							body:JSON.stringify({
									key:key,
									row:row
							})
						},(err,resp,body)=>{
							if(err || resp.statusCode != 200){
								reject(`网络错误`)
							}else{
								try{
									var data = JSON.parse(body);
								}catch(ex){
									return reject('文档未找到或服务器错误');	
								};
								if(data['err']){
									reject(data['err'])
								}else{
									resolve(data['result'])
								}
							}
						})
					})
				}
				////
			}
		},


		/**
		 * 服务管理
		 */
		service: {
			/**
			 * 获取已安装服务
			 * 参数:
			 *	  ticket: 接口凭证
			 *	  sheet: 文档id
			 */
			installed:function(ticket,sheet){
				return new Promise((resolve,reject)=>{
					request({
						url:`${CONF.DOMAIN}/api/service`,
						method:'GET',
						headers:{
							ticket:ticket
						}
					},(err,resp,body)=>{
						if(err || resp.statusCode != 200){
							reject(`网络错误`)
						}else{
							try{
								var data = JSON.parse(body);
							}catch(ex){
								return reject('文档未找到或服务器错误');	
							};
							if(data['err']){
								reject(data['err'])
							}else{
								resolve(data['result'])
							}
						}
					})
				})
			},

			/**
			 * 触发服务
			 *	  ticket: 接口凭证
			 *	  sheet: 文档id
			 *    row: 从 0 开始的行号, 此行记录会被发送给服务进行处理
			 *    name: 服务名称
			 *    context: 传送给服务的上下文对象, 具体内容见相关服务文档
			 *    data: 发送给服务的数据对象
			 */
			trigger:function(ticket,sheet,row,name,context,data){
				return new Promise((resolve,reject)=>{
					request({
						url:`${CONF.DOMAIN}/api/sheet/${sheet}/${row}/service/${name}`,
						method:'PUT',
						headers:{
							ticket:ticket
						},
						body:JSON.stringify({
							context:context,
							data:data
						})
					},(err,resp,body)=>{
						if(err || resp.statusCode != 200){
							reject(`网络错误`)
						}else{
							try{
								var data = JSON.parse(body);
							}catch(ex){
								return reject('文档未找到或服务器错误');	
							};
							if(data['err']){
								reject(data['err'])
							}else{
								resolve(data['result'])
							}
						}
					})
				})
			},
		}
	}
}