import type { Extension } from '@codemirror/state';
import { tags as t } from '@lezer/highlight';
import createTheme from '@uiw/codemirror-themes';

export enum Themes {
	dark = 'Dark',
	light = 'Light'
}

export type ThemeKeys = keyof typeof Themes;

const syntaxDark = {
	invalid: 'oklch(70% 0.1 20)',
	heading: 'oklch(70% 0.1 333)',
	comment: 'oklch(65% 0 0)',
	tag: 'oklch(80% 0.1 85)',
	keyword: 'oklch(75% 0.1 50)',
	type: 'oklch(75% 0.1 50)',
	constant: 'oklch(70% 0.1 333)',
	function: 'oklch(70% 0.1 333)',
	variable: 'oklch(80% 0 0)',
	class: 'oklch(80% 0 0)',
	string: 'oklch(70% 0.1 150)',
	number: 'oklch(70% 0.1 200)',
	regexp: 'oklch(80% 0.1 200)'
} as const;

const syntaxLight = {
	invalid: 'oklch(70% 0.2 20)',
	heading: 'oklch(40% 0.2 333)',
	comment: 'oklch(50% 0 0)',
	tag: 'oklch(40% 0.2 250)',
	keyword: 'oklch(40% 0.2 250)',
	type: 'oklch(40% 0.2 250)',
	constant: 'oklch(40% 0.2 333)',
	function: 'oklch(40% 0.2 333)',
	variable: 'oklch(10% 0 0)',
	class: 'oklch(10% 0 0)',
	string: 'oklch(40% 0.2 150)',
	number: 'oklch(40% 0.2 250)',
	regexp: 'oklch(50% 0.2 250)'
} as const;

export const editorThemes: Record<ThemeKeys, Extension> = {
	dark: createTheme({
		theme: 'dark',
		settings: {
			background: 'oklch(24% 0 0)',
			foreground: 'oklch(85% 0 0)',
			caret: 'oklch(91% 0.1175 92)',
			selection: 'oklch(91% 0.1175 92 / 10%)',
			selectionMatch: 'oklch(91% 0.1175 92 / 20%)',
			lineHighlight: 'oklch(100% 0 0 / 3%)',
			gutterBackground: 'oklch(20% 0 0)',
			gutterForeground: 'oklch(60% 0 0)',
			gutterActiveForeground: 'oklch(85% 0 0)'
		},
		styles: [
			{
				tag: t.invalid,
				color: syntaxDark.invalid
			},
			{
				tag: t.heading,
				fontWeight: 'bold',
				color: syntaxDark.heading
			},
			{
				tag: [t.comment, t.meta],
				color: syntaxDark.comment
			},
			{
				tag: [t.annotation, t.tagName],
				color: syntaxDark.tag
			},
			{
				tag: [t.bool, t.keyword],
				color: syntaxDark.keyword
			},
			{
				tag: [t.changed, t.modifier, t.namespace, t.self, t.typeName],
				color: syntaxDark.type
			},
			{
				tag: [t.constant(t.name), t.standard(t.name)],
				color: syntaxDark.constant
			},
			{
				tag: [t.function(t.variableName), t.labelName, t.propertyName],
				color: syntaxDark.function
			},
			{
				tag: [
					t.atom,
					t.character,
					t.deleted,
					t.definition(t.name),
					t.macroName,
					t.name,
					t.special(t.variableName)
				],
				color: syntaxDark.variable
			},
			{
				tag: t.className,
				color: syntaxDark.class
			},
			{
				tag: [t.docComment, t.inserted, t.processingInstruction, t.special(t.string), t.string],
				color: syntaxDark.string
			},
			{
				tag: [t.color, t.number],
				color: syntaxDark.number
			},
			{
				tag: [t.escape, t.link, t.regexp, t.url],
				color: syntaxDark.regexp
			},
			{
				tag: t.strong,
				fontWeight: 'bold'
			},
			{
				tag: t.emphasis,
				fontStyle: 'italic'
			},
			{
				tag: t.link,
				textDecoration: 'underline'
			},
			{
				tag: t.strikethrough,
				textDecoration: 'line-through'
			}
		]
	}),
	light: createTheme({
		theme: 'light',
		settings: {
			background: 'oklch(100% 0 0)',
			foreground: 'oklch(25% 0 0)',
			caret: 'oklch(0% 0 0)',
			selection: 'oklch(91% 0.1175 92 / 20%)',
			selectionMatch: 'oklch(91% 0.1175 92 / 30%)',
			lineHighlight: 'oklch(0% 0 0 / 3%)',
			gutterBackground: 'oklch(97% 0 0)',
			gutterForeground: 'oklch(60% 0 0)',
			gutterActiveForeground: 'oklch(25% 0 0)'
		},
		styles: [
			{
				tag: t.invalid,
				color: syntaxLight.invalid
			},
			{
				tag: t.heading,
				fontWeight: 'bold',
				color: syntaxLight.heading
			},
			{
				tag: [t.comment, t.meta],
				color: syntaxLight.comment
			},
			{
				tag: [t.annotation, t.tagName],
				color: syntaxLight.tag
			},
			{
				tag: [t.bool, t.keyword],
				color: syntaxLight.keyword
			},
			{
				tag: [t.changed, t.modifier, t.namespace, t.self, t.typeName],
				color: syntaxLight.type
			},
			{
				tag: [t.constant(t.name), t.standard(t.name)],
				color: syntaxLight.constant
			},
			{
				tag: [t.function(t.variableName), t.labelName, t.propertyName],
				color: syntaxLight.function
			},
			{
				tag: [
					t.atom,
					t.character,
					t.deleted,
					t.definition(t.name),
					t.macroName,
					t.name,
					t.special(t.variableName)
				],
				color: syntaxLight.variable
			},
			{
				tag: t.className,
				color: syntaxLight.class
			},
			{
				tag: [t.docComment, t.inserted, t.processingInstruction, t.special(t.string), t.string],
				color: syntaxLight.string
			},
			{
				tag: [t.color, t.number],
				color: syntaxLight.number
			},
			{
				tag: [t.escape, t.link, t.regexp, t.url],
				color: syntaxLight.regexp
			},
			{
				tag: t.strong,
				fontWeight: 'bold'
			},
			{
				tag: t.emphasis,
				fontStyle: 'italic'
			},
			{
				tag: t.link,
				textDecoration: 'underline'
			},
			{
				tag: t.strikethrough,
				textDecoration: 'line-through'
			}
		]
	})
} as const;
