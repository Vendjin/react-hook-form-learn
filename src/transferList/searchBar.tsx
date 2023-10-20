import { TextField } from "@mui/material";
import { ChangeEvent, FC } from "react";

interface ISearchBar {
	setSearchQuery: (value: string) => void
}
const SearchBar: FC<ISearchBar> = ({ setSearchQuery }) => (
	<TextField
		id="search-bar"
		className="text"
		onInput={(e: ChangeEvent<HTMLInputElement>) => {
			setSearchQuery(e.target.value);
		}}
		label="Enter a city name"
		variant="outlined"
		placeholder="Search..."
		size="small"
	/>
);

export default SearchBar