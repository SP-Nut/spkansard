'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useCallback, useEffect } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
}

export default function RichTextEditor({ content, onChange, onImageUpload }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // ปิด link ใน StarterKit เพื่อป้องกัน duplicate
        link: false,
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[300px] p-4',
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const addImage = useCallback(async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file || !editor) return;

      if (onImageUpload) {
        // Upload to server
        try {
          const url = await onImageUpload(file);
          editor.chain().focus().setImage({ src: url }).run();
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ');
        }
      } else {
        // Use base64 as fallback
        const reader = new FileReader();
        reader.onload = (e) => {
          const url = e.target?.result as string;
          editor.chain().focus().setImage({ src: url }).run();
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }, [editor, onImageUpload]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded hover:bg-gray-200 ${
            editor.isActive('bold') ? 'bg-gray-300 font-bold' : ''
          }`}
          title="ตัวหนา"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded hover:bg-gray-200 ${
            editor.isActive('italic') ? 'bg-gray-300 italic' : ''
          }`}
          title="ตัวเอียง"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1 rounded hover:bg-gray-200 ${
            editor.isActive('strike') ? 'bg-gray-300 line-through' : ''
          }`}
          title="ขีดฆ่า"
        >
          S
        </button>
        <div className="w-px bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 rounded hover:bg-gray-200 ${
            editor.isActive('heading', { level: 2 }) ? 'bg-gray-300 font-bold' : ''
          }`}
          title="หัวข้อใหญ่"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1 rounded hover:bg-gray-200 ${
            editor.isActive('heading', { level: 3 }) ? 'bg-gray-300 font-bold' : ''
          }`}
          title="หัวข้อกลาง"
        >
          H3
        </button>
        <div className="w-px bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded hover:bg-gray-200 ${
            editor.isActive('bulletList') ? 'bg-gray-300' : ''
          }`}
          title="รายการแบบจุด"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded hover:bg-gray-200 ${
            editor.isActive('orderedList') ? 'bg-gray-300' : ''
          }`}
          title="รายการแบบตัวเลข"
        >
          1. List
        </button>
        <div className="w-px bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={addImage}
          className="px-3 py-1 rounded hover:bg-gray-200 bg-blue-50 text-blue-600"
          title="แทรกรูปภาพ"
        >
          🖼️ รูปภาพ
        </button>
        <div className="w-px bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="px-3 py-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title="ย้อนกลับ"
        >
          ↶
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="px-3 py-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title="ทำซ้ำ"
        >
          ↷
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}
