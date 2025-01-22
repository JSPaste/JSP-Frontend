import { makePersisted } from '@solid-primitives/storage';
import { createSignal } from 'solid-js';
import type { ThemeKeys } from '#util/themes.ts';

export const [editorAPI, setEditorAPI] = makePersisted(createSignal('https://jspaste.eu/api/v2/documents'), {
	storage: localStorage,
	name: 'x-jspaste-frontend-editor-api'
});

export const [editorContent, setEditorContent] = makePersisted(createSignal(''), {
	storage: localStorage,
	name: 'x-jspaste-frontend-editor-content'
});

export const [theme, setTheme] = makePersisted(
	createSignal<ThemeKeys>(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
	{
		storage: localStorage,
		name: 'x-jspaste-frontend-editor-theme'
	}
);
