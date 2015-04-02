import User from './model';

export default Backbone.Firebase.Collection.extend({

	model : User,
	url: "https://sc-tickets-rosedal.firebaseio.com/users"

});