import React from 'react';
import LogoIcon from '@/icons/LogoIcon';
import { MdFlag } from 'react-icons/md';
import useLanguage from '@/hooks/useLanguage';
import SelectModal from '../modals/SelectModal';
import useThemeValues from '@/hooks/useThemeValues';
import { SiGitbook, SiGithub } from 'react-icons/si';
import type { Language } from '@/constants/languages';
import { Box, Flex, Show, Spacer, Text, useDisclosure } from '@chakra-ui/react';

export interface EditorInformation {
	lineNumber: number;
	columnNumber: number;
}

function InformationLabel({
	label,
	icon,
	isSelectable,
	onClick,
	...props
}: Readonly<{
	label: React.ReactElement | string;
	icon?: React.ReactElement;
	isSelectable?: boolean;
	onClick?: () => void;
	[props: string]: any;
}>) {
	const { getThemeValue } = useThemeValues();

	const textElement = (
		<Text size='xs' fontSize='12px' color={getThemeValue('textMuted')} {...props}>
			{label}
		</Text>
	);

	return (
		<Box
			py='2px'
			px='5px'
			_hover={
				isSelectable
					? {
							background: getThemeValue('highTransparency'),
							cursor: 'pointer'
						}
					: {}
			}
			onClick={onClick}
		>
			{icon ? (
				<Flex direction='row' alignItems='center' gap='5px'>
					{icon}
					{textElement}
				</Flex>
			) : (
				textElement
			)}
		</Box>
	);
}

export default function Information({ lineNumber, columnNumber }: Readonly<EditorInformation>) {
	const { getThemeValue } = useThemeValues();
	const [languageId, setLanguageId, languages] = useLanguage();
	const { isOpen: isLangOpen, onClose: onLangClose, onOpen: onLangOpen } = useDisclosure();

	const { name: languageName, icon: languageIcon } =
		languages.find((l) => l.id === languageId) ?? (languages[0] as Language);

	return (
		<>
			<Flex
				w='100%'
				py='0px'
				px='12px'
				maxH='22px'
				direction='row'
				alignItems='center'
				gap={['5px', '10px']}
				bg={getThemeValue('information')}
			>
				<InformationLabel label='JSPaste v10.1.1' icon={<LogoIcon fontSize='15px' />} />
				<InformationLabel
					label={`Ln ${lineNumber.toString().padStart(2, '0')} Col ${columnNumber
						.toString()
						.padStart(2, '0')}`}
				/>
				<InformationLabel
					label={<Show above='sm'>Language: {languageName}</Show>}
					icon={languageIcon}
					isSelectable
					onClick={onLangOpen}
					noOfLines={1}
				/>
				<Spacer />
				<Show above='md'>
					<InformationLabel
						label='Docs'
						isSelectable
						icon={<SiGitbook size='12px' />}
						onClick={() => window.open('/docs')}
					/>
					<InformationLabel
						label='Github'
						isSelectable
						icon={<SiGithub size='12px' />}
						onClick={() => window.open('/github')}
					/>
				</Show>
			</Flex>
			<SelectModal
				isOpen={isLangOpen}
				onClose={onLangClose}
				listItems={languages.map(({ id, name }) => ({
					id,
					name,
					details: languageId === id ? 'Recently used' : 'Set language',
					icon: <MdFlag />
				}))}
				initialSelectedId={languageId}
				onPreview={setLanguageId}
				onSelect={setLanguageId}
			/>
		</>
	);
}
