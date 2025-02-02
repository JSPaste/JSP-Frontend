import { useParams } from '@solidjs/router';
import { IconAlignJustified, IconDeviceFloppy, IconPencil, IconSettings } from '@tabler/icons-solidjs';
import { lazy } from 'solid-js';
import FooterButton from '#component/FooterButton.tsx';
import { getEditorContext } from '#util/getEditorContext.ts';
import { editorContent } from '#util/persistence.ts';

const Settings = lazy(() => import('#component/modals/settings/Settings.tsx'));

export default function Footer() {
	const ctx = getEditorContext();
	const params = useParams();

	const handleSave = async () => {
		alert('Saved! (NOT IMPLEMENTED)');
	};

	return (
		<div class='flex gap-2 p-2'>
			<span class='grow' />
			<FooterButton
				icon={<IconDeviceFloppy size={20} />}
				label={editorContent() ? 'Save' : 'You need to write something to save!'}
				onClick={handleSave}
				isDisabled={!editorContent()}
			/>
			<FooterButton
				icon={<IconPencil size={20} />}
				label='Edit'
				onClick={() => ctx.setEditable(true)}
				isDisabled={ctx.writing() || !ctx.editable()}
			/>
			<FooterButton
				icon={<IconAlignJustified size={20} />}
				label='View Raw'
				onClick={() => window.open(`/${params.documentName}/raw`)}
				isDisabled={!params.documentName || ctx.writing()}
			/>
			<FooterButton
				icon={<IconSettings size={20} />}
				label='Settings'
				onClick={() => (document.getElementById('modal_settings') as HTMLDialogElement).showModal()}
			/>
			<Settings />
		</div>
	);
}
