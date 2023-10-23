import { FC, useState } from "react"
import { IGroup } from "./transferList"
import { filterData } from "./functions"
import { Card, CardHeader, Checkbox, Divider, FormControlLabel, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import SearchBar from "./searchBar"
import { UseFormRegisterReturn } from "react-hook-form"

interface ICustomList {
    title: React.ReactNode
    items: IGroup[] 
    checked: IGroup[]
    handleToggleAll: (items: IGroup[]) => () => void
    numberOfChecked: (items: IGroup[]) => number
    handleToggle: (value: IGroup) => () => void
    register: UseFormRegisterReturn<"groups"> | null;
}

const CustomList: FC<ICustomList> = ({ title, items, checked, handleToggleAll, numberOfChecked, handleToggle }) => {
    const [searchQuery, setSearchQuery] = useState("");
    // Заменяем "null" на пустой список "[]"
    const itemsList = items ?? [];
    const dataFiltered = filterData(searchQuery, itemsList);

    const checkedList = checked ?? [];

    return (
        <Card>
            <CardHeader sx={{ px: 2, py: 1 }}
                avatar={
                    <FormControlLabel control={
                        <Checkbox onClick={handleToggleAll(items)}
                            checked={numberOfChecked(items) === items.length && items.length !== 0}
                            indeterminate={
                                numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                            }
                            disabled={items.length === 0}
                            inputProps={{
                                'aria-label': 'all items selected',
                            }}
                        />
                    }
                        label="Выбрать все"
                    />

                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />
            <Divider />
            <SearchBar setSearchQuery={setSearchQuery} />
            <Divider />
            <List sx={{
                height: 230,
                bgcolor: 'background.paper',
                overflow: 'auto',
            }}
                dense
                component="div"
                role="list"
            >
                {dataFiltered.map((value: IGroup) => {
                    const labelId = `transfer-list-all-item-${value}-label`;

                    return (
                        <ListItem key={value.distinguishedName}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checkedList.findIndex((item) => item.name === value.name) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value.name} />
                        </ListItem>
                    );
                })}
            </List>
        </Card> 
    );
}

export default CustomList