// Tiny DB 
// https://airtable.com/appax7CWrloMUYCkm/tblQDPUuLP7qoiMui/viwVDgvOqVNofrADR?blocks=hide
const DEFAULT_BASE_ID = "appax7CWrloMUYCkm"; 
const DEFAULT_TABLE = "dict";                

m.airtable.act({
    /* Expects
    {
        base_id: "app1234567890",
        table: "table name",
        params: {
            maxRecords: 3,
            view: "Grid view"
        },
        handle_records: (records_page) => {}, // Page records handler
    } */
    list(_$, args) {
        return new Promise((resolve, reject) => {
            _$.act.base_table({ base_id: args.base_id, table: args.table }).select(args.params).eachPage(function page(records, fetchNextPage) {
                args.handle_records(records);
                fetchNextPage();
            }, function done(err) { 
                if (err) { reject(err); return; } 
                resolve(); 
            });
        });
    },

    /* Expects
    {
        base_id: "app1234567890",
        table: "table name",
        column_name: "Name",
        value: "Bob"
        params: { },
    } */
    get_by_value(_$, args) {
        return new Promise((resolve, reject) => {
            let record;
            const filterFormula = `{${args.column_name}} = "${args.value}"`;

            if (!args.value) return console.error("No game ID found");

            _$.act.base_table({ base_id: args.base_id, table: args.table }).select({
                filterByFormula: filterFormula 
            }).eachPage(function page(records, fetchNextPage) {
                record = records[0];
                fetchNextPage();
            }, function done(error) {
                if (error) { reject(error); return; }
                resolve(record);
            });
        });
    },

    /* Expects
    {
        base_id: "app1234567890",
        table: "table name",
        column_name: "Name",
        value: "Bob",
        fields: { "Last Name": "Montgomery" },
        params: { },
    } */
    set_by_value(_$, args) {
        return new Promise(async (resolve, reject) => {
            let record = await _$.act.get_by_value(args);
            _$.act.base_table({ base_id: args.base_id, table: args.table }).update([
                { "id": record.id, "fields": args.fields }
            ]);
        });
    },

    /* Expects
    {
        base_id: "app1234567890",
        table: "table name",
        record_ids: [],
    } */
    find_all(_$, args) {
        return new Promise((resolve, reject) => {
            let _records = [];
            const filterFormula = "OR(" + args.record_ids.map(id => { return `RECORD_ID()='${id}'` }).join(",") + ")";

            _$.act.base_table({ base_id: args.base_id, table: args.table }).select({
                filterByFormula: filterFormula
            }).eachPage(function page(records, fetchNextPage) {
                _records = _records.concat(records);
                fetchNextPage();
            }, function done(error) {
                if (error) { reject(error); return; }
                resolve(_records);
            });
        });
    },

    priv: {
        base_table(_$, args) {
            // First check that we have a key to talk to airtable.
            _$.act.collect_key();

            args.base_id = args.base_id || DEFAULT_BASE_ID;
            args.table = args.table || DEFAULT_TABLE;
            if (m.airtable.bases[args.base_id] && m.airtable.bases[args.base_id][args.table]) return m.airtable.bases[args.base_id][args.table];
            const Airtable = require('airtable');
            const _base = new Airtable({ apiKey: airtable_api_key }).base(args.base_id);
            m.airtable.bases[args.base_id] = { self: _base };
            m.airtable.bases[args.base_id][args.table] = m.airtable.bases[args.base_id].self(args.table);
            return m.airtable.bases[args.base_id][args.table];
        },

        collect_key(_$, args) {
            if (airtable_api_key && airtable_api_key.length) return;
            airtable_api_key = prompt("Airtable API Key");
            return localStorage.setItem("airtable_api_key", airtable_api_key);
        }
    }
});

m.airtable.bases = {};