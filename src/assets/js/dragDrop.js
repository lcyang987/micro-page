export default class DragDrop{
	constructor(opt){
		for(let i in opt){
			this[i]=opt[i];
		}
		if(!this.eles.length)
			return;
		this.eles[0].parentNode.setAttribute('dragContainer',true);
		const _this=this;
		for(let i=0;i<this.eles.length;i++){
			this.createAction(this.eles[i]);
			this.eles[i].setAttribute('relative',true);
			this.eles[i].setAttribute('index',i);
			this.eles[i].onmouseenter=function(){
				_this.mouseenter(this);
			}
			this.eles[i].onmouseleave=function(){
				_this.mouseleave(this);
			}
			this.eles[i].onclick=function(){
				_this.click(this);
			}
			this.eles[i].onmousedown=function(ev){
				let oEvent=ev||window.event;
				_this.mousedown({
					obj:this,
					oEvent:oEvent
				});
			}
		}
	}
	createElement(opt){
		let obj=document.createElement(opt.tagName);
		if(opt.insert)
			opt.container.insertBefore(obj,opt.insert);
		else
			opt.container.appendChild(obj);
		obj.className=opt.className;
		return obj;
	}
	actionHeight(obj,action){
		if(action)
			obj.action=action
		let relativeWidth=parseInt(getComputedStyle(obj.action,false)['borderWidth'])*2;
		obj.action.style.width=obj.offsetWidth-relativeWidth+'px';
		obj.action.style.height=obj.offsetHeight-relativeWidth+'px';
//		console.log(obj.offsetHeight,relativeWidth)////////////////////////////??????????????????????????????????????????
	}
	createAction(container){
//		let action=this.createElement({
//			tagName:'div',
//			container:container,
//			className:'actions'
//		});
		let action=container.querySelector('.actions');
		container.action=action;
		this.actionHeight(container);
	}
	mouseenter(obj){
//		if(!obj.action){
//			this.createAction(obj);
//			obj.setAttribute('relative',true);
//		}else{
			this.actionHeight(obj);
//		}
		obj.setAttribute('current',true);
		if(this.isDrag&&this.isDrag!=obj&&!this.isDrag.getAttribute('drag')){
			obj.setAttribute('select',true);
		}
	}
	mouseleave(obj){
		obj.removeAttribute('current');
		obj.removeAttribute('select');
	}
	click(obj){
		if(obj.parentNode.querySelector('[active=true]'))
			obj.parentNode.querySelector('[active=true]').removeAttribute('active');
		obj.setAttribute('active',true);
	}
	offsetTop(obj){
		var num=0;
		(function numPlus(obj){
			num+=obj.offsetTop;
			if(obj.offsetParent!==document.body)
				numPlus(obj.offsetParent)
		})(obj);
//		console.log(num)
		num-=document.documentElement.scrollTop+document.body.scrollTop;
//		console.log(num,document.documentElement.scrollTop+document.body.scrollTop)
		return num;
	}
	mousemove1(opt){//不拖拽只移位
		const disY=opt.disY;
		this.isDrag=this.oldActive=opt.obj;
		if(this.oldActive)
			this.oldActive.removeAttribute('active');
		this.isDrag.setAttribute('active',true);
		const _this=this;
		window.onmousemove=ev=>{
			let oEvent=ev||window.event;
			for(let i=0;i<this.eles.length;i++){
				this.eles[i].onmousemove=function(ev){
					if(_this.isDrag&&_this.isDrag!=this){
						let oEvent=ev||window.event;
						if(this.offsetHeight/2>Math.abs(_this.offsetTop(this)-oEvent.clientY)){
							this.parentNode.insertBefore(_this.isDrag,this);
						}else{
							this.parentNode.insertBefore(this,_this.isDrag);
						}
					}
				}
			}
		}
		window.onmouseup=ev=>{
			window.onmousemove=window.onmouseup=null;
			for(let i=0;i<this.eles.length;i++){
				this.eles[i].onmousemove=null;
			}
			this.isDrag.removeAttribute('active');
			this.isDrag=false;
			document.body.style.userSelect='';
		}
	}
	mousemove2(opt){//拖拽移位
		this.isDrag=this.oldActive=opt.obj;
		const disY=opt.disY-this.offsetTop(this.isDrag)+this.offsetTop(this.isDrag.offsetParent);
		if(this.oldActive)
			this.oldActive.removeAttribute('drag');
		this.isDrag.placeholder=this.createElement({
			tagName:'div',
			container:opt.obj.parentNode,
			insert:opt.obj,
			className:'placeholder'
		});
		const _this=this;
		this.isDrag.style.top=opt.disY-disY+'px';
		this.isDrag.placeholder.style.height=this.isDrag.offsetHeight+'px';
		this.isDrag.setAttribute('drag',true);
		window.onmousemove=ev=>{
			let oEvent=ev||window.event;
			this.isDrag.style.top=oEvent.clientY-disY+'px';
			for(let i=0;i<this.eles.length;i++){
				if(this.eles[i]!==this.isDrag.placeholder&&this.eles[i]!==this.isDrag)
					if(this.offsetTop(this.eles[i])<oEvent.clientY&&this.offsetTop(this.eles[i])+this.eles[i].offsetHeight>oEvent.clientY){
						if(this.offsetTop(this.eles[i])+this.eles[i].offsetHeight-oEvent.clientY>oEvent.clientY-this.offsetTop(this.eles[i])){
							_this.isDrag.parentNode.insertBefore(_this.isDrag.placeholder,this.eles[i]);
						}else{
							_this.isDrag.parentNode.insertBefore(this.eles[i],_this.isDrag.placeholder);
						}
					}
				}
		}
		window.onmouseup=ev=>{
			setTimeout(()=>{
				window.onmousemove=window.onmouseup=null;
				this.isDrag.parentNode.insertBefore(this.isDrag,this.isDrag.placeholder);
				this.isDrag.placeholder.parentNode.removeChild(this.isDrag.placeholder);
				this.oldActive.removeAttribute('drag');
				this.isDrag.style.top='';
				this.isDrag=false;
				document.body.style.userSelect='';
//				console.log(this.eles[this.index],this.index,this.eles.length)
//				if(this.eles[this.index])
//					this.eles[this.index].setAttribute('active',true)
				
			},0)
//			var arr=[];
//			for(var i=0;i<this.eles.length;i++){
//				arr.push(parseInt(this.eles[i].getAttribute('index')));
//			}
//			var result=[];
//			for(var i=0;i<arr.length;i++){
//				result[arr.indexOf(i)]=this.vue.data[arr[arr.indexOf(i)]];
////				console.log(arr.indexOf(i),arr[arr.indexOf(i)],this.vue.data[arr[arr.indexOf(i)]]);
//			}
////			for(var i=0;i<this.eles.length;i++){
////				this.eles[i].setAttribute('index',i);
////			}
//			setTimeout(()=>{
//				this.vue.data=result;
//				for(var i=0;i<this.vue.data.length;i++){
//					console.log(this.vue.data[i].str)
//				}
//			},0);
		}
	}
	mousedown(opt){
//		console.log(this.eles)
//		console.log(this.index);
		this.mousemove2({
			disY:opt.oEvent.clientY,
			obj:opt.obj
		});
		document.body.style.userSelect='none';
	}
}