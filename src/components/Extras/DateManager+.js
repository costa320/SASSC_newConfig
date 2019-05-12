export function getMonthName(month) {
    var objDate = new Date('01/' + month + '/2018'),
        locale = "it",
        month = objDate.toLocaleString(locale, {
            month: "long"
        });
    return month;
}