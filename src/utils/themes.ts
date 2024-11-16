import type { Extension } from '@codemirror/state';
import { tags as t } from '@lezer/highlight';
import createTheme from '@uiw/codemirror-themes';

export enum Themes {
	default = 'JSPaste',
	dark = 'Dark',
	light = 'Light'
}

export type ThemeKeys = keyof typeof Themes;

export const editorThemes: Record<ThemeKeys, Extension> = {
	default: createTheme({
		settings: {
			background: '#202020',
			foreground: '#CDCDCD',
			caret: '#FFE184',
			selection: '#FFE18419',
			selectionMatch: '#FFE18433',
			gutterBackground: '#1A1A1A',
			gutterForeground: '#838383',
			gutterActiveForeground: '#CDCDCD',
			lineHighlight: '#FFE18407'
		},
		styles: [
			{
				tag: [t.comment],
				color: '#c8c5bb'
			},
			{
				tag: [t.operator],
				color: '#e8b000'
			},
			{
				tag: [t.unit, t.punctuation],
				color: '#c19200'
			},
			{
				tag: [t.propertyName],
				color: '#fcbe00'
			},
			{
				tag: [t.bracket, t.variableName, t.emphasis, t.heading, t.tagName, t.className, t.namespace],
				color: '#dee2e6'
			},
			{
				tag: [t.typeName, t.atom, t.number, t.keyword, t.link, t.attributeName, t.quote],
				color: '#FFE184'
			},
			{
				tag: [t.number],
				color: '#84b6ff'
			},
			{
				tag: [t.string, t.url],
				color: '#84ffb0'
			}
		],
		theme: 'dark'
	}),
	dark: createTheme({
		theme: 'dark',
		settings: {
			background: '#1e1e1e',
			foreground: '#9cdcfe',
			caret: '#c6c6c6',
			selection: '#6199ff2f',
			selectionMatch: '#72a1ff59',
			lineHighlight: '#ffffff0f',
			gutterBackground: '#1e1e1e',
			gutterForeground: '#838383',
			gutterActiveForeground: '#fff',
			fontFamily: 'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace'
		},
		styles: [
			{
				tag: [
					t.keyword,
					t.operatorKeyword,
					t.modifier,
					t.color,
					t.constant(t.name),
					t.standard(t.name),
					t.standard(t.tagName),
					t.special(t.brace),
					t.atom,
					t.bool,
					t.special(t.variableName)
				],
				color: '#569cd6'
			},
			{
				tag: [t.controlKeyword, t.moduleKeyword],
				color: '#c586c0'
			},
			{
				tag: [
					t.name,
					t.deleted,
					t.character,
					t.macroName,
					t.propertyName,
					t.variableName,
					t.labelName,
					t.definition(t.name)
				],
				color: '#9cdcfe'
			},
			{
				tag: t.heading,
				fontWeight: 'bold',
				color: '#9cdcfe'
			},
			{
				tag: [t.typeName, t.className, t.tagName, t.number, t.changed, t.annotation, t.self, t.namespace],
				color: '#4ec9b0'
			},
			{
				tag: [t.function(t.variableName), t.function(t.propertyName)],
				color: '#dcdcaa'
			},
			{
				tag: [t.number],
				color: '#b5cea8'
			},
			{
				tag: [t.operator, t.punctuation, t.separator, t.url, t.escape, t.regexp],
				color: '#d4d4d4'
			},
			{
				tag: [t.regexp],
				color: '#d16969'
			},
			{
				tag: [t.special(t.string), t.processingInstruction, t.string, t.inserted],
				color: '#ce9178'
			},
			{
				tag: [t.angleBracket],
				color: '#808080'
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
				tag: t.strikethrough,
				textDecoration: 'line-through'
			},
			{
				tag: [t.meta, t.comment],
				color: '#6a9955'
			},
			{
				tag: t.link,
				color: '#6a9955',
				textDecoration: 'underline'
			},
			{
				tag: t.invalid,
				color: '#ff0000'
			}
		]
	}),
	light: createTheme({
		theme: 'light',
		settings: {
			background: '#ffffff',
			foreground: '#383a42',
			caret: '#000',
			selection: '#add6ff',
			selectionMatch: '#a8ac94',
			lineHighlight: '#f0f0f0',
			gutterBackground: '#fff',
			gutterForeground: '#237893',
			gutterActiveForeground: '#0b216f',
			fontFamily: 'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace'
		},
		styles: [
			{
				tag: [
					t.keyword,
					t.operatorKeyword,
					t.modifier,
					t.color,
					t.constant(t.name),
					t.standard(t.name),
					t.standard(t.tagName),
					t.special(t.brace),
					t.atom,
					t.bool,
					t.special(t.variableName)
				],
				color: '#0000ff'
			},
			{
				tag: [t.moduleKeyword, t.controlKeyword],
				color: '#af00db'
			},
			{
				tag: [
					t.name,
					t.deleted,
					t.character,
					t.macroName,
					t.propertyName,
					t.variableName,
					t.labelName,
					t.definition(t.name)
				],
				color: '#0070c1'
			},
			{
				tag: t.heading,
				fontWeight: 'bold',
				color: '#0070c1'
			},
			{
				tag: [t.typeName, t.className, t.tagName, t.number, t.changed, t.annotation, t.self, t.namespace],
				color: '#267f99'
			},
			{
				tag: [t.function(t.variableName), t.function(t.propertyName)],
				color: '#795e26'
			},
			{
				tag: [t.number],
				color: '#098658'
			},
			{
				tag: [t.operator, t.punctuation, t.separator, t.url, t.escape, t.regexp],
				color: '#383a42'
			},
			{
				tag: [t.regexp],
				color: '#af00db'
			},
			{
				tag: [t.special(t.string), t.processingInstruction, t.string, t.inserted],
				color: '#a31515'
			},
			{
				tag: [t.angleBracket],
				color: '#383a42'
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
				tag: t.strikethrough,
				textDecoration: 'line-through'
			},
			{
				tag: [t.meta, t.comment],
				color: '#008000'
			},
			{
				tag: t.link,
				color: '#4078f2',
				textDecoration: 'underline'
			},
			{
				tag: t.invalid,
				color: '#e45649'
			}
		]
	})
};
