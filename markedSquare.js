var random01 = function() {
    /*
    返回 0 或 1
    */
    var a = Math.random()
    if(a > 0.85) {
        return 1
    } else {
        return 0
    }
}


var randomLine09 = function(n) {
    /*
    返回一个只包含了 0 9 的随机 array, 长度为 n
    假设 n 为 5, 返回的数据格式如下(这是格式范例, 真实数据是随机的)
    [0, 0, 9, 0, 9]
    */
    var l = []
    for(var i = 0; i < n; i++) {
        l.push(random01() * 9)
    }
    return l
}

var shuffle = function(array)  {
    var len = array.length
    for(var i = 0; i < len - 1; i++) {
        var temp = array[i]
        var index = Math.floor(Math.random() * (len - i) + i)
        array[i] = array[index]
        array[index] = temp
    }
}

var randomArray09 = function(len, num) {
    var l = []
    for(var i = 0; i < num; i ++) {
        l.push(9)
    }
    while(l.length < len) {
        l.push(0)
    }
    shuffle(l)
    return l
}

var randomSquare09 = function(x, y, num) {
    var l = []
    var len = x * y
    var array = randomArray09(len, num)
    for(var i = 0; i < x; i++) {
        var a = array.slice(i * y, (i + 1) * y )
        l.push(a)
    }
    return l
}

var clonedSquare = function(array) {
    var s = []
    for (var i = 0; i < array.length; i++) {
        var line = []
        for (var j = 0; j < array[i].length; j++) {
            line.push(array[i][j])
        }
        s.push(line)
    }
    return s
}

/*
    array 是一个「包含了『只包含了 0 9 的 array』的 array」
    返回一个标记过的 array
    ** 注意, 使用一个新数组来存储结果, 不要直接修改老数组

    范例如下, 这是 array
    [
        [0, 9, 0, 0],
        [0, 0, 9, 0],
        [9, 0, 9, 0],
        [0, 9, 0, 0],
    ]

    这是标记后的结果
    [
        [1, 9, 2, 1],
        [2, 4, 9, 2],
        [9, 4, 9, 2],
        [2, 9, 2, 1],
    ]

    规则是, 0 会被设置为四周 8 个元素中 9 的数量
*/
var markedSquare = function(array) {
    var result = clonedSquare(array)
    for(var i = 0; i < array.length; i++) {
        for(var j = 0; j < array[i].length; j++) {
            if (array[i][j] == 0) {
                countNines(result, i, j)
            }
        }
    }
    return result
}

var countNines = function(result, i, j) {
    for(var a = i - 1; a <= i + 1; a++) {
        for(var b = j - 1; b <= j + 1; b++) {
            if (a < 0 || a >= result.length) {
                continue
            }
            if (b < 0 || b >= result[i].length) {
                continue
            }
            if (result[a][b] == 9) {
                result[i][j]++
            }
        }
    }
}

var area = function(x, y, num) {
    var a = randomSquare09(x, y, num)
    return markedSquare(a)
}
