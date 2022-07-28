const DEFAULT_TTL = 365 * 24 * 60 * 60;
m.redis.acts({
    async get_key(_$, args) {
        let record = await m.airtable.act.get_by_value({
            column_name: "key",
            // Confusing. This specifies which value under the key column it should look for.
            // For this column, each value under the "key" column is a key.
            value: args.key 
        });
        return record ? record.fields['value'] : null;
    },

    async get_hash_key(_$, args) {
        const data = await _$.act.get_key(args);
        return JSON.parse(data);
    },

    async set_key(_$, args) {
        let value = await _$.act.get_key(args);
        if (value) {
            return await m.airtable.act.set_by_value({
                column_name: "key",
                // Confusing. This specifies which value under the key column it should look for.
                // For this column, each value under the "key" column is a key.
                value: args.key,
                fields: {
                    "value": args.value,
                    "TTL": args.ttl || DEFAULT_TTL
                }
            });
        }
        else {
            return await _$.act.create_key(args)
        }
    },

    priv: {
        async create_key(_$, args) {
            return await m.airtable.act.create({
                column_name: "key",
                fields: { "value": args.value, "key": args.key, "TTL": args.ttl || DEFAULT_TTL }
            });
        }
    }
});