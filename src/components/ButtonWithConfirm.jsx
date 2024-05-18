import { Button } from "@/components/ui/button"
import {
  AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const ButtonWithConfirm = ({ onClick, children, title="Supprimer", confirmMessage = "Voulez-vous vraiment supprimer votre annonce ?", ...props }) => {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button {...props}>{children}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {confirmMessage}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Non</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>Oui</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}


export default ButtonWithConfirm;
