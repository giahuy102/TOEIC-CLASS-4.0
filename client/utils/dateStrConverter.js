export const dateStrConverter = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const dateStrFormatGetDate = (dateStr) => {
    return dateStr.slice(0, 10);
}