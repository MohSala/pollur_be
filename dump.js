// console.log(countDuplicates([4, 1, 2, 1, 2]))
// var singleNumber = function (nums) {
//     const uniqueItems = new Set();
//     const duplicates = new Set();
//     for (const value of nums) {
//         if (uniqueItems.has(value)) {
//             duplicates.add(value);
//             uniqueItems.delete(value);
//         } else {
//             uniqueItems.add(value);
//         }
//     }
//     const ar = Array.from(uniqueItems);
//     return ar[0]
// };

// function splitNum(n) {
//     let output = []
//     let sNumber = n.toString();

//     for (var i = 0, len = sNumber.length; i < len; i += 1) {
//         output.push(+sNumber.charAt(i));
//     }
//     return output;
// }

// var isHappy = function (n) {
//     let result;
//     let newArr = []
//     let arrayNumbers = splitNum(n);
//     for (num of arrayNumbers) {
//         let sqrt = num * num;
//         newArr.push(sqrt)
//         return [...newArr];
//     }
// };

// console.log(isHappy(50))
const ar = [10, 20, 20, 10, 10, 30, 50, 10, 20]

function sockMerchant(n, ar) {
    let count = 0
    ar.sort();
    console.log(ar)
    for (let i = 0; i <= ar.length; i++) {
        for (let j = i; j <= ar.length; j++) {
            if (ar[i] === ar[j]) {
                count++;
            }
        }
    }
    return count
}

console.log(sockMerchant(9, ar))