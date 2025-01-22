import { Route, Router } from '@solidjs/router';
import { lazy } from 'solid-js';
import { render } from 'solid-js/web';
import Context from '#component/Context.tsx';
import UnknownScreen from '#screen/Unknown.tsx';
import './index.css';

const EditorScreen = lazy(() => import('#screen/Editor.tsx'));

render(
	() => (
		<Router root={Context}>
			<Route path='/' component={EditorScreen} />
			<Route path='/:documentName' component={EditorScreen} />
			<Route path='*404' component={UnknownScreen} />
		</Router>
	),
	document.body
);
