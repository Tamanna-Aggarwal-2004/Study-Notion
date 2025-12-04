const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
console.log("OTP MODEL FILE LOADED");

const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      emailTemplate(otp)
    );

    if (!mailResponse) {
      console.log("Email NOT sent (mailResponse is null).");
      return;
    }

    console.log(
      "Email sent successfully:",
      mailResponse.response || mailResponse
    );
  } catch (error) {
    console.log("Error occurred while sending email: ", error.message);
  }
}

// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
	console.log("OTP PRE-SAVE HOOK TRIGGERED");

  console.log("New document about to be saved to database");

  if (!this.isNew) return next();

  try {
    await sendVerificationEmail(this.email, this.otp);
    return next();
  } catch (err) {
    console.log("Error in pre-save OTP hook:", err.message);
  
    return next();
  }
});


const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;
