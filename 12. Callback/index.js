
// Callback p1

/**
 * Ở bài học này, các bạn hãy sử dụng kiến thức về callback 
 * vừa học ở bài trước để hoàn thành function sumCb và tạo thêm các function subCb, multiCb và divCb.
 */

function sumCb(a, b) {
    return a + b
}
function subCb(a, b) {
    return a - b
}
function multiCb(a, b) {
    return a * b
}
function divCb(a, b) {
    return a / b
}

function caculate(a, b, cb) {
    return cb(a, b);
}

// Expected results
caculate(1, 2, sumCb)   // Output: 3
caculate(1, 2, subCb)   // Output: -1
caculate(1, 2, multiCb) // Output: 2
caculate(3, 1, divCb)   // Output: 3


// Callback p2

// 1. Là hàm
// 2. Truyền qua đối số
// 3. Được gọi lại (trong hàm nhận đối số)

