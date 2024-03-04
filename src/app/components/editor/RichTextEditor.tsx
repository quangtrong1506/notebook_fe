// App.jsx / App.tsx
"use client";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "@quangtrong1506/ckeditor-custom";
function RichTextEditor({ content, handleChangeData }: { content: any; handleChangeData: any }) {
    return (
        <CKEditor
            editor={Editor}
            data={content || ""}
            onChange={(event, editor) => {
                const data = editor.getData();
                handleChangeData(data);
            }}
        />
    );
}

export default RichTextEditor;
