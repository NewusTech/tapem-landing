// components/custom-editor.js
"use client"; // only in App Router

import { CKEditor } from "@ckeditor/ckeditor5-react";
import { EventInfo } from "ckeditor5";

import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { LegacyRef } from "react";

type CustomEditorProps = {
  onChange?: (event: EventInfo<string, unknown>, editor: ClassicEditor) => void;
  value?: string;
  ref?: LegacyRef<CKEditor<ClassicEditor>>;
  id?: string;
};
function CustomEditor({ id, ref, value, onChange, ...props }: CustomEditorProps) {
  return (
    <CKEditor
      editor={ClassicEditor}
      onChange={onChange}
      data={value}
      ref={ref}
      id={id}
      {...props}
    />
  );
}

export default CustomEditor;
