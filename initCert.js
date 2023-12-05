const fs = require('node:fs');
const dotenv = require('dotenv');
dotenv.config();
try {
  fs.writeFileSync('/tmp/nextcrypt-cert-X509.pem', Buffer.from(process.env.MONGODB_CERTIFICATE, "base64").toString("ascii"));
} catch (err) {
  console.error(err);
}
