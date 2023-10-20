import { FC, useEffect, useState } from "react";
import { intersection, not, union } from "./functions";
import { Button, Grid } from "@mui/material";
import CustomList from "./customList";
import { Control, Controller, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IFormFields } from "../app.interface";
export interface IGroup {
	name: string;
	distinguishedName: string;
	description: null | string;
}

export interface ITransferList {
	control: Control<IFormFields, any>
	setValue: UseFormSetValue<IFormFields>
	getValues: UseFormGetValues<IFormFields>
	register: UseFormRegister<IFormFields>
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


const TransferList: FC<ITransferList> = ({ control, setValue, getValues, register }) => {
	const disabled = false;
	const [checked, setChecked] = useState<IGroup[]>([]);
	const [left, setLeft] = useState<IGroup[]>(getValues('groups') || []);
	const [right, setRight] = useState<IGroup[]>(availableGroups || []);

	// console.log(checked, left)
	const leftChecked = intersection(checked, left);
	// console.log("LEFT Checked", leftChecked)

	const rightChecked = intersection(checked, right);
	// console.log("Right Checked", rightChecked)

	// console.log('checked', checked)
	const handleToggle = (group: IGroup) => () => {
		// console.log('я зашел в функцию')
		const currentIndex = checked.indexOf(group);
		// console.log('currentIndex', currentIndex)
		const newChecked = [...checked];
		// console.log('newChecked', newChecked)

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

		// Получаем текущее значение поля "groups" через control
		const currentGroups = getValues('groups');

		// Обновляем значение поля "groups" через контрол
		// setValue('groups', (currentGroups as IGroup[]).concat(leftChecked));
		if (currentGroups === null) {
			// Если поле "groups" равно null, нет нечего удалять, поэтому ничего не делаем
			return;
		}

		// Фильтруем элементы, оставляя только те, которые не находятся в leftChecked
		const updatedGroups = currentGroups.filter((group) => !leftChecked.includes(group));

		// Обновляем значение поля "groups" через контрол
		setValue('groups', updatedGroups);

	};


	const handleCheckedLeft = () => {
		console.log('С правого в левый')
		const newGroups = left.concat(rightChecked);
		setLeft(newGroups);
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));

		// Получаем текущее значение поля "groups" через control
		const currentGroups = getValues('groups');
		// console.log(currentGroups)

		if (currentGroups === null) {
			setValue('groups', rightChecked);
		} else {
			//currentGroups! уточняет , что currentGroups не является null или undefined
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
					{...register('groups')}
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
				/>
			</Grid>
		</Grid>
	);
}

export default TransferList;
