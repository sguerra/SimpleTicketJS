export default Backbone.View.extend({
	
	el : $('#ticket-detail'),

	events: {
		'submit form': 'formSubmitted',
		'click .btn-cancel': 'cancel'
	},

	initialize : function () {

		this.listenTo(Backbone, 'load:ticket:detail', this.reset);

		this.toggle(false);
		
	},

	reset : function (model) {
		this.model = model;

		Backbone.Syphon.deserialize(this, this.model.toJSON());

		this.toggle(true);
	},

	formSubmitted: function(e){
		e.preventDefault();

		var data = Backbone.Syphon.serialize(this);
		this.model.set(data);
		
		this.model.save();
		Backbone.trigger('show:tickets:list');
	},

	cancel : function () {
		this.toggle(false);
		Backbone.trigger('show:tickets:list');
	},

	toggle : function (value) {
		this.$el.toggle(value);
	}

});