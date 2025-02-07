import { useLocation } from '@solidjs/router';
import { Suspense, lazy } from 'solid-js';
import Header from '#component/Header.tsx';
import GenericFallback from '#screen/GenericFallback.tsx';
import { type LangKeys, langs, setLanguage } from '#util/langs.ts';

const Editor = lazy(() => import('#component/Editor.tsx'));
const Footer = lazy(() => import('#component/Footer.tsx'));

export default function EditorScreen() {
	const location = useLocation();

	const language = location.query.language as string | undefined;

	if (language && language in langs) {
		setLanguage(language as LangKeys);
	}

	return (
		/* FIXME: Overflows when width is over 1024px */
		<div class='flex flex-col h-lvh overflow-hidden'>
			<Header />
			<Suspense fallback={<GenericFallback />}>
				<Editor />
				<Footer />
			</Suspense>
		</div>
	);
}
