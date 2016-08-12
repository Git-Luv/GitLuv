
const skills = ["JavaScript", "React", "Angular.js", "Redux", "Mithril", "Backbone", "Node.js", "Express", "Git", "Passport", "Socket.io", "Mongo", "Mongoose", "Test Driven Development", "Continuous Deployment", "Agile Methodology", "Waterfall Methodology", "OAuth", "PHP", "Postgress", "KNEX", "Browserify", "Webpack", "Grunt", "Gulp", "CSS", "HTML", "ES2015", "React Native", "React-Router", "C++", "Java", "Ruby", "Python", "Go", "Haskell", "Android", "iOS", "C#", "Machine Language(s)", "Ruby on Rails", "MEAN stack", "PERRN stack", "Heroku"]

// Adds up all skills that the user and project have in common and returns the number
export function getCommonSkillCount(user, project){
	let count = 0;
	for(let i = 0; i < user.skills.length; i++){
		for(let j = 0; j < project.req_skills.length; j++){
			if(user.skills[i] === project.req_skills[j]){
				count++;
			}
		}
	}
	return count;
}

export function getSkills() {
	return skills;
}

export function convertTimeToString(time) {
	var now = new Date();
	time = new Date(time);
	var years = now.getFullYear() - time.getFullYear();
	var months = now.getMonth() - time.getMonth();
	var days = now.getDate() - time.getDate();
	var hours = now.getHours() - time.getHours();
	var minutes = now.getMinutes() - time.getMinutes();

	if(years > 0){
		return years === 1 ? "1 year ago" : years + " years ago";
	}
	if(months > 0){
		return months === 1 ? "1 month ago" : months + " months ago";
	}
	if(days > 0){
		return days === 1 ? "a day ago" : days + " days ago";
	}
	if(hours > 0){
		return hours === 1 ? "1 hour ago" : hours + " hours ago";
	}
	if(minutes > 0){
		return minutes === 1 ? "1 minute ago" : minutes + " minutes ago";
	}
	return "a few moments ago";
}