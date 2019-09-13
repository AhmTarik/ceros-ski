
export class SkiTimer {

    createTimeout(cb, intervalTime) {
        let _skiTimeOut = setTimeout(cb, intervalTime);
        return {
            skiTimeOut: _skiTimeOut,
            intervalTime: intervalTime,
            createdAt: new Date(),
            callBack: cb
        }
    }

    cancelTimeout(skiTimer) {
        if (!this.isValid(skiTimer))
            return;
        let _currentDate = new Date();
        let _diff_ms = _currentDate.getTime() - skiTimer.createdAt.getTime();
        skiTimer.intervalTime -= _diff_ms;
        clearTimeout(skiTimer.skiTimeOut);
    }


    resumeTimeout(skiTimer) {
        if (!this.isValid(skiTimer))
            return;
        skiTimer.skiTimeOut = setTimeout(skiTimer.callBack, skiTimer.intervalTime);
        skiTimer.createdAt = new Date();
    }

    isValid(skiTimer) {
        return !(!skiTimer ||
            !skiTimer.skiTimeOut ||
            skiTimer.intervalTime == null ||
            !skiTimer.createdAt ||
            skiTimer.callBack == null
        );

    }
}