import { FC, useEffect, useState } from "react";
import { intersection, not, union } from "./functions";
import { Button, Grid } from "@mui/material";
import CustomList from "./customList";


export interface IGroup {
	name: string;
	distinguishedName: string;
	description: null | string;
}

export interface ITransferList {
	currentGroups: IGroup[];
	availableGroups: IGroup[];
	field: {
		value: any;
		onChange: (value: any) => void;
	};
}

const TransferList: FC<ITransferList> = ({ currentGroups, availableGroups, field }) => {
	const disabled = false;
	const [checked, setChecked] = useState<readonly IGroup[]>([]);
	const [left, setLeft] = useState<IGroup[]>(currentGroups);
	const [right, setRight] = useState<IGroup[]>(availableGroups);

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	// const 

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

	const numberOfChecked = (items: readonly IGroup[]) =>
		intersection(checked, items).length;

	const handleToggleAll = (items: readonly IGroup[]) => () => {
		if (numberOfChecked(items) === items.length) {
			setChecked(not(checked, items));
		} else {
			setChecked(union(checked, items));
		}
	};

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		setLeft(not(left, leftChecked));
		setChecked(not(checked, leftChecked));

		field.onChange(right.concat(leftChecked));
	};

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked));
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));

		field.onChange(left.concat(rightChecked));
	};


	return (
		<Grid container spacing={2} justifyContent="center" alignItems="center">
			<Grid item>
				<CustomList title={'Имеющиеся группы'} checked={checked} handleToggle={handleToggle} handleToggleAll={handleToggleAll} items={left} numberOfChecked={numberOfChecked} />
			</Grid>
			<Grid item>
				<Grid container direction="column" alignItems="center">
					<Button
						sx={{ my: 0.5 }}
						variant="outlined"
						size="small"
						onClick={handleCheckedRight}
						disabled={leftChecked.length === 0 || disabled}
						// disabled={leftChecked.length === 0 }
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
				<CustomList title={'Доступные для добавления'} checked={checked} handleToggle={handleToggle} handleToggleAll={handleToggleAll} items={right} numberOfChecked={numberOfChecked} />
			</Grid>
		</Grid>
	);
}

export default TransferList