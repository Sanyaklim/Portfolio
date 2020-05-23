console.log('It works')

$(document).ready(function () {
	$('.submit').click(function (event) {
		console.log('Clicked button')

		var subject = $('.subject').val()
		var email = $('.email').val()
		var message = $('.message').val()
		var statusElm = $('.status')
		statusElm.empty()

		if (subject.length > 3) {
			statusElm.append()
		} else {
			event.preventDefault()
			statusElm.append('<div>Name is short, must have minimum 4 characters.</div>')
		}

		if (email.length > 7 && email.includes('@') && email.includes('.')) {
			statusElm.append()
		} else {
			event.preventDefault()
			statusElm.append('<div>Email is not valid, must contain (@) (.) and minimum 8 characters.</div>')
		}

		if (message.length > 9) {
			statusElm.append()
		} else {
			event.preventDefault()
			statusElm.append('<div>Message is short, must have minimum 10 characters.</div>')
		}
	})
})
