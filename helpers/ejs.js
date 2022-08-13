const moment = require("moment");

module.exports = {
  formatDate: (date, format) => moment(date).format(format),
  truncate: (str, len) => {
    if (str.length > len && str.length > 0) {
      return str.slice(0, len) + "...";
    } else {
      return str;
    }
  },
};
