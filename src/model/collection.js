import Ticket from './model';

export default Backbone.Firebase.Collection.export({

	model : Ticket,
	firebase: "https://resplendent-inferno-3916.firebaseio.com"

});