import { Route, Router } from '@solidjs/router';
import { lazy } from 'solid-js';
import { render } from 'solid-js/web';
import Context from './EditorContext.tsx';
import './index.css';

const Editor = lazy(() => import('#component/screens/Editor'));

render(
	() => (
		// TODO: Add missing routes
		<Router root={Context}>
			<Route path='/' component={Editor} />
			{/*·FIXME:·Test·param·*/}
			<Route path='/:documentName' component={Editor} />
		</Router>
	),
	document.body
);
