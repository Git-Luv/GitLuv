GIT FLOW
-make new issue on ZenHub board (let’s say it’s called issue12345)
-go to local repo
-run
git checkout -b issue123345
(this makes a new local branch where you will work on your issue)
_when you are done working on feature and ready to get it into master_
-push to local branch
git push origin head
(head will work as long as you are on your local branch)
-go to github.com
-navigate to that branch on github.com
-submit a new pull request from that branch
-then let team know in slack
-someone else, must be different person, goes over pull request
-once they have approved it and branch is merged, they then put in team slack channel:
@channel rebase rebase rebase
-all other team members then update their local branches ASAP
-first checkout master
git checkout master
-pull master
git pull
-checkout local branch (aka your branch in progress)
git checkout issue12345
-then merge
git merge origin master
solve merge conflicts and move on happy happy - fix conflicts, add changes, then gtg