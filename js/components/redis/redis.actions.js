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
        let record = await m.airtable.act.set_by_value({
            column_name: "key",
            // Confusing. This specifies which value under the key column it should look for.
            // For this column, each value under the "key" column is a key.
            value: args.key,
            fields: {
                "value": args.value
            }
        });
        return record.fields['value'];
    }
});
