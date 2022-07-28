import { Time } from "../../time.js";

m.timer.acts({
  get_markup(_$, args) {
    const first_timer_duration = args.timer_set.timers[0].duration_in_seconds;
    let time = new Time(first_timer_duration);
    let first_timer_duration_formatted = time.minute_formatted;
    return `
      <div data-component="timer">
        <h1>${args.timer_set.name}</h1>
        <h2>${first_timer_duration_formatted}</h2>
      </div>
    `
  }
});
