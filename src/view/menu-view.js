
export default Backbone.View.extend({
	el: $('#main-menu'),

	events : {
		'click .btn-new' : 'newTicket'
	},

	initialize()
	{
		this.$btnNew = this.$el.find('.btn-new');

		this.listenTo(Backbone, 'user:authenticated', this.show);
		this.$btnNew.toggle(false);
	},

	show()
	{
		this.$btnNew.toggle(true);
	},

	newTicket()
	{
		Backbone.trigger('new:ticket');
	}
});
