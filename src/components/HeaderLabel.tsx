import type { JSXElement } from 'solid-js';

type HeaderLabelProps = {
	icon?: JSXElement;
	label: string;
	onClick?: () => void;
};

export default function HeaderLabel(props: HeaderLabelProps) {
	return (
		<div
			class={`flex items-center gap-1 pl-2 pr-2 text-xs ${props.onClick ? 'hover:bg-base-100 hover:cursor-pointer' : ''}`}
			onClick={props.onClick}
			role={props.onClick && 'button'}
		>
			{props.icon}
			<p>{props.label}</p>
		</div>
	);
}
