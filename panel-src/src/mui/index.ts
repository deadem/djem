import { withStyles as withStylesMui, StyleRulesCallback, WithStyles } from 'material-ui';

export function withStyles<Styles extends string, Props>(styles: (props: Props) => StyleRulesCallback<Styles>) {
  return <T>(component: T): T => {
    type Component = T & React.ComponentType<WithStyles<Styles>>;
    return class {
      constructor(...args: any[]) {
        let func: any = withStylesMui<Styles>(styles(args[0]))(component as Component);
        return new func(...args);
      }
    } as any;
  };
}

export {
  AppBar,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Table,
  Tabs,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,

  WithStyles,
} from 'material-ui';
