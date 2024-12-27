import type { LanguageSupport, StreamLanguage } from '@codemirror/language';
import { makePersisted } from '@solid-primitives/storage';
import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { type LangKeys, langs } from '#util/langs';
import type { ThemeKeys } from '#util/themes';

export const [frontend, setFrontend] = makePersisted(
	createStore({
		apiURL: 'https://jspaste.eu/api/v2/documents'
	}),
	{
		storage: localStorage,
		name: 'x-jspaste-frontend'
	}
);

export const [theme, setTheme] = makePersisted(
	createSignal<ThemeKeys>(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
	{
		storage: localStorage,
		name: 'x-jspaste-frontend-editor-theme'
	}
);

export const [language, setLanguage] = createSignal<LangKeys>('markdown');

export const getLanguage = async (): Promise<StreamLanguage<unknown> | LanguageSupport> => {
	const lang = await langs[language()]();
	return lang();
};
