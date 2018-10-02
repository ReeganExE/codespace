import React from 'react';
import { render } from 'react-dom';

import Search from './Search';

const div = document.createElement('div');
document.body.appendChild(div);

render(<Search />, div);
