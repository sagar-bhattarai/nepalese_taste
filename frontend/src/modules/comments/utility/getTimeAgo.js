export function getTimeAgo(date, now) {
  const diff = Math.floor((now - new Date(date)) / 1000);

  if (diff < 60) {
    return {
      time: diff,
      timeSuffix: "just now",
      timeAgo: "just now",
    };
  }

  if (diff < 3600) {
    const mins = Math.floor(diff / 60);
    return {
      time: mins,
      timeSuffix: mins > 1 ? " mins ago" : " min ago",
      timeAgo: `${mins} min${mins > 1 ? "s" : ""} ago`,
    };
  }

  if (diff < 86400) {
    const hrs = Math.floor(diff / 3600);
    return {
      time: hrs,
      timeSuffix: hrs > 1 ? " hrs ago" : " hr ago",
      timeAgo: `${hrs} hr${hrs > 1 ? "s" : ""} ago`,
    };
  }

  const days = Math.floor(diff / 86400);
  return {
    time: days,
    timeSuffix: days > 1 ? " days ago" : " day ago",
    timeAgo: `${days} day${days > 1 ? "s" : ""} ago`,
  };
}

