const crypto = require('crypto');
const DB_KEY = 'tinyreborn';
const AES = 'aes-256-cbc';

function encryptAES(buffer, password) {
	const cipher = crypto.createCipheriv(
		AES,
		Buffer.alloc(32, password, 'utf8'),
		Buffer.alloc(16, password, 'utf8'),
	);
	return Buffer.concat([cipher.update(buffer), cipher.final()]);
}

// For config encryption only
function decryptAES(buffer, password) {
	const decipher = crypto.createDecipheriv(
		AES,
		Buffer.alloc(32, password, 'utf8'),
		Buffer.alloc(16, password, 'utf8'),
	);
	return Buffer.concat([decipher.update(buffer), decipher.final()]);
}

module.exports = [
	{
		name: 'default',
		type: 'mysql',
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		username: process.env.DB_USER,
		password: decryptAES(
			Buffer.from(process.env.DB_PASSWORD, 'base64'),
			DB_KEY,
		).toString('utf8'),
		database: process.env.DB_NAME,
		synchronize: false,
		dropSchema: false,
		logging: true,
		entities: [__dirname + '/entities/**/*.entity{.ts,.js}'],
		migrations: [__dirname + '/migration/*.ts'],
		cli: {
			migrationsDir: 'src/database/migration',
		},
	},
];
