import { FC, useState } from "react";
import { intersection, not, union } from "./functions";
import { Button, Grid } from "@mui/material";
import CustomList from "./customList";
import { Control, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IFormFields } from "../app.interface";
export interface IGroup {
	name: string;
	distinguishedName: string;
	description: null | string;
}

export interface ITransferList {
	setValue: UseFormSetValue<IFormFields>
	getValues: UseFormGetValues<IFormFields>
	register: UseFormRegister<IFormFields>
	control: Control<IFormFields, any>
}

export interface IGroup {
	name: string;
	distinguishedName: string;
	description: null | string;
}

const availableGroups: IGroup[] = [
	{
		name: "Paris1",
		distinguishedName: "CN=Paris1,OU=...",
		description: "Description for Paris1"
	},
	{
		name: "London1",
		distinguishedName: "CN=London1,OU=...",
		description: "Description for London1"
	},
];

// const availableGroups: IGroup[] | null = null

const TransferList: FC<ITransferList> = ({ setValue, getValues, register, control }) => {
	const disabled = false;
	const [checked, setChecked] = useState<IGroup[]>([]);
	const [left, setLeft] = useState<IGroup[]>(getValues('groups') || []);
	const [right, setRight] = useState<IGroup[]>(availableGroups || []);

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	const handleToggle = (group: IGroup) => () => {
		const currentIndex = checked.indexOf(group);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(group);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const numberOfChecked = (items: IGroup[]) =>
		intersection(checked, items).length;

	const handleToggleAll = (items: IGroup[]) => () => {
		if (numberOfChecked(items) === items.length) {
			setChecked(not(checked, items));
		} else {
			setChecked(union(checked, items));
		}
	};

	const handleCheckedRight = () => {
		console.log('С левого в правый')
		const newGroups = right.concat(leftChecked);
		setRight(newGroups);
		setLeft(not(left, leftChecked));
		setChecked(not(checked, leftChecked));

		const currentGroups = getValues('groups');
		console.log(currentGroups)
		console.log(leftChecked)
		if (currentGroups === null) {
			setValue('groups', leftChecked)
		}
		const updatedGroups = (currentGroups! as IGroup[]).filter((item1) => !leftChecked.some(item2 => item1.distinguishedName === item2.distinguishedName));
		setValue('groups', updatedGroups);

	};


	const handleCheckedLeft = () => {
		console.log('С правого в левый')
		const newGroups = left.concat(rightChecked);
		setLeft(newGroups);
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));

		const currentGroups = getValues('groups');
		if (currentGroups === null) {
			setValue('groups', rightChecked);
		} else {
			setValue('groups', (currentGroups! as IGroup[]).concat(rightChecked));
		}
	};

	return (
		<Grid container spacing={2} justifyContent="center" alignItems="center">
			<Grid item>
				<CustomList
					title={'Имеющиеся группы'}
					checked={checked}
					handleToggle={handleToggle}
					handleToggleAll={handleToggleAll}
					items={left ?? []}
					numberOfChecked={numberOfChecked}
					register={register('groups')}
				/>
				{/* <Controller
					name="groups"
					control={control}
					render={({ field }) => (
						<CustomList
							title={'Имеющиеся группы'}
							checked={checked}
							handleToggle={handleToggle}
							handleToggleAll={handleToggleAll}
							items={field.value ?? []}
							numberOfChecked={numberOfChecked}
						/>
					)}
				/> */}
			</Grid>
			<Grid item>
				<Grid container direction="column" alignItems="center">
					<Button
						sx={{ my: 0.5 }}
						variant="outlined"
						size="small"
						onClick={handleCheckedRight}
						disabled={leftChecked.length === 0 || disabled}
						aria-label="move selected right"
					>
						&gt;
					</Button>
					<Button
						sx={{ my: 0.5 }}
						variant="outlined"
						size="small"
						onClick={handleCheckedLeft}
						disabled={rightChecked.length === 0}
						aria-label="move selected left"
					>
						&lt;
					</Button>
				</Grid>
			</Grid>
			<Grid item>
				<CustomList
					title={'Доступные для добавления'}
					checked={checked}
					handleToggle={handleToggle}
					handleToggleAll={handleToggleAll}
					items={right}
					numberOfChecked={numberOfChecked}
					register={null}
				/>
			</Grid>
		</Grid>
	);
}

export default TransferList;
