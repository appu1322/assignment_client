import './style.scss';
import { useQuery } from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import { ChangeEvent, useEffect, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Checkbox, IconButton, SelectChangeEvent, Typography } from "@mui/material";
import CustomTable from "../../components/mui/table";
import { ContactService } from "../../services";
import { IContact, IContactRow, IContactState, IErrorResponse, IPagination } from '../../interfaces';
import { capitalize, createIndex } from '../../utilities/helper';
import WarningDialog from '../../components/mui/warning-dialog';
import useSnackbar from '../../hooks/useSnackbar';
import useDebounce from '../../hooks/useDebounce';

const Home = () => {
  let rows: IContactRow[] = [];
  const { snackbar } = useSnackbar();
  const { getContacts, updateContact, deleteContacts } = ContactService();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useState<IContactState>({
    deleteWarning: false,
    _jobPosition: "",
    pagination: {
      page: 1,
      limit: 5,
      totalPages: 1
    },
    filters: {
      search: ""
    },
    selectAll: [],
    multiDeleteWarning: false,
    updateDetail: {
      name: "",
      value: "",
      _id: "",
    }
  });

  const contacts = useQuery({
    queryKey: ["contacts", state.pagination.page],
    queryFn: () => getContacts({
      pagination: true, limit: state.pagination.limit, page: state.pagination.page
    })
  });

  useEffect(() => {
    if (contacts.data?.data.length) {
      setState(prevState => ({
        ...prevState,
        pagination: {
          ...prevState.pagination,
          page: contacts.data.meta.page,
          totalPages: contacts.data.meta.totalPages,
          totalRecords: contacts.data.meta.totalRecords
        }
      }));
    }
  }, [contacts.data?.meta]);

  useEffect(() => {
    const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

    setState(prevState => ({
      ...prevState,
      pagination: {
        ...prevState.pagination,
        page
      }
    }));
  }, [searchParams]);

  const searchRecord = useDebounce(state.updateDetail.value, 1000);
  useEffect(() => {
    if (searchRecord.length && state.updateDetail._id?.length) {
      updateDetail();
    }
  }, [searchRecord]);

  const updateDetail = async () => {
    try {
      let payload = {
        _id: state.updateDetail._id,
      } as any;
      if (state.updateDetail.name === "email") {
        const contact = contacts.data?.data.find(c => c._id === state.updateDetail._id);

        payload = {
          ...payload,
          contact: {
            ...contact?.contact,
            email: state.updateDetail.value
          }
        }
      } else if (state.updateDetail.name === "phone") {
        const contact = contacts.data?.data.find(c => c._id === state.updateDetail._id);
        payload = {
          ...payload,
          contact: {
            ...contact?.contact,
            mobileNumber: {
              dialCode: "+91",
              iso2: "IN",
              country: "India",
              number: state.updateDetail.value
            }
          }
        }
      }else {
        payload = {
          ...payload,
          [state.updateDetail.name]: state.updateDetail.value
        }
      }

      const updated = await updateContact(payload);
      contacts.refetch();
      snackbar(updated.message, "info");
    } catch (error) {
      const err = error as IErrorResponse;
      snackbar(err.data.message, "warning");
    }
  }

  const onPageChange = (_: ChangeEvent<unknown>, page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  const handleSelect = (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    let payload: Array<string> = [];
    if (e.target.checked) {
      payload = state.selectAll;
      payload.push(id);
    } else {
      payload = state.selectAll.filter((ele) => ele !== id);
    }

    setState(prevState => ({
      ...prevState,
      selectAll: payload
    }));
  };

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    let payload: Array<string> = [];
    if (e.target.checked) {
      if (contacts.data?.data.length) {
        payload = contacts.data?.data
          .map(candidate => candidate._id);
      }
    } else {
      payload = [];
    }

    setState(prevState => ({
      ...prevState,
      selectAll: payload
    }));
  };

  const handleMultiDelete = () => setState(prevState => ({
    ...prevState,
    multiDeleteWarning: !prevState.multiDeleteWarning
  }));

  const onMultiDelete = async () => {
    try {
      const contact = await deleteContacts({ _ids: state.selectAll });
      snackbar(contact.message, "info");
      contacts.refetch();
      setState(prevState => ({
        ...prevState,
        multiDeleteWarning: false,
        selectAll: []
      }));
    } catch (error) {
      const err = error as IErrorResponse;
      snackbar(err.data.message, "warning");
      handleMultiDelete();
      console.log({ "Error in delete contact": error });
    }
  };

  const updateContactDetail = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<any>, _id: string) => {
    const { value, name } = e.target;
    setState(prev => ({
      ...prev,
      updateDetail: {
        name,
        value,
        _id
      }
    }));
  }

  const isChecked = (contacts.data?.data?.length && state.selectAll?.length === contacts.data?.data?.length) ? true : false;
  const isIndeterminateChecked = (state.selectAll.length > 0 && state.selectAll.length < Number(contacts.data?.data.length)) ? true : false;
  const columns = [
    {
      id: "all",
      label: <Checkbox onChange={handleSelectAll} checked={isChecked} indeterminate={isIndeterminateChecked} />
    },
    {
      id: "id",
      label: "S No.",
    },
    {
      id: "firstName",
      label: "Name",
      minWidth:100,
      maxWidth:100,
    },
    {
      id: "gender",
      label: "Gender",
      minWidth:100,
      maxWidth:100,
    },
    {
      id: "email",
      label: "email",
      minWidth:100,
      maxWidth:100,
    },
    {
      id: "phone",
      label: "Phone",
      minWidth:100,
      maxWidth:100,
    },
  ];

  const createRow = (index: number, contact: IContact, pagination: IPagination) => {
    return {
      all: <Checkbox onChange={e => handleSelect(e, contact._id)} checked={state.selectAll.includes(contact._id)} />,
      id: createIndex(pagination, index),
      _id: contact._id,
      firstName: capitalize(contact.firstName),
      gender: capitalize(contact.gender),
      email: (contact.contact.email),
      phone: `${contact.contact.mobileNumber.number}`,
    };
  };

  if (contacts.data?.data.length) {
    rows = contacts.data?.data.map((JobPosition, i) => createRow(i, JobPosition, state.pagination));
  }


  return (
    <div className="px-3">
      <Typography className="mt-3 center" variant="h4">Contacts</Typography>
      <div>
        <Button className="my-3" variant="contained" onClick={() => navigate("/new")}>Add new Contact</Button>
        <IconButton
          sx={{ marginLeft: "20px" }}
          color="error"
          disabled={state.selectAll.length ? false : true}
          onClick={handleMultiDelete}
        >
          <DeleteIcon />
        </IconButton>
      </div>

      <CustomTable
        columns={columns}
        rows={rows}
        height={450}
        pagination={state.pagination}
        onPageChange={onPageChange}
        isEditable
        onTextFieldChange={updateContactDetail}
      />

      {/* Multiple Delete  */}
      <WarningDialog
        isOpen={state.multiDeleteWarning}
        onClose={() => handleMultiDelete()}
        onConfirm={onMultiDelete}
        title="Delete Contacts"
        description={`Are you sure you want to delete ${state.selectAll.length} selected contact${state.selectAll.length > 1 ? "s" : ""}?`}
      />

      <Outlet context={{ reFetchContacts: contacts.refetch }} />
    </div>
  )
}

export default Home