
export default Backbone.View.extend({
	el: $('#main-menu'),

	events : {
		'click .btn-new' : 'newTicket'
	},

	newTicket : function () {
		Backbone.trigger('new:ticket');
	}
});
