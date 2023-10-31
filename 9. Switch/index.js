

// Câu lệnh rẽ nhánh - Switch

// var date = 6


// switch(date) {
//     case 2:
//     case 3:
//     case 4:
//         console.log('Hôm nay là thứ 2, 3, 4')
//         break
//     case 5: 
//         console.log('Hôm nay là thứ 5')
//         break
//     default:
//         console.log('Không biết')
// } 


// Toán tử 3 ngôi - Ternary operator

var course = {
    name: 'Js',
    coin: 0
};

if (course.coin > 0) 
    console.log('This course cost ' + course.coin)
else    
    console.log('Free course!')

var result = course.coin > 0 ? 'This course cost ' + course.coin : 'Free course!'
console.log(result)


//Hàm kiểm tra đủ tuổi bỏ phiếu
// Làm bài
function getCanVoteMessage(age) {
    var enoughAge = age >= 18 ? 'Bạn có thể bỏ phiếu' : 'Bạn chưa được bỏ phiếu'
    return enoughAge;
}

// expected
console.log(getCanVoteMessage(18)) // 'Bạn có thể bỏ phiếu'
console.log(getCanVoteMessage(15)) // 'Bạn chưa được bỏ phiếu'