import nodemailer from 'nodemailer';

export const sendPasswordEmail = async (destinataire, tempPassword) => {
  try {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: '"Service Informatique Actemium (TEST)" <no-reply-service-informatique@actemium.com>',
      to: destinataire,
      subject: 'Mot de passe temporaire - TEST',
      text: `Bonjour,\n\nVoici votre mot de passe temporaire : ${tempPassword}\n\nVeuillez 
      le changer lors de votre première connexion.`,
      html: `<p>Bonjour,</p><p>Voici votre mot de passe temporaire :
       <strong>${tempPassword}</strong></p><p>Veuillez le changer lors de votre première connexion.</p>`,
    });

    console.log('Message sent (test) : %s', info.messageId);
    console.log('Preview URL : %s', nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error('Error while sending mail (test)', err);
  }
};
