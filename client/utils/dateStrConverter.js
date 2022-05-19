export const dateStrConverter = (date) => {
    console.log('Inside dateStrConverter');
    console.log(date);
    console.log(typeof (new Date()));
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};