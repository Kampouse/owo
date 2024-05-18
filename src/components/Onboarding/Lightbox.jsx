import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { useUi } from '@/contexts/UiContext'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function Lightbox({ title, children, name }) {
  const [show, setShow] = useState(false);
  const { changeUi } = useUi();

  const handleClose = () => {
    setShow(false);
    changeUi(name, true);
  };
  const setShowFalse = () => setShow(false);

  useEffect(() => {
    setShow(true);
  }, [])
  // show={show} onHide={setShowFalse}
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button variant="primary" onClick={handleClose}>
            Ne plus voir ce message
          </Button>
          <Button variant="secondary" onClick={setShowFalse}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Lightbox;
