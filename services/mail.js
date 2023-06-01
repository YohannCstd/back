const nodemailer = require('nodemailer');

exports.sendMail = async (emailUser, code) => {
  console.log('SEND MAIL TO : '+emailUser+' WITH CODE : '+code+'');
  // Créer un objet transporter avec les informations de connexion SMTP
  let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // true pour 465, false pour les autres ports
    auth: {
      user: "pattes-partages@outlook.com", // adresse e-mail
      pass: "ynov2023*" // mot de passe de votre compte
    },
    tls: {
      ciphers: "SSLv3",
    }
  });

  // Configurer les options du mail
  let mailOptions = {
    from: "pattes-partages@outlook.com",
    to: emailUser,
    subject: 'Confirmation compte',
    text: "Pour confirmer votre compte, veuillez entrer le code suivant : "+code+".",
  };

  // Envoyer l'email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Erreur lors de l'envoi de l'email : " + error);
    } else {
      console.log("Email envoyé avec succès : " + info.response);
    }
  });
}