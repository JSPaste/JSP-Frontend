import { For } from 'solid-js';
import { type LangKeys, langs, language, setLanguage } from '#util/langs';

export default function LanguageSection() {
	return (
		<div class='flex flex-col gap-4'>
			<p>Editor lang:</p>
			<select
				name='language-select'
				class='select select-bordered w-full max-w-xs'
				onChange={(e) => setLanguage(e.target.value as LangKeys)}
				value={language()}
			>
				<For each={Object.keys(langs).sort((a, b) => a.localeCompare(b))}>
					{(lang) => <option>{lang}</option>}
				</For>
			</select>
		</div>
	);
}
