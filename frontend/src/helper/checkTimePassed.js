const checkTimePassed = ( createdAt, withInHowMuchTime = 30 ) => {
    const pastTime = withInHowMuchTime * 60 * 1000;  // 30 minutes 
    const isHalfHourPassed = Date.now() - new Date(createdAt).getTime() >= pastTime;
    return isHalfHourPassed;
}

export default checkTimePassed;




{/*
    
    const createdTime = new Date(createdAt).getTime();
    const currentTime = Date.now();

    const diffInMinutes = (currentTime - createdTime) / (1000 * 60);

    if (diffInMinutes >= 30) {
             console.log("Half an hour passed");
             return true;
    } else {
             console.log("Still within 30 minutes");
             return false
    }


*/}