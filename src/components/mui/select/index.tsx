import { FC, ReactNode } from "react";
import { FormControl, FormHelperText, InputLabel, Select as Muiselect } from "@mui/material";
import { Controller } from "react-hook-form";

interface props {
    label: string | JSX.Element;
    name: string;
    className?: string;
    defaultValue?: string | boolean | number;
    disabled?: boolean;
    // eslint-disable-next-line
    control: any;
    variant?: "filled" | "outlined" | "standard";
    size?: "small" | "medium";
    error?: boolean;
    helperText?: string;
    children: ReactNode;
}

const Select: FC<props> = ({
    label,
    name,
    className,
    defaultValue,
    disabled,
    control,
    variant,
    size,
    error,
    helperText,
    children
}) => (
    <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) =>
            <FormControl variant={variant} size={size} fullWidth>
                <InputLabel error={error}>{label}</InputLabel>
                <Muiselect
                    {...field}
                    size={size}
                    className={className}
                    variant={variant}
                    fullWidth
                    disabled={disabled}
                    label={label}
                    error={error}
                >
                    {children}
                </Muiselect>
                {error && <FormHelperText error={error}>{helperText}</FormHelperText>}
            </FormControl>
        }
    />
);

Select.defaultProps = {
    variant: "outlined",
    size: "small"
};

export default Select;