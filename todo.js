// 数据
var todos=[]
var localdata=localStorage.todos
var  todos=localdata?$.parseJSON(localdata):[]
var fs



// 后台数据库
var savaData=function(){
	localStorage.todos=JSON.stringify(todos)
}

// 渲染函数 绘制界面
var render=function(){
	if(fs=='All'){
	}else if(fs=='Active'){
		var xinj=[]
		$.each(todos,function(i,v){
			if(v.isDone!=='true'){
				xinj.push(v)
			}
		})
		todos=xinj
	}else if(fs=='Completed'){
		var xinj=[]
		$.each(todos,function(i,v){
            xinj.push(v)
		})
		
	}
	$('#todo-list').append(function(){
       $('#todo-list').empty()
		return $.map(todos,function(v){
			var tmp=v.isDone?'checked':''
			return  ['<li data-id='+v.id+' class="'+(v.isDone?'completed':'')+'"><div class="view"><input '+(v.isDone?'checked':'')+' type="checkbox" class="toggle"><label>'+v.content+'</label><button class="destroy"></button></div><input type="text" class="edit" value='+v.content+'></li>']
		}) 
	})
}
render()

// 添加
var addtodo=function(e){
  var zhi=$.trim($(this).val())
  if(e.keyCode==13&&$.trim(zhi)!==''){
  	var todo={id:todos.length?(Math.max.apply(null,$.map(todos,function(v){
  		return v.id
  	})))+1:1001,content:zhi,isDone:''}
  	todos.push(todo)
  	$(this).val('')
  	render()
  	savaData()
  	
  }
}

$('#new-todo').on('keyup',addtodo)

// 删除
 var deletetodo=function(){
  var id=parseInt($(this).closest('li').attr('data-id'))
  todos=$.grep(todos,function(v){
  	return v.id!==id
  })
  render()
  savaData()
  
 }

$('#todo-list').on('click','.destroy',deletetodo)

// 改状态
var gai=function(){
	var state=$(this).prop('checked')
	var id=parseInt($(this).closest('li').attr('data-id'))
	$.each(todos,function(i,v){
      if(v.id==id){
      	v.isDone=state
      }
	})
    savaData()
    render()
}
$('#todo-list').on('click','.toggle',gai)

// 改内容
var gaineirong=function(){
	var id=parseInt($(this).closest('li').attr('data-id'))
	var self=this
	$.each(todos,function(i,v){
       if(v.id==id){
       	v.content=$(self).val()
       }
	})
	savaData()
	render()
}
$('#todo-list').on('change','.edit',gaineirong)

$('#todo-list').on('dblclick','li',function(){
	$(this).addClass('editing')
    $(this).find('.edit').focus()
})
$('#todo-list').on('focusout','.edit',function(){
	$(this).closest('li').removeClass('editing')
})

// 展开收起
$('#filters a').on('click',function(){
  $(this).addClass('selected')
  fs=$(this).text()
  savaData()
  render()
})