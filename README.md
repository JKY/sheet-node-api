程序接口
===
通过应用程序接口您可以对表格中的数据进行管理,根据自己的业务对表格的功能进行扩展,在表格上执行定制化的自动化处理任务或为前端应用提供特殊的功能逻辑, 通过本章节您会了解到通过表格接口将数据与其他系统进行对接以及如何对前端应用调用的服务进行扩展, 具体文档参见: https://postio.me/tutorial/doc 

配置
=== 
在 settings.js 中可对服务进行配置

```
/* 服务地址, 系统会发送通知到此地址 */
endpoint:'http://localhost:8001',
/* 触发条件 */
trigger:'cell.updated',
/* 服务名称, 不能重复 */
name:'foo',
/* 显示的服务名称 */
label:'测试',
/* 服务描述 */
desc:'foo',
/* 搜索关键字 */
keywords:'test',
/* 是否公开 */
public:false,
/* 用户设置 */
user:{
	/* 用户安装服务后的设置, 具体内容参见文档 */
	conf: []
}

```

运行
===

安装依赖
```
npm install 
```

运行
```
node app.js 
```


提交服务
```
npm run commit USERNAME PASSWORD
```
