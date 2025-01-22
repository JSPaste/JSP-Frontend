import type { RouteSectionProps } from '@solidjs/router';
import { createSignal } from 'solid-js';
import { ContextEditor, type ContextEditorType, type Cursor } from '#util/contextEditor.ts';

export default function Context(props: RouteSectionProps) {
	const [cursor, setCursor] = createSignal<Cursor>({ line: 1, column: 1 });
	const [editable, setEditable] = createSignal(false);
	const [writing, setWriting] = createSignal(false);

	const contextValue: ContextEditorType = {
		cursor,
		editable,
		writing,
		setCursor,
		setEditable,
		setWriting
	};

	return <ContextEditor.Provider value={contextValue}>{props.children}</ContextEditor.Provider>;
}
