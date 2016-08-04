
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