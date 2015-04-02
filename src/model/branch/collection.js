import Branch from './model';

export default Backbone.Firebase.Collection.extend({

	model : Branch,
	url: "https://sc-tickets-rosedal.firebaseio.com/branches"

});