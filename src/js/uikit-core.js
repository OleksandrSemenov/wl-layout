import { each } from 'uikit-util';
import boot from './api/boot';
import UIkit from './api';
import * as components from './core';

// register components
each(components, (component, name) => UIkit.component(name, component));

boot(UIkit);

export default UIkit;
