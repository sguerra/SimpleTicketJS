import ListItemView from './item-view';
import TicketsCollection from '../model/collection';

export default Backbone.View.extend({
	
	el : $('#ticket-list'),

	initialize : function () {
		this.$list = this.$('ul');
		this.collection = new TicketsCollection();

		this.listenTo(Backbone, 'load:ticket:detail new:ticket', function () {
			this.toggle(false);
		});
		this.listenTo(Backbone, 'user:logoff', function () {
			this.toggle(false);
		});

		this.listenTo(Backbone, 'show:tickets:list', function () {
			this.toggle(true);
		});

		this.listenTo(Backbone, 'save:new:ticket', this.saveNew);

		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);

		this.toggle(false);
	},

	saveNew : function (newModel) {
		this.collection.create(newModel.toJSON());
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
