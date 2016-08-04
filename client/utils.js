
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