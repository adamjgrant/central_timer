const REDIS_NAMESPACE = "central_timer-";

m.timer_set_library.data = [];
m.timer_set_library.acts({
  async get_all_timer_sets(_$, args) {
    const timer_sets = await m.redis.act.get_hash_key({
       key: `${REDIS_NAMESPACE}timer_sets`
    });
    m.timer_set_library.data = timer_sets;
    return timer_sets;
  },

  get_timer_set_by_name(_$, args) {
    return m.timer_set_library.data.find(timer_set => timer_set.name.toLowerCase() === args.name.toLowerCase())
  }
});