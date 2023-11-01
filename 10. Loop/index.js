


// FOR LOOP

var arr = [
    'Java',
    'C++',
    'python',
    'HTML & CSS', 
    'Js'
]
// console.log(arr.length)
for(var i = 0; i < arr.length; i++) {
    console.log(arr[i])
}
//Tính tổng giá trị đơn hàng
var orders = [
    {
        name: 'Khóa học HTML - CSS Pro',
        price: 3000000
    },
    {
        name: 'Khóa học Javascript Pro',
        price: 2500000
    },
    {
        name: 'Khóa học React Pro',
        price: 3200000
    }
]

function getTotal(arr) {
    var sum = 0
    for(var i = 0; i < arr.length; i++) {
        sum += arr[i].price
    }
    return sum
}

// Expected results:
getTotal(orders) 

// FOR ... IN
var myInfo = {
    name: 'minat',
    age: 21,
    address: 'Ba Diem, Hoc Mon'
}

var myString = 'JavaScript'

for (var key in myInfo) {
    console.log(myInfo[key])
}

for (const key in myString) {
    console.log(myString[key])
}

//Break & continue 
for (let i = 0; i <= 11; i++) {
    
    if (i % 2 === 0) {
        continue
    }
    console.log(i)
}

// Nested loop

var myArr = [
    [1, 2],
    [4, 5, 6]
]

for(var i = 0; i < myArr.length; i++) {
    for(j = 0; j < myArr[i].length; j++) {
        console.log(myArr[i][j]) 
    }
}