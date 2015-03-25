import itemTemplate from './templates/list-item.hbs';


var ListItemView = Backbone.View.extend({
	tagName : 'li',
	initialize : function () {
		this.render();
	},
	render : function () {
		var data = this.model.toJSON();
		var html = itemTemplate(data);
		this.$el.html(html);
	}
});

var TicketsCollection = Backbone.Collection.extend({});

var ListView = Backbone.View.extend({
	el : $('.panel'),
	initialize : function () {
		this.$list = this.$('ul');
		this.collection = new TicketsCollection();

		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);

		this.collection.reset([{
			title : 'title 1',
			description : 'description 1',
			status : 'closed'
		}]);
	},
	addOne : function  (model) {

		var view = new ListItemView({model : model});
		this.$list.append(view.$el);
	},
	addAll : function () {

		this.collection.each(this.addOne, this);
	}
});

var listView = new ListView();