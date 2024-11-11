export default function formatDate(input) {
    
    const visitYear = input.slice(0, 4);
    let visitMonth = input.slice(5, 7);
    if(visitMonth[0] === '0') {visitMonth = visitMonth[1]}  
    let visitDay = input.slice(8);

    if(visitDay[0] === '0') {visitDay = visitDay[1]};

    return `${visitMonth}/${visitDay}/${visitYear}`;
}

