import React, { useState } from 'react'
import IAccount from '../../_models/account'
import Dialog from '@material-ui/core/Dialog'
import {
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  Checkbox,
  Grid,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core'
import AccountType from '../../_enums/account-type'

const AddAccountDialog: React.FC<{
  open: boolean,
  close(): void,
  accountCreated(account: IAccount): void
}> = ({ open, close, accountCreated }) => {
  const emptyAccount: IAccount = { number: '', isActive: true, name: '', accountType: AccountType.Header };

  const [account, setAccount] = useState<IAccount>(emptyAccount);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    accountCreated(account);
    setAccount(emptyAccount);
    close();
  }

  const cancel = () => {
    setAccount(emptyAccount);
    close();
  }

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setAccount({ ...account, [name]: value });
  }

  const handleAccountTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAccount({ ...account, accountType: event.target.value as AccountType })
  }

  const handleIsActiveChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const { name } = event.currentTarget;
    setAccount({ ...account, [name]: checked });
  }

  return (
    <Dialog
      open={open}
      aria-labelledBy='add-account-dialog-title'
    >
      <DialogTitle id='add-account-dialog-title'>Add Account</DialogTitle>
      <DialogContent>
        <form method='post'
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label='#Account' name='number' value={account.number} onChange={handleValueChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label='Account Name' name='name' value={account.name} onChange={handleValueChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl style={{ minWidth: 200 }}>
                <InputLabel>Account Type</InputLabel>
                <Select value={account.accountType} name='accountType' onChange={handleAccountTypeChange}>
                  <MenuItem value={0}>Header</MenuItem>
                  <MenuItem value={1}>Detail</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel control={<Checkbox name='isActive' checked={account.isActive} onChange={handleIsActiveChange} />}
                label='Account Active'
                style={{ marginTop: 20 }} />
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={cancel} >Cancel</Button>
            <Button type='submit'>Submit</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddAccountDialog
