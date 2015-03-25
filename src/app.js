import itemTemplate from './templates/list-item.hbs';


var ListItemView = Backbone.View.extend({
	
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
		
		var html = itemTemplate(data);
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
		listDetailView.reset(this.model);
		listView.toggle(false);
	}

});

var TicketsCollection = Backbone.Collection.extend({});

var ListView = Backbone.View.extend({
	
	el : $('#ticket-list'),

	initialize : function () {
		this.$list = this.$('ul');
		this.collection = new TicketsCollection();

		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);

		this.collection.reset([{
			title : 'title 1',
			description : 'description 1',
			status : 'closed'
		},{
			title : 'title 2',
			description : 'description 2',
			status : 'open'
		}]);
	},

	addOne : function  (model) {

		var view = new ListItemView({model : model});
		this.$list.append(view.$el);
	},

	addAll : function () {

		this.collection.each(this.addOne, this);
	},

	toggle : function (value) {
		this.$el.toggle(value);
	}

});

var ListDetailView = Backbone.View.extend({
	
	el : $('#ticket-detail'),

	events: {
		'submit form': 'formSubmitted',
		'click .btn-cancel': 'cancel'
	},

	initialize : function () {
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
	},

	cancel : function () {
		this.toggle(true);
		listView.toggle(true);
	},

	toggle : function (value) {
		this.$el.toggle(value);
	}

});


var listView = new ListView();
var listDetailView = new ListDetailView();
