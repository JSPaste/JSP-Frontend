import { useContext } from 'solid-js';
import { EditorContext } from '#util/context.ts';

// TODO: https://docs.solidjs.com/concepts/context#common-issues-with-createcontext-and-usecontext
export const useEditorContext = () => {
	const ctx = useContext(EditorContext);

	if (!ctx) {
		throw new Error('??? EditorContext');
	}

	return ctx;
};
