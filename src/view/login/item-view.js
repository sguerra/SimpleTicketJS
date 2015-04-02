import UserCollection from '../../model/user/collection';
import BranchCollection from '../../model/branch/collection';

export default Backbone.View.extend({
	
	el : $('#login'),

	events: {
		'submit form': 'formSubmitted'
	},

	initialize : function () {

		this.$username = this.$('#username');
		this.$password = this.$('#password');
		this.$message = this.$('#message');

		this.firebase = new Firebase("https://sc-tickets-rosedal.firebaseio.com");

		this.toggle(true);
	},

	formSubmitted: function(e){
		e.preventDefault();

		var data = Backbone.Syphon.serialize(this);
		
		this.firebase.authWithPassword({
			email    : data.username,
			password : data.password
		}, _.bind(this.authMethods, this), { remember: "sessionOnly" });
	
	},

	authMethods(error, authData)
	{ 		
		if(error){		
			this.errorLogin();
		}else{
			this.doLogin();
		}
	},

	doLogin(user)
	{
		Backbone.trigger('user:authenticated');
		Backbone.trigger('show:tickets:list');
		
		this.toggle(false);
	},

	errorLogin()
	{
		var message  = 'usuario ó contraseña incorrectos';
		this.$message.html(`<div class="alert alert-danger" role="alert">${message}</div>`);
	},

	toggle : function (value) {
		this.$el.toggle(value);
	}

});