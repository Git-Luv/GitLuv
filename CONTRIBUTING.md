# gitGeneral Workflow


1. Create a new issue on ZenHub board(ex. issue123)

  -> git checkout -b issue123

3. Make changes and stage them for a commit to your feature branch.

  -> git add .

4. Commit changes (see commit message guidelines below)  

  -> git commit -m 'message'

5. Sync up with latest master before pushing to remote feature branch:


  -> git checkout master
  -> git pull
  -> git checkout issue123
  -> git merge master

6. Fix any merge conflicts if necessary.

7. Push changes to remote feature branch:

  -> git push origin head

8. Generate pull request:

  -> base: master
  -> compare: issue123

9. Fix any issues highlighted by reviewer if necessary.

10. When everything checks out, reviewer merges pull request to master.


## Detailed Workflow

# Creates your branch and brings you there

git checkout -b `your-branch-name`

Make changes and commits on your branch, and make sure that you
only make changes that are relevant to this branch. If you find
yourself making unrelated changes, make a new branch for those
changes.

#### Commit Message Guidelines

- Commit messages should be written in the present tense; e.g. "Fix continuous
  integration script".
- The first line of your commit message should be a brief summary of what the
  commit changes. Aim for about 70 characters max. Remember: This is a summary,
  not a detailed description of everything that changed.
- If you want to explain the commit in more depth, following the first line should
  be a blank line and then a more detailed description of the commit. This can be
  as detailed as you want, so dig into details here and keep the first line short.

### Make a pull request

Make a clear pull request from your fork and branch to the upstream master
branch, detailing exactly what changes you made and what feature this
should add. The clearer your pull request is the faster you can get
your changes incorporated into this repo.

At least one other person MUST give your changes a code review, and once
they are satisfied they will merge your changes into upstream. Alternatively,
they may have some requested changes. You should make more commits to your
branch to fix these, then follow this process again from merging onwards.

Once you get back here, make a comment requesting further review and
someone will look at your code again. If they like it, it will get merged,
else, just repeat again.

Thanks for contributing!


