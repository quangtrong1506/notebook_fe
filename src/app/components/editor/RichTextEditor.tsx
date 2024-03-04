// App.jsx / App.tsx
"use client";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "@quangtrong1506/ckeditor-custom";
const Editor2: any = Editor;
function RichTextEditor({ content, handleChangeData }: { content: any; handleChangeData: any }) {
    return (
        <CKEditor
            editor={Editor2}
            data={content || ""}
            onChange={(event, editor: any) => {
                const data = editor.getData();
                handleChangeData(data);
            }}
        />
    );
}

export default RichTextEditor;
