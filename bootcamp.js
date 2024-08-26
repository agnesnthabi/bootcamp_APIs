// Find the longest word in the sentence
export function longestWord(sentence) {
    const words = sentence.split(' ');
    let longest = words[0];

    for (let word of words) {
        if (word.length > longest.length) {
            longest = word;
        }
    }
    return longest;
}

// Find the shortest word in the sentence
export function shortestWord(sentence) {
    const words = sentence.split(' ');
    let shortest = words[0];

    for (let word of words) {
        if (word.length < shortest.length) {
            shortest = word;
        }
    }
    return shortest;
}

// Sum the lengths of all words in the sentence
export function wordLengths(sentence) {
    const words = sentence.split(' ');
    return words.reduce((sum, word) => sum + word.length, 0);
}

function totalPhoneBill(bill) {
    const callCost = 2.75;
    const smsCost = 0.65;
    let total = 0;

    const actions = bill.split(',');
    actions.forEach(action => {
        if (action.trim() === 'call') {
            total += callCost;
        } else if (action.trim() === 'sms') {
            total += smsCost;
        }
    });

    return `R${total.toFixed(2)}`;
}

//Calculate enough airtime
const COST_PER_CALL = 1.88;
const COST_PER_SMS = 0.75;
const COST_PER_DATA = 12.00;

export function enoughAirtime(usage, available) {
    const actions = usage.split(',');

    let totalCost = 0;

    actions.forEach(action => {
        if (action === 'call') {
            totalCost += COST_PER_CALL;
        } else if (action === 'sms') {
            totalCost += COST_PER_SMS;
        } else if (action === 'data') {
            totalCost += COST_PER_DATA;
        }
    });

    const remainingAirtime = available - totalCost;

    return remainingAirtime >= 0 ? remainingAirtime : 0;
}

