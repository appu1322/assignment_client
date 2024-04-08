import { ChangeEvent, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { FormControl, InputLabel, MenuItem, Select as Muiselect, SelectChangeEvent } from "@mui/material";
import { TableContainer, Table, TableHead, TableRow, TableBody, styled, TableCell, tableCellClasses, Box, TextField } from "@mui/material";
import ErrorMessage from "../../shared/error-message";

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#f7f7f7",
        fontWeight: 600,
        zIndex: 1
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(() => ({
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export interface IColumn {
    id: string;
    label: string | JSX.Element;
    minWidth?: number;
    maxWidth?: number;
    whiteSpace?: "nowrap" | "normal";
    align?: "right";
    format?: (value: number) => string;
}

interface props<T> {
    columns: IColumn[];
    rows: T[];
    height?: number | string;
    width?: number | string;
    errorMessage?: string;
    pagination?: {
        page: number;
        totalPages: number;
    }
    isEditable?: boolean;
    onTextFieldChange?: (name: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<any>, _id: string) => void;
    onPageChange?: (e: ChangeEvent<unknown>, page: number) => void;
    showPagination?: boolean;
}

const CustomTable = <T,>({
    columns,
    rows,
    height,
    width,
    pagination,
    onPageChange,
    errorMessage,
    isEditable = false,
    onTextFieldChange,
    showPagination = true,
}: props<T>) => {
    const [state, setState] = useState({
        curIndex: 0,
        curId: "",
        showTextField: false
    })

    const cellClicked = (index: number, id: string) => {
        if (id === "all" || id === "id") {
            return;
        }
        
        setState(prev => ({ ...prev, curIndex: index, curId: id, showTextField: true }));
        setTimeout(() => {
            const doc = document.getElementById(`input_${index}_${id}`);
            const selectDoc = document.getElementById(`select_${index}_${id}`);
            if(doc){
                doc.focus();
            }
            if(selectDoc){
                selectDoc.focus();
            }
        }, 200);
    }

    return (
        <>
            <TableContainer sx={{ border: "1px solid #e3e3e3", height, width, borderRadius: "2px" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column: IColumn, index: number) => (
                                <StyledTableCell
                                    key={index}
                                    align={column.align}
                                    style={{ whiteSpace: "nowrap", minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            // eslint-disable-next-line
                            .map((row: any, index: number) => (
                                isEditable ?
                                    <StyledTableRow role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column: IColumn, i: number) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    style={{ whiteSpace: column.whiteSpace ? column.whiteSpace : "nowrap", maxWidth: column.maxWidth, minWidth: column.minWidth, wordBreak: "break-all" }}
                                                    key={i}
                                                    align={column.align}
                                                    onClick={() => cellClicked(index, column.id)}
                                                >
                                                    {
                                                        column.format && typeof value === "number" ?
                                                            column.format(value) :
                                                            (
                                                                (state.showTextField && state.curIndex === index && state.curId === column.id && onTextFieldChange) ?
                                                                    (
                                                                        column.id === "gender" ?
                                                                            <FormControl variant="outlined" size="small" fullWidth>
                                                                                <InputLabel>Gender</InputLabel>
                                                                                <Muiselect
                                                                                    size="small"
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    label="Gender"
                                                                                    defaultValue={value?.toUpperCase()}
                                                                                    onChange={e => onTextFieldChange(e, String(row._id))}
                                                                                    name={column.id}
                                                                                    id={`select_${index}_${column.id}`}
                                                                                    onBlur={() => setState(prev => ({ ...prev, showTextField: false }))}
                                                                                >
                                                                                    <MenuItem value="MALE">Male</MenuItem>
                                                                                    <MenuItem value="FEMALE">Female</MenuItem>
                                                                                    <MenuItem value="TRANSGENDER">Transgender</MenuItem>
                                                                                </Muiselect>
                                                                            </FormControl> :
                                                                            <TextField id={`input_${index}_${column.id}`} size="small" defaultValue={value} name={column.id} onChange={e => onTextFieldChange(e, String(row._id))} onBlur={() => setState(prev => ({ ...prev, showTextField: false }))} />
                                                                    ) :
                                                                    value
                                                            )
                                                    }
                                                </TableCell>
                                            );
                                        })}
                                    </StyledTableRow> :
                                    <StyledTableRow role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column: IColumn, i: number) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    style={{ whiteSpace: column.whiteSpace ? column.whiteSpace : "nowrap", maxWidth: column.maxWidth, wordBreak: "break-all" }}
                                                    key={i}
                                                    align={column.align}
                                                >
                                                    {
                                                        column.format && typeof value === "number" ?
                                                            column.format(value) :
                                                            value
                                                    }
                                                </TableCell>
                                            );
                                        })}
                                    </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
                {!rows?.length && <ErrorMessage errorMessage={errorMessage} />}
            </TableContainer>
            {showPagination && rows.length > 0 && pagination?.page && (
                <Box marginTop="10px">
                    <Pagination count={pagination.totalPages} page={pagination.page} onChange={onPageChange} color="primary" />
                </Box>
            )}

        </>

    )
};

export default CustomTable;