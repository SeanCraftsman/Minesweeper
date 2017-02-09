var log = function() {
	console.log.apply(console, arguments)
}

var e = function(selector) {
	return document.querySelector(selector)
}

var es = function(selector) {
	return document.querySelectorAll(selector)
}

var appendHtml = function(element, html) {
	element.insertAdjacentHTML('beforeend', html)
}

var bindEvent = function(element, eventName, callback) {
	element.addEventListener(eventName, callback)
}


var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

var testWin = function() {
	var mines = e('#id-span-mines')
	var squares = es('.square')
	var squareMine = es('.mine').length
	var minesNums = Number(mines.innerHTML)
	if(minesNums + squareMine == squareLeft) {
		alert('恭喜你获得胜利！')
		clickedAll()
		stopTimer()
	}
}

var testLose = function() {
	if(squareLeft == 143) {
		refresh()
		clicked(event)
	} else {
		clickedAll()
		alert('你输了！')
		stopTimer()	
	}
}

var removeMine = function(target) {
	if (target.classList.contains('mine')) {
        target.classList.remove('mine')
        var mines = e('#id-span-mines')
        var num = parseInt(mines.innerHTML)
        mines.innerHTML = num + 1
    }
}

var clickedShow = function(target) {
	var value = target.children[0]
	if (!target.classList.contains('clicked')) {
		target.classList.add('clicked')
		if(value.innerHTML != 0){
			value.classList.add('show')	
		}
		squareLeft -= 1
	}
	removeMine(target)

	if (value.innerHTML == '雷') {
		testLose()
	} else {
		testWin()
	}
	return value.innerHTML
}

var indexOf = function(target) {
	var id = target.id
	var l = id.split('-')
	var result = []
	result.push(parseInt(l[2]))
	result.push(parseInt(l[3]))
	return result
}

var clickPos = function(x, y) {
	if( x < 0 || x > 11 ) {
		return
	}
	if( y < 0 || y > 11 ) {
		return
	}
	var id = `#id-cell-${x}-${y}`
	var a = e(id)
	if( !a.classList.contains('clicked') ) {
		leftClicked(a)	
	}
}

var roundClick = function(pos) {
	var x = pos[0]
	var y = pos[1]
	for(var i = x - 1; i <= x + 1; i++) {
		for(var j = y - 1; j <= y + 1; j++) {
			clickPos(i, j)
		}
	}
}

var leftClicked = function(target) {
	var a = clickedShow(target)
	if (a == 0) {
		var pos = indexOf(target)
		roundClick(pos)
	}
}

var rightClicked = function(target) {
	var mines = e('#id-span-mines')
	var num = parseInt(mines.innerHTML)
	if (target.classList.contains('clicked')) {
		return
	}
	if (target.classList.contains('mine')) {
        target.classList.remove('mine')
        mines.innerHTML = num + 1
    } else {
        target.classList.add('mine')
        mines.innerHTML = num - 1
    }
    testWin()
}

var clicked = function(event) {
	ticTok()
	var target = event.target
	if ( target.classList[0] == 'value') {
		target = target.parentElement
	}
	if (event.button == 0) {
		leftClicked(target)
	} else if (event.button == 2) {
		rightClicked(target)
	}
}

var clickedAll = function() {
	var squares = es('.square')
	for(var i = 0; i < squares.length; i++) {
		var target = squares[i]
		if(target.classList.contains('mine') == false) {
			target.classList.add('clicked')
		}
		var value = target.children[0]
		if(value.innerHTML != '0') {
			value.classList.add('show')
		}
	}
}

var removeClassAll = function(events, className) {
	for(var i = 0; i < events.length; i++) {
		var e = events[i]
		if (e.classList.contains(className)) {
        	e.classList.remove(className)
    	}
	}
}

var refresh = function() {
	var values = es('.value')
	removeClassAll(values, 'show')
	var squares = es('.square')
	removeClassAll(squares, 'clicked')
	removeClassAll(squares, 'mine')
	if (event != undefined) {
		var target = event.target
		if (target.classList.contains('start')) {
			num = Number(target.value)	
		}
	}
	refreshValue(num)
	var mines = e('#id-span-mines')
	mines.innerHTML = num
	squareLeft = 144
	resetTimer()
}

var bindAll = function(selector, eventName, callback, responseClass){
	var elements = document.querySelectorAll(selector)
    if(responseClass == null) {
        for(var i = 0; i < elements.length; i++) {
            var e = elements[i]
            bindEvent(e, eventName, callback)
        }
    } else {
        for(var i = 0; i < elements.length; i++) {
            var e = elements[i]
            bindEventDelegate(e, eventName, callback, responseClass)
        }
    }
}

var modifyLine = function(line, nums) {
	var nodes = line.children
	for(var i = 0; i <nodes.length; i++) {
		var span = nodes[i].children[0]
		if(nums[i] != 9) {
			span.innerHTML = nums[i]	
		} else {
			span.innerHTML = '雷'
		}	
	}
}

var countMineLine = function(array) {
	var num = 0;
	for(var i = 0; i < array.length; i++) {
		if(array[i] == 9) {
			num++
		}
	}
	return num
}

var refreshValue = function(num) {
	var a = area(12, 12, num)
	var valuesLine = es('.square-line')
	for(var i = 0; i < a.length; i++) {
		var nums = a[i]
		var line = valuesLine[i]
		modifyLine(line, nums)
	}
	var num = 0
	for(var i = 0; i < a.length; i++) {
		num += countMineLine(a[i])
	}
}


var ticTok = function() {
	var time = e('#id-span-time')
	if(!time.classList.contains("time")) {
		time.classList.add("time")
		time.interval = setInterval(function() {
			var t = parseInt(time.innerHTML) + 1
			time.innerHTML = t
		}, 1000)
	}
}

var resetTimer = function() {
	var time = e('#id-span-time')
	time.innerHTML = 0
}

var stopTimer = function() {
	var time = e('#id-span-time')
	if(time.classList.contains("time")) {
		clearInterval(time.interval)
		time.classList.remove("time")
	}
}

var main = function(){
	document.oncontextmenu = function(){
		return false;
	}
	squareLeft = 144
	num = 15
	bindAll('button', 'click', refresh)
	bindAll('.square', 'mousedown', clicked)
	bindAll('.square', 'touchstart', function(){
		log(event)
	})
	bindAll('.square', 'touchend', function(){
		log(event)
	})
	refresh()
}

main()