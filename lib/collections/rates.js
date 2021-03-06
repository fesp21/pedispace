Rates = new Mongo.Collection('rates');

Meteor.methods({
	rateAdd: function(rate) {
		check(rate, {
			scheduleDate: Date,
			shiftTypeId: String,
			rateAmount: Number,
			comments: String,
			businessId: String
		});
		Rates.upsert({
			shiftTypeId: rate.shiftTypeId,
			scheduleDate: rate.scheduleDate,
			businessId: Meteor.user().profile.businessId
		}, {$set: rate});
	}
});

validateRate = function (rate) {
	var errors = {};
	if (!rate.scheduleDate)
		errors.scheduleDate = "Please select a date."
	if (!rate.shiftTypeId)
		errors.shiftType = "Please select a shift type."
	if (isNaN(rate.rateAmount) || !rate.rateAmount)
		errors.rateAmount = "Please enter a valid rate."
	return errors;
}
