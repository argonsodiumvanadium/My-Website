var PROJECTS = [
	{
		"name"   : "Animegami",
		"done"   : "5",
		"status" : "paused",
		"class"  : "warning",
		"link"   : "projects/animegami.html"
	}
]

gen = arg => document.createElement(arg)
$   = arg => document.getElementById(arg)

loadProjects = () => {
	div = gen("div")

	for (project of PROJECTS) {
		div.innerHTML += `
			<div onclick="window.open('${project.link}','_self')" class="mt-6 mb-2" style="cursor:pointer">
				<h2 class="has-text-${project.class}">Animegami</h2>
				<span class="tag is-${project.class}">Paused</span>
				<span class="tag is-${project.class}">${project.done}% completed</span>
				<progress class="progress is-${project.class} mt-4" value="${project.done}" max="100">10%</progress>
			</div>
		`
	}

	$("projects").appendChild(div)
}

copyToClipboard = (data,message) => {
	$("ghost_input").value = data

	$("ghost_input").select()
	$("ghost_input").setSelectionRange(0, 99999);

	document.execCommand("copy");

	div = $("notification_div")
	div.innerHTML = `
		<div class="notification is-light position-bottom-right animate__bounceInRight animate__animated">
			<button class="delete" onclick="this.parentNode.className='notification is-light position-bottom-right animate__bounceOutRight animate__animated'"></button>
			${message}
		</div>

	`
}

toggleNavBar = () => {
	document.addEventListener('DOMContentLoaded', () => {

	// Get all "navbar-burger" elements
	const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

	// Check if there are any navbar burgers
	if ($navbarBurgers.length > 0) {

	// Add a click event on each of them
	$navbarBurgers.forEach( el => {
	el.addEventListener('click', () => {

	// Get the target from the "data-target" attribute
	const target = el.dataset.target;
	const $target = document.getElementById(target);

	// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
	el.classList.toggle('is-active');
	$target.classList.toggle('is-active');

	});
	});
	}

	});
}

toggleNavBar()