
/** 1 HOUR COOLDOWN */
const COOLDOWN_HOURS = 1;

const getRemainingCooldownTime = (lastCollectedDate) => {
    const now = new Date();
    const timeElapsed = now - lastCollectedDate;
    const cooldownPeriod = COOLDOWN_HOURS * 60 * 60 * 1000; // Convert hours to milliseconds
    const remainingTime = cooldownPeriod - timeElapsed;

    if (remainingTime > 0) {
        const hoursRemaining = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutesRemaining = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        return { hours: hoursRemaining, minutes: minutesRemaining };
    }

    return null; // Cooldown is over
};

module.exports.getRemainingCooldownTime = getRemainingCooldownTime;