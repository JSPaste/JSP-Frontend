import { useContext } from 'solid-js';
import { ContextEditor } from '#util/contextEditor.ts';

export const getEditorContext = () => {
	const ctx = useContext(ContextEditor);

	if (!ctx) {
		throw new Error('???');
	}

	return ctx;
};
