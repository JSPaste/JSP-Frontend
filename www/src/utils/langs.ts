import { createSignal } from 'solid-js';

export const [language, setLanguage] = createSignal<LangKeys>('markdown');

export const langs = {
	cpp: () => import('@codemirror/lang-cpp').then((lang) => lang.cpp()),
	css: () => import('@codemirror/lang-css').then((lang) => lang.css()),
	go: () => import('@codemirror/lang-go').then((lang) => lang.go()),
	html: () => import('@codemirror/lang-html').then((lang) => lang.html()),
	java: () => import('@codemirror/lang-java').then((lang) => lang.java()),
	javascript: () => import('@codemirror/lang-javascript').then((lang) => lang.javascript()),
	json: () => import('@codemirror/lang-json').then((lang) => lang.json()),
	jsx: () => import('@codemirror/lang-javascript').then((lang) => lang.javascript({ jsx: true })),
	markdown: () => import('@codemirror/lang-markdown').then((lang) => lang.markdown()),
	php: () => import('@codemirror/lang-php').then((lang) => lang.php()),
	python: () => import('@codemirror/lang-python').then((lang) => lang.python()),
	rust: () => import('@codemirror/lang-rust').then((lang) => lang.rust()),
	tsx: () => import('@codemirror/lang-javascript').then((lang) => lang.javascript({ jsx: true, typescript: true })),
	typescript: () => import('@codemirror/lang-javascript').then((lang) => lang.javascript({ typescript: true })),
	xml: () => import('@codemirror/lang-xml').then((lang) => lang.xml()),
	yaml: () => import('@codemirror/lang-yaml').then((lang) => lang.yaml())
} as const;

export type LangKeys = keyof typeof langs;
