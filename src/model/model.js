
export default Backbone.Model.extend({
	
	defaults: { 
		title: '' ,
		description: '',
		branch: '',
		requester: '',
		email: '',
		name: '',
		phone: '',
		date: '',
		status: 'open'
	}

});