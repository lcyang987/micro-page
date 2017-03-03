<template>
	<div class="search" :style="{backgroundColor:result.attr.backgroundColor}">
		<input type="text" :placeholder="result.attr.placeholder"  />
		<actionsComponent :data="data" :result="result" :index="index"></actionsComponent>
	</div>
</template>
<script>
export default {
  	name: 'search',
	props: ["result","index","data"]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.search{
		padding:10px;
		input{
			width:100%;
			text-indent:34px;
			background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTI0MDQ0Q0Y1Qjc3MTFFNkIzQ0JEQjJGNjc0MTQzMjMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTI0MDQ0RDA1Qjc3MTFFNkIzQ0JEQjJGNjc0MTQzMjMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowMTI4OURFMDVCNUIxMUU2QjNDQkRCMkY2NzQxNDMyMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5MjQwNDRDRTVCNzcxMUU2QjNDQkRCMkY2NzQxNDMyMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjXqWrwAAAJeSURBVHjatJZPSFRRFIffaNSiSAVpE0IZCO0CLcgcXKglJNEMMVTirrYFUSvX7mKgZRhtwmjGyAwC+7cIrRY15S4oxoQhKIhUahVEfQd+L54X3/M5XQ98nOt4z/lx3r333JsplUrBOpaDLByBNmiFb1CDFzBbKBSmgpSWSRC8BKfgcIo8r+AuwsV6BK2KcTimv+fhlqqpqbpWzbOqR+CA5j6C8wjX0gruh4ewFxbgMtwnwZ+4BOVyOYM7CVehHT7BcWLerye4B+ZgN8zAaYJW0q4Nwk24OzAIn6GH+EV3XkNkPC6xBzC0ETEzzR9SvOW5sda8UHAU+uEjDBP8O6jDFDcMH6CPqkfjBE/IXyDoZ/AfpviLTt5Vgnk4BBUmzwQeTHkqlpcqc65gVuOJwK/dlu91Bbs1fulZ8Ll8jyvYpnHNs+CC/D5XcJfGX32qsY5LGja7gj803ulTkM3SouGyK1hdq3QP1i5fdQVnNc56Fgx351yc4FnPgmec3fpP8B68hi6++6Cn9bM8XZbXvZy3yE/DQbjG5M562htx4XC75QnzRn5f1UvH4Bl0WMdhUmOdxTWqw3Qo31jS9XRO95g13ElEd2xQzOZPKv4XXEm6nszsshyAL3o4zbuNN+Fz5vQUyUlsq+7DljRvGrv5r8NR501ju63K+i4j0Kxz2+u8aR6rspvQqRujP3r4vb7aoBhpZ08l+kaiK+4nda2omySvXVcJg+Qr+j1P1d0RsbCd2fK81fEw8abosUiyKRHXpOP+tSTRJxI1P9AQbK59l+g7nfPpzRaMiloL3fZXgAEA1i67VWKREScAAAAASUVORK5CYII=');
			background-repeat:no-repeat;
			background-position:8px center;
			background-size:20px;
			border: 1px solid #e5e5e5;
		    border-radius: 4px;
		    outline: none;
	    	font-size: 14px;
	    	height:30px;
	    	line-height:30px;
		}
	}
</style>