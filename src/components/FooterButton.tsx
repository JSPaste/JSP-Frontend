import type { JSXElement } from 'solid-js';

type FooterButtonProps = {
	icon?: JSXElement;
	isDisabled?: boolean;
	label: string;
	onClick?: () => void;
};

export default function FooterButton(props: FooterButtonProps) {
	return (
		<div class='lg:tooltip tooltip-top' data-tip={!props.isDisabled ? props.label : `${props.label} (Disabled)`}>
			<button
				type='button'
				aria-label={props.label}
				class='btn btn-square btn-sm bg-base-300'
				onClick={props.onClick}
				disabled={props.isDisabled ?? false}
			>
				{props.icon}
			</button>
		</div>
	);
}
