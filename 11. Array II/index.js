


// Array methods: 
/**
 * forEach()
 * every()
 * some()
 * find()
 * filter()
 * map()
 * reduce()
 */

var courses = [
    {
        id: 1,
        name: 'JS',
        cost: 250
    },
    {
        id: 2,
        name: 'HTML, CSS', 
        cost: 0
    },
    {
        id: 3,
        name: 'Ruby', 
        cost: 0
    },
    {
        id: 4,
        name: 'PHP', 
        cost: 400
    },
    {
        id: 5,
        name: 'ReactJS', 
        cost: 500
    },
    {
        id: 6,
        name: 'HTML, CSS', 
        cost: 123
    }
];

//forEach
courses.forEach(function(course) {
    console.log(course)
})

//every() - return boolean (all elements in arr have to satisfy the condition ==> return true )
var isFreeEvery = courses.every(function(course) {
    return courses.cost === 0;
})

console.log(isFreeEvery ? 'Free course' : 'Not free')   // Not free

//some() - return boolean (only one elements in arr have to satisfy the condition ==> return true)
var isFreeSome = courses.some(function(course) {
    return course.cost === 0;
})

console.log(isFreeSome ? 'Free course' : 'Not free')    // free

//find() - return index (just find 1 element in arr then break immediately)
var course = courses.find(function(course) {
    return course.name === 'Ruby';
})

console.log(course)    //result:  {id: 3, name: 'Ruby', cost: 0}

//filter() - return indexes (find all elements in arr satisfy the condition ==> filter() better than find()) 
var course = courses.filter(function(course) {
    return course.name === 'HTML, CSS';
})

console.log(course)    // result: 
                                    // 0: {id: 2, name: 'HTML, CSS', cost: 0}
                                    // 1: {id: 6, name: 'HTML, CSS', cost: 123}


//reduce() 
var totalCost = courses.reduce(function(accumulate, currentValue) {
    return accumulate + currentValue.cost;
}, 0)
console.log(totalCost) // result: 1273

// Exercise about reduce() - Tại SEA GAMES 31 vừa qua, đoàn thể thao Việt Nam 
//đã đứng đầu bảng tổng sắp huy chương. Hãy tạo hàm getTotalGold có 1 tham số là mảng. 
//Tính tổng số huy chương vàng mà đoàn thể thao Việt Nam đạt được trong kỳ SEA Game lần này.
var sports = [
    {
        name: 'Bơi lội',
        gold: 11
    },
    {
        name: 'Boxing',
        gold: 3
    },
    {
        name: 'Đạp xe',
        gold: 4
    },
    {
        name: 'Đấu kiếm',
        gold: 5
    },
]

function getTotalGold(arr) {
    return arr.reduce(function(sum, curValue){
        return sum + curValue.gold
    }, 0)
}

// Expected results:
console.log(getTotalGold(sports)) // Output: 23

// include() - check string element in arr

var needToLearn = ['SpringBoot', 'NodeJS', 'ReactJS']

console.log(needToLearn.includes('SpringBoot', 0))  // result: true
console.log(needToLearn.includes('Docker'))      // result: false






