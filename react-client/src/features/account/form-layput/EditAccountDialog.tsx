import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import IAccount from '../../../_models/account'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import AccountType from '../../../_enums/account-type'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'

const EditAccountDialog: React.FC<{
  account: IAccount,
  open: boolean,
  close(): void,
  accountUpdated(accountNumber: string, account: IAccount): void
}> = ({
  account,
  open,
  close,
  accountUpdated
}) => {

    const emptyAccount: IAccount = { number: '', isActive: false, name: '', accountType: AccountType.Header };

    const [editingAccount, setEditingAccount] = useState<IAccount>(emptyAccount)

    useEffect(() => {
      setEditingAccount(account)
    }, [account, accountUpdated])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!account.number) return;
      if (!account.name) return;
      accountUpdated(editingAccount.number, editingAccount);
      setEditingAccount(emptyAccount);
      close();
    }

    const cancel = () => {
      setEditingAccount(emptyAccount);
      close();
    }

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.currentTarget;
      setEditingAccount({ ...editingAccount, [name]: value });
    }

    const handleAccountTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setEditingAccount({ ...editingAccount, accountType: event.target.value as AccountType })
    }

    const handleIsActiveChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      const { name } = event.currentTarget;
      setEditingAccount({ ...editingAccount, [name]: checked });
    }

    return (
      <Dialog open={open}
        aria-labelledby='edit-account-dialog-title'>
        <DialogTitle id='edit-account-dialog-title'>Edit Account</DialogTitle>
        <DialogContent>
          <form method='put'
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label='#Account'
                  name='number'
                  disabled
                  value={editingAccount.number}
                  onChange={handleValueChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField label='Account Name'
                  name='name'
                  value={editingAccount.name}
                  onChange={handleValueChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl style={{ minWidth: 200 }}>
                  <InputLabel>Account Type</InputLabel>
                  <Select value={editingAccount.accountType} name='accountType' onChange={handleAccountTypeChange}>
                    <MenuItem value={0}>Header</MenuItem>
                    <MenuItem value={1}>Detail</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel control={<Checkbox name='isActive' checked={editingAccount.isActive} onChange={handleIsActiveChange} />}
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
      </Dialog >
    )
  }

export default EditAccountDialog
