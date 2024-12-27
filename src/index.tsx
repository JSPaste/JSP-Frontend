import { Route, Router } from '@solidjs/router';
import { render } from 'solid-js/web';
import Editor from '#component/screens/Editor.tsx';
import Context from './EditorContext.tsx';
import './index.css';

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
