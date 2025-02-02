import { Suspense, lazy } from 'solid-js';
import Header from '#component/Header.tsx';
import GenericFallback from '#screen/GenericFallback.tsx';

const Editor = lazy(() => import('#component/Editor.tsx'));
const Footer = lazy(() => import('#component/Footer.tsx'));

export default function EditorScreen() {
	return (
		/* TODO: Overflows when width is over 1024px */
		<div class='flex flex-col h-lvh overflow-hidden'>
			<Header />
			<Suspense fallback={<GenericFallback />}>
				<Editor />
				<Footer />
			</Suspense>
		</div>
	);
}
