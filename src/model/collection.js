import Ticket from './model';

export default Backbone.Firebase.Collection.extend({

	model : Ticket,
	url: "https://sc-tickets-rosedal.firebaseio.com/tickets"

});