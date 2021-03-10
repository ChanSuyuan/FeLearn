
var isMonotonic = function(A) {
    let increase = true, decrease = true
    for(let i = 0; i < A.length; i ++) {
        if(A[i] - A[i + 1] > 0) {
            increase = false
        }
        if(A[i] - A[i + 1] < 0) {
            decrease = false
        }
    }
    return increase || decrease
};


