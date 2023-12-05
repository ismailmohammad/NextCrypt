import mongoose from "mongoose";

export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGODB_URI!, {
      ssl: true,
      tlsCertificateKeyFile: 'nextcrypt-cert-X509.pem',
      authMechanism: "MONGODB-X509",
      authSource: "$external",
      dbName: process.env.MONGODB_DATABASE!
    })
    const connection = mongoose.connection;
    connection.on('connected', () => {
      console.log("connected to db");
    })

    connection.on('error', err =>
     {
      console.log("Error connecting to MongoDB: " + err)
      process.exit();
    });
  } catch (err) {
    console.log("db didn't connect");
    console.log(err);
  }
}