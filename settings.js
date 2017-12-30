module.exports = {
	service:{
		endpoint:'http://localhost:8001',
		trigger:'cell.updated',
		name:'foo',
		label:'测试',
		desc:'foo',
		keywords:'test',
		public:false,
		user:{
			conf: [
				{
					"name":"a",
					"label":"名称",
					"type":"selector",
					"value":"",
					"options":[
						{ "label":"A","value":"A"},
						{ "label":"B","value":"B"},
						{ "label":"C","value":"C"},
					]
				}
			]
		}
	},
	port:8001
}