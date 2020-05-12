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
// const ar = [10, 20, 20, 10, 10, 30, 50, 10, 20]

// function sockMerchant(n, ar) {
//     let count = 0
//     ar.sort();
//     console.log(ar)
//     for (let i = 0; i <= ar.length; i++) {
//         for (let j = i; j <= ar.length; j++) {
//             if (ar[i] === ar[j]) {
//                 count++;
//             }
//         }
//     }
//     return count
// }

// console.log(sockMerchant(9, ar))






// var apps = [{ id: 34, name: 'My App', another: 'thing' }, { id: 37, name: 'My New App', another: 'things' }];

// const filter = apps.filter(app => app.id !== 34)
// console.log(filter)


// const candidate = {
//     id: "12345",
//     name: "Goat"
// }

// const arr = [
//     {
//         "isDeleted": false,
//         "_id": "5eb020a6656af383dea732e7",
//         "userId": "5ea83fece254a9adaff0b1d6",
//         "candidateId": {
//             "isDeleted": false,
//             "_id": "5eb0137bbc81ff5ed7ae55bd",
//             "color": "#D85963",
//             "name": "Wizkid",
//             "party": "Nigeria",
//             "pollId": "5eb01360bc81ff5ed7ae55bc",
//             "createdAt": "2020-05-04T13:07:07.636Z",
//             "updatedAt": "2020-05-04T13:07:07.636Z",
//             "__v": 0
//         },
//         "pollId": "5eb01360bc81ff5ed7ae55bc",
//         "eccKey": "0E!�q���0��G�d��A�'h9�ꠅ�Ud�� z�k��&,z�Ѭ.&���L�i}�A�N��0�",
//         "createdAt": "2020-05-04T14:03:18.658Z",
//         "updatedAt": "2020-05-04T14:03:18.658Z",
//         "__v": 0
//     },
//     {
//         "isDeleted": false,
//         "_id": "5eb023b4b81685855ab0c6cf",
//         "userId": "5ea83fece254a9adaff0b1d6",
//         "candidateId": {
//             "isDeleted": false,
//             "_id": "5eb0137bbc81ff5ed7ae55bd",
//             "color": "#D85963",
//             "name": "Wizkid",
//             "party": "Nigeria",
//             "pollId": "5eb01360bc81ff5ed7ae55bc",
//             "createdAt": "2020-05-04T13:07:07.636Z",
//             "updatedAt": "2020-05-04T13:07:07.636Z",
//             "__v": 0
//         },
//         "pollId": "5eb01360bc81ff5ed7ae55bc",
//         "eccKey": "0D 9�O>?~��+:-�+\f�Q\t��1\\�m��=�ǂ�@� =�StnV��b4�\tf�[\n���=�rR�Xk�C�",
//         "createdAt": "2020-05-04T14:16:21.204Z",
//         "updatedAt": "2020-05-04T14:16:21.204Z",
//         "__v": 0
//     },
//     {
//         "isDeleted": false,
//         "_id": "5eb2d18c3bdd6a35220fce4d",
//         "userId": "5ea5a441dec2176a7e3e0e50",
//         "candidateId": {
//             "isDeleted": false,
//             "_id": "5eb074ebb81685855ab0c6d2",
//             "color": "#8022D9",
//             "name": "Davido",
//             "party": "",
//             "pollId": "5eb01360bc81ff5ed7ae55bc",
//             "createdAt": "2020-05-04T20:02:51.465Z",
//             "updatedAt": "2020-05-04T20:02:51.465Z",
//             "__v": 0
//         },
//         "pollId": "5eb01360bc81ff5ed7ae55bc",
//         "eccKey": "0D ¹���a'�ɓ�Y[���7�R^\\\u0013#sǕ�~� \r��]�7�s����XħIE��q(��rUT�",
//         "createdAt": "2020-05-06T15:02:36.874Z",
//         "updatedAt": "2020-05-06T15:02:36.874Z",
//         "__v": 0
//     }
// ]



// const filterAndGroup = (arr) => {
//     const filterArr = []
//     for (ar of arr) {
//         filterArr.push(ar.candidateId.name)
//     }
//     var initialValue = {}
//     var reducer = function (tally, vote) {
//         if (!tally[vote]) {
//             tally[vote] = 1;
//         } else {
//             tally[vote] = tally[vote] + 1;
//         }
//         return tally;
//     }
//     var result = filterArr.reduce(reducer, initialValue)
//     return Array(result);
// }

// console.log(filterAndGroup(arr))

// const arrv = [
//     {
//         "Wizkid": 2,
//         "Davido": 1
//     }
// ]

// console.log(Object.values(arrv[0]))

const string = "Dealing with failure is easy: Work hard to improve. Success is also easy to handle: You’ve solved the wrong problem. Work hard to improve.";

function getCount(string) {
    const vowel = ["a", "e", "i", "o", "u"]
    const finalArr = [];
    var words = string.split("");
    for (word of words) {
        let charVal = word.charCodeAt(0)
        if (vowel.includes(word)) {
            charVal = charVal * -1
        }
        finalArr.push(charVal)

    }
    var sum = finalArr.reduce((a, b) => { return a + b }, 0)
    return sum
}

console.log(getCount(string))

// function isPalindrome(input, b, isOdd) {
//     let n = input
//     let palin = input
//     if (isOdd == 1) {
//         return n /= b;
//     }
//     while (n > 0) {
//         palin = palin * b + (n % b);
//         return n /= b;
//     }
//     return palin;

// }

// function generatePalindrome(n) {
//     let number;
//     number = parseInt(number)
//     for (let j = 0; j < 2; j++) {
//         let i = 1;
//         while ((number = isPalindrome(i, 10, j % 2)) < n) {
//             console.log(number + " ");
//             i++;
//         }
//     }
// }

// console.log(generatePalindrome(20))

const isPal = str => {
    // const cleanStr = clean(str);
    for (let i = 0; i < str.length; i++) {
        if (str[i] !== str[str.length - 1 - i]) {
            return false
        }
        return true
    }
}

// console.log(isPal("dodo"))

function sumFibs(num) {
    var a = 1, b = 1;
    var sum = 2;

    var tmp = a + b;
    while (tmp <= num) {
        if ((tmp % 2 !== 0) && (tmp <= num)) {
            sum += tmp;
        }
        a = b;
        b = tmp;
        tmp = a + b;
    }

    return sum;
}

// console.log(sumFibs(10000))