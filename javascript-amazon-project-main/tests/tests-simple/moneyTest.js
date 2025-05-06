 import {formatCurency} from '../../scripts/utils/money.js';

console.log('test suite : formatCurrency');


 console.log('converts cents into dollars');
 

if (formatCurency(2095) === '20.95') {
    console.log('passed');   
} else {
    console.log('failed');
    
}

console.log('works with 0');

if (formatCurency(0) === '0.00') {
    console.log('passed');
}else{
    console.log('failed');
}

console.log('round up to the nearest cent');


if (formatCurency(2000.5) === '20.01') {
    console.log('passed');
}else{
    console.log('failed');
    
}