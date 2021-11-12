import './ListProduct.css'
import { TypeTodo } from '../../Type/TypeTodo'

interface Props {
    todoList: TypeTodo[];
    onDeleteData: (id: string) => void;
    onUpdateData: (itemProduct: TypeTodo) => void;
}

export const ListProduct: React.FC<Props> = ({ todoList, onDeleteData,onUpdateData }) => {
    return (
        <>
            {todoList.map((item)=> {
                return (
                    <>
                        <div className="ant-list-items">
                            <div className="ant-list-item">
                                <div className="ant-list-item-meta">
                                    <div className="ant-list-item-meta-avatar">
                                        <span className="ant-image-img">
                                            <img src={item.avatar} style={{ width: 100 }} />
                                        </span>
                                    </div>
                                    <div className="ant-list-item-meta-content">
                                        <h4 className="ant-list-item-meta-title">
                                            <a>{item.name}</a>
                                        </h4>
                                        <div className="ant-list-item-meta-description">
                                            {item.content}
                                        </div>
                                    </div>
                                    <ul className="ant-list-item-action">
                                        <li>
                                            <a onClick={() => onUpdateData(item)}>Edit</a>
                                        </li>
                                        <li>
                                            <a onClick={() => onDeleteData(item.id)}>Remove</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })}
        </>
    )
}