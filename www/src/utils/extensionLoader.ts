import { Compartment, type Extension, StateEffect } from '@codemirror/state';
import type { EditorView } from '@codemirror/view';
import { type Accessor, createEffect, on } from 'solid-js';

export function extensionLoader(extension: Accessor<Extension | undefined>, view: Accessor<EditorView | undefined>) {
	const compartment = new Compartment();

	const reconfigure = (extension: Extension) => {
		view()?.dispatch({
			effects: compartment.reconfigure(extension)
		});
	};

	createEffect(
		on(
			[view, extension],
			([view, extension]) => {
				if (view && extension) {
					if (compartment.get(view.state)) {
						reconfigure(extension);
					} else {
						view.dispatch({
							effects: StateEffect.appendConfig.of(compartment.of(extension))
						});
					}
				}
			},
			{ defer: true }
		)
	);
}
