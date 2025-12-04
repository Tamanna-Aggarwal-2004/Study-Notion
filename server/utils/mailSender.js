const brevo = require('@getbrevo/brevo');

module.exports = async function mailSender(email, title, body) {
  try {
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.to = [{ email: email }];
    sendSmtpEmail.sender = { email: process.env.FROM_EMAIL, name: "StudyNotion" };
    sendSmtpEmail.subject = title;
    sendSmtpEmail.htmlContent = body;

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(" EMAIL SENT:", response);
    return response;

  } catch (error) {
    console.log("ERROR:", error);
    return null;
  }
};
