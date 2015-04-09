
export default Backbone.Model.extend({
	
	defaults: { 
		title: '' ,
		description: '',
		comment: '',
		branch: '',
		requester: '',
		email: '',
		name: '',
		phone: '',
		date: '',
		status: 'open'
	}

});