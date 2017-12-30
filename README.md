## 程序接口
通过应用程序接口您可以对表格中的数据进行管理,根据自己的业务对表格的功能进行扩展,在表格上执行定制化的自动化处理任务或为前端应用提供特殊的功能逻辑, 通过本章节您会了解到通过表格接口将数据与其他系统进行对接以及如何对前端应用调用的服务进行扩展
具体文档参见: https://postio.me/tutorial/doc

## 服务配置

* endpoint: 服务地址, 系统会发送通知到此地址
* trigger:  触发条件
* name: 服务名称
* label: 显示的服务名称
* desc: 服务描述
* keywords: 搜索的关键字
* public: 是否为公开服务
* user.conf: 用户设置选项

### 安装依赖

```
npm install 
```

### 运行服务

```
node app.js 
```

## 发布服务

```
npm run commit USERNAME PASSWORD
```