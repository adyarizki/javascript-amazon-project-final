 import {formatCurency} from '../../scripts/utils/money.js';

describe('Test suite: formatCurrency', () => {
    it('convert cent into dollars', () => {
        expect(formatCurency(2000.4)).toEqual('20.00');
    });

    it('convert negative cent into dollars', () => {
        expect(formatCurency(-500)).toEqual('-5.00');
    });
});

// console.log('test suite : formatCurrency');


//  console.log('converts cents into dollars');
 

// if (formatCurency(2095) === '20.95') {
//     console.log('passed');   
// } else {
//     console.log('failed');
    
// }

// console.log('works with 0');

// if (formatCurency(0) === '0.00') {
//     console.log('passed');
// }else{
//     console.log('failed');
// }

// console.log('round up to the nearest cent');


// if (formatCurency(2000.5) === '20.01') {
//     console.log('passed');
// }else{
//     console.log('failed');
    
// }