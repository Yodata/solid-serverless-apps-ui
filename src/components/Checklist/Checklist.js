// import React from 'react';
// // import CardContent from '@material-ui/core/CardContent';
// // import Typography from '@material-ui/core/Typography';
// // import List from '@material-ui/core/List';
// // import ListItem from '@material-ui/core/ListItem';
// // import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Paper from '@material-ui/core/Paper';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import withStyles from '@material-ui/core/styles/withStyles';

// const columns = [
//     { id: 'read', label: 'Read', minWidth: 110, align: 'center' },
//     { id: 'write', label: 'Write', minWidth: 110, align: 'center' }
// ];

// function createData(name, isRead, isWrite) {
//     return { name, isRead, isWrite };
// }

// const rows = [
//     createData('Award ', true, false),
//     createData('Calendar', false, false),
//     createData('Contact', true, true),
//     createData('Lead', false, true),
//     createData('Listing', true, false),
//     createData('Marketing', false, false),
//     createData('Profile', true, true),
//     createData('Servicearea', false, true),
//     createData('Website', false, false),
// ];

// const styles = theme => ({
//     root: {
//         width: '100%',
//         maxWidth: 315,
//         height: '100%',
//         backgroundColor: theme.palette.background.paper,
//     },
//     container: {
//         maxHeight: 350,
//       },
// });

// function CheckList(props) {

//     const { classes } = props;

//     const handleReadChange = e => {
        
//     }

//     const handleWriteChange = e => {
        
//     }

//     return (
//         <Paper className={classes.root}>
//             <TableContainer className={classes.container}>
//                 <Table stickyHeader aria-label="sticky table">
//                     <TableHead>
//                         <TableRow>
//                             {columns.map((column) => (
//                                 <TableCell
//                                     key={column.id}
//                                     align={column.align}
//                                     style={{ minWidth: column.minWidth }}
//                                 >
//                                     {column.label}
//                                 </TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {rows.map((row) => (
//                             <TableRow key={row.name}>
//                                 <TableCell component="th" scope="row">
//                                     <Checkbox
//                                         id={row.name}
//                                         // checked={checked}
//                                         tabIndex={-1}
//                                         onChange={handleReadChange}
//                                         disableRipple
//                                     />
//                                     {row.name}
//                                 </TableCell>
//                                 <TableCell align="left">
//                                     <Checkbox
//                                         id={row.name}
//                                         // checked={checked}
//                                         tabIndex={-1}
//                                         disableRipple
//                                         onChange={handleWriteChange}
//                                     />
//                                     {row.name}
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Paper>
//     );
// }

// export default withStyles(styles)(CheckList);


// {/* <CardContent className={classes.root}>
//             <Typography variant='caption' >REQUESTS ACCESS TO:</Typography>
//             <List dense>
//                 {permissions.map(permission => (
//                     <ListItem key={permission.id} dense className={classes.root}>
//                         <FormControlLabel
//                             control={<Checkbox
//                                 checked={permission.checked}
//                                 tabIndex={-1}
//                                 disableRipple
//                             />}
//                             label={permission.description}
//                         />
//                     </ListItem>
//                 ))}
//             </List>
//         </CardContent> */}