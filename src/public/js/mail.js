function resetControls() {
  console.log('resetControls');
  let fullname = document.getElementById('fullname');
  let email = document.getElementById('email');
  let phone = document.getElementById('phone');

  fullname.value = '';
  email.value = '';
  phone.value = '';
}

function sendEmail() {
  console.log('sendEmail');
  let form = document.getElementById('subscribe-form');

  form.classList.remove('form-error');

  let fullname = document.getElementById('fullname').value;
  let email = document.getElementById('email').value;
  let phone = document.getElementById('phone').value;

  let params = {
      to_name: 'MLC Support',
      from_name: 'MLC curious',
      from_email: 'admin@cyrano-conseil.com',
      from_phonenumber: '',
      message: 'email : ' + email + '\n' + 
                'fullname: ' + fullname + '\n' +
                'phone: ' + phone + '\n' +
                'message: I am interested in MLC and would like to be notified when it is available.',
      subject: 'Alert for MLC',
      reply_to: 'admin@cyrano-conseil.com,mouvementlecercle2050@gmail.com',
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
    form.classList.add('form-success');
    let successmessage = document.getElementById('success-message');
    successmessage.innerHTML = 'Your subscription has been registered';
    resetControls();
  }).fail(function(error) {
      console.log('Oops... ' + JSON.stringify(error));
      let errormessage = document.getElementById('error-message');
      let errorText = "A problem occurred while processing your subscription.";
      errormessage.innerHTML = errorText;
      form.classList.add('form-error');
      // alert(`Un problème est survenu lors de l'envoi de votre mail`)
  });
}