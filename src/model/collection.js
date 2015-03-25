import Ticket from './model';

export default Backbone.Firebase.Collection.extend({

	model : Ticket,
	url: "https://resplendent-inferno-3916.firebaseio.com/tickets"

});