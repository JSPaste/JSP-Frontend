import type { Extension } from '@codemirror/state';
import type { EditorView } from '@codemirror/view';
import { type Accessor, createSignal, onMount } from 'solid-js';
import { extensionLoader } from './extensionLoader.ts';

export function lazyExtensionLoader(
	extension: () => Promise<Extension | null | undefined>,
	view: Accessor<EditorView | undefined>
) {
	const [loadedExtension, setLoadedExtension] = createSignal<Extension>([]);

	const reconfigure = extensionLoader(() => loadedExtension(), view);

	const setExtension = (extension: Extension | null | undefined) => {
		const resolvedExtension = extension ?? [];

		reconfigure(resolvedExtension);
		setLoadedExtension(resolvedExtension);
	};

	onMount(() => {
		extension()
			.then((extension) => setExtension(extension))
			.catch(() => setExtension(null));
	});
}
