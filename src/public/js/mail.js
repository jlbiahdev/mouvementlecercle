function sendEmail() {
  console.log('sendEmail');
  let email = document.getElementById('email').value;

  let params = {
      to_name: 'MLC Support',
      from_name: 'MLC curious',
      from_email: 'jlbiah@gmail.com',
      from_phonenumber: '',
      message: 'notify me : ' + email,
      subject: 'notify me Alert for MLC',
      reply_to: 'jlbiah@gmail.com',
  }

  //Create an emailjs account and set your parameters here
  const emailjsConfig = {
    service_id: 'service_3nge4zh',
    template_id: 'template_9uf9nvn',
    user_id: 'HHi-YtFsGz1QmtvVT',
    template_params: params
  };
 
  $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
      type: 'POST',
      data: JSON.stringify(emailjsConfig),
      contentType: 'application/json'
  }).done(function() {
      alert('Votre mail a été envoyé!');
      // resetControls();
  }).fail(function(error) {
      console.log('Oops... ' + JSON.stringify(error));
      alert(`Un problème est survenu lors de l'envoi de votre mail`)
  });
}