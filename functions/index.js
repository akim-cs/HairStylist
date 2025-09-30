const functions = require("firebase-functions");
const fetch = require("node-fetch"); // This line is fine

const ZAPIER_WEBHOOK_URL =
  "https://hooks.zapier.com/hooks/catch/23695225/u3if46b/";

exports.notifyZapierOnBooking = functions.firestore
    .document("appointments/{docId}")
    .onCreate(async (snap, context) => {
      const bookingData = snap.data();

      try {
        const response = await fetch(ZAPIER_WEBHOOK_URL, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(bookingData),
        });

        if (!response.ok) {
          console.error("Failed to notify Zapier:", response.statusText);
        } else {
          console.log("Successfully notified Zapier");
        }
      } catch (error) {
        console.error("Error sending to Zapier:", error);
      }
    });
