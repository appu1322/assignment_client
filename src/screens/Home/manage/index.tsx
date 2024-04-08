import { Box, Grid, MenuItem, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { ContactService } from "../../../services";
import { contactValidation } from "../../../validations";
import { IErrorResponse, IContact } from "../../../interfaces";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import Select from "../../../components/mui/select";
import useSnackbar from "../../../hooks/useSnackbar";
import CustomDialog from "../../../components/mui/dialog";

interface outletProps {
    reFetchContacts: () => void;
}

const ManageContact = () => {
    const [searchParam] = useSearchParams();
    const { snackbar } = useSnackbar();
    const outlet = useOutletContext<outletProps>();
    const navigate = useNavigate();
    const { addContact } = ContactService();
    const { handleSubmit, control, formState: { errors } } = useForm<IContact>({
        resolver: joiResolver(contactValidation),
        defaultValues: {
            firstName: "",
            gender: "MALE",
            email: "",
            phone: ""
        }
    });

    const onSubmit = async (data: IContact) => {
        try {
            const payload = {
                ...data,
                contact: {
                    email: data.email,
                    mobileNumber: {
                        dialCode: "+91",
                        iso2: "IN",
                        country: "India",
                        number: data.phone
                    }
                }
            };

            delete payload.email;
            delete payload.phone;

            const add = await addContact(payload);
            snackbar(add.message, "info");
            onClose();
            outlet?.reFetchContacts && outlet.reFetchContacts();
        } catch (error) {
            const err = error as IErrorResponse;
            snackbar(err.data.message, "warning");
            console.log(error);
        }
    };

    const onClose = () => {
        navigate({
            pathname: "/",
            search: searchParam.toString()
        });
    };

    return (
        <Box>
            <CustomDialog
                size='md'
                title={"Add Contact"}
                isOpen={true}
                onClose={onClose}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <Controller
                            control={control}
                            name="firstName"
                            render={(prop) => <TextField
                                fullWidth
                                label="Name"
                                className="disable-text"
                                variant="outlined"
                                size="small"
                                placeholder="Write user name"
                                error={errors["firstName"] ? true : false}
                                helperText={errors["firstName"]?.message}
                                {...prop.field}
                            />}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            control={control}
                            name="gender"
                            label="Gender"
                            size="small"
                            variant="outlined"
                            error={errors["gender"] ? true : false}
                            helperText={errors["gender"]?.message}
                        >
                            <MenuItem value="MALE">Male</MenuItem>
                            <MenuItem value="FEMALE">Female</MenuItem>
                            <MenuItem value="TRANSGENDER">Transgender</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            control={control}
                            name="email"
                            render={(prop) => <TextField
                                fullWidth
                                label="Email"
                                className="disable-text"
                                variant="outlined"
                                size="small"
                                placeholder="Write user email"
                                error={errors["email"] ? true : false}
                                helperText={errors["email"]?.message}
                                {...prop.field}
                            />}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            control={control}
                            name="phone"
                            render={(prop) => <TextField
                                fullWidth
                                type="number"
                                label="Phone"
                                className="disable-text"
                                variant="outlined"
                                size="small"
                                placeholder="Write user phone number"
                                error={errors["phone"] ? true : false}
                                helperText={errors["phone"]?.message}
                                onKeyDown={(e: any) => { // eslint-disable-line
                                    const symbol = ["backspace"];
                                    const exceptThisSymbols = ["e", "E", "+", "-", "."];
                                    if (
                                        (!symbol.includes(e.key.toLowerCase()) && e.target.value.length > 14) ||
                                        exceptThisSymbols.includes(e.key.toLowerCase())
                                    ) {
                                        e.preventDefault();
                                    }
                                }
                                }
                                {...prop.field}
                            />}
                        />
                    </Grid>
                </Grid>
            </CustomDialog>
        </Box>
    );
};

export default ManageContact;