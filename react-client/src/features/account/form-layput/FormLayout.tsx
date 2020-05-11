import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    textField: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3)
    }
  })
)

const FormLayout = () => {
  const classes = useStyles();

  return (
    <form noValidate autoComplete="off">
      <TextField id="standard-basic" label="Standard" className={classes.textField} />
      <TextField id="standard-basic" label="Standard" className={classes.textField} />
      <TextField id="standard-basic" label="Standard" className={classes.textField} />
      <TextField id="standard-basic" label="Standard" className={classes.textField} />
      <TextField id="standard-basic" label="Standard" className={classes.textField} />
      <TextField id="standard-basic" label="Standard" className={classes.textField} />
    </form>
  )
}

// const FormLayout = () => {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <div>
//         <TextField
//           fullWidth={true}
//           id='standard-full-width'
//           label='Label'
//           style={{ margin: 8 }}
//           placeholder='Placeholder'
//           helperText='Helper text'
//           margin='normal'
//           InputLabelProps={{ shrink: true }}
//         />
//         <TextField
//           label="None"
//           id="margin-none"
//           defaultValue="Default Value"
//           className={classes.textField}
//           helperText="Some important text"
//         />
//         <TextField
//           label="Dense"
//           id="margin-dense"
//           defaultValue="Default Value"
//           className={classes.textField}
//           helperText="Some important text"
//           margin="dense"
//         />
//         <TextField
//           label="Normal"
//           id="margin-normal"
//           defaultValue="Default Value"
//           className={classes.textField}
//           helperText="Some important text"
//           margin="normal"
//         />
//         <TextField
//           label="Normal"
//           id="margin-normal"
//           defaultValue="Default Value"
//           className={classes.textField}
//           helperText="Some important text"
//           margin="normal"
//         />
//         <TextField
//           label="Normal"
//           id="margin-normal"
//           defaultValue="Default Value"
//           className={classes.textField}
//           helperText="Some important text"
//           margin="normal"
//         />
//       </div>
//     </div>
//   )
// }

export default FormLayout
