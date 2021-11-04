module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date? date.toLocaleDateString(): date;
  },
};
