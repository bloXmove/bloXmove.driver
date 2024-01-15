// Convert Minutes to Hours
export const calcuateDuration = minutes => {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.floor(minutes % 60);
    return (
      hours +
      (hours > 1 ? ' hrs' : ' hr' + ' ') +
      remainingMinutes.toFixed(0) +
      ' mins'
    );
  } else if (minutes < 60 && minutes > 0) {
    return minutes.toFixed(0) + ' mins';
  } else {
    return '0 min';
  }
};
