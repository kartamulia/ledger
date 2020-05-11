import React, { useState, Fragment } from 'react'
import {
  Typography,
  TableHead,
  TableRow,
  makeStyles,
  Paper,
  TableContainer,
  Table,
  TableCell,
  TableBody,
  Grid,
  IconButton,
} from '@material-ui/core'
import IAccount from '../../_models/account'
import AccountType from '../../_enums/account-type'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete';
import AddAccountDialog from './AddAccountDialog'
import EditAccountDialog from './form-layput/EditAccountDialog'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 600,
  }
})

interface Column {
  id: 'number' | 'isActive' | 'name' | 'accountType',
  label: string,
  minWidth?: number,
  align?: 'right',
  format?: (value: number | boolean) => string
}

const columns: Column[] = [
  { id: 'number', label: '#Account' },
  {
    id: 'isActive',
    label: 'Account Active',
    format: (value: number | boolean) => value === true ? 'Yes' : 'No'
  },
  {
    id: 'name',
    label: 'Account Name'
  },
  {
    id: 'accountType',
    label: 'Account Type',
    format: (value: number | boolean) => value.toString()
  }
]

const accountsData: IAccount[] = [
  { number: '10000', isActive: true, name: 'Assets', accountType: AccountType.Header },
  { number: '10010', isActive: true, name: 'Current Assets', accountType: AccountType.Header },
  { number: '10011', isActive: true, name: 'Petty Cash', accountType: AccountType.Detail },
  { number: '10012', isActive: true, name: 'Cash in Bank', accountType: AccountType.Detail },
  { number: '10013', isActive: true, name: 'Cash in Deposit', accountType: AccountType.Detail },
]

const Accounts = () => {
  const classes = useStyles();

  const [accounts, setAccounts] = useState<IAccount[]>(accountsData)

  // add account
  const [addAccountDialogOpen, setAddAccountDialogOpen] = useState(false);

  const onAddAccountDialogClosed = () => {
    setAddAccountDialogOpen(false);
  }

  const onAddAccountDialogAccountCreated = (account: IAccount) => {
    setAccounts([account, ...accounts]);
  }

  // end add account

  // edit account
  const emptyAccount: IAccount = { number: '', isActive: false, name: '', accountType: AccountType.Header };

  const [editingAccount, setEditingAccount] = useState<IAccount>(emptyAccount)

  const [editAccountDialogOpen, setEditAccountDialogOpen] = useState(false)

  const editAccount = (account: IAccount) => {
    setEditingAccount(account);
    setEditAccountDialogOpen(true);
  }

  const onEditAccountDialogClosed = () => {
    setEditAccountDialogOpen(false);
  }

  const onEditAccountDialogAccountUpdated = (accountNumber: string, account: IAccount) => {
    console.log(accountNumber);
    setAccounts(accounts.map(acc => (acc.number === accountNumber ? account : acc)));
  }

  // end edit account

  // delete account

  const deleteAccount = (accountNumber: string) => {
    setAccounts(accounts.filter(acc => acc.number !== accountNumber));
  }

  // end delete account

  return (
    <Fragment>
      <Grid container direction='row' justify='space-between' alignItems='center'>
        <Typography variant='h5'>
          Accounts
        </Typography>
        <IconButton aria-label='add account' color='primary'
          onClick={() => setAddAccountDialogOpen(true)}>
          <AddIcon />
        </IconButton>
      </Grid>
      <Paper className={classes.root}>
        <TableContainer
          className={classes.container}
        >
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.number}>
                  <TableCell>{account.number}</TableCell>
                  <TableCell>{account.isActive === true ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{account.name}</TableCell>
                  <TableCell>{AccountType[account.accountType]}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => editAccount(account)}><EditIcon /></IconButton>
                    <IconButton onClick={() => deleteAccount(account.number)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <AddAccountDialog
        open={addAccountDialogOpen}
        close={onAddAccountDialogClosed}
        accountCreated={onAddAccountDialogAccountCreated} />
      <EditAccountDialog
        account={editingAccount}
        open={editAccountDialogOpen}
        close={onEditAccountDialogClosed}
        accountUpdated={onEditAccountDialogAccountUpdated}
      />
    </Fragment>
  )
}

export default Accounts
