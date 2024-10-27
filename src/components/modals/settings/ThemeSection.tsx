import { setTheme, theme } from '@x-util/store';
import { type ThemeKeys, Themes } from '@x-util/themes';
import { For } from 'solid-js';

export default function ThemeSection() {
	return (
		<div class='flex flex-col gap-4'>
			<p>Editor theme:</p>
			<For each={Object.entries(Themes)}>
				{([id, name]) => (
					<div class='form-control'>
						<label class='label cursor-pointer'>
							<span class='label-text'>{name}</span>
							<input
								type='radio'
								name='theme-radio'
								class='radio theme-controller'
								checked={id === theme()}
								value={id}
								onChange={() => setTheme(id as ThemeKeys)}
							/>
						</label>
					</div>
				)}
			</For>
		</div>
	);
}
