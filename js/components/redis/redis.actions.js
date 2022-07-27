m.redis.acts({
    async get_key(_$, args) {
        let record = await m.airtable.act.get_by_value({
            column_name: "key",
            // Confusing. This specifies which value under the key column it should look for.
            // For this column, each value under the "key" column is a key.
            value: args.key 
        });
        return record.fields['value'];
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
                    "value": args.value
                }
            });
        }
        else {
            await _$.act.create_key(args)
        }
    },

    priv: {
        async create_key(_$, args) {
            // TODO
        }
    }
});