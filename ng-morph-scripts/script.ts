import {
  setActiveProject,
  createProject,
  NgMorphTree,
  saveActiveProject,
  getClasses,
  addMethods,
  editProperties,
  getProperties,
} from 'ng-morph';

setActiveProject(
  createProject(new NgMorphTree(), '/', ['**/*.ts', '**/*.json'])
);

const components = getClasses('**/*.ts', {
  name: '*Component',
});

console.log(components.map((component) => component.getText()));

addMethods(components, {
  name: 'test' + Date.now(),
  statements: 'return 0;',
  returnType: 'number',
});

editProperties(
  getProperties(components, {
    name: 'text',
  }),
  () => ({
    name: 'text',
    initializer: `'This is the text added with ng-morph at ${new Date().toLocaleTimeString()}'`,
  })
);

/**
 * All changes are made in a virtual project.
 * You can save them when it is time
 * */
saveActiveProject();

console.log('ng-morph ✅');
