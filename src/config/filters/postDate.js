const { DateTime } = require("luxon");

module.exports = function (dateObj) {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
};
