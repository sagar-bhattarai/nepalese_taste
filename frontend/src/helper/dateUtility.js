const dateUtility = (date = "") => {
    
    if(date == '') return false;

    return new Date(date).toLocaleString(
        "en-IN",
        {
            timeZone: "Asia/Kathmandu",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
    )
}
export default dateUtility;