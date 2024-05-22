import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBlockquote,
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonCode,
  MenuButtonCodeBlock,
  MenuButtonEditLink,
  MenuButtonHorizontalRule,
  MenuButtonIndent,
  MenuButtonItalic,
  MenuButtonOrderedList,
  MenuButtonRedo,
  MenuButtonRemoveFormatting,
  MenuButtonStrikethrough,
  MenuButtonUnderline,
  MenuButtonUndo,
  MenuButtonUnindent,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  MenuSelectTextAlign,
  RichTextEditor,
  isTouchDevice,
  type RichTextEditorRef,
} from "mui-tiptap";
import { useRef } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import EditorMenuControls from "./editorMenuControls";
import useExtensions from "./useExtension";
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

  const extensions = useExtensions({
    placeholder: "Add your own content here...",
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Content</DialogTitle>
      <DialogContent>
        <RichTextEditor
          ref={rteRef}
          // extensions={[StarterKit]}
          extensions={extensions}
          content={initialContent}
          renderControls={() => (
            <MenuControlsContainer>

              <MenuSelectHeading />
              {/* 点按无效果 */}

              <MenuDivider />

              <MenuButtonBold />

              <MenuButtonItalic />

              <MenuButtonStrikethrough />

              <MenuDivider />

              <MenuButtonEditLink />
              {/* 点按无效果 */}

              <MenuDivider />

              <MenuSelectTextAlign />
              {/* 点按无效果 */}

              <MenuDivider />

              <MenuButtonOrderedList />

              <MenuButtonBulletedList />
              {isTouchDevice() && (
                <>
                  <MenuButtonIndent />

                  <MenuButtonUnindent />
                </>
              )}
              <MenuDivider />

              <MenuButtonBlockquote />

              <MenuDivider />

              <MenuButtonCode />

              <MenuButtonCodeBlock />

              <MenuDivider />

              <MenuButtonHorizontalRule />


              <MenuDivider />

              <MenuButtonRemoveFormatting />

              <MenuDivider />

              <MenuButtonUndo />
              <MenuButtonRedo />
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