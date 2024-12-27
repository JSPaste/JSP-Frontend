import { IconAlignJustified, IconDeviceFloppy, IconPencil, IconSettings } from '@tabler/icons-solidjs';
import FooterButton from '#component/FooterButton';
import Settings from '#component/modals/settings/Settings';
import { useEditorContext } from '#util/useEditorContext.ts';

type FooterProps = {
	documentName?: string;
};

export default function Footer(props: FooterProps) {
	const ctx = useEditorContext();

	const handleSave = async () => {
		alert('Saved! (NOT IMPLEMENTED)');
	};

	return (
		<div class='flex gap-2 p-2'>
			<span class='grow' />
			<FooterButton
				icon={<IconDeviceFloppy size={20} />}
				label={ctx.value() ? 'Save' : 'You need to write something to save!'}
				onClick={handleSave}
				isDisabled={!ctx.value()}
			/>
			<FooterButton
				icon={<IconPencil size={20} />}
				label='Edit'
				onClick={() => ctx.setIsEditing(true)}
				isDisabled={ctx.isEditing() || !ctx.enableEdit}
			/>
			<FooterButton
				icon={<IconAlignJustified size={20} />}
				label='View Raw'
				onClick={() => window.open(`/${props.documentName}/raw`)}
				isDisabled={!props.documentName || ctx.isEditing()}
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
