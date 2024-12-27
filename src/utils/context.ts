import { type Accessor, type Setter, createContext } from 'solid-js';

export type Cursor = {
	column: number;
	line: number;
};

type EditorContextType = {
	cursor: Accessor<Cursor>;
	enableEdit: Accessor<boolean>;
	isEditing: Accessor<boolean>;
	value: Accessor<string>;
	setCursor: Setter<Cursor>;
	setEnableEdit: Setter<boolean>;
	setIsEditing: Setter<boolean>;
	setValue: Setter<string>;
};

export const EditorContext = createContext<EditorContextType>();
