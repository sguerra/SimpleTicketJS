import ListItemView from './item-view';
import TicketsCollection from '../model/collection';

export default Backbone.View.extend({
	
	el : $('#ticket-list'),

	initialize : function () {
		this.$list = this.$('ul');
		this.collection = new TicketsCollection();

		console.log('collection', this.collection);

		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);

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
