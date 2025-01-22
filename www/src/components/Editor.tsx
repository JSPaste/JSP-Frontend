import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { bracketMatching, defaultHighlightStyle, indentOnInput, syntaxHighlighting } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import {
	EditorView,
	crosshairCursor,
	drawSelection,
	dropCursor,
	highlightActiveLine,
	highlightActiveLineGutter,
	highlightSpecialChars,
	keymap,
	lineNumbers,
	placeholder,
	rectangularSelection
} from '@codemirror/view';
import { debounce } from '@solid-primitives/scheduled';
import { hyperLinkExtension, hyperLinkStyle } from '@uiw/codemirror-extensions-hyper-link';
import { createSignal, onCleanup, onMount } from 'solid-js';
import { extensionLoader } from '#util/extensionLoader.ts';
import { getEditorContext } from '#util/getEditorContext.ts';
import { langs, language } from '#util/langs.ts';
import { lazyExtensionLoader } from '#util/lazyExtensionLoader.ts';
import { editorContent, setEditorContent, theme } from '#util/persistence.ts';
import { editorThemes } from '#util/themes.ts';

export default function Editor() {
	const ctx = getEditorContext();

	const [container, setContainer] = createSignal<HTMLDivElement>();
	const [editorView, setEditorView] = createSignal<EditorView>();

	const updateCursor = debounce(() => {
		const view = editorView();

		if (view) {
			const { from } = view.state.selection.main;
			const cursorPosition = view.state.doc.lineAt(from);

			ctx.setCursor({
				line: cursorPosition.number,
				column: from - cursorPosition.from + 1
			});
		}
	}, 200);

	const saveEditorContent = debounce(() => {
		const view = editorView();

		if (view) {
			setEditorContent(view.state.doc.toString());
		}
	}, 500);

	extensionLoader(() => editorThemes[theme()], editorView);
	extensionLoader(() => EditorState.readOnly.of(ctx.editable() && !ctx.writing()), editorView);
	lazyExtensionLoader(() => langs[language()](), editorView);

	onMount(() => {
		const currentView = new EditorView({
			parent: container(),
			state: EditorState.create({
				doc: editorContent(),
				extensions: [
					placeholder(
						"Start writing here! When you're done, hit the save button to generate a unique URL with your content."
					),
					lineNumbers(),
					highlightActiveLineGutter(),
					highlightSpecialChars(),
					history(),
					drawSelection(),
					dropCursor(),
					indentOnInput(),
					syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
					bracketMatching(),
					closeBrackets(),
					rectangularSelection(),
					crosshairCursor(),
					highlightActiveLine(),
					keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...historyKeymap]),
					hyperLinkExtension(),
					hyperLinkStyle,
					EditorView.theme({
						'&': {
							height: '100%'
						},
						'& .cm-scroller': {
							height: '100% !important'
						},
						'& .cm-lineNumbers .cm-gutterElement': {
							padding: '0 5px'
						}
					}),
					EditorView.contentAttributes.of({ 'data-lt-active': 'false' }),
					EditorView.updateListener.of((vu) => {
						if (vu.selectionSet) {
							updateCursor();
						}

						if (vu.docChanged) {
							saveEditorContent();
						}
					})
				]
			})
		});

		setEditorView(currentView);
	});

	onCleanup(() => {
		editorView()?.destroy();
		setEditorView(undefined);
	});

	return <div ref={setContainer} class='grow overflow-hidden' />;
}
