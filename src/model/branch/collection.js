import Branch from './model';

export default Backbone.Firebase.Collection.extend({

	model : Branch,
	url: "https://resplendent-inferno-3916.firebaseio.com/branches"

});