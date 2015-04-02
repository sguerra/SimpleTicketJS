var http = require('http');
var fs = require('fs');

var _ = require('lodash');
var Firebase = require('firebase');

var config = require('./config');
var transporter = require('./transporter');
var mailTemplate = null;
var FRESH_RESTART = true;

var ticket = {

	startListening : function () {

		var databaseDef = new Firebase('https://sc-tickets-rosedal.firebaseio.com/tickets');

		databaseDef.limitToLast(1).on('child_added', _.bind(function(ticketData) {

			// FRESH_RESTART is used to avoid sending email if the server is restarted
			if(!FRESH_RESTART){
				this.sendMail(ticketData.val());	
			}else{
				FRESH_RESTART = false;
			}
			
		}, this));

	},

	sendMail : function (data) {


		var recipients = _.clone(config.ADMIN_RECIPIENTS);
		var validEmail = this.validateEmail(data.email);
		
		if(validEmail){
			recipients.push(data.email);
		}

		recipients = recipients.join(', ');

		var mail = {
		    from: config.SENDER_ADRESS,
		    to: recipients,
		    subject: 'Nuevo ticket: ' + data.title
		}

		console.log('Mail sent:', mail);

		var markup = mailTemplate(data);
		mail.html = markup;

		transporter.sendMail(mail, function(error, info){
		    if(error){
		        console.log(error);
		    }else{
		        console.log('Message sent: ' + info.response);
		    }
		});

	},

	validateEmail :	function (email) {
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		return re.test(email);
	}
}


fs.readFile('./mail-layout.html', function (err, templateFile) {
	
	if(err){
		console.log('No template found!');
		return 
	}

	mailTemplate = _.template(templateFile);
	
	ticket.startListening();

	http.createServer().listen(3000);
	

});


