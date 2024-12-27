import { IconCode, IconCrane } from '@tabler/icons-solidjs';
import HeaderLabel from '#component/HeaderLabel';
import { language } from '#util/store';
import { useEditorContext } from '#util/useEditorContext.ts';

export default function Header() {
	const ctx = useEditorContext();

	return (
		<div class='flex min-h-6 pl-2 pr-2'>
			<HeaderLabel
				label={`Ln ${ctx.cursor().line.toString().padStart(2, '0')} Col ${ctx.cursor().column.toString().padStart(2, '0')}`}
			/>
			<HeaderLabel label={`Lang ${language()}`} />
			<span class='grow' />
			<div class='flex max-sm:hidden'>
				<HeaderLabel
					label='API'
					icon={<IconCrane size={12} />}
					onClick={() => window.open('https://github.com/jspaste/backend/tree/stable?tab=readme-ov-file#api')}
				/>
				<HeaderLabel
					label='Source'
					icon={<IconCode size={12} />}
					onClick={() => window.open('https://github.com/jspaste')}
				/>
			</div>
		</div>
	);
}
