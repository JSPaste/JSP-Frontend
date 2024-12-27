import type { RouteSectionProps } from '@solidjs/router';
import { createSignal } from 'solid-js';
import { type Cursor, EditorContext } from '#util/context';

export default function Context(props: RouteSectionProps) {
	const [cursor, setCursor] = createSignal<Cursor>({ line: 1, column: 1 });
	const [enableEdit, setEnableEdit] = createSignal(false);
	const [isEditing, setIsEditing] = createSignal(false);
	const [value, setValue] = createSignal('');

	const contextValue = {
		cursor: cursor,
		enableEdit: enableEdit,
		isEditing: isEditing,
		value: value,
		setCursor,
		setEnableEdit,
		setIsEditing,
		setValue
	};

	return <EditorContext.Provider value={contextValue}>{props.children}</EditorContext.Provider>;
}
