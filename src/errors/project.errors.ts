export const ProjectErrors = {
  NotFoundById: {
    errorMessage: 'Project not found',
    reason: 'No one match with given id was found',
  },
  NotFoundByName: {
    errorMessage: 'Project not found',
    reason: 'No one match with given name was found',
  },
  NotFound: {
    errorMessage: 'Projects not found',
    reason: 'There is no one project in database',
  },
  DuplicateProjectName: {
    errorMessage: 'Project creation is forbidden',
    reason: 'There is project with such name in database',
  },
};
