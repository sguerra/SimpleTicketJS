import Ticket from '../../model/model';
import UserCollection from '../../model/user/collection';

export default Backbone.View.extend({
	
	el : $('#ticket-detail'),

	events: {
		'submit form': 'formSubmitted',
		'click .btn-cancel': 'cancel'
	},

	initialize : function () {

		this.$requesterSelect = this.$('#requester');

		this.listenTo(Backbone, 'load:ticket:detail', this.reset);
		this.listenTo(Backbone, 'new:ticket', this.new);

		this.users = new UserCollection();
		this.listenTo(this.users, 'sync', this.loadSelect);

		this.toggle(false);
		
	},

	loadSelect()
	{
		this.users.each((user)=>{

			this.$requesterSelect.append(`<option value="${user.get('name')}">${user.get('name')}</option>`);

		});

	},

	reset : function (model) {
		this.model = model;

		Backbone.Syphon.deserialize(this, this.model.toJSON());

		this.toggle(true);
	},

	new : function () {
		var newModel = new Ticket();
		this.reset(newModel);
	},

	formSubmitted: function(e){
		e.preventDefault();

		var data = Backbone.Syphon.serialize(this);
		this.model.set(data);
	
		if(this.model.isNew()){
			this.model.set('date', moment().toISOString());
			Backbone.trigger('save:new:ticket', this.model);
		}

		Backbone.trigger('show:tickets:list');
		this.toggle(false);
	},

	cancel : function () {
		this.toggle(false);
		Backbone.trigger('show:tickets:list');
	},

	toggle : function (value) {
		this.$el.toggle(value);
	}

});