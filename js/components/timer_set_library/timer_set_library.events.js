m.timer_set_library.events(async (_$) => {
  await _$.act.get_all_timer_sets();
  _$.act.render_timer_sets();
});
