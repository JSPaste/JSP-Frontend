import { type Accessor, type Setter, createContext } from 'solid-js';

export type Cursor = {
	column: number;
	line: number;
};

export type ContextEditorType = {
	cursor: Accessor<Cursor>;
	editable: Accessor<boolean>;
	writing: Accessor<boolean>;
	setCursor: Setter<Cursor>;
	setEditable: Setter<boolean>;
	setWriting: Setter<boolean>;
};

export const ContextEditor = createContext<ContextEditorType>();
