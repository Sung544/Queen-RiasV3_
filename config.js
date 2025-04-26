const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "𝑻𝒐𝒙𝒙𝒊𝒄-𝑺𝒂𝒏",
    ownerNumber: process.env.OWNER_NUMBER || "2347042081220",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0FiSWl3cmtxbUtvYksvUTdsRzZCVlhFV2YwTlFEbjZuR0daTkZ5V01Xdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicmk1TjM2c29USThBWmI5UVR6NDVFbGgvd2N3SGU1anZ1UXN3TERhTVlqcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0SUNGUkQ3MS8ySDdua2ZMa0haNkoxZC93VVZJTzRiZ1prcGczekhzcVhzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2blZxR3U2Nmo5VlkvdnJiTFNFS01STkhjZ1pvc0ZMSUsxaDhEWXA4MlFFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJOL3pITUJwMmJSZFBmcGFKVHlIbHhxalVMRVppQmRpcjZHcXZRSWNaVVk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5pRWl5TDNNOVpTTCtBVFZtZ1RadHRjS1BGUCtZOHVST2R4WGpBZUNXMms9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEJSdjNUZ3h5MVZTWHJkdENacThYMFhzTThaVEoyclhVY3BFNm9EMzMxcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNXZ4dUhPeVNkWmkxa3lWS0s5bEoydVEwZmgxR1Z5cGlYWHNadjRNbGZoQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlR0OHo1Z2pRQTVkTCtSek1qS2Fsb29pR0wvc3RBSUVVSDZwTGhSTkYvVGhCZ2Qwc0IybHMxWmxFUjhmMXgxRjhNRHhaeHlHNWFJemkxYUZPK1cxNkJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgwLCJhZHZTZWNyZXRLZXkiOiIvcWRIeVh4QmtMNVBEWS9oZm1NTTVBK0FIRUVRVEdEY0VocENBR2ZidzhJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJKR1k3RTlINCIsIm1lIjp7ImlkIjoiMjc3ODAzNDcwMTU6NTNAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxMjgxNzUxMTE3MDg3Nzc6NTNAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMcUEyTU1CRU9tVHRNQUdHQVVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI5Q2cwK05iZXB1c3RxM3VJTmlHcWRabDhVeUJ6aGVWNXlTRmt2YkdOK2tRPSIsImFjY291bnRTaWduYXR1cmUiOiJBOUlXaTVuWFNJOFc3MGhKaG0wMmNjT2hzeWdWajFiQVJ1VEVyTlNCUk1ZdU9YMWtnY0dpTDh5Z1hKamF0Y0QrRE1zcUlXNFFWMUhlUzI5NHJUNW1CUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiQWFEbDdJL0tudlA2a0JnTzRSUWFsZmtZa2d2aEtpSGtONzJ1ZHRqdEYxeXdmM3VuRU1pSm9LS0NIYkpnSVk1WjJLVjMwSVhvYzZoUVpRbnVNNGQwRGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNzc4MDM0NzAxNTo1M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJmUW9OUGpXM3FickxhdDdpRFlocW5XWmZGTWdjNFhsZWNraFpMMnhqZnBFIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQklJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDU2ODQ5ODMsImxhc3RQcm9wSGFzaCI6IlBXazVCIn0=",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id/', 
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
