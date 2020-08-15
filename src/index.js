var $projects = null
var $blogs = null
var $technologies = null
var $myStatus = null

gen = arg => document.createElement(arg)
$   = arg => document.getElementById(arg)

getProjectStatus = async () => {
	await fetch ("https://raw.githubusercontent.com/argonsodiumvanadium/my-website/api/status.json").
	then  (response => response.text()).
	then  (result   => {console.log(result);$projects = JSON.parse(result);console.log($projects)}).
	catch (err => console.log(err))
}

getBlogs = async () => {
	await fetch ("https://raw.githubusercontent.com/argonsodiumvanadium/my-website/api/blog.json").
	then  (response => response.text()).
	then  (result   => {$blogs = JSON.parse(result)}).
	catch (err => console.log(err))
}

getTechnoList = async () => {
	await fetch ("https://raw.githubusercontent.com/argonsodiumvanadium/my-website/api/technologies.html").
	then  (response => response.text()).
	then  (result   => {$technologies = result}).
	catch (err => console.log(err))
}

getMyStatus = async () => {
	await fetch("https://raw.githubusercontent.com/argonsodiumvanadium/my-website/api/index-status.html").
	then  (response => response.text()).
	then  (result   => {$myStatus = result}).
	catch (err => console.log(err))
}

loadBlogs = async () => {
	await getBlogs()

	if ($blogs.src != null) {
		for (blog of $blogs.src) {
			div = gen("div")
			div.innerHTML += `
				<div class="pt-6 mt-6 columns is-mobile">
					<div class="column"></div>
					<div class="notification is-dark column is-10 px-4 py-6" style="border-style: solid;border-color: #ffdd57">
						${blog.data}
					</div>
					<div class="column"></div>
				</div>
			`
			$("blog").prependChild(div)
		}
	}
}

loadProjects = async () => {
	await getProjectStatus()
	div = gen("div")

	for (project of $projects["src"]) {
		div.innerHTML += `
			<div onclick="window.open('${project.link}','_self')" class="mt-6 mb-2" style="cursor:pointer">
				<h2 class="has-text-${project.class}">Animegami</h2>
				<span class="tag is-${project.class}">${project.status}</span>
				<span class="tag is-${project.class}">${project.done}% completed</span>
				<progress class="progress is-${project.class} mt-4" value="${project.done}" max="100">10%</progress>
			</div>
		`
	}

	$("projects").appendChild(div)
}


loadTechnoList = async() => {
	await getTechnoList()
	div = gen("div")
	div.innerHTML = $technologies

	$("techno-list").appendChild(div)
}

loadMyStatus = async() => {
	await getMyStatus()
	div = gen("div")
	div.innerHTML = $myStatus

	$("my-status").appendChild(div)
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
