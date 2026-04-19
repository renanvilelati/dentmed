import { Dialog, DialogContent } from '../ui/dialog';
import { AuthenticationForm } from './authentication-form';

type AuthenticationDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export const AuthenticationDialog = ({
  isOpen,
  handleClose,
}: AuthenticationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='[&>button:last-child]:hidden'> 
        <AuthenticationForm />
      </DialogContent>
    </Dialog>
  );
};
