import { Portal } from 'solid-js/web';
import LanguageSection from '#component/modals/settings/LanguageSection';
import ThemeSection from '#component/modals/settings/ThemeSection';

export default function Settings() {
	return (
		<Portal>
			<dialog id='modal_settings' class='modal modal-bottom sm:modal-middle'>
				<div class='modal-box flex flex-col'>
					<h3 class='font-bold text-lg mb-4'>SETTINGS</h3>
					<div class='flex flex-col gap-4'>
						<ThemeSection />
						<LanguageSection />
					</div>
				</div>
				<form method='dialog' class='modal-backdrop'>
					<button type='submit' class='cursor-default' />
				</form>
			</dialog>
		</Portal>
	);
}
