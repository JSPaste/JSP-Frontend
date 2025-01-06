import { Suspense, lazy } from 'solid-js';
import Footer from '#component/Footer.tsx';
import Header from '#component/Header.tsx';
import GenericFallback from '#screen/GenericFallback.tsx';

const Editor = lazy(() => import('#component/Editor.tsx'));

export default function EditorScreen() {
	return (
		<div class='flex flex-col h-dvh overflow-hidden'>
			<Header />
			{/*·TODO:·Revise website load·*/}
			<Suspense fallback={<GenericFallback />}>
				<Editor />
			</Suspense>
			<Footer />
		</div>
	);
}
