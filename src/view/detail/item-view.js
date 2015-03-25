export default Backbone.View.extend({
	
	el : $('#ticket-detail'),

	events: {
		'submit form': 'formSubmitted',
		'click .btn-cancel': 'cancel'
	},

	initialize : function () {
		this.toggle(false);

		listDetailView.reset(this.model);
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
	},

	cancel : function () {
		this.toggle(true);
		listView.toggle(true);
	},

	toggle : function (value) {
		this.$el.toggle(value);
	}

});