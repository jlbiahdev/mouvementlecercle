function resetControls() {
  // console.log('resetControls');
  let fullname = document.getElementById('fullname');
  let email = document.getElementById('email');
  let motivation = document.getElementById('motivation');
  let contactme = document.getElementById('contact-me').value;

  fullname.value = '';
  email.value = '';
  motivation.value = '';
  contactme.value = false;
}


function hideMessages() {
  // console.log('hideErrorMessage');
  let errormessage = document.getElementById('error-message');
  let successmessage = document.getElementById('success-message');

  errormessage.innerHTML = '';
  successmessage.innerHTML = '';
}

function showErrorMessage(errorText) {
  // console.log('showErrorMessage');
  let errormessage = document.getElementById('error-message');
 
  errormessage.innerHTML = errorText;
}

function sendEmail() {
  // console.log('sendEmail');
  let form = document.getElementById('subscribe-form');

  form.classList.remove('form-error');
  hideMessages();

  let fullname = document.getElementById('fullname').value;
  let email = document.getElementById('email').value;
  let motivation = document.getElementById('motivation').value;
  let contactme = document.getElementById('contact-me').checked;

  if (!fullname) {
    console.log('fullname is empty');
    showErrorMessage('Please enter your fullname');
    form.classList.add('form-error');
    return;
  }

  if (!email) {
    console.log('email is empty');
    showErrorMessage('Please enter your email');
    form.classList.add('form-error');
    return;
  }

  let params = {
      to_name: 'MLC Support',
      from_name: 'MLC curious',
      from_email: 'admin@cyrano-conseil.com',
      from_phonenumber: '',
      message: '{email : `' + email + '`,\n' + 
                'fullname: `' + fullname + '`,\n' +
                'motivation: `' + motivation + '`,\n' +
                'contactme: ' + contactme + '\n}',
      subject: 'Alert for MLC',
      // reply_to: 'mouvementlecercle2050@gmail.com',
      reply_to: 'marcel.monsi@gmail.com',
      // reply_to: 'jlbiah@gmail.com',
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
  });
}