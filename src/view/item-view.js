import ItemTemplate from './list-template.hbs';

export default Backbone.View.extend({
	
	tagName : 'li',

	events : {
		'click' : 'select',
		'click .status-indicator' : 'toggleStatusOptions',
		'click .status' : 'changeTicketStatus',
	},

	initialize : function () {
		
		this.render();
	
		this.listenTo(this.model, 'change', this.render);
	},

	render : function () {
		var data = this.model.toJSON();
		
		var html = ItemTemplate(data);
		this.$el.html(html);
	},

	toggleStatusOptions : function (e) {
		e.stopPropagation();
		
		this.$('.overlay').show();
	},

	changeTicketStatus : function (e) {
		
		var newStatus = $(e.currentTarget).data().value;
		
		this.model.set('status', newStatus);

		this.$('.overlay').hide();	
	},

	select : function (e) {
		e.stopPropagation();

		Backbone.trigger('load:ticket:detail', this.model);
	}

});