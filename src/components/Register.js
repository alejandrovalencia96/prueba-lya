import React, {useEffect, useState} from 'react';
import RegisterForm from './RegisterForm';
import { toast } from 'react-toastify';
import {db} from '../firebase';

const Register = () => {

    const [list, setLists] = useState([]);
    const [currentId, setCurrentId] = useState('');

    const addOrEditLink = async (linkObject) => {
     
        try {
            if(currentId == ''){
                await db.collection('list').doc().set(linkObject);
                 toast('Nuevo registro agregado',{
                type: 'success'
                });
           }else{
               await db.collection('list').doc(currentId).update(linkObject);
               toast('Registro actualizado exitosamente',{
                type: 'info'
                });
                setCurrentId('');  
           }
        } catch (error) {
            console.error(error);
        }

    }

    const onDeleteLink = async (id) => {
       if(window.confirm('Estas seguro que quieres eliminar?')){
          await db.collection('list').doc(id).delete();
          toast('Registro eliminado exitosamente',{
            type: 'error',
            autoClose: 2000
        })
       }
    }

    const getList = () => {
      db.collection('list').onSnapshot((querySnapshot) =>{
          const docs = [];
        querySnapshot.forEach(doc => {
            docs.push({...doc.data(), id: doc.id});
        });
        setLists(docs);
    });
    }

    useEffect(() => {
        getList();
    }, []);

    return <div className="col-md-12">
    <div className="row">
        <div className="col-md-4">
            <RegisterForm {...{addOrEditLink, currentId, list}}/>
        </div>
        <div className="col-md-8">
            {list.map(data => (
                <div className="card mb-1" key={data.id}>
                    <div className="card-body">
                        <div className="text-right">
                        <button className="btn btn-info" onClick={() => setCurrentId(data.id)}><i className="fas fa-edit"></i></button>
                        <button className="btn btn-danger" onClick={() => onDeleteLink(data.id)}><i className="fas fa-trash"></i></button>
                        </div>
                        <h4>{data.name}</h4>
                        <p>{data.description}</p>
                        <div className="form-check">
                        <input disabled checked={data.check} className="form-check-input" type="checkbox" name="check" />
                         <label className="form-check-label"> Actividad realizada</label>
                        </div>
                        <ul>
                        {data.cats.map(function (value, index) {
                            return <li key={index}>{value}</li>
                        })
                        }

                        </ul>
                    </div>
                </div>
            ))}
        </div>
        </div>
    </div>
}

export default Register;
