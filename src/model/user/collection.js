import User from './model';

export default Backbone.Firebase.Collection.extend({

	model : User,
	url: "https://resplendent-inferno-3916.firebaseio.com/users"

});