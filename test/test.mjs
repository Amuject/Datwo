import Date from '../datwo.mjs';

console.log(new Date().getTime());

console.log(new Date().format('YYYY-MM-DD hh:mm:ss APMK DHK'));

const t = new Date().getTime() - 1000 * 60 * 60 * 1;

console.log(new Date().compare(t));

console.log(new Date('2022-09-25 14:30:00.023').format('YYYY-MM-DD hh:mm:ss'));
console.log(new Date('2022-09-25 14:30:00.023').format('YY-M-D N hhh:m:s.CC'));
console.log(new Date('2022-09-25 14:30:00.023').format('YYYY / DDD / sssss / CCC'));

console.log(new Date('2022-01-02 00:00:00').compare(new Date('2021-12-29 00:05:00')));
console.log(new Date('2022-01-02 00:00:00').compare(new Date('2022-01-01 00:10:00')));
console.log(new Date('2022-01-02 00:00:00').compare(new Date('2022-01-01 23:53:00')));
console.log(new Date('2022-01-02 00:00:00.000').compare(new Date('2022-01-01 23:59:59.256')));
