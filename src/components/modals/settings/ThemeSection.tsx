import { createBreakpoints } from '@solid-primitives/media';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-solidjs';
import { For, createEffect, createSignal } from 'solid-js';
import { breakpoints } from '#util/breakpoints';
import { setTheme, theme } from '#util/store';
import { type ThemeKeys, Themes } from '#util/themes';

export default function ThemeSection() {
	const matches = createBreakpoints(breakpoints);

	const breakpoint = () => (matches.sm ? 3 : 2);

	const [maxColumns, setMaxColumns] = createSignal(breakpoint());
	const [currentIndex, setCurrentIndex] = createSignal(0);

	const changeIndex = (delta: number) => {
		setCurrentIndex((prev) => (prev + delta + Object.keys(Themes).length) % Object.keys(Themes).length);
	};

	createEffect(() => document.documentElement.setAttribute('data-theme', theme()));

	createEffect(() => setMaxColumns(breakpoint()));

	createEffect(() => {
		const maxIndex = Math.max(0, Object.keys(Themes).length - maxColumns());

		if (currentIndex() > maxIndex) {
			setCurrentIndex(maxIndex);
		}
	});

	return (
		<div class='flex flex-col gap-4'>
			<p>Editor theme:</p>
			<div class='flex justify-between align-middle items-center'>
				<button
					type='button'
					aria-label='Previous'
					class='btn btn-square btn-sm'
					onClick={() => changeIndex(-1)}
					disabled={currentIndex() === 0}
				>
					<IconChevronLeft />
				</button>
				<div class={`w-full pl-5 pr-5 grid grid-flow-col gap-4 grid-cols-${maxColumns()}`}>
					<For each={Object.entries(Themes).slice(currentIndex(), currentIndex() + maxColumns())}>
						{([id, name]) => (
							<input
								checked={id === theme()}
								type='radio'
								name='theme-button'
								class='btn theme-controller join-horizontal'
								aria-label={name}
								value={id}
								onChange={() => setTheme(id as ThemeKeys)}
							/>
						)}
					</For>
				</div>
				<button
					type='button'
					aria-label='Next'
					class='btn btn-square btn-sm'
					onClick={() => changeIndex(1)}
					disabled={currentIndex() === Object.keys(Themes).length - maxColumns()}
				>
					<IconChevronRight />
				</button>
			</div>
		</div>
	);
}
