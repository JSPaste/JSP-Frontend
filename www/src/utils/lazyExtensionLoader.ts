import { Compartment, type Extension, StateEffect } from '@codemirror/state';
import type { EditorView } from '@codemirror/view';
import { type Accessor, createEffect, on } from 'solid-js';

export function lazyExtensionLoader(
	extension: () => Promise<Extension | null | undefined>,
	view: Accessor<EditorView | undefined>
) {
	const compartment = new Compartment();

	const reconfigure = (extension: Extension) => {
		view()?.dispatch({
			effects: compartment.reconfigure(extension)
		});
	};

	createEffect(
		on(
			[view, extension],
			async ([view, extension]) => {
				const resolvedExtension = await extension;

				if (view && resolvedExtension) {
					if (compartment.get(view.state)) {
						reconfigure(resolvedExtension);
					} else {
						view.dispatch({
							effects: StateEffect.appendConfig.of(compartment.of(resolvedExtension))
						});
					}
				}
			},
			{ defer: true }
		)
	);
}
