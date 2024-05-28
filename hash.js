import crypto from"crypto";

// Data provided
// Data provided
const query_id = "AAEWeY1vAAAAABZ5jW_GCOeM";
const user = JSON.stringify({
    id: 1871542550,
    first_name: "Mai",
    last_name: "Trường",
    username: "trng994",
    language_code: "en",
    is_premium: true,
    allows_write_to_pm: true
});
const auth_date = "1716551598";

// Concatenate string values
const data_string = `${query_id}${auth_date}`;

// Generate SHA-256 hash
const hash = crypto.createHash('sha256').update(data_string).digest('hex');

// Print the hash
console.log(hash);