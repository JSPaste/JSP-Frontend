import { Compartment, type Extension, StateEffect } from '@codemirror/state';
import type { EditorView } from '@codemirror/view';
import { type Accessor, createEffect, on } from 'solid-js';

export type CompartmentReconfigurationCallback = (extension: Extension) => void;

export function extensionLoader(
	extension: Accessor<Extension | undefined> | Extension,
	view: Accessor<EditorView | undefined>
): CompartmentReconfigurationCallback {
	const compartment = new Compartment();

	const reconfigure = (extension: Extension) => {
		view()?.dispatch({
			effects: compartment.reconfigure(extension)
		});
	};

	const $extension = typeof extension === 'function' ? extension : () => extension;

	createEffect(
		on(
			[view, $extension],
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

	return reconfigure;
}
