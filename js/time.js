export class Time {
    constructor(total_seconds) {
        this.total_seconds = total_seconds;
    }

    get hour_formatted() {
        const seconds_in_a_minute = 60;
        const minutes_in_a_second = 60;
        
        const seconds = this.total_seconds % seconds_in_a_minute
        
        const minutes = (this.total_seconds - seconds)/minutes_in_a_second % 60
        const hours = (this.total_seconds - seconds - (minutes * seconds_in_a_minute)) / minutes_in_a_second / seconds_in_a_minute;
        return [hours, minutes, seconds]
          .map(count => String(count).padStart(2, '0'))
          .join(":");
    }

    get minute_formatted() {
        let hour_formatted = this.hour_formatted
        hour_formatted.split(":").pop();
        return hour_formatted;
    }
}