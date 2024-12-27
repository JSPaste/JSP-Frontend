import { useParams } from '@solidjs/router';
import { Suspense, lazy } from 'solid-js';
import Footer from '#component/Footer';
import Header from '#component/Header';
import GenericFallback from '#component/screens/GenericFallback';

const Editor = lazy(() => import('#component/Editor'));

export default function EditorScreen() {
	const params = useParams();

	return (
		<div class='flex flex-col h-dvh overflow-hidden'>
			<Header />
			{/*·TODO:·Revise website load·*/}
			<Suspense fallback={<GenericFallback />}>
				<Editor />
			</Suspense>
			<Footer documentName={params.documentName} />
		</div>
	);
}
