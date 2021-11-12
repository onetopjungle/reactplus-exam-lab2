import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { TypeTodo } from './Type/TypeTodo';
import API from './ServerApi/Api';
import { AddProductForm } from './components/AddProductForm'

import 'antd/dist/antd.css'
import './App.css';
import { ListProduct } from './components/ListProduct/index';

function App() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [todoList, setTodoList] = useState<TypeTodo[]>([]);
  const [newDAta, setNewData] = useState<TypeTodo | null>(null)

  useEffect(() => {
    const getTodo = async () => {
      try {
        const { data: todo } = await API.getAll();
        setTodoList(todo)
      } catch (error) {
        console.log(error)
      }
    }
    getTodo()
  }, []);

  // const onHandleAdd = async (todo: TypeTodo) => {
  //   try {
  //     await API.add(todo)
  //     setTodoList([
  //       ...todoList,
  //       todo
  //     ])
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const onHandleDelete = async (id: string) => {
    try {
      await API.remote(id);
      const NewTodo = todoList.filter(todo => todo.id !== id);
      setTodoList(NewTodo);
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditProduct = (itemProduct: TypeTodo) => {
    setNewData(itemProduct);
    setIsModalVisible(true);
  } 

    const handleUpdateProduct = async (itemProduct: TypeTodo) => {
      const list = todoList.map((product) => {
        if (product.id === itemProduct.id) {
          return {
            ...itemProduct
          }
        }
        return product;
      })
    handleClose();
    try {
      await API.update(itemProduct.id, itemProduct);
      setTodoList(list);
    } catch (error) {
      console.log(error);
    }

  }

  const handleAddItem = async (itemProduct: TypeTodo) => {
    handleClose();
    try {
      await API.add(itemProduct);
      setTodoList([...todoList, itemProduct]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setIsModalVisible(false);
  }

  const handleOpenModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div className="App">
      <h2>List product</h2>
      <div className="header-add-user">
        <button className="ant-btn ant-btn-primary" onClick={handleOpenModal}>
          Add New Product
        </button>
      </div>
      <ListProduct todoList={todoList} onDeleteData={onHandleDelete} onUpdateData={handleEditProduct} />
      <Modal title="Add Product" visible={isModalVisible} footer={null} onCancel={handleCancel}>
        <AddProductForm newDAta={newDAta}  onAddProduct={handleAddItem} onEditProduct={handleUpdateProduct} onClose={handleClose} />
      </Modal>
    </div>
  );
}

export default App;
