import React, { useState } from 'react';
import { TypeTodo } from '../../Type/TypeTodo';
import { v4 as uuidv4 } from "uuid";


interface props {
    // onSubmit: (param: any) => void;
    newDAta: TypeTodo | null;
    onEditProduct: (itemProduct: TypeTodo) => void;
    onAddProduct: (itemProduct: TypeTodo) => void;
    onClose: () => void;
}

export const AddProductForm = ({  newDAta, onEditProduct, onAddProduct, onClose}: props) => {

    const [avatar, setAvatar] = useState(newDAta?.avatar || "")
    const [name, setName] = useState(newDAta?.name || "")
    const [content, setContent] = useState(newDAta?.content || "")

    const handleSubmit = () => {
        if (newDAta && onEditProduct) {
            onEditProduct({
                id: newDAta.id,
                name: name,
                content: content,
                avatar: avatar,
            });
        } else if (onAddProduct) {
            onAddProduct({
                id: uuidv4(),
                name: name,
                content: content,
                avatar: avatar,
            });
        }
    };

    return <div>
        <div className="field-input-group">
            <input placeholder="Image" type="text" className="ant-input" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
        </div>
        <div className="field-input-group">
            <input placeholder="Product name" type="text" className="ant-input" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field-input-group">
            <input placeholder="Product description" type="text" className="ant-input" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div className="modal-new-user-footer">
            <button className="ant-btn ant-btn-primary" onClick={() => {handleSubmit()}}>
                Save
            </button>
            <button className="ant-btn" style={{ marginLeft: 10 }} onClick={() => onClose()}>
                Cancel
            </button>
        </div>
    </div>
}
