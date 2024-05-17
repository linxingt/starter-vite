import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor,
  type RichTextEditorRef,
} from "mui-tiptap";
import { useRef } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
interface RichTextEditorModalProps {
  open: boolean;
  onClose: () => void;
  initialContent: string;
  onSave: (content: string) => void;
}

const RichTextEditorModal: React.FC<RichTextEditorModalProps> = ({ open, onClose, initialContent, onSave }) => {
  const rteRef = useRef<RichTextEditorRef>(null);

  const handleSave = () => {
    const content = rteRef.current?.editor?.getHTML() || '';
    onSave(content);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Content</DialogTitle>
      <DialogContent>
        <RichTextEditor
          ref={rteRef}
          extensions={[StarterKit]}
          content={initialContent}
          renderControls={() => (
            <MenuControlsContainer>
              <MenuSelectHeading />
              <MenuDivider />
              <MenuButtonBold />
              <MenuButtonItalic />
            </MenuControlsContainer>
          )}
          // renderControls={() => <EditorMenuControls />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
export default RichTextEditorModal;