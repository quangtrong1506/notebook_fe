// App.jsx / App.tsx
"use client";
import { CKEditor } from "@ckeditor/ckeditor5-react";
const Editor2: any = CKEditor;
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
