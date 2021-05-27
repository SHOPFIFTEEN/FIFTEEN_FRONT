import moment from "moment";

export function getNowDate () {
    return moment(Date.now()).format('YYYY-MM-DD');
}